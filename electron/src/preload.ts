import { contextBridge, ipcRenderer } from 'electron';
require('./rt/electron-rt');

//////////////////////////////
// User Defined Preload scripts below
console.log('User Preload!');

// The context bridge provides access to node.js specific functionality, such as being able to
// quit the game, and change the window mode.
contextBridge.exposeInMainWorld('engine', {
  quit: () => {
    return ipcRenderer.invoke('quit');
  },
  getWindowMode: () => {
    return ipcRenderer.invoke('getWindowMode');
  },
  setWindowMode: (mode: string) => {
    return ipcRenderer.invoke('setWindowMode', mode);
  },
});
