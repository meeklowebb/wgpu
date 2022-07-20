// Copyright 2022 Michelangelo Webb. All rights reserved.

import { RefObject, useEffect } from "react"

const Canvas =  (props: {canvasref: RefObject<HTMLCanvasElement>}) => {

    useEffect(() => {
        const canvas: HTMLCanvasElement = props.canvasref.current!
        canvas.width = innerWidth
        canvas.height = innerHeight
        canvas.style.background = 'gray'
    });

    return <canvas ref={props.canvasref} />
}

export default Canvas