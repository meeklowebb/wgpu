// Copyright 2022 Michelangelo Webb. All rights reserved.

declare interface CFG {
    context: GPUCanvasContext
    canvas: HTMLCanvasElement
    format: GPUTextureFormat
    device: GPUDevice
}

declare type InitGPUFunction = () => Promise<CFG>