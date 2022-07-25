// Copyright 2022 Michelangelo Webb. All rights reserved.
// Rotational Polygon of 2D

import { mat4 } from 'gl-matrix'
import code from './rotPoly.wgsl?raw'

export interface RotPolyArgs {
    canvas: HTMLCanvasElement
}

export default async ({ canvas }: RotPolyArgs) => {

    // Globals
    let rot = 0.05
    console.log('✅✅✅ WebGPU Started');

    canvas.width = 800
    canvas.height = 600
    // Instance
    let adapter = (await navigator.gpu.requestAdapter())!
    let device = (await adapter.requestDevice())!
    let format = navigator.gpu.getPreferredCanvasFormat()
    let context = canvas.getContext('webgpu')!
    context.configure({ format, device, alphaMode: 'opaque' })

    // Buffer for Vertex and Color
    const vxColorBufferCPU = new Float32Array(
        [
             0.0,  0.5, 0.0, 1, 0, 0,
            -0.5, -0.5, 0.0, 0, 1, 0,
             0.5, -0.5, 0.0, 0, 0, 1,
        ]
    )

    const vxColorBufferGPU = device.createBuffer({
        size: vxColorBufferCPU.byteLength,
        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    })
    device.queue.writeBuffer(vxColorBufferGPU, 0, vxColorBufferCPU, 0)

    const bufferLayout: GPUVertexBufferLayout = {
        arrayStride: 6 * 4,
        attributes: [
            {
                shaderLocation: 0,
                format: 'float32x2',
                offset: 0,
            },
            {
                shaderLocation: 1,
                format: 'float32x3',
                offset: 3 * 4,
            }
        ]
    }
    // Uniform MVP Buffers

    const uniformBuffer = device.createBuffer({
        size: 4 * 4 * 4 * 3,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
    })



    // Create Groups and Layouts
    const groupLayout = device.createBindGroupLayout({
        label: 'GroupLayout',
        entries: [
            {
                binding: 0,
                visibility: GPUShaderStage.VERTEX,
                buffer: {}
            }
        ],
    })

    const groupOne = device.createBindGroup({
        layout: groupLayout,
        entries: [{
            binding: 0,
            resource: {
                buffer: uniformBuffer
            }
        }],
    })

    const pipelineLayout = device.createPipelineLayout({
        bindGroupLayouts: [groupLayout]
    })

    // pipeline
    const module = device.createShaderModule({ code })

    const pipeline = await device.createRenderPipelineAsync({
        layout: pipelineLayout,
        vertex: {
            module,
            entryPoint: 'vertex',
            buffers: [bufferLayout]
        },
        fragment: {
            module,
            entryPoint: 'fragment',
            targets: [{ format }]
        },
        primitive: { topology: 'triangle-list' }
    })

    // Draw
    function render() {

        rot += 0.03
        if (rot > Math.PI) rot -= 2 * Math.PI

        const projection = mat4.create()
        mat4.perspective(
            projection,
            Math.PI / 3,
            800 / 600,
            0.1,
            10
        )

        const view = mat4.create()
        mat4.lookAt(
            view,
            [-1, 0, 1],
            [0, 0, 0],
            [0, 0, 1]
        )

        const model = mat4.create()
        mat4.rotate(
            model,
            model,
            rot,
            [0, 0, 1]
        )
        device.queue.writeBuffer(uniformBuffer, 0, model as ArrayBuffer)
        device.queue.writeBuffer(uniformBuffer, 64, view as ArrayBuffer)
        device.queue.writeBuffer(uniformBuffer, 128, projection as ArrayBuffer)

        const encoder = device.createCommandEncoder({ label: 'encoder' })
        const renderPass = encoder.beginRenderPass({
            colorAttachments: [
                {
                    view: context.getCurrentTexture().createView(),
                    clearValue: { r: 0, g: 0, b: 0, a: 1 },
                    loadOp: 'clear',
                    storeOp: 'store',
                }
            ]
        })
        renderPass.setPipeline(pipeline)
        renderPass.setBindGroup(0, groupOne)
        renderPass.setVertexBuffer(0, vxColorBufferGPU)
        renderPass.draw(3, 1, 0, 0)
        renderPass.end()
        device.queue.submit([encoder.finish()])

        requestAnimationFrame(render)
    }

    render()
}