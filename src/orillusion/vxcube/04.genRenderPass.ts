import { mat4 } from 'gl-matrix'
import cube from './meshes/cubeMesh'

declare interface genRenderPassIn {
    device: GPUDevice
    pipeline: GPURenderPipeline
    context: GPUCanvasContext
    canvas: HTMLCanvasElement
    mvpUniformBuffer: GPUBuffer
    vertexBuffer: GPUBuffer
}

declare interface genRenderPassOut {
    render: () => void
}

const genRenderPass = async (args: genRenderPassIn): Promise<genRenderPassOut> => {

    const {
        device,
        context,
        pipeline,
        canvas,
        mvpUniformBuffer,
        vertexBuffer,
    } = args;

    let rotSpeed = 0.01

    const render = () => {

        rotSpeed += 0.05
        if (rotSpeed > Math.PI * 2) rotSpeed -= Math.PI

        // Mapping matrices to the GPU
        const projection = mat4.create()
        mat4.perspective(
            projection,
            Math.PI / 2,
            canvas.width / canvas.height,
            0.1, 10
        )

        const view = mat4.create()
        mat4.lookAt(view, [-3, 0, -3], [0, 0, 0], [0, 1, 0])

        const model = mat4.create()
        mat4.rotateX(model, model, rotSpeed)
        // Seeting up Binding and groups
          
        device.queue.writeBuffer(vertexBuffer, 0, cube.buffer)
        device.queue.writeBuffer(mvpUniformBuffer, 0, model as ArrayBuffer)
        device.queue.writeBuffer(mvpUniformBuffer, 64, view as ArrayBuffer)
        device.queue.writeBuffer(mvpUniformBuffer, 128, projection as ArrayBuffer)

        const uniformGroup = device.createBindGroup({
            layout: pipeline.getBindGroupLayout(0),
            entries: [
                {
                    binding: 0,
                    resource: { buffer: mvpUniformBuffer },
                },
            ]
        })
        
        // Finall Rendering
        const cmdEncoder = device.createCommandEncoder()

        const renderPass = cmdEncoder.beginRenderPass({
            colorAttachments: [{
                view: context.getCurrentTexture().createView(),
                loadOp: 'clear',
                storeOp: 'store',
                clearValue: { r: 0, g: 0, b: 0, a: 1 }
            }]
        })

        renderPass.setPipeline(pipeline)
        renderPass.setBindGroup(0, uniformGroup)
        renderPass.setVertexBuffer(0, vertexBuffer)
        renderPass.draw(cube.trianglesCount, 1, 0, 0)
        renderPass.end()

        device.queue.submit([cmdEncoder.finish()])

        requestAnimationFrame(render)
    }

    return { render }
}

export default genRenderPass