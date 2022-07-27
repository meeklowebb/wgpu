declare interface GenPipeArgs {
    device: GPUDevice
    layout?: GPUPipelineLayout | "auto"
    format: GPUTextureFormat
}

declare interface GenPipeOut {
    pipeline: GPURenderPipeline
}

const genPipe = async ({device, format, layout = "auto"} : GenPipeArgs) => { 

    const code = (await import('./shader.wgsl?raw')).default

    const module = device.createShaderModule({ code })

    const pipeline = await device.createRenderPipelineAsync({
        vertex: {
            module,
            entryPoint: 'vertex',
        },
        fragment: {
            module,
            entryPoint: 'fragment',
            targets: [{format}]
        },
        layout,
        primitive: { topology: 'triangle-strip'}
    });

    return { pipeline }
}

export default genPipe