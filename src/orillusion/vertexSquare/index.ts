import init from "./01.init"
import genPipeline from "./02.genPipeline"
import renderPass from "./03.render"

const main = async (canvas: HTMLCanvasElement) => {
    const {context, device, format} = await init({ canvas})
    const pipeline = await genPipeline({device, format })
    const {render} = await renderPass({context, device, pipeline})

    render()
}

export default main