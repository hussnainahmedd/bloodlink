import React, { useEffect } from 'react';
import { View, type DimensionValue } from 'react-native';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { radii } from '../../styles/theme';

export interface SkeletonProps {
  width?: DimensionValue;
  height?: DimensionValue;
  radius?: number;
}

/**
 * Content placeholder. Pulses opacity gently (no shimmer gradients —
 * those read as cheap). Static at 60% when reduced motion is on.
 */
export function Skeleton({ width = '100%', height = 16, radius = radii.sm }: SkeletonProps) {
  const reduced = useReducedMotion();
  const opacity = useSharedValue(0.6);

  useEffect(() => {
    if (reduced) {
      opacity.value = 0.6;
      return;
    }
    opacity.value = withRepeat(withTiming(1, { duration: 900 }), -1, true);
    return () => cancelAnimation(opacity);
  }, [reduced, opacity]);

  const style = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return <Animated.View className="bg-skeleton" style={[{ width, height, borderRadius: radius }, style]} />;
}
