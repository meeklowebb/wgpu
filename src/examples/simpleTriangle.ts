
// Copyright 2022 Michelangelo Webb. All rights reserved.

import { wgpurgba, initGPU } from '../utils/'
import { generateShaderColor } from '../shaders'

interface TriangleParams {
    bg: string
    tc: string
    canvas: HTMLCanvasElement
}

export default async ({
    bg,
    tc,
    canvas,
}: TriangleParams) => {
    let { device, format, context } = await initGPU(canvas)
    const shader = generateShaderColor(wgpurgba(hexTorgb(tc)))
    const pipe = await device.createRenderPipelineAsync({
        layout: 'auto',
        vertex: {
            module: device.createShaderModule({
                code: shader.triangleVertex
            }),
            entryPoint: 'vertex'
        },
        fragment: {
            module: device.createShaderModule({
                code: shader.triangleFragment
            }),
            entryPoint: 'fragment',
            targets: [{format}]
        },
        primitive: {
            topology: 'triangle-list'
        }
    })
    const commandEncoder = device.createCommandEncoder()
    const view = context.getCurrentTexture().createView()
    const renderPass = commandEncoder.beginRenderPass({
        colorAttachments: [{
            view,
            clearValue: bg,
            loadOp: 'clear',
            storeOp: 'store',
        }] as Iterable<GPURenderPassColorAttachment>
    })
    renderPass.setPipeline(pipe);
    renderPass.draw(3, 1, 0, 0);
    renderPass.end();
    device.queue.submit([commandEncoder.finish()]);
}
