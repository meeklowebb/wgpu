// Copyright 2022 Michelangelo Webb. All rights reserved.

import React from 'react'
import ReactDOM from 'react-dom/client'
import WebApp from './WebApp'

ReactDOM.createRoot(document.getElementById('meeklo') as HTMLElement).render(
  <React.StrictMode>
    <WebApp />
  </React.StrictMode>
)
