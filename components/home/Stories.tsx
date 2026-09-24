import { Link } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { stories } from '../../lib/demo';
import { fonts, textStyles } from '../../styles/theme';
import { Container } from '../layout/Container';
import { SectionHeader } from '../layout/SectionHeader';
import { useAppear } from '../motion';

/**
 * Donor/recipient stories teaser — respectful, editorial, human.
 * Frosted cards over a soft paper wash.
 */
export function Stories() {
  const style = useAppear({ delayMs: 100 });

  return (
    <View className="ambient-paper border-y border-hairline">
      <Container className="py-20 md:py-28">
        <Animated.View style={style}>
          <SectionHeader
            eyebrow="COMMUNITY"
            title="Real moments from the donor network."
          />

          <View className="mt-12 flex-col md:flex-row gap-4">
            {stories.map((s) => (
              <Link key={s.id} href={`/stories/${s.id}`} asChild>
                <Pressable accessibilityRole="link" className="flex-1">
                  <View className="glass rounded-xl p-6 md:p-7 h-full">
                    <Text style={textStyles.eyebrow} className="text-muted">
                      {s.role.toUpperCase()} — {s.date.toUpperCase()}
                    </Text>
                    <Text
                      className="text-ink mt-3 text-[24px] leading-[30px] text-balance"
                      style={{ fontFamily: fonts.displaySemiBold, letterSpacing: -0.24 }}
                    >
                      {s.title}
                    </Text>
                    <Text style={textStyles.bodySmall} className="text-inkSoft mt-3">
                      {s.excerpt}
                    </Text>
                    <Text style={{ fontFamily: fonts.sansSemiBold, fontSize: 14 }} className="text-crimson mt-4">
                      Read story →
                    </Text>
                  </View>
                </Pressable>
              </Link>
            ))}
          </View>

          <Text style={textStyles.caption} className="text-muted mt-8">
            Names shortened for privacy. Stories are illustrative demo content.
          </Text>
        </Animated.View>
      </Container>
    </View>
  );
}
