
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.6b3fcb0394b34cae8a00117c86d5a194',
  appName: 'Hotro de Babi',
  webDir: 'dist',
  server: {
    url: 'https://6b3fcb03-94b3-4cae-8a00-117c86d5a194.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#FF6B35",
      showSpinner: false
    }
  }
};

export default config;
