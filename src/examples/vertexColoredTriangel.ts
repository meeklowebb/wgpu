import { vertexColoredTriangle } from "../shaders"
import { initGPU } from "../utils"

const vertexcoloredTriangle = async () => {
    console.log('React render');
    // Canvas Information and Canvas config
    let canvas = document.getElementById('canvas')! as HTMLCanvasElement
    canvas.width = innerWidth
    canvas.height = innerHeight

    let {device, format} = await initGPU()

    let context = canvas.getContext('webgpu')!
    context.configure({
        device, format, alphaMode: 'opaque'
    })
    //let view = context.getCurrentTexture().createView()

    // PIPE Creation
    let shader = device.createShaderModule({
        code: vertexColoredTriangle(),
    })

    let pipe = await device.createRenderPipelineAsync({
        vertex: {
            module: shader,
            entryPoint: 'vertex',
            buffers: [{
                arrayStride: 4 * 3,
                attributes: [{
                    shaderLocation: 0,
                    offset: 0,
                    format: 'float32x3'
                }]
            }]
        },
        fragment: {
            module: shader,
            entryPoint: 'fragment',
            targets: [{format}],
        },
        primitive: {
            topology: 'triangle-list'
        },
        layout: 'auto'
    })

    // Buffer creation stage
    const pos = new Float32Array([
        -0.5, -0.5, 0.0,
         0.0,  0.5, 0.0,
         0.5, -0.5, 0.0,
    ])
    const posBuffer = device.createBuffer({
        size: pos.byteLength,
        usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.VERTEX
    })
    device.queue.writeBuffer(posBuffer, 0, pos, 0)
    /* Color Buffer*/
    const color = new Float32Array([1,.5,.2,1])
    const colorBuffer = device.createBuffer({
        size: color.byteLength,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
    })
    device.queue.writeBuffer(colorBuffer, 0, color, 0)

    // Bind buffers (Color and position)
    const group = device.createBindGroup({
        layout: pipe.getBindGroupLayout(0),
        entries: [{
            binding: 0,
            resource: {
                buffer: colorBuffer
            }
        }]
    })
    
    const draw = (context: GPUCanvasContext) => {
        // Creation of the command encoder (Drawing steap on the pipeline)
        const cmdEncoder = device.createCommandEncoder()
        const passEncoder = cmdEncoder.beginRenderPass({
            colorAttachments: [{
                view: context.getCurrentTexture().createView(),
                clearValue: {r:0, g:0, b:0.5, a:1},
                loadOp: 'clear',
                storeOp: 'store', 
            }]
        })
        passEncoder.setPipeline(pipe)
        passEncoder.setVertexBuffer(0, posBuffer)
        passEncoder.setBindGroup(0,  group)
        passEncoder.draw(3)
        passEncoder.end()

        // Issue Endoded Commands to GPU QUEUE
        device.queue.submit([cmdEncoder.finish()])
    }

    // Interactive drawing (Dynamic setup)
    document.querySelector('input[type="color"]')!.addEventListener('input', (e) => {
        const hexColor = (e.target as HTMLInputElement).value
        const r = parseInt(hexColor.slice(1, 3), 16) / 255 
        const g = parseInt(hexColor.slice(3, 5), 16) / 255
        const b = parseInt(hexColor.slice(5, 7), 16) / 255

        color[0] = r
        color[1] = g
        color[2] = b

        device.queue.writeBuffer(colorBuffer, 0, color, 0)
        draw(context)
    })

    document.querySelector('input[name="x"]')!.addEventListener('input', (e) => {
        const x = (e.target as HTMLInputElement).value

        pos[0] = -0.5 + parseFloat(x)
        pos[3] = 0 + parseFloat(x)
        pos[6] = 0.5 + parseFloat(x)

        device.queue.writeBuffer(posBuffer, 0, pos, 0)
        draw(context)
    })

    document.querySelector('input[name="y"]')!.addEventListener('input', (e) => {
        const y = (e.target as HTMLInputElement).value

        pos[1] = -0.5 + parseFloat(y)
        pos[4] = 0.5 + parseFloat(y)
        pos[7] = -0.5 + parseFloat(y)

        device.queue.writeBuffer(posBuffer, 0, pos, 0)
        draw(context)
    })

    draw(context)  // First drawing (Default setup)
}

export default vertexcoloredTriangle 