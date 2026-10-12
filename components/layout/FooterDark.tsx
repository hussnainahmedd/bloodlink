import { Link } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { classic, fonts } from '../../styles/theme';
import { Container } from './Container';

const NAVY = '#1B2A4A';

const usefulLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/' },
  { label: 'Contact Us', href: '/' },
  { label: 'Features', href: '/' },
  { label: 'Sign In', href: '/(auth)/login' },
  { label: 'Sign Up', href: '/(auth)/signup' },
] as const;

/**
 * Dark navy footer used on the auth pages — matches the original
 * bloodlink.vercel.app login/register design.
 */
export function FooterDark() {
  return (
    <View style={{ backgroundColor: NAVY }}>
      <Container className="py-12">
        <View className="flex-col md:flex-row gap-10 md:justify-between">
          <View style={{ maxWidth: 320 }}>
            <Text style={{ fontFamily: fonts.serifBold, fontSize: 26 }}>
              <Text style={{ color: classic.red }}>Blood</Text>
              <Text style={{ color: '#FFFFFF' }}>Link</Text>
            </Text>
            <Text style={{ fontFamily: fonts.sans, fontSize: 13, color: '#B0BECF', marginTop: 10 }}>
              BloodLink — A bridge between blood seekers and donors.
            </Text>
            <View className="flex-row gap-2 mt-4">
              {['f', 'ig', 'r', 't', 'yt'].map((s) => (
                <View
                  key={s}
                  style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Text style={{ fontFamily: fonts.sansBold, fontSize: 12, color: '#FFFFFF' }}>{s}</Text>
                </View>
              ))}
            </View>
          </View>

          <View>
            <Text style={{ fontFamily: fonts.sansSemiBold, fontSize: 14, color: '#FFFFFF', marginBottom: 12 }}>
              Contact
            </Text>
            <Text style={{ fontFamily: fonts.sans, fontSize: 13, color: '#B0BECF' }}>hello@bloodlink.com</Text>
            <Text style={{ fontFamily: fonts.sans, fontSize: 13, color: '#B0BECF', marginTop: 6 }}>+92 300 0000000</Text>
            <Text style={{ fontFamily: fonts.sans, fontSize: 13, color: '#B0BECF', marginTop: 6 }}>
              Address: F8, Islamabad, Pakistan
            </Text>
          </View>

          <View>
            <Text style={{ fontFamily: fonts.sansSemiBold, fontSize: 14, color: '#FFFFFF', marginBottom: 12 }}>
              Useful Links
            </Text>
            <View className="gap-2">
              {usefulLinks.map((l) => (
                <Link key={l.label} href={l.href as never} asChild>
                  <Pressable accessibilityRole="link">
                    <Text style={{ fontFamily: fonts.sans, fontSize: 13, color: '#B0BECF' }}>{l.label}</Text>
                  </Pressable>
                </Link>
              ))}
            </View>
          </View>
        </View>

        <View style={{ borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.12)', marginTop: 32, paddingTop: 16 }}>
          <Text style={{ fontFamily: fonts.sans, fontSize: 12, color: '#8A99B5', textAlign: 'center' }}>
            © {new Date().getFullYear()} Copyright | BloodLink — All rights reserved.
          </Text>
        </View>
      </Container>
    </View>
  );
}
