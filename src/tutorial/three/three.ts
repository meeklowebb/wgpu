// Copyright 2022 Michelangelo Webb. All rights reserved.

import initWGPU from "../one/initWGPU"
import shaderThree from './shaderThree.wgsl?raw'

export default async (canvas: HTMLCanvasElement) => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    let { device, format, context } = (await initWGPU(canvas))!

    let module = device.createShaderModule({code: shaderThree})

    // PIPE
    let pipe = await device.createRenderPipelineAsync({
        layout: 'auto',
        vertex: {
            module,
            entryPoint: 'vertex',
            buffers: [
                {
                    arrayStride: 4 * 4,
                    attributes: [
                        {   
                            shaderLocation: 0,
                            offset: 0,
                            format: 'float32x4',
                        }
                    ]
                }
            ]
        },
        fragment: {
            module,
            entryPoint: 'fragment',
            targets: [{format}],
        },
        primitive: {
            topology: 'triangle-list'
        }
    })

    // BUFFERS
    let colorArray = new Float32Array([1, 0, 0, 1])
    let colorBuffer = device.createBuffer({
        size: 4*4,
        usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.UNIFORM
    })
    device.queue.writeBuffer(colorBuffer, 0, colorArray, 0)
    // Vertex Buffer
    let triangleArray = new Float32Array([
        0, 1/2, 0, 1,
        -1/2, -1/2, 0, 1,
        1/2, -1/2, 0, 1,
    ])
    let trianlgeBuffer = device.createBuffer({
        size: 4*4,
        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST
    })
    device.queue.writeBuffer(trianlgeBuffer, 0, triangleArray, 0)

    // Drawing
    const render = () => {
        let encoder = device.createCommandEncoder()
        let render = encoder.beginRenderPass({
            colorAttachments: [
                {
                    view: context.getCurrentTexture().createView(),
                    clearValue: {r:0, g:0, b:0, a:1},
                    loadOp: 'clear',
                    storeOp: 'store',
                }
            ]
        })
        render.setPipeline(pipe)
        render.draw(4)
        render.end()
        device.queue.submit([encoder.finish()])
    }

    render()

}