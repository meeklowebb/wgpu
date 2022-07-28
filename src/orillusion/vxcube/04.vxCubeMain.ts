import genInstance from "./01.genInstance"
import genPipeline from "./02.genPipeline"
import genRenderPass from "./03.genRenderPass"

const main = async (canvas: HTMLCanvasElement) => {

    canvas.width = innerWidth
    canvas.height = innerHeight

    const {format, device, context} = await genInstance({canvas})

    const {pipeline} = await genPipeline({device, format})

    const {render} = await  genRenderPass({device, pipeline, context})

    render()

}

export default main