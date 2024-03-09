import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.overreact.beepboop',
  appName: 'Beep Boop',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
