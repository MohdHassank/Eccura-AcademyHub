import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import 'react-native-reanimated';
import { useColorScheme } from '../hooks/use-color-scheme';

export const unstable_settings = {
  initialRouteName: 'landing', 
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const segments = useSegments();
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCheckingAuth(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isCheckingAuth) return;

    const inTabsGroup = segments[0] === '(tabs)';

    // Agar direct tabs khul raha ho fresh start par, toh landing par bhej do
    // if (inTabsGroup && segments.length === 1) {
    //   router.replace('/landing');
    // }
  }, [segments, isCheckingAuth]);

  if (isCheckingAuth) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FAFBFD' }}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="landing" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}