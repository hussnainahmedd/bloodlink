import { Redirect } from 'expo-router';
import React from 'react';

/** Legacy alias — the original site used /register. */
export default function RegisterAlias() {
  return <Redirect href="/(auth)/signup" />;
}
