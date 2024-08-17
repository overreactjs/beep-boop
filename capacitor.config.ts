import { CapacitorConfig } from '@capacitor/cli';

const isDemo = process.env.NODE_ENV === 'demo';

const config: CapacitorConfig = {
  appId: 'com.overreact.beepboop',
  appName: 'Beep Boop',
  webDir: isDemo ? 'dist-demo' : 'dist-full',
  server: {
    androidScheme: 'https'
  }
};

export default config;
