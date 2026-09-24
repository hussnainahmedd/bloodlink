import '../styles/global.css';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useAppFonts } from '../styles/fonts';
import { colors } from '../styles/theme';

SplashScreen.preventAutoHideAsync().catch(() => {
  /* splash screen is best-effort — never block the app on it */
});

export default function RootLayout() {
  const [fontsLoaded, fontError] = useAppFonts();

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded, fontError]);

  // Hold the splash screen until fonts are ready (or failed — the
  // system font fallback keeps the app usable either way).
  if (!fontsLoaded && !fontError) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.paper }}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.paper },
          animation: 'fade',
        }}
      />
    </GestureHandlerRootView>
  );
}
