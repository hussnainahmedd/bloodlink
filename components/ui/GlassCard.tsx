import React from 'react';
import { View } from 'react-native';

export interface GlassCardProps {
  children: React.ReactNode;
  /** frosted light glass (default) or deep glass for dark sections */
  tone?: 'light' | 'dark';
  className?: string;
}

/**
 * Frosted-glass card. On paper it floats over the ambient wash;
 * on maroon it deepens the surface. Hairline-bright edge included.
 */
export function GlassCard({ children, tone = 'light', className = '' }: GlassCardProps) {
  return (
    <View className={`${tone === 'light' ? 'glass' : 'glass-dark'} rounded-xl p-6 md:p-8 ${className}`}>
      {children}
    </View>
  );
}
