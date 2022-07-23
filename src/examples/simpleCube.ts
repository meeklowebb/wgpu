  import cubeShader from '../shaders/cubeShader.wgsl?raw'
import vertexBufferCPU from './shapes/cubeVertices'
import {mat4, vec3} from 'gl-matrix'

const simpleCube = async () => {
    /**
     * Create instance of the GPU
     */
    const wgpu = (await navigator.gpu.requestAdapter({
        powerPreference: 'high-performance',
        forceFallbackAdapter: false
    }))!

    const device = await wgpu.requestDevice()

    const format = navigator.gpu.getPreferredCanvasFormat()

    /**
     * Create canvas
     */

    let canvas = document.getElementById('canvas') as HTMLCanvasElement
    let context = canvas.getContext('webgpu')!
    context.configure({format, device, alphaMode: 'opaque'})

    /**
     * Create Pipe
     */

    let cubeModule =device.createShaderModule({code: cubeShader})

    let pipe = await device.createRenderPipelineAsync({
        layout: 'auto',
        vertex: {
            module: cubeModule,
            entryPoint: 'vertex',
            buffers: [{
                arrayStride: 3 * 4,
                attributes: [
                    {
                        shaderLocation: 0,
                        offset: 0,
                        format: 'float32x3'
                    },
                ]
            }]
        },
        fragment: {
            module: cubeModule,
            entryPoint: 'fragment',
            targets: [{format}]
        },
        primitive: {
            topology: 'triangle-list',
        }
    })

     // create depthTexture for renderPass
    //  const depthTexture = device.createTexture({
    //     format: 'depth24plus',
    //     usage: GPUTextureUsage.RENDER_ATTACHMENT,
    //     size: [canvas.width, canvas.height]
    // })
    // const depthView = depthTexture.createView()

    /**
     * Create Buffers
     */
    // Color 
    const colorBufferCPU = new Float32Array([1,1,0,1])
    const colorBufferGPU = device.createBuffer({
        size: 4*4,
        label: 'Color Buffer',
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST | GPUBufferUsage.VERTEX
    })
    device.queue.writeBuffer(colorBufferGPU, 0, colorBufferCPU, 0)
    // Vertex
    const vertexBufferGPU = device.createBuffer({
        size: vertexBufferCPU.byteLength,
        label: 'Vertex Buffer',
        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST | GPUBufferUsage.UNIFORM
    })
    device.queue.writeBuffer(vertexBufferGPU, 0, vertexBufferCPU, 0) // ??

    // MVP Buffer
    const pos = {x:0, y:0, z:0}
    const rot = {x:0, y:0, z:0}
    const scale = {x:1, y:1, z:1}
    const mvpmatArray = mat4.create() as Float32Array
    mat4.translate(mvpmatArray, mvpmatArray, vec3.fromValues(pos.x, pos.y, pos.z))
    mat4.rotateX(mvpmatArray, mvpmatArray, rot.x)
    mat4.rotateY(mvpmatArray, mvpmatArray, rot.y)
    mat4.rotateZ(mvpmatArray, mvpmatArray, rot.z)
    mat4.scale(mvpmatArray, mvpmatArray, vec3.fromValues(scale.x, scale.y, scale.z))
    const projectionMatrix = mat4.create()
    mat4.perspective(projectionMatrix, Math.PI / 2, canvas.width / canvas.height, 1, 100)
    const mvpMatrix = mat4.create()
    mat4.multiply(mvpMatrix, projectionMatrix, mvpmatArray)

    const mvpBufferGPU = device.createBuffer({
        label: 'Transformation Buffer',
        size: 4*4*4,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
    })
    device.queue.writeBuffer(mvpBufferGPU, 0, mvpmatArray, 0  ) // ??

    /**
     * Binding Step
     */

    const uniformGroup = device.createBindGroup({
        label: 'Uniform Group',
        layout: pipe.getBindGroupLayout(0),
        entries: [
            {
                binding: 0,
                resource: {
                    buffer: colorBufferGPU
                }
            },
            {
                binding: 1,
                resource: {
                    buffer: mvpBufferGPU
                }
            }
        ]
    })

    /**
     * Drawing step
     */

    function render() {
        let encoder = device.createCommandEncoder({label: 'CMD Encoder'})
        let renderPass = encoder.beginRenderPass({
            colorAttachments: [{
                view: context.getCurrentTexture().createView(),
                clearValue: {r:0,g:0,b:1,a:1},
                loadOp: 'clear',
                storeOp: 'store',
            } as GPURenderPassColorAttachment ]
        })

        renderPass.setPipeline(pipe)
        renderPass.setVertexBuffer(0, colorBufferGPU)
        renderPass.setBindGroup(0, uniformGroup)
        renderPass.draw(36)
        renderPass.end()
        device.queue.submit([encoder.finish()])
    }
    render() // Default drawing
}

export default simpleCube