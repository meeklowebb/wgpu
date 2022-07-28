type v2 = vec2<f32>;
type v3 = vec3<f32>;
type v4 = vec4<f32>;

struct UBO {
    model: mat4x4<f32>,
    view: mat4x4<f32>,
    proj: mat4x4<f32>,
};

struct Output {
    @builtin(position) Position: v4,
    @location(3) Color: v4,
};

@group(0) @binding(0) var<uniform> mvp: UBO;
@group(0) @binding(0) var<uniform> uv: v2;

@vertex
fn vertex(@location(0) pos: v4) -> Output {

    var scalef = 0.2;

    var out : Output;
    out.Position = (mvp.proj * mvp.view * mvp.model * pos) * scalef;
    out.Color = vec4(1.0, 0.0, 0.0, 1.0);

    return out;
}

@fragment
fn fragment(in : Output) -> @location(0) vec4<f32> {

    return in.Color;
}