import init from './01.init'
import genPipeline from './02.genPipeline'
import renderPass from './03.renderPass';

const main = async (canvas: HTMLCanvasElement) => {
    console.log('Main Started');
    let { device, format, context } = await init({ canvas })
    let { pipeline } = await genPipeline({ device, format })
    let { render } = await renderPass({context, device, pipeline})

    render()
}

export default main