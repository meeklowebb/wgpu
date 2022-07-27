// Copyright 2022 Michelangelo Webb. All rights reserved.

import { useEffect, useRef } from "react"
import main from "../orillusion/vertexSquare/"

const WebApp = () => {

    const canvasref = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        canvasref.current!.width = 600
        canvasref.current!.height = 600
        main(canvasref.current!)
        .catch(e => console.log(e))
    })

    return (
        <>
            <h6>WebGPU Tutorial / Examples</h6>
            <canvas ref={canvasref} />
        </>
    )
}

export default WebApp