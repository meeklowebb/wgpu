declare interface PipelineArgs {
    device: GPUDevice
    format: GPUTextureFormat
}

declare interface PipelineOut {
    pipeline: GPURenderPipeline
}

const pipeline = async ({device, format} : PipelineArgs): Promise<PipelineOut> => {

    const code = (await import('./shader.wgsl?raw')).default

    const module = device.createShaderModule({code})

    const pipeline = await device.createRenderPipelineAsync({
        layout: 'auto',
        vertex: {
            module,
            entryPoint: 'vertex',
        },
        fragment: {
            module,
            entryPoint: 'fragment',
            targets: [{format}]
        },
        primitive: {topology: 'triangle-list'}
    })

    return { pipeline }
}

export default pipeline