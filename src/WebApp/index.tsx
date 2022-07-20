// Copyright 2022 Michelangelo Webb. All rights reserved.

import Canvas from "./components/Canvas"
import { useRef, useState } from "react"
import simpleTriangle from "../examples/simpleTriangle"
import { initGPU } from "../utils"

export default () => {

    const [state, setState] = useState({
        render: simpleTriangle,
        initGPU,
        bg: 'red',
        triangleColor: 'blue'
    })

    const canvasref = useRef(null);

    const onBGChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        console.log(e.currentTarget.value);
        setState(state => ({
            ...state,
            bg: e.currentTarget.value
        }))
    }

    const onTriangleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        console.log(e.currentTarget.value);
        setState(state => ({
            ...state,
            triangleColor: e.currentTarget.value
        }))
    }

    return (
        <>
            <h1>Hola</h1>
            <input type="color"  onChange={onTriangleColorChange}/>
            <input type="color" onChange={onBGChange}/>
            <Canvas {...state} canvasref={canvasref}/>
        </>
    )
}