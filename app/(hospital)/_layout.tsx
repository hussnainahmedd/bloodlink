import { Stack } from 'expo-router';

/**
 * Hospital group layout — headerless stack; each screen renders
 * its own editorial chrome (Header / Footer) inside.
 */
export default function HospitalLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
