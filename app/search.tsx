import { Redirect } from 'expo-router';
import React from 'react';

/** Legacy alias — the original site browsed donors at /search. */
export default function SearchAlias() {
  return <Redirect href="/find-donors" />;
}
