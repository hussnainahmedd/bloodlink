import React from 'react';
import { Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { homeStats } from '../../lib/demo';
import { textStyles } from '../../styles/theme';
import { useAppear } from '../motion';

/**
 * Editorial stats band on paper. Mono tabular numbers, hairline
 * dividers, staggered entrances. Clearly demo figures.
 */
export function Stats() {
  const style = useAppear({ delayMs: 120 });

  return (
    <View className="bg-paper border-y border-hairline">
      <Animated.View style={style} className="max-w-6xl w-full mx-auto px-4 md:px-8 py-12 flex-col sm:flex-row gap-8 sm:gap-0 sm:justify-between">
        {homeStats.map((s, i) => (
          <View key={s.label} className="flex-row sm:flex-col items-baseline sm:items-start gap-3 sm:gap-1">
            <Text style={textStyles.stat} className="text-ink">{s.value}</Text>
            <Text style={textStyles.caption} className="text-muted uppercase tracking-widest">{s.label}</Text>
            {i < homeStats.length - 1 ? <View className="hidden sm:block w-px self-stretch bg-hairline mx-8" /> : null}
          </View>
        ))}
      </Animated.View>
      <Text style={textStyles.caption} className="text-muted text-center pb-6 px-4">
        Illustrative demo figures — not real statistics.
      </Text>
    </View>
  );
}
