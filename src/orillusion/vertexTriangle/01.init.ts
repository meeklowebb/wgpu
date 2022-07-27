declare interface InitArgs {
    canvas: HTMLCanvasElement
}

declare interface InitOut {
    adapter: GPUAdapter
    device : GPUDevice
    format : GPUTextureFormat
    context: GPUCanvasContext
}

const init = async ({canvas} : InitArgs): Promise<InitOut> => {
    let adapter = (await navigator.gpu.requestAdapter({
        powerPreference: 'high-performance',
        forceFallbackAdapter: false
    }))!

    let device = (await adapter.requestDevice())!

    let format = navigator.gpu.getPreferredCanvasFormat()

    let context = canvas.getContext('webgpu')!

    context.configure({device, format, alphaMode: 'opaque'})

    return {
        adapter,
        device,
        format,
        context,
    }
}

export default init