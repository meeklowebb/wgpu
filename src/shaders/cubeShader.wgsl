@group(0) @binding(1) var<uniform> mvp : mat4x4<f32>;
@group(0) @binding(0) var<uniform> color : vec4<f32>;

@vertex
fn vertex(@location(0) position : vec4<f32>) -> @builtin(position) vec4<f32> {
    return mvp * position;
}

@fragment
fn fragment() -> @location(0) vec4<f32> {
    return color;
}
