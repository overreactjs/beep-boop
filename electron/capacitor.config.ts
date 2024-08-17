import { CapacitorConfig } from '@capacitor/cli';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
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
