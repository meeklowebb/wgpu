struct Out {
    @builtin(position) Pos: vec4<f32>,
    @location(0) Col: vec4<f32>,
}

@vertex
fn vertex(
    @builtin(vertex_index) index: u32,
    @builtin(instance_index) in_index: u32,
) -> Out {
    var out: Out;
    var off: f32 = .0;

    var pos: array<vec3<f32>, 6> = array<vec3<f32>, 6>(
        vec3<f32>(-1. + off, -1. + off, 0.0),
        vec3<f32>( 1. + off, -1. + off, 0.0),
        vec3<f32>(-1. + off,  1. + off, 0.0),
        vec3<f32>(-1. + off,  1. + off, 0.0),
        vec3<f32>( 1. + off, -1. + off, 0.0),
        vec3<f32>( 1. + off,  1. + off, 0.0),
    );
    var col: array<vec3<f32>, 6> = array<vec3<f32>, 6>(
        vec3<f32>(1.0, 0.0, 0.0),
        vec3<f32>(0.0, 1.0, 0.0),
        vec3<f32>(0.0, 1.0, 1.0),
        vec3<f32>(0.0, 0.0, 1.0),
        vec3<f32>(0.0, 1.0, 0.0),
        vec3<f32>(1.0, 0.0, 0.0),
    );
    out.Pos = vec4<f32>(pos[index], 1.0);
    out.Col = vec4<f32>(1.0, 1.0, 0.0, 1.0);
    return out;
}

@fragment
fn fragment(
    @builtin(position) Pos: vec4<f32>,
    @location(0) Col: vec4<f32>,
) -> @location(0) vec4<f32> {

    var r: f32 = 100.0;

    if (length(Pos.xy - 300.0) > r) {
        discard;
    }

    return Col;
}