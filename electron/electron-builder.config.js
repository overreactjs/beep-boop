const isDemo = process.env.NODE_ENV === 'demo';

module.exports = {
  "appId": "com.overreact.beepboop",
  "productName": "Beep Boop",
  "directories": {
    "buildResources": "resources",
    "output": isDemo ? "dist-demo" : "dist-full",
  },
  "files": [
    "assets/**/*",
    "build/**/*",
    "capacitor.config.*",
    "app/**/*"
  ],
  "nsis": {
    "allowElevation": true,
    "oneClick": false,
    "allowToChangeInstallationDirectory": true
  },
  "win": {
    "target": "nsis",
    "icon": "assets/appIcon.ico"
  },
  "mac": {
    "category": "public.app-category.games",
    "icon": "assets/appIcon.png"
  },
  "dmg": {
    "icon": "assets/appIcon.png",
    "iconSize": 75,
    "window": {
      "width": 544,
      "height": 408
    },
    "contents": [
      {
        "x": 450,
        "y": 280
      },
      {
        "x": 450,
        "y": 170,
        "type": "link",
        "path": "/Applications"
      }
    ]
  }
};
