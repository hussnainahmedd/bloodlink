import React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { useAppear } from './useSpring';

export interface PageTransitionProps {
  children: React.ReactNode;
  /** stagger delay in ms */
  delayMs?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * Screen/section entrance: fade + slight rise on a gentle spring.
 * Under reduced motion content appears instantly.
 */
export function PageTransition({ children, delayMs = 0, style }: PageTransitionProps) {
  const animatedStyle = useAppear({ delayMs });
  return <Animated.View style={[animatedStyle, style]}>{children}</Animated.View>;
}
