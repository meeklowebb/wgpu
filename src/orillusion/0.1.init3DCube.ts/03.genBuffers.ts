declare interface GenBuffersArgs {
    device: GPUDevice
}

declare interface GenBuffersOut {
    mvpBuffer: GPUBuffer
}

const genBuffers = async ({device} : GenBuffersArgs) => {
    const mvpBuffer = device.createBuffer({
        size: 4*4*4*3,
        usage: GPUBufferUsage.COPY_SRC | GPUBufferUsage.UNIFORM
    })

    return { mvpBuffer }
}

export default genBuffers