import { Link } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { fonts, textStyles } from '../../styles/theme';
import { Container } from '../layout/Container';
import { Magnetic, SpringButton, useAppear } from '../motion';
import { Button } from '../ui/Button';
import { DonorNetwork } from './DonorNetwork';

/**
 * Cinematic deep-maroon hero. Fraunces headline, living donor network
 * behind it, spring-physics CTAs, frosted-glass stat chips.
 * The single most important screen.
 */
export function Hero() {
  const eyebrow = useAppear({ delayMs: 80 });
  const headline = useAppear({ delayMs: 160 });
  const sub = useAppear({ delayMs: 260 });
  const ctas = useAppear({ delayMs: 360 });
  const meta = useAppear({ delayMs: 460 });

  return (
    <View className="ambient-maroon relative overflow-hidden">
      <View className="absolute inset-0 opacity-90">
        <DonorNetwork />
      </View>

      <Container className="relative pt-24 md:pt-36 pb-20 md:pb-32">
        <Animated.View style={eyebrow}>
          <Text style={textStyles.eyebrow} className="text-crimson">
            EMERGENCY BLOOD NETWORK — PAKISTAN
          </Text>
        </Animated.View>

        <Animated.View style={headline} className="mt-6 max-w-3xl">
          <Text
            className="text-paperOnDark text-[56px] leading-[60px] md:text-[80px] md:leading-[84px] text-balance"
            style={{ fontFamily: fonts.displaySemiBold, letterSpacing: -1.6 }}
          >
            Blood, when{'\n'}seconds matter.
          </Text>
        </Animated.View>

        <Animated.View style={sub} className="mt-6 max-w-xl">
          <Text style={textStyles.body} className="text-mutedOnDark">
            BloodLink's AI finds compatible blood donors near you within
            minutes — and alerts them instantly when every second counts.
          </Text>
        </Animated.View>

        <Animated.View style={ctas} className="mt-10 flex-col sm:flex-row gap-4">
          <Magnetic strength={6}>
            <SpringButton>
              <Link href="/requests/new" asChild>
                <Button title="Request Blood Now" size="lg" />
              </Link>
            </SpringButton>
          </Magnetic>
          <SpringButton>
            <Link href="/(auth)/signup" asChild>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Become a Donor"
                className="glass-dark rounded-lg px-8 py-4 items-center justify-center"
              >
                <Text style={{ fontFamily: fonts.sansSemiBold, fontSize: 20 }} className="text-paperOnDark">
                  Become a Donor
                </Text>
              </Pressable>
            </Link>
          </SpringButton>
        </Animated.View>

        <Animated.View style={meta} className="mt-12 flex-row gap-4">
          <View className="glass-dark rounded-xl px-6 py-5">
            <Text style={textStyles.stat} className="text-paperOnDark">47 min</Text>
            <Text style={textStyles.caption} className="text-mutedOnDark mt-1">MEDIAN MATCH TIME</Text>
          </View>
          <View className="glass-dark rounded-xl px-6 py-5">
            <Text style={textStyles.stat} className="text-paperOnDark">2,400+</Text>
            <Text style={textStyles.caption} className="text-mutedOnDark mt-1">REGISTERED DONORS</Text>
          </View>
        </Animated.View>
      </Container>
    </View>
  );
}
