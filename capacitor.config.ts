
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.abcc0b4711fb4fc9bea368b38af6d94e',
  appName: 'خانه کتاب',
  webDir: 'dist',
  server: {
    url: 'https://abcc0b47-11fb-4fc9-bea3-68b38af6d94e.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#ed7441",
      showSpinner: false
    }
  }
};

export default config;
