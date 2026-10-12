import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { classic, fonts } from '../../styles/theme';
import { Container } from './Container';
import { Logo } from './Header';

const col1 = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '/' },
  { label: 'Contact', href: '/' },
  { label: 'About', href: '/' },
] as const;

const col2 = [
  { label: 'Search Donors', href: '/find-donors' },
  { label: 'Sign In', href: '/(auth)/login' },
  { label: 'Sign Up', href: '/(auth)/signup' },
] as const;

const socials = ['f', 'ig', 'r', 't', 'yt'] as const;

function SocialRow() {
  return (
    <View className="flex-row gap-2">
      {socials.map((s) => (
        <View
          key={s}
          style={{
            width: 34,
            height: 34,
            borderRadius: 17,
            backgroundColor: classic.red,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontFamily: fonts.sansBold, fontSize: 13, color: '#FFFFFF' }}>{s}</Text>
        </View>
      ))}
    </View>
  );
}

/**
 * Classic site footer — light panel, logo, link columns, newsletter,
 * social icons, and the © line. Matches the original BloodLink design.
 */
export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  return (
    <View style={{ backgroundColor: '#DCE8F2' }}>
      <Container className="py-12">
        <View className="flex-col md:flex-row gap-10 md:justify-between">
          <View>
            <Logo />
            <Text style={{ fontFamily: fonts.sans, fontSize: 13, color: classic.ink, marginTop: 12 }}>
              © {new Date().getFullYear()} Copyright | BloodLink
            </Text>
            <Text style={{ fontFamily: fonts.sans, fontSize: 13, color: classic.ink, marginTop: 4 }}>
              All rights reserved.
            </Text>
          </View>

          <View className="flex-row gap-16">
            <View className="gap-3">
              {col1.map((l) => (
                <Link key={l.label} href={l.href} asChild>
                  <Pressable accessibilityRole="link">
                    <Text style={{ fontFamily: fonts.sans, fontSize: 14, color: classic.ink }}>{l.label}</Text>
                  </Pressable>
                </Link>
              ))}
            </View>
            <View className="gap-3">
              {col2.map((l) => (
                <Link key={l.href} href={l.href} asChild>
                  <Pressable accessibilityRole="link">
                    <Text style={{ fontFamily: fonts.sans, fontSize: 14, color: classic.ink }}>{l.label}</Text>
                  </Pressable>
                </Link>
              ))}
            </View>
          </View>

          <View>
            <SocialRow />
            <Text style={{ fontFamily: fonts.sansSemiBold, fontSize: 14, color: classic.ink, marginTop: 16, marginBottom: 8 }}>
              Sign up for our newsletter:
            </Text>
            {subscribed ? (
              <Text style={{ fontFamily: fonts.sansMedium, fontSize: 14, color: classic.red }}>
                Thanks for subscribing!
              </Text>
            ) : (
              <View className="flex-row gap-2">
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email Address"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={{
                    fontFamily: fonts.sans,
                    fontSize: 14,
                    backgroundColor: '#FFFFFF',
                    borderWidth: 1,
                    borderColor: classic.hairline,
                    borderRadius: 4,
                    paddingHorizontal: 12,
                    paddingVertical: 9,
                    minWidth: 200,
                  }}
                />
                <Pressable
                  accessibilityRole="button"
                  onPress={() => email.trim() && setSubscribed(true)}
                  style={{ backgroundColor: classic.red, borderRadius: 4, paddingHorizontal: 18, justifyContent: 'center' }}
                >
                  <Text style={{ fontFamily: fonts.sansBold, fontSize: 13, color: '#FFFFFF' }}>SUBSCRIBE</Text>
                </Pressable>
              </View>
            )}
          </View>
        </View>
      </Container>
    </View>
  );
}
