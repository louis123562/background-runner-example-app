import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'planzeit.App.planzeit.GmbH',
  appName: 'test_app',
  webDir: 'www',
  plugins: {
    BackgroundRunner: {
      label: 'planzeit.App.planzeit.GmbH.Background.Runner',
      src: 'runners/background.js',
      event: 'getName',
      repeat: true,
      interval: 1,
      autoStart: true,
    }
  },
};

export default config;
