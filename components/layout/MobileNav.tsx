import { Link } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { fonts, textStyles } from '../../styles/theme';
import { Button } from '../ui/Button';

const links = [
  { label: 'Home', href: '/' },
  { label: 'Find donors', href: '/find-donors' },
  { label: 'Request blood', href: '/requests/new' },
  { label: 'How it works', href: '/how-it-works' },
  { label: 'Blood groups', href: '/blood-groups' },
  { label: 'Drives', href: '/drives' },
  { label: 'Stories', href: '/stories' },
  { label: 'Learn', href: '/learn' },
  { label: 'Sign in', href: '/(auth)/login' },
] as const;

export interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Full-screen maroon overlay menu for mobile. Big Fraunces links with
 * a hairline between them — calm, not flashy.
 */
export function MobileNav({ open, onClose }: MobileNavProps) {
  if (!open) return null;

  return (
    <View className="absolute inset-0 z-50 bg-maroon">
      <View className="flex-row items-center justify-between px-4 h-16">
        <View className="flex-row items-center">
          <View className="w-3 h-3 rounded-full bg-crimson mr-2" />
          <Text style={{ fontFamily: fonts.displaySemiBold, fontSize: 20 }} className="text-paperOnDark">
            BloodLink
          </Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Close menu"
          onPress={onClose}
          className="p-3"
        >
          <Text style={{ fontFamily: fonts.sansMedium, fontSize: 16 }} className="text-paperOnDark">
            ✕
          </Text>
        </Pressable>
      </View>

      <View className="px-6 pt-4">
        {links.map((l) => (
          <Link key={l.href} href={l.href} asChild>
            <Pressable accessibilityRole="link" onPress={onClose} className="py-4 border-b border-hairlineOnDark">
              <Text style={textStyles.h2} className="text-paperOnDark">
                {l.label}
              </Text>
            </Pressable>
          </Link>
        ))}
      </View>

      <View className="px-6 mt-8">
        <Link href="/requests/new" asChild>
          <Button title="Request Blood Now" size="lg" onPress={onClose} />
        </Link>
        <Text style={textStyles.caption} className="text-mutedOnDark mt-6">
          DEMO — all donors, requests and stories are fictional.
        </Text>
      </View>
    </View>
  );
}
