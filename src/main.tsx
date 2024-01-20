import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'

import "@overreact/engine/styles.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
