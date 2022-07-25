struct Output {
    @builtin(position) Position : vec4<f32>,
    @location(0) Color : vec4<f32>
}

struct MVP {
    model: mat4x4<f32>,
    view: mat4x4<f32>,
    projection: mat4x4<f32>
};

@binding(0) @group(0) var<uniform> UBO: MVP;

@vertex
fn vertex(
    @location(0) pos : vec3<f32>,
    @location(1) col : vec3<f32>
    ) -> Output {
        var out: Output;
        out.Position = UBO.projection * UBO.view *  UBO.model * vec4<f32>(pos, 1.0);
        out.Color = vec4<f32>(col, 1.0);
    return out;
}

@fragment
fn fragment(@location(0) col: vec4<f32>) -> @location(0) vec4<f32> {
    return col;
}