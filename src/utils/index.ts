// Copyright 2022 Michelangelo Webb. All rights reserved.

export const rgba = (
    r: number, 
    g: number, 
    b: number, 
    a: number = 1) => {
    return {r, g, b, a}
}

export const wgpurgba = (
    r: number, 
    g: number, 
    b: number, 
    a: number = 1): string => {
    return `(${r}, ${g}, ${b}, ${a})`
}

export const initGPU = async (canvas: HTMLCanvasElement): Promise<CFG> => {
    canvas.width = innerWidth * devicePixelRatio
    canvas.height = innerHeight * devicePixelRatio

    const instance = (await navigator.gpu.requestAdapter({
        powerPreference: "high-performance",
        forceFallbackAdapter:  false,
    }))!

    const device = await instance.requestDevice()
    const format = navigator.gpu.getPreferredCanvasFormat()

    const context = canvas.getContext('webgpu')!
    context.configure({device, format, alphaMode: 'opaque'})

    return {context, canvas, format, device}
}

export const setHex = (char: number) => {
    let hex = char.toString(16);
    return hex.padStart(2, "0")
}
  
export const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + setHex(r) + setHex(g) + setHex(b);
}
