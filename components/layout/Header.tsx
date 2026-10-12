import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Platform, Pressable, Text, View } from 'react-native';
import { classic, fonts } from '../../styles/theme';
import { Container } from './Container';
import { MobileNav } from './MobileNav';

const links = [
  { label: 'Home', section: 'top' },
  { label: 'Features', section: 'features' },
  { label: 'Contact', section: 'contact' },
  { label: 'About', section: 'about' },
] as const;

function scrollToSection(section: string) {
  if (Platform.OS === 'web' && typeof document !== 'undefined') {
    if (section === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }
}

export function Logo() {
  return (
    <Link href="/" asChild>
      <Pressable accessibilityRole="link" accessibilityLabel="BloodLink home">
        <Text style={{ fontFamily: fonts.serifBold, fontSize: 30 }}>
          <Text style={{ color: classic.red }}>Blood</Text>
          <Text style={{ color: classic.ink, textDecorationLine: 'underline', textDecorationColor: classic.red }}>
            Link
          </Text>
        </Text>
      </Pressable>
    </Link>
  );
}

/**
 * Classic site header — white, sticky, serif logo, section nav + Login.
 * Matches the original bloodlink.vercel.app design.
 * On auth pages, pass authAction to swap the button (Register <-> Login).
 */
export function Header({ authAction }: { authAction?: 'login' | 'register' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const actionLabel = authAction === 'register' ? 'Register' : authAction === 'login' ? 'Login' : null;
  const actionHref = authAction === 'register' ? '/(auth)/signup' : '/(auth)/login';

  return (
    <>
      <View className="site-header-classic">
        <Container>
          <View className="flex-row items-center justify-between h-16">
            <Logo />

            {/* web nav */}
            <View className="hidden md:flex flex-row items-center gap-8">
              {links.map((l) => (
                <Pressable
                  key={l.label}
                  accessibilityRole="link"
                  onPress={() => {
                    if (l.section === 'top') {
                      router.push('/');
                      setTimeout(() => scrollToSection('top'), 50);
                    } else {
                      scrollToSection(l.section);
                    }
                  }}
                >
                  <Text style={{ fontFamily: fonts.sansMedium, fontSize: 15, color: classic.ink }}>
                    {l.label}
                  </Text>
                </Pressable>
              ))}
              {actionLabel ? (
                <Link href={actionHref as never} asChild>
                  <Pressable
                    accessibilityRole="link"
                    style={{ backgroundColor: '#5C1A1B', borderRadius: 6, paddingHorizontal: 22, paddingVertical: 9 }}
                  >
                    <Text style={{ fontFamily: fonts.sansSemiBold, fontSize: 15, color: '#FFFFFF' }}>
                      {actionLabel}
                    </Text>
                  </Pressable>
                </Link>
              ) : (
                <Link href="/(auth)/login" asChild>
                  <Pressable
                    accessibilityRole="link"
                    style={{ backgroundColor: classic.red, borderRadius: 6, paddingHorizontal: 22, paddingVertical: 9 }}
                  >
                    <Text style={{ fontFamily: fonts.sansSemiBold, fontSize: 15, color: '#FFFFFF' }}>
                      Login
                    </Text>
                  </Pressable>
                </Link>
              )}
            </View>

            {/* mobile hamburger */}
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Open menu"
              onPress={() => setMenuOpen(true)}
              className="md:hidden p-2"
            >
              <View className="gap-1.5">
                <View className="w-6 h-0.5 bg-[#212529]" />
                <View className="w-6 h-0.5 bg-[#212529]" />
                <View className="w-4 h-0.5 bg-[#212529]" />
              </View>
            </Pressable>
          </View>
        </Container>
      </View>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
