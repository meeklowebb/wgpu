// Copyright 2022 Michelangelo Webb. All rights reserved.

import { useEffect, useRef } from "react"
import rotPoly from "../tutorial/five/rotPoly"

const WebApp = () => {

    const canvasref = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        rotPoly({canvas: canvasref.current!})
        .catch( e => {console.log(e)})
    })

    return (
        <>
            <h6>WebGPU Tutorial / Examples</h6>
            <canvas ref={canvasref} />
        </>
    )
}

export default WebApp