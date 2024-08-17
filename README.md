# Beep Boop

_Beep Boop_ is a video game that lifts heavily from the original Bubble Bobble arcade game. It's built using the [overreact.js](overreactjs.github.io) game engine, and it runs on PC, Mac, and Linux, using Electron to bundle it as native apps.

![Screenshot](screenshot.png)

## Run in browser

First, install all dependencies:

```
npm i
```

Next, run the vite server and process tailwind styles:

```
# full game
npm run dev:full

# demo
npm run dev:demo
```

Open `http://localhost:5173` in a browser.

## Build (Electron)

To build the game ready for an Electron (macOS and Windows) build, run one of the following commands:

```
# full game
npm run electron:sync:full

# demo
npm run electron:sync:demo
```

Next, inside of the `electron` directory:

```
npm run pack:all
```

This will package up the current build (either the demo or the full game) as macOS and Windows binaries.

