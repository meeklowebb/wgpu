// Copyright 2022 Michelangelo Webb. All rights reserved.

import { useEffect } from "react"
import initWGPU from "../tutorial/one/initWGPU"

const WebApp = () => {

    useEffect(() => {
        (async () => {
            initWGPU().then(gpu => {
                console.log(gpu);
            })
        })()
    }, [])

    return (
        <>
            <h6>WebGPU Tutorial / Examples</h6>
        </>
    )
}

export default () => {
    return (
        <>
            <WebApp />
        </>
    )
}