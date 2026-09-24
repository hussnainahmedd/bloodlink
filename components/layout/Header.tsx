import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { fonts } from '../../styles/theme';
import { Button } from '../ui/Button';
import { MobileNav } from './MobileNav';

const links = [
  { label: 'Find donors', href: '/find-donors' },
  { label: 'How it works', href: '/how-it-works' },
  { label: 'Drives', href: '/drives' },
  { label: 'Stories', href: '/stories' },
  { label: 'Learn', href: '/learn' },
] as const;

function Logo() {
  return (
    <Link href="/" asChild>
      <Pressable accessibilityRole="link" accessibilityLabel="BloodLink home" className="flex-row items-center">
        <View className="w-3 h-3 rounded-full bg-crimson mr-2" />
        <Text style={{ fontFamily: fonts.displaySemiBold, fontSize: 20, letterSpacing: -0.01 * 20 }}>
          BloodLink
        </Text>
      </Pressable>
    </Link>
  );
}

/**
 * Top navigation. Center links on web/wide screens, hamburger + overlay
 * menu on mobile. Hairline bottom border, flat paper surface.
 */
export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <View className="bg-paper border-b border-hairline z-40">
        <View className="flex-row items-center justify-between px-4 md:px-8 h-16 max-w-6xl w-full mx-auto">
          <Logo />

          {/* web nav */}
          <View className="hidden md:flex flex-row items-center gap-8">
            {links.map((l) => (
              <Link key={l.href} href={l.href} asChild>
                <Pressable accessibilityRole="link">
                  <Text style={{ fontFamily: fonts.sansMedium, fontSize: 14 }} className="text-inkSoft">
                    {l.label}
                  </Text>
                </Pressable>
              </Link>
            ))}
          </View>

          <View className="hidden md:flex flex-row items-center gap-3">
            <Link href="/(auth)/login" asChild>
              <Pressable accessibilityRole="link">
                <Text style={{ fontFamily: fonts.sansMedium, fontSize: 14 }} className="text-ink">
                  Sign in
                </Text>
              </Pressable>
            </Link>
            <Link href="/requests/new" asChild>
              <Button title="Request Blood Now" size="sm" />
            </Link>
          </View>

          {/* mobile hamburger */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Open menu"
            onPress={() => setMenuOpen(true)}
            className="md:hidden p-2"
          >
            <View className="gap-1.5">
              <View className="w-6 h-0.5 bg-ink" />
              <View className="w-6 h-0.5 bg-ink" />
              <View className="w-4 h-0.5 bg-ink" />
            </View>
          </Pressable>
        </View>
      </View>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
