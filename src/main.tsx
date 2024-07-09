import React from 'react'
import ReactDOM from 'react-dom/client'
import { Engine } from '@overreact/engine';

import { App } from './App.tsx'
import { AudioEngine } from './components';

import "@overreact/engine/styles.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Engine>
      <AudioEngine>
        <App />
      </AudioEngine>
    </Engine>
  </React.StrictMode>,
)
