// Copyright 2022 Michelangelo Webb. All rights reserved.
// Rotational Polygon of 2D

import code from './rotPoly.wgsl?raw'

export interface RotPolyArgs {
    canvas: HTMLCanvasElement
}

export default async ({canvas}: RotPolyArgs) => {

    // Instance
    let adapter = (await navigator.gpu.requestAdapter())!
    let device = (await adapter.requestDevice())!
    let format = navigator.gpu.getPreferredCanvasFormat()
    let context = canvas.getContext('webgpu')!
    context.configure({format, device, alphaMode: 'opaque'})

    // Buffer for Vertex and Color
    const vxColorBufferCPU = new Float32Array(
        [
            0.0,  0.5, 1, 0, 0,
           -0.5, -0.5, 0, 1, 0,
            0.5, -0.5, 0, 0, 1,
        ]
    )

    const vxColorBufferGPU = device.createBuffer({
        size: vxColorBufferCPU.byteLength,
        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    })
    device.queue.writeBuffer(vxColorBufferGPU, 0, vxColorBufferCPU, 0)

    const bufferLayout: GPUVertexBufferLayout = {
        arrayStride: 5*4,
        attributes: [
            {
                shaderLocation: 0,
                format: 'float32x2',
                offset: 0,
            },
            {
                shaderLocation: 1,
                format: 'float32x3',
                offset: 2*4,
            }
        ]
    }
    // Create Groups
    const groupLayout = device.createBindGroupLayout({
        label: 'GroupLayout',
        entries: [],
    })

    const groupOne = device.createBindGroup({
        layout: groupLayout,
        entries: [],
    })

    // pipeline
    const module = device.createShaderModule({code})

    const pipelineLayout = device.createPipelineLayout({
        bindGroupLayouts: [groupLayout]
    })

    const pipeline  = await device.createRenderPipelineAsync({
        layout: pipelineLayout,
        vertex: {
                module,
                entryPoint: 'vertex',
                buffers: [bufferLayout]
        },
        fragment: {
            module,
            entryPoint: 'fragment',
            targets: [{format}]
        },
        primitive: { topology: 'triangle-list'}
    })

    // Draw
    
    const encoder = device.createCommandEncoder({label: 'encoder'})
    const render = encoder.beginRenderPass({
        colorAttachments: [
            {
                view: context.getCurrentTexture().createView(),
                clearValue: {r: 0, g: 0, b: 0, a: 1},
                loadOp: 'clear',
                storeOp: 'store',
            }
        ]
    })
    render.setPipeline(pipeline)
    render.setBindGroup(0, groupOne)
    render.setVertexBuffer(0, vxColorBufferGPU)
    render.draw(3, 1, 0, 0)
    render.end()
    device.queue.submit([encoder.finish()])

    return device
}