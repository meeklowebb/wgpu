/* Copyright 2022, Meeklo Webb, All rights reserved */
import genInstance from "./01.genInstance"
import genPipeline from "./02.genPipeline"
import genRenderPass from "./04.genRenderPass"
import genBufferGPU from "./03.genBufferGPU"

const main = async (canvas: HTMLCanvasElement) => {

    canvas.width = innerWidth
    canvas.height = innerHeight

    const { format, device, context } = await genInstance({ canvas })

    const {
        mvpUniformBuffer,
        vertexBuffer,
        vertexBufferLayout,
    } = await genBufferGPU({ device })

    const { pipeline } = await genPipeline({
        device,
        format,
        canvas,
        vertexBufferLayout,
        mvpUniformBuffer,
    })

    const { render } = await genRenderPass({
        device,
        pipeline,
        context,
        canvas,
        mvpUniformBuffer,
        vertexBuffer,
    })

    render()

}

export default main