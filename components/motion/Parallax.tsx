import React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  type SharedValue,
} from 'react-native-reanimated';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface ParallaxProps {
  /** shared scroll offset (px) from the parent scroll view */
  scrollY: SharedValue<number>;
  /** fraction of the scroll offset applied — keep small (0.05–0.2) */
  depth?: number;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Scroll-linked parallax layer. The parent owns a `scrollY` shared value
 * fed by an animated scroll handler, e.g.:
 *
 *   const scrollY = useSharedValue(0);
 *   const onScroll = useAnimatedScrollHandler({
 *     onScroll: (e) => { scrollY.value = e.contentOffset.y; },
 *   });
 *   <Animated.ScrollView onScroll={onScroll} scrollEventThrottle={16}>
 *     <Parallax scrollY={scrollY} depth={0.12}>…</Parallax>
 *   </Animated.ScrollView>
 *
 * Depth collapses to 0 under reduced motion.
 */
export function Parallax({ scrollY, depth = 0.12, children, style }: ParallaxProps) {
  const reduced = useReducedMotion();
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: reduced ? 0 : scrollY.value * depth }],
  }));
  return <Animated.View style={[animatedStyle, style]}>{children}</Animated.View>;
}
