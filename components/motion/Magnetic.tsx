import React from 'react';
import { Platform, type StyleProp, type ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { springConfigs } from './useSpring';

export interface MagneticProps {
  children: React.ReactNode;
  /** max pull in px toward the cursor */
  strength?: number;
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
 * Primary CTAs drift slightly toward the cursor (web only) and spring
 * back when it leaves. On native there is no cursor, so this renders
 * children untouched. Fully inert under reduced motion.
 */
export function Magnetic({ children, strength = 8, style }: MagneticProps) {
  const reduced = useReducedMotion();
  const x = useSharedValue(0);
  const y = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }, { translateY: y.value }],
  }));

  const settle = () => {
    x.value = withSpring(0, springConfigs.gentle);
    y.value = withSpring(0, springConfigs.gentle);
  };

  const handleMove = (e: WebPointerEvent) => {
    if (reduced || Platform.OS !== 'web') return;
    const rect = e.currentTarget?.getBoundingClientRect?.();
    if (!rect || rect.width === 0) return;
    const clientX = e.clientX ?? e.nativeEvent?.clientX;
    const clientY = e.clientY ?? e.nativeEvent?.clientY;
    if (clientX === undefined || clientY === undefined) return;
    const dx = (clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const dy = (clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    const clamp = (v: number) => Math.max(-1, Math.min(1, v));
    x.value = withSpring(clamp(dx) * strength, springConfigs.gentle);
    y.value = withSpring(clamp(dy) * strength, springConfigs.gentle);
  };

  const webHandlers =
    Platform.OS === 'web'
      ? {
          onMouseMove: handleMove,
          onMouseLeave: settle,
        }
      : {};

  return (
    <Animated.View style={[animatedStyle, style]} {...(webHandlers as object)}>
      {children}
    </Animated.View>
  );
}
