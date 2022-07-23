export default async () => {
    if(!('gpu' in navigator)) {
        throw Error('This browser does not support GPU')
        return
    }

    let adapter = (await navigator.gpu.requestAdapter({
        powerPreference: 'high-performance',
        forceFallbackAdapter: false
    }))!

    if(!adapter) {
        throw Error('Unable to get adapter')
    }

    let device = await adapter.requestDevice()

    if(!device) {
        throw Error('Unable to get device')
    }

    let format = navigator.gpu.getPreferredCanvasFormat()

    return {adapter, device, format}
}