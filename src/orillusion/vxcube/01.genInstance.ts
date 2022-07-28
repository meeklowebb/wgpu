declare interface GenInstanceIn {
    canvas: HTMLCanvasElement
}
declare interface GenInstanceOut {
    adapter: GPUAdapter
    device: GPUDevice
    format: GPUTextureFormat
    context: GPUCanvasContext
}

const genInstance = async ({canvas} : GenInstanceIn) : Promise<GenInstanceOut> => {

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

export default genInstance