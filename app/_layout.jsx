// app/_layout.js
import { Stack } from 'expo-router';
import { AppProvider } from '../app/context/AppContext';

export default function Layout() {
  return (
    <AppProvider>
      <Stack
        screenOptions={{
          headerShown: false, // ✅ hides the header globally
        }}
      />
    </AppProvider>
  );
}
