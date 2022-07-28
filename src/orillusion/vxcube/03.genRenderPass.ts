declare interface genRenderPassIn {
    device: GPUDevice
    pipeline: GPURenderPipeline
    context: GPUCanvasContext
}
declare interface genRenderPassOut {
    render: () => void
}

const genRenderPass = async ({ device, context, pipeline }: genRenderPassIn): Promise<genRenderPassOut> => {

    const render = () => {
        const cmdEncoder = device.createCommandEncoder()

        const renderPass = cmdEncoder.beginRenderPass({
            colorAttachments: [{
                view: context.getCurrentTexture().createView(),
                loadOp: 'clear',
                storeOp: 'store',
                clearValue: { r: 0, g: 0, b: 0, a: 1 }
            }]
        })

        renderPass.setPipeline(pipeline)
        renderPass.draw(36, 1, 0, 0)
        renderPass.end()

        device.queue.submit([cmdEncoder.finish()])

        requestAnimationFrame(render)
    }

    return { render }
}

export default genRenderPass