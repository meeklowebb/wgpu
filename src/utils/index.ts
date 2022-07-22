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

export const initGPU = async (): Promise<CFG> => {
    const instance = (await navigator.gpu.requestAdapter({
        powerPreference: "high-performance",
        forceFallbackAdapter:  false,
    }))!

    const device = await instance.requestDevice()
    const format = navigator.gpu.getPreferredCanvasFormat()

    return {format, device}
}