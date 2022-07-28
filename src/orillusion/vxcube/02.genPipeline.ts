declare interface genPipelineIn {
    device: GPUDevice
    format: GPUTextureFormat
    canvas: HTMLCanvasElement
    vertexBufferLayout: GPUVertexBufferLayout
    mvpUniformBuffer: GPUBuffer
}
declare interface genPipelineOut {
    pipeline: GPURenderPipeline
}

const genPipeline = async (args : genPipelineIn) : Promise<genPipelineOut> => {

    const { 
        device,
        format,
        vertexBufferLayout
    } = args

    const code = (await import('./shader.wgsl?raw')).default

    const module = device.createShaderModule({ code })

    const pipeline = await device.createRenderPipelineAsync({
        layout: 'auto',
        vertex: {
            module,
            entryPoint: 'vertex',
            buffers: [vertexBufferLayout],
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