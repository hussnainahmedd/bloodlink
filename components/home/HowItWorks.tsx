import { Link } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { fonts, textStyles } from '../../styles/theme';
import { Container } from '../layout/Container';
import { SectionHeader } from '../layout/SectionHeader';
import { TiltCard, useAppear } from '../motion';

const steps = [
  {
    n: '01',
    title: 'Request',
    body: 'A hospital or family posts an emergency request — blood group, units, location. Under a minute.',
  },
  {
    n: '02',
    title: 'AI Match',
    body: 'The matching engine scores nearby donors on compatibility, distance, and availability.',
  },
  {
    n: '03',
    title: 'Alert',
    body: 'The best matches get an instant push alert. No searching, no forwarded messages.',
  },
  {
    n: '04',
    title: 'Donate',
    body: 'A donor accepts, donates, and the request tracks live to fulfillment.',
  },
];

/**
 * The 4-step flow as frosted editorial cards with subtle tilt.
 */
export function HowItWorks() {
  const style = useAppear({ delayMs: 100 });

  return (
    <View className="ambient-paper">
      <Container className="py-20 md:py-28">
        <Animated.View style={style}>
          <SectionHeader
            eyebrow="HOW IT WORKS"
            title="Four steps between panic and a donor at the door."
          />

          <View className="mt-12 flex-col md:flex-row gap-4">
            {steps.map((s) => (
              <TiltCard key={s.n} style={{ flex: 1 }}>
                <View className="glass rounded-xl p-6 h-full">
                  <Text style={textStyles.eyebrow} className="text-crimson">{s.n}</Text>
                  <Text style={[textStyles.h2, { fontFamily: fonts.displaySemiBold }]} className="text-ink mt-3 text-balance">
                    {s.title}
                  </Text>
                  <Text style={textStyles.bodySmall} className="text-inkSoft mt-2">
                    {s.body}
                  </Text>
                </View>
              </TiltCard>
            ))}
          </View>

          <Link href="/how-it-works" asChild>
            <Pressable accessibilityRole="link" className="mt-8 self-start">
              <Text style={{ fontFamily: fonts.sansSemiBold, fontSize: 16 }} className="text-crimson">
                See the full breakdown →
              </Text>
            </Pressable>
          </Link>
        </Animated.View>
      </Container>
    </View>
  );
}
