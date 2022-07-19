interface CFG {
    context: GPUCanvasContext
    canvas: HTMLCanvasElement
    format: GPUTextureFormat
    device: GPUDevice
}

export default async (): Promise<CFG> => {
    const canvas = document.createElement('canvas')
    document.body.appendChild(canvas)
    canvas.width = innerWidth * devicePixelRatio
    canvas.height = innerHeight * devicePixelRatio

    const instance = (await navigator.gpu.requestAdapter({
        powerPreference: "high-performance",
        forceFallbackAdapter:  false
    }))!

    const device = await instance.requestDevice()
    const format = navigator.gpu.getPreferredCanvasFormat()

    const context = canvas.getContext('webgpu')!
    context.configure({device, format})

    return {context, canvas, format, device}
} 