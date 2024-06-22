import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'

import "@overreact/engine/styles.css";
import { Engine } from '@overreact/engine';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Engine>
      <App />
    </Engine>
  </React.StrictMode>,
)
