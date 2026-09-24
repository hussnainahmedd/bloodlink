import React from 'react';
import { Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { homeStats } from '../../lib/demo';
import { textStyles } from '../../styles/theme';
import { Container } from '../layout/Container';
import { useAppear } from '../motion';

/**
 * Editorial stats band on paper. Mono tabular numbers in frosted
 * glass chips, hairline dividers, staggered entrance.
 * Clearly demo figures.
 */
export function Stats() {
  const style = useAppear({ delayMs: 120 });

  return (
    <View className="ambient-paper border-y border-hairline">
      <Container className="py-12 md:py-16">
        <Animated.View style={style} className="flex-col sm:flex-row gap-4 sm:gap-6 sm:justify-between">
          {homeStats.map((s) => (
            <View key={s.label} className="glass rounded-xl px-6 py-5 flex-1">
              <Text style={textStyles.stat} className="text-ink">{s.value}</Text>
              <Text style={textStyles.caption} className="text-muted uppercase tracking-widest mt-1">
                {s.label}
              </Text>
            </View>
          ))}
        </Animated.View>
        <Text style={textStyles.caption} className="text-muted text-center pt-8">
          Illustrative demo figures — not real statistics.
        </Text>
      </Container>
    </View>
  );
}
