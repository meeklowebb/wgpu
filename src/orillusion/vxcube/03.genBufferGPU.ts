declare interface GenBuffIn {
    device: GPUDevice
}
declare interface GenBuffOut {
    mvpUniformBuffer: GPUBuffer
    vertexBuffer: GPUBuffer
    vertexBufferLayout: GPUVertexBufferLayout
}

const genBufferGPU = async ({ device }: GenBuffIn): Promise<GenBuffOut> => {

    const mvpUniformBuffer = device.createBuffer({
        label: 'mvp gpu buffer',
        size: 4 * 4 * 4 * 3,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    })

    const vertexBuffer = device.createBuffer({
        label: 'vertex gpu buffer',
        size: 36 * 5 * 4, // 4 * 3 * 36
        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    })

    const vertexBufferLayout: GPUVertexBufferLayout = {
        arrayStride: 5 * 4,
        attributes: [
            {
                shaderLocation: 0,  // @location(0) xyz
                format: 'float32x3',
                offset: 0,
            },
            {
                shaderLocation: 1,  // @location(1) uv
                format: 'float32x2',
                offset: 3 * 4,
            }
        ],
    }

    return { mvpUniformBuffer, vertexBuffer, vertexBufferLayout }
}

export default genBufferGPU