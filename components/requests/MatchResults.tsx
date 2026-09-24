import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import type { Donor } from '../../lib/demo';
import { textStyles } from '../../styles/theme';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { DonorCard } from '../donors/DonorCard';
import { Card } from '../ui/Card';

export interface MatchResultsProps {
  donors: Donor[];
}

/**
 * The honest AI-matching moment: a "scanning" state that feels alive,
 * then matched donors revealed with compatibility scores.
 */
export function MatchResults({ donors }: MatchResultsProps) {
  const reduced = useReducedMotion();
  const [revealed, setRevealed] = useState(reduced);
  const progress = useSharedValue(0);

  useEffect(() => {
    if (reduced) {
      setRevealed(true);
      return;
    }
    progress.value = withTiming(1, { duration: 2200, easing: Easing.inOut(Easing.ease) });
    const t = setTimeout(() => setRevealed(true), 2400);
    return () => clearTimeout(t);
  }, [reduced, progress]);

  const bar = useAnimatedStyle(() => ({ width: `${progress.value * 100}%` }));

  if (!revealed) {
    return (
      <Card padding="lg">
        <Text style={textStyles.eyebrow} className="text-crimson">AI MATCHING</Text>
        <Text style={textStyles.h2} className="text-ink mt-3">
          Scanning nearby donors…
        </Text>
        <Text style={textStyles.bodySmall} className="text-inkSoft mt-2">
          Scoring on blood compatibility × distance × availability.
        </Text>
        <View className="h-1.5 bg-paperDeep rounded-full mt-6 overflow-hidden">
          <Animated.View style={bar} className="h-full bg-crimson rounded-full" />
        </View>
        <Text style={textStyles.caption} className="text-muted mt-3">
          Demo simulation — no real donors are contacted.
        </Text>
      </Card>
    );
  }

  return (
    <View className="gap-4">
      <View className="flex-row items-center justify-between">
        <Text style={textStyles.h2} className="text-ink">Matched donors</Text>
        <Text style={textStyles.caption} className="text-muted">{donors.length} found</Text>
      </View>
      {donors.map((d) => (
        <DonorCard key={d.id} donor={d} showScore />
      ))}
      <Text style={textStyles.caption} className="text-muted">
        Scores combine compatibility, distance, availability and past reliability. Demo data.
      </Text>
    </View>
  );
}
