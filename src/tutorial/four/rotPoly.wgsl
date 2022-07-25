struct Output {
    @builtin(position) Position : vec4<f32>,
    @location(0) Color : vec4<f32>
}

@vertex
fn vertex(
    @location(0) pos : vec2<f32>,
    @location(1) col : vec3<f32>
    ) -> Output {
        var out: Output;
        out.Position = vec4<f32>(pos, 0.0, 1.0);
        out.Color = vec4<f32>(col, 1.0);
    return out;
}

@fragment
fn fragment(@location(0) col: vec4<f32>) -> @location(0) vec4<f32> {
    return col;
}