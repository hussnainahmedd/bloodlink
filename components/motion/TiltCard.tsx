import React from 'react';
import { Platform, type StyleProp, type ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { springConfigs } from './useSpring';

export interface TiltCardProps {
  children: React.ReactNode;
  /** max tilt in degrees */
  maxTilt?: number;
  style?: StyleProp<ViewStyle>;
}

interface WebPointerEvent {
  clientX?: number;
  clientY?: number;
  nativeEvent?: { clientX?: number; clientY?: number };
  currentTarget?: {
    getBoundingClientRect?: () => { left: number; top: number; width: number; height: number };
  };
}

/**
 * Cards tilt subtly toward the pointer (web only, max ~6deg) and spring
 * flat on leave. On native the card renders without tilt.
 */
export function TiltCard({ children, maxTilt = 6, style }: TiltCardProps) {
  const reduced = useReducedMotion();
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 900 },
      { rotateX: `${rotateX.value}deg` },
      { rotateY: `${rotateY.value}deg` },
    ],
  }));

  const flatten = () => {
    rotateX.value = withSpring(0, springConfigs.gentle);
    rotateY.value = withSpring(0, springConfigs.gentle);
  };

  const handleMove = (e: WebPointerEvent) => {
    if (reduced || Platform.OS !== 'web') return;
    const rect = e.currentTarget?.getBoundingClientRect?.();
    if (!rect || rect.width === 0 || rect.height === 0) return;
    const clientX = e.clientX ?? e.nativeEvent?.clientX;
    const clientY = e.clientY ?? e.nativeEvent?.clientY;
    if (clientX === undefined || clientY === undefined) return;
    const px = (clientX - rect.left) / rect.width - 0.5;
    const py = (clientY - rect.top) / rect.height - 0.5;
    rotateY.value = withSpring(px * maxTilt * 2, springConfigs.gentle);
    rotateX.value = withSpring(-py * maxTilt * 2, springConfigs.gentle);
  };

  const webHandlers =
    Platform.OS === 'web'
      ? {
          onMouseMove: handleMove,
          onMouseLeave: flatten,
        }
      : {};

  return (
    <Animated.View style={[animatedStyle, style]} {...(webHandlers as object)}>
      {children}
    </Animated.View>
  );
}
