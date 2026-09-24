import { Link } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { fonts } from '../../styles/theme';
import { Container } from '../layout/Container';
import { SectionHeader } from '../layout/SectionHeader';
import { Magnetic, SpringButton, useAppear } from '../motion';
import { Button } from '../ui/Button';

/**
 * Closing maroon band: one clear ask, one crimson button,
 * frosted-glass panel floating over the ambient wash.
 */
export function CTA() {
  const style = useAppear({ delayMs: 100 });

  return (
    <View className="ambient-maroon">
      <Container className="py-20 md:py-28">
        <Animated.View style={style} className="glass-dark rounded-2xl px-6 py-12 md:p-16 items-center">
          <SectionHeader
            align="center"
            dark
            eyebrow="JOIN THE NETWORK"
            title="Someone near you will need blood this week. Be ready."
            lede="Register once as a donor. When a matching emergency is posted nearby, you'll be among the first to know."
          />
          <View className="mt-10 flex-col sm:flex-row gap-4">
            <Magnetic strength={6}>
              <SpringButton>
                <Link href="/(auth)/signup" asChild>
                  <Button title="Become a Donor" size="lg" />
                </Link>
              </SpringButton>
            </Magnetic>
            <SpringButton>
              <Link href="/eligibility" asChild>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Check Eligibility"
                  className="rounded-lg border border-hairlineOnDark px-8 py-4 items-center justify-center"
                >
                  <Text style={{ fontFamily: fonts.sansSemiBold, fontSize: 20 }} className="text-paperOnDark">
                    Check Eligibility
                  </Text>
                </Pressable>
              </Link>
            </SpringButton>
          </View>
        </Animated.View>
      </Container>
    </View>
  );
}
