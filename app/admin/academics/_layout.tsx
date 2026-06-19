import { Stack } from 'expo-router';

export default function AcademicsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="faculty" />
      <Stack.Screen name="batches" />
      <Stack.Screen name="content" />
    </Stack>
  );
}
