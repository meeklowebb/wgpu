declare interface GenInstanceIn {
    canvas: HTMLCanvasElement
}
declare interface GenInstanceOut {
    adapterInfo: any
    device: GPUDevice
    format: GPUTextureFormat
    context: GPUCanvasContext
    view: GPUTextureView
}

const genInstance = async ({ canvas }: GenInstanceIn): Promise<GenInstanceOut> => {

    let adapter = (await navigator.gpu.requestAdapter({
        powerPreference: 'high-performance',
        forceFallbackAdapter: false,
    }))!

    let device = (await adapter.requestDevice({}))!

    let format = navigator.gpu.getPreferredCanvasFormat()

    let context = canvas.getContext('webgpu')!

    context.configure({device, format, alphaMode: 'opaque'})

    let view = context.getCurrentTexture().createView()!

    let adapterInfo = {
        info: await adapter.requestAdapterInfo(),
        features: [...adapter.features.keys()],
        limits: adapter.limits,
    }

    return {
        adapterInfo,
        device,
        format,
        context,
        view,
    }
}

export default genInstance