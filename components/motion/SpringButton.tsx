import React from 'react';
import { Pressable, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { springConfigs } from './useSpring';

export interface SpringButtonProps extends Omit<PressableProps, 'children' | 'style'> {
  children: React.ReactNode;
  /** scale while pressed */
  pressScale?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * Pressable that compresses on press-in and springs back on release —
 * the physical "weight" behind every primary action.
 */
export function SpringButton({ children, pressScale = 0.96, style, disabled, ...rest }: SpringButtonProps) {
  const reduced = useReducedMotion();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: disabled ? 0.5 : 1,
  }));

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPressIn={() => {
        scale.value = reduced ? 1 : withSpring(pressScale, springConfigs.responsive);
      }}
      onPressOut={() => {
        scale.value = reduced ? 1 : withSpring(1, springConfigs.responsive);
      }}
      {...rest}
    >
      <Animated.View style={[animatedStyle, style]}>{children}</Animated.View>
    </Pressable>
  );
}
