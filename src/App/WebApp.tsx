// Copyright 2022 Michelangelo Webb. All rights reserved.

import { useEffect, useRef } from "react"
import rotPoly from "../tutorial/four/rotPoly"

const WebApp = () => {

    const canvasref = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        rotPoly({canvas: canvasref.current!}).then( device => {
            console.log('rotPoly run', device)
        })
    }, [])

    return (
        <>
            <h6>WebGPU Tutorial / Examples</h6>
            <canvas ref={canvasref} />
        </>
    )
}

export default WebApp