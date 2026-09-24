import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { colors, fonts, textStyles } from '../../styles/theme';

export type ProgressTone = 'crimson' | 'ink' | 'leaf';

export interface ProgressProps {
  /** 0 to 1 */
  value: number;
  tone?: ProgressTone;
  showPercent?: boolean;
  accessibilityLabel?: string;
}

const toneClass: Record<ProgressTone, string> = {
  crimson: 'bg-crimson',
  ink: 'bg-ink',
  leaf: 'bg-leaf',
};

/**
 * Hairline-track progress bar. Fill animates with a short timing curve
 * (never a spring — progress should feel measured, not bouncy).
 */
export function Progress({ value, tone = 'crimson', showPercent = false, accessibilityLabel }: ProgressProps) {
  const reduced = useReducedMotion();
  const clamped = Math.min(1, Math.max(0, value));
  const width = useSharedValue(clamped * 100);

  useEffect(() => {
    width.value = reduced ? clamped * 100 : withTiming(clamped * 100, { duration: 350 });
  }, [clamped, reduced, width]);

  const fillStyle = useAnimatedStyle(() => ({ width: `${width.value}%` }));

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel}
      accessibilityValue={{ now: Math.round(clamped * 100), min: 0, max: 100 }}
      className="w-full"
    >
      <View className="h-1.5 rounded-full bg-hairline overflow-hidden">
        <Animated.View className={`h-full rounded-full ${toneClass[tone]}`} style={fillStyle} />
      </View>
      {showPercent ? (
        <Text className="mt-2 text-muted" style={textStyles.eyebrow}>
          {`${Math.round(clamped * 100)}%`}
        </Text>
      ) : null}
    </View>
  );
}

