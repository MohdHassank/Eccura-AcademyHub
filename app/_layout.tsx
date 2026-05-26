import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '../hooks/use-color-scheme'; // Fixed path layout if needed

// Standard enterprise initialization routing configuration
export const unstable_settings = {
  // Pehle hamesha main root index (Landing Page) hi initialize hoga
  initialRouteName: 'index', 
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        
        {/* 1. WELCOME/LANDING FLOW GATEWAY */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
        
        {/* 2. AUTHENTICATION SUBSYSTEM SCREENS */}
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        
        {/* 3. PROTECTED MAIN DASHBOARD AREA */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        
        {/* 4. UTILITY MODALS (If any) */}
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}