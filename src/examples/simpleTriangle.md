# Simple Trianlge

Following up on this example you can crete a function to draw a simple colored triangle on the screen, and change his color as you prefer.

You must create an `initGPU` function to get the basic setup out of `WebGPU API`.

In the next lessons you will dive deep into the concepts that revolves around GPU processing and how WebGPU handles them.

In short the process to create a triangle using GPU is as follows:

    - Create WebGPU instance.
        It includes
        - Canvas. Logical space on the screen to draw the triangle.
        - Device. Loical connection to a Graphic Card's Processor.
    - Create pipeline (It includes the vertex and fragment shader as strings).
    - Pass down the pipeline to the command queue to execute the shaders on the GPU.

> Do not forget that shaders are programs written in a different programming language that compiles to some binary code  that the GPU Chip understands.
>

Your goal on this tutorial is to draw the following on the browser:

![my screenshot](../screenshots/simple_triangle.png)