import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: 'Inicio de Sesión' }} />
      <Stack.Screen name="dashboard" options={{ title: 'Panel de Control' }} />
    </Stack>
  );
}
