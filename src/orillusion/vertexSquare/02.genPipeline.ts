declare interface GenPipelineArgs {
    device: GPUDevice
    format: GPUTextureFormat
}

const genPipeline = async ({ device, format }: GenPipelineArgs) => {

    const code = (await import('./shader.wgsl?raw')).default

    const module = device.createShaderModule({ code })

    const pipeline = await device.createRenderPipelineAsync({
        layout: 'auto',
        vertex: {
            module,
            entryPoint: 'vertex',
        },
        fragment: {
            module,
            entryPoint: 'fragment',
            targets: [{ format }]
        },
        primitive: { topology: 'triangle-strip' }
    })

    return pipeline
}

export default genPipeline