import { Stack } from 'expo-router';

/**
 * Donor group layout — headerless stack; each screen renders
 * its own editorial chrome (Header / Footer) inside.
 */
export default function DonorLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
