declare interface GenRenderPassArgs {
    device: GPUDevice
    canvas: HTMLCanvasElement
    context: GPUCanvasContext
    pipeline: GPURenderPipeline
}

declare interface GenRenderPassOut {
    render: () => void
}

const genRenderPass = ({ context, device, pipeline }: GenRenderPassArgs) => {

    const render = () => {

        const encoder = device.createCommandEncoder()

        const renderPass = encoder.beginRenderPass({
            colorAttachments: [
                {
                    view: context.getCurrentTexture().createView(),
                    loadOp: 'clear',
                    storeOp: 'store',
                    clearValue: { r: 0, g: 0, b: 0, a: 1 }
                }
            ]
        })

        renderPass.setPipeline(pipeline)
        renderPass.draw(3)
        renderPass.end()
        device.queue.submit([encoder.finish()])
    }

    return { render }
}

export default genRenderPass