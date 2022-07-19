import { wgpurgba, initGPU } from '../utils/'
import { generateShaderColor } from '../shaders'

export default async (background: {r: number, g: number, b: number, a: number}) => {
    let { device, format, context } = await initGPU()
    const shader = generateShaderColor(wgpurgba(0,0,1,1))
    const pipe = await device.createRenderPipelineAsync({
        layout: 'auto',
        vertex: {
            module: device.createShaderModule({
                code: shader.triangleVertex
            }),
            entryPoint: 'vertex'
        },
        fragment: {
            module: device.createShaderModule({
                code: shader.triangleFragment
            }),
            entryPoint: 'fragment',
            targets: [{format}]
        },
        primitive: {
            topology: 'triangle-list'
        }
    })
    const commandEncoder = device.createCommandEncoder()
    const view = context.getCurrentTexture().createView()
    const renderPass = commandEncoder.beginRenderPass({
        colorAttachments: [{
            view,
            clearValue: background,
            loadOp: 'clear',
            storeOp: 'store',
        }] as Iterable<GPURenderPassColorAttachment>
    })
    renderPass.setPipeline(pipe);
    renderPass.draw(3, 1, 0, 0);
    renderPass.end();
    device.queue.submit([commandEncoder.finish()]);
}