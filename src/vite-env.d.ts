/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BUILD: 'full' | 'demo';
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
