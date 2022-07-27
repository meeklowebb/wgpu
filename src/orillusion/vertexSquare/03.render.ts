declare interface RenderArgs {
    device: GPUDevice
    context: GPUCanvasContext
    pipeline: GPURenderPipeline
}

declare interface RenderOut {
    render: () => void
}

const renderPass = async ({ device, context, pipeline }: RenderArgs): Promise<RenderOut> => {
    // create webgpu renderPass pass
    const render = () => {
        const encoder = device.createCommandEncoder()
        const pass = encoder.beginRenderPass({
            colorAttachments: [{
                view: context.getCurrentTexture().createView(),
                loadOp: 'clear',
                storeOp: 'store',
                clearValue: { r: 0, g: 0, b: 0, a: 1 }
            }],
        })

        pass.setPipeline(pipeline)
        pass.draw(6, 1, 0, 0)
        pass.end()

        device.queue.submit([encoder.finish()])

        requestAnimationFrame(render)
    }

    return {render}
}

export default renderPass