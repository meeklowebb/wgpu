// Copyright 2022 Michelangelo Webb. All rights reserved.

export const generateShaderColor = (color: string) => {
    const triangleVertex = `
        @vertex
        fn vertex(@builtin(vertex_index) VertexIndex: u32) -> @builtin(position) vec4<f32> {
            var pos = array<vec2<f32>, 3>(
                vec2<f32>(0.0, 0.5),
                vec2<f32>(-0.5, -0.5),
                vec2<f32>(0.5, -0.5));
            return vec4<f32>(pos[VertexIndex], 0.0, 1.0);
        }
    `
    const triangleFragment = `
        @fragment
        fn fragment() -> @location(0) vec4<f32> {
            return vec4<f32>${color};
        }
    `

    const unknownFragment = `
        @vertex
        fn vs_main(
            @builtin(vertex_index) in_vertex_index: u32,
        ) -> VertexOutput {
            var out: VertexOutput;
            let x = f32(1 - i32(in_vertex_index)) * 0.5;
            let y = f32(i32(in_vertex_index & 1u) * 2 - 1) * 0.5;
            out.clip_position = vec4<f32>(x, y, 0.0, 1.0);
            return out;
        } 
    `

    return { 
        triangleFragment,
        triangleVertex,
        unknownFragment
    }
}

// export const vertexColoredTriangle = () => {
//     return `@vertex
//     fn vertex(
//         @location(0) pos : vec3<f32>
//     ) -> @builtin(position) vec4<f32> {
//         return vec4<f32>(pos, 1.0);
//     }
    
//     @fragment
//     fn fragment() -> @location(0) vec4<f32> {
//         return vec4<f32>(0.0, 1.0, 0.0, 1.0);
//     }
//     `
// }

export const vertexColoredTriangle = () => {
    return `@vertex
    fn vertex(
        @location(0) pos : vec3<f32>
    ) -> @builtin(position) vec4<f32> {
        return vec4<f32>(pos, 1.0);
    }
    
    @group(0) @binding(0) var<uniform> color : vec4<f32>;
    @fragment
    fn fragment() -> @location(0) vec4<f32> {
        return color;
    }
    `
}