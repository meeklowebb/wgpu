// Copyright 2022 Michelangelo Webb. All rights reserved.

export default async (canvas: HTMLCanvasElement) => {
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

    let context = canvas.getContext('webgpu')!
    context.configure({device, format, alphaMode: 'opaque'})

    return { device, format, context }
}