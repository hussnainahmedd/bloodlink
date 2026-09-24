import { Link } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { fonts, textStyles } from '../../styles/theme';
import { Magnetic, SpringButton, useAppear } from '../motion';
import { Button } from '../ui/Button';

/**
 * Closing maroon band: one clear ask, one crimson button.
 */
export function CTA() {
  const style = useAppear({ delayMs: 100 });

  return (
    <View className="bg-maroon">
      <Animated.View style={style} className="max-w-6xl w-full mx-auto px-4 md:px-8 py-20 md:py-28 items-center">
        <Text style={textStyles.eyebrow} className="text-crimson text-center">
          JOIN THE NETWORK
        </Text>
        <Text style={textStyles.display} className="text-paperOnDark text-center mt-4 max-w-2xl">
          Someone near you will need blood this week. Be ready.
        </Text>
        <Text style={textStyles.body} className="text-mutedOnDark text-center mt-4 max-w-xl">
          Register once as a donor. When a matching emergency is posted
          nearby, you'll be among the first to know.
        </Text>
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
    </View>
  );
}
