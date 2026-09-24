import { Link } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { fonts, textStyles } from '../../styles/theme';
import { Container } from './Container';

const columns = [
  {
    title: 'PLATFORM',
    links: [
      { label: 'Find donors', href: '/find-donors' },
      { label: 'Request blood', href: '/requests/new' },
      { label: 'Donation drives', href: '/drives' },
      { label: 'Eligibility checker', href: '/eligibility' },
    ],
  },
  {
    title: 'LEARN',
    links: [
      { label: 'How it works', href: '/how-it-works' },
      { label: 'Blood groups', href: '/blood-groups' },
      { label: 'Knowledge hub', href: '/learn' },
      { label: 'Donor stories', href: '/stories' },
    ],
  },
  {
    title: 'COMPANY',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Help center', href: '/help' },
      { label: 'Settings', href: '/settings' },
    ],
  },
] as const;

/**
 * Deep-maroon footer with an ambient crimson wash. Editorial columns,
 * hairline separators, and an honest demo disclaimer at the bottom.
 */
export function Footer() {
  return (
    <View className="ambient-maroon">
      <Container className="py-16 md:py-20">
        <View className="flex-col md:flex-row md:justify-between gap-10">
          <View className="max-w-xs">
            <View className="flex-row items-center mb-4">
              <View className="w-3 h-3 rounded-full bg-crimson mr-2" />
              <Text style={{ fontFamily: fonts.displaySemiBold, fontSize: 22 }} className="text-paperOnDark">
                BloodLink
              </Text>
            </View>
            <Text style={textStyles.bodySmall} className="text-mutedOnDark">
              An AI-powered system that finds blood donors for emergency
              patients within minutes — by alerting the right donors instantly.
            </Text>
          </View>

          {columns.map((col) => (
            <View key={col.title}>
              <Text style={textStyles.eyebrow} className="text-mutedOnDark mb-4">
                {col.title}
              </Text>
              {col.links.map((l) => (
                <Link key={l.href} href={l.href} asChild>
                  <Pressable accessibilityRole="link" className="py-1.5">
                    <Text style={textStyles.bodySmall} className="text-paperOnDark">
                      {l.label}
                    </Text>
                  </Pressable>
                </Link>
              ))}
            </View>
          ))}
        </View>

        <View className="border-t border-hairlineOnDark mt-12 pt-6 flex-col md:flex-row md:items-center md:justify-between gap-2">
          <Text style={textStyles.caption} className="text-mutedOnDark">
            © 2026 BloodLink — showcase project. All data shown is fictional demo content.
          </Text>
          <Text style={textStyles.caption} className="text-mutedOnDark">
            Built with React Native + Expo + Firebase · $0 budget
          </Text>
        </View>
      </Container>
    </View>
  );
}
