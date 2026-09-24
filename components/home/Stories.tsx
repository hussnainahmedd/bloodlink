import { Link } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { stories } from '../../lib/demo';
import { fonts, textStyles } from '../../styles/theme';
import { useAppear } from '../motion';
import { Card } from '../ui/Card';

/**
 * Donor/recipient stories teaser — respectful, editorial, human.
 */
export function Stories() {
  const style = useAppear({ delayMs: 100 });

  return (
    <View className="bg-paperDeep border-y border-hairline">
      <Animated.View style={style} className="max-w-6xl w-full mx-auto px-4 md:px-8 py-20 md:py-28">
        <Text style={textStyles.eyebrow} className="text-crimson">COMMUNITY</Text>
        <Text style={textStyles.display} className="text-ink mt-4 max-w-xl">
          Real moments from the donor network.
        </Text>

        <View className="mt-12 flex-col md:flex-row gap-4">
          {stories.map((s) => (
            <Link key={s.id} href={`/stories/${s.id}`} asChild>
              <Pressable accessibilityRole="link" className="flex-1">
                <Card padding="md" className="h-full">
                  <Text style={textStyles.eyebrow} className="text-muted">
                    {s.role.toUpperCase()} — {s.date.toUpperCase()}
                  </Text>
                  <Text
                    className="text-ink mt-3 text-[24px] leading-[30px]"
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
                </Card>
              </Pressable>
            </Link>
          ))}
        </View>

        <Text style={textStyles.caption} className="text-muted mt-8">
          Names shortened for privacy. Stories are illustrative demo content.
        </Text>
      </Animated.View>
    </View>
  );
}
