declare interface RenderPassArgs {
    pipeline: GPURenderPipeline
    device: GPUDevice
    context: GPUCanvasContext
}

declare interface RenderPassOut {
    render: () => void
}

const renderPass = async ({ pipeline, device, context }: RenderPassArgs) => {

    const render = () => {
        const encoder = device.createCommandEncoder()
        const pass = encoder.beginRenderPass({
            colorAttachments: [{
                view: context.getCurrentTexture().createView(),
                loadOp: 'clear',
                storeOp: 'store',
                clearValue: { r: 0, g: 0, b: 0, a: 1 }
            }]
        })

        pass.setPipeline(pipeline)
        pass.draw(3, 1, 0, 0)
        pass.end()

        device.queue.submit([encoder.finish()])

        requestAnimationFrame(render)
    }

    return {render}
}

export default renderPass