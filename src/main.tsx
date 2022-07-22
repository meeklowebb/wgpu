// Copyright 2022 Michelangelo Webb. All rights reserved.

import React from 'react'
import ReactDOM from 'react-dom/client'
//import WebApp from './WebApp'

import vertexColoredTriangle from './examples/vertexColoredTriangel'
await vertexColoredTriangle()

ReactDOM.createRoot(document.getElementById('meeklo') as HTMLElement).render(
  <React.Fragment>
    {/* <WebApp /> */}
  </React.Fragment>
)
