struct Fragment {
    @builtin(position) Position : vec4<f32>,
    @location(0) Color : vec4<f32>
};

@vertex
fn vertex(@builtin(vertex_index) index: u32) -> Fragment {

    var pos = array<vec2<f32>, 3> (
        vec2<f32>( 0.0,  0.5),
        vec2<f32>(-0.5, -0.5),
        vec2<f32>( 0.0, -0.5),
    )

    var col = array<vec2<f32>, 3> (
        vec2<f32>( 0.0, 0.0, 0.0),
        vec2<f32>( 0.0, 0.0, 0.0),
        vec2<f32>( 0.0, 0.0, 0.0),
    );

    var output : Fragment;
    output.Position = vec4<f32>(pos[index], 0.0, 1.0);
    output.Color = vec4<f32>(col[index], 1.0);

    return output;
}

@Fragment
fn fragment(@location(0) Color: vec4<f32>) -> @location(0) vec4<f32> {
    return Color;
}