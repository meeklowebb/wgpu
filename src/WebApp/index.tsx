// Copyright 2022 Michelangelo Webb. All rights reserved.

import { useEffect } from "react"
import vertexColoredTriangle from "../examples/vertexColoredTriangel"

const VertexColoredTriangle = () => {

    useEffect(() => {
        (async () => {
            await vertexColoredTriangle()
        })()
    }, [])

    return (
        <>
            <h1>Hello Triangle</h1>
        </>
    )
}

export default () => {
    return (
        <>
            <VertexColoredTriangle />
        </>
    )
}