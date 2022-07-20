// Copyright 2022 Michelangelo Webb. All rights reserved.

import Canvas from "./components/Canvas"
import { useEffect, useRef, useState } from "react"
import simpleTriangle from "../examples/simpleTriangle"

export default () => {

    const [bg, setBG] = useState('#FFFFFF') // GPUCanvas Background
    const [tc, setTC] = useState('#FFFF00') // GPUWSGL Triangle Color

    const canvasref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        simpleTriangle({
            canvas: canvasref.current!,
            bg,
            tc,
        })
    }, [bg, tc])

    const onBGChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setBG(e.target.value)
    }

    const onTriangleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setTC(e.target.value)
    }

    return (
        <>
            <h1>Hola</h1>
            <input 
            type="color" 
            onChange={onTriangleColorChange}
            value={tc}
            />
            <input 
            type="color" 
            onChange={onBGChange}
            value={bg}
            />
            <Canvas canvasref={canvasref}/>
        </>
    )
}