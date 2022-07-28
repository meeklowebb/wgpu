// Copyright 2022 Michelangelo Webb. All rights reserved.

import { useEffect, useRef } from "react"
import main from '../orillusion/vxcube/05.vxCubeMain'

const WebApp = () => {

    const canvasref = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        main(canvasref.current!)
        .catch(console.log)
    })

    return (
        <>
            <h4>WebGPU Examples</h4>
            <canvas ref={canvasref} />
        </>
    )
}

export default WebApp