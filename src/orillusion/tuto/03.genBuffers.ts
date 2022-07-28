declare interface GenInstanceIn {
    
}
declare interface GenInstanceOut {
    
}

const genInstance = async ({} : GenInstanceIn) : Promise<GenInstanceOut> => {

    let adapter = (await navigator.gpu.requestAdapter({
        powerPreference: 'high-performance',
        forceFallbackAdapter: false,
    }))!

    let device = (await adapter.requestDevice())!

    let adapterInfo = {
        adapter: adapter.requestAdapterInfo(),
        features: adapter.features,
        limits: adapter.limits,
    }

    console.log(JSON.stringify(adapterInfo));
    

    return { }
}

export default genInstance