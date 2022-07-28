declare interface genPipelineIn {
    device: GPUDevice
    format: GPUTextureFormat
}
declare interface genPipelineOut {
    pipeline: GPURenderPipeline
}

const genPipeline = async ({device, format} : genPipelineIn) : Promise<genPipelineOut> => {

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
            targets: [{format}]
        },
        primitive: { topology: 'triangle-list' }
    })

    return { 
        pipeline
    }
}

export default genPipeline