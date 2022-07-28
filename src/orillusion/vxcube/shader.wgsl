type Cube = array<vec3<f32>, 36>;
type vf3 = vec3<f32>;

var<private> color : vec4<f32> = vec4<f32>(1.0, 1.0, 0.5, 0.0);

@vertex
fn vertex(@builtin(vertex_index) index: u32) -> @builtin(position)  vec4<f32> {

    var scalef = 0.2;

    var cb: Cube = Cube(
        vf3(-1., -1.,  1.),
        vf3( 1., -1.,  1.),  
        vf3( 1.,  1.,  1.),
        vf3( 1.,  1.,  1.),
        vf3(-1.,  1.,  1.),
        vf3(-1., -1.,  1.),
        vf3( 1., -1.,  1.),
        vf3( 1., -1., -1.),
        vf3( 1.,  1., -1.),
        vf3( 1.,  1., -1.),
        vf3( 1.,  1.,  1.),
        vf3( 1., -1.,  1.),
        vf3(-1., -1., -1.),
        vf3(-1.,  1., -1.),
        vf3( 1.,  1., -1.),
        vf3( 1.,  1., -1.),
        vf3( 1., -1., -1.),
        vf3(-1., -1., -1.),
        vf3(-1., -1.,  1.),
        vf3(-1.,  1.,  1.),
        vf3(-1.,  1., -1.),
        vf3(-1.,  1., -1.),
        vf3(-1., -1., -1.),
        vf3(-1., -1.,  1.),
        vf3(-1.,  1.,  1.),
        vf3( 1.,  1.,  1.),
        vf3( 1.,  1., -1.),
        vf3( 1.,  1., -1.),
        vf3(-1.,  1., -1.),
        vf3(-1.,  1.,  1.),
        vf3(-1., -1.,  1.),
        vf3(-1., -1., -1.),
        vf3( 1., -1., -1.),
        vf3( 1., -1., -1.),
        vf3( 1., -1.,  1.),
        vf3(-1., -1.,  1.),
    );

    return vec4<f32>(cb[index] * scalef, 1.0);
}

@fragment
fn fragment() -> @location(0) vec4<f32> {
    return color;
}