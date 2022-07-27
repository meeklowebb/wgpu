struct Out {
    @builtin(position) Position: vec4<f32>,
    @location(0) Color: vec4<f32>
}

@vertex
fn vertex(@builtin(vertex_index) index : u32) -> Out {

    var out: Out;
    var xyz : array<vec3<f32>, 3> = array<vec3<f32>, 3>(
        vec3<f32>(0.0, 0.5, 0.0),
        vec3<f32>(-0.5, -0.5, 0.0),
        vec3<f32>(0.5, -0.5, 0.0),
    );
    var rgb : array<vec3<f32>, 3> = array<vec3<f32>, 3>(
        vec3<f32>(1.0, 0.0, 0.0),
        vec3<f32>(0.0, 1.0, 0.0),
        vec3<f32>(0.0, 0.0, 1.0),
    );

    out.Position = vec4<f32>(xyz[index], 1.0);
    out.Color = vec4<f32>(rgb[index], 1.0);

    return out;
}

@fragment
fn fragment (@location(0) color : vec4<f32>) -> @location(0) vec4<f32>{
    return color;
}