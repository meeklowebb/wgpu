declare interface InitArgs {
    canvas: HTMLCanvasElement
}

declare interface InitOut {
    context: GPUCanvasContext
    device: GPUDevice
    adapter: GPUAdapter
    format: GPUTextureFormat
}

const init = async ({canvas}: InitArgs): Promise<InitOut> => {
    const adapter = (await navigator.gpu.requestAdapter())!

    const device = (await adapter.requestDevice())!

    const format = navigator.gpu.getPreferredCanvasFormat()

    const context = canvas.getContext('webgpu')!

    context.configure({device,format, alphaMode: 'opaque'})

    return {adapter, context, device, format}
}

export default init