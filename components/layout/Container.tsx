import React from 'react';
import { View } from 'react-native';

export interface ContainerProps {
  children: React.ReactNode;
  /** wider measure for heroes and dashboards */
  wide?: boolean;
  /** narrow measure for forms and articles */
  narrow?: boolean;
  className?: string;
}

/**
 * The one centered measure the whole site shares. Plain View (never
 * Animated) so `mx-auto` centering is bulletproof on web and native.
 */
export function Container({ children, wide, narrow, className = '' }: ContainerProps) {
  const measure = narrow ? 'max-w-3xl' : wide ? 'max-w-7xl' : 'max-w-6xl';
  return (
    <View className={`w-full ${measure} mx-auto px-5 sm:px-8 ${className}`}>{children}</View>
  );
}
