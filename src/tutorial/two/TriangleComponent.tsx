import { useEffect, useRef, useState } from "react"
import initWGPU from "../one/initWGPU"
import shader from "../two/shader.wgsl?raw"

export default () => {

    const canvasref = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        initWGPU().then( gpu => {
            const {
                device,
                format,
            } = gpu!
            
            let canvas = canvasref.current!
            canvas.width = innerWidth * devicePixelRatio
            canvas.height = innerHeight * devicePixelRatio
            const context = canvasref.current?.getContext('webgpu')!
            context.configure({device, format, alphaMode: 'opaque'})

            const sModule = device.createShaderModule({code: shader})

            const pipeline = device.createRenderPipeline({
                layout: 'auto',
                vertex: {
                    module: sModule,
                    entryPoint: 'vertex',
                },
                fragment: {
                    module: sModule,
                    entryPoint: 'fragment',
                    targets: [{format}],
                },
                primitive: {
                    topology: 'triangle-list',
                }
            })
            
            const encoder = device.createCommandEncoder()
            const pass = encoder.beginRenderPass({
                colorAttachments: [{
                    view: context.getCurrentTexture().createView(),
                    clearValue: {r:0.1,g:0.1,b:0.1,a:0},
                    loadOp: 'clear',
                    storeOp: 'store'
                }]
            })
            pass.setPipeline(pipeline)
            pass.draw(3)
            pass.end()
            device.queue.submit([encoder.finish()])
        })
    }, [])

    return (
    <>
        <p>Canvas</p>
        <canvas ref={canvasref}></canvas>
    </>
    )
}