import { useEffect } from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
  type WithSpringConfig,
} from 'react-native-reanimated';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * The only spring configs in the product. No arbitrary ease curves —
 * every animation in BloodLink uses one of these three.
 */
export const springConfigs = {
  /** Calm entrances, card settles, magnetic return. */
  gentle: { damping: 24, stiffness: 160, mass: 1 },
  /** Press feedback, quick UI responses. */
  responsive: { damping: 20, stiffness: 300, mass: 0.9 },
  /** Playful accents — badges, celebratory moments. */
  bouncy: { damping: 13, stiffness: 240, mass: 1 },
} satisfies Record<string, WithSpringConfig>;

export type SpringName = keyof typeof springConfigs;

export interface AppearOptions {
  /** stagger delay in ms */
  delayMs?: number;
  /** vertical distance in px to rise from */
  risePx?: number;
}

/**
 * Mount entrance: fades in while rising slightly, on a gentle spring.
 * Under reduced motion the content renders in its resting state with
 * no animation at all.
 */
export function useAppear({ delayMs = 0, risePx = 14 }: AppearOptions = {}) {
  const reduced = useReducedMotion();
  const opacity = useSharedValue(reduced ? 1 : 0);
  const rise = useSharedValue(reduced ? 0 : risePx);

  useEffect(() => {
    if (reduced) return;
    opacity.value = withDelay(delayMs, withTiming(1, { duration: 360 }));
    rise.value = withDelay(delayMs, withSpring(0, springConfigs.gentle));
  }, [delayMs, reduced, opacity, rise]);

  return useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: rise.value }],
  }));
}
