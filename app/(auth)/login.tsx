import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';
import { classic, fonts } from '../../styles/theme';
import { Container } from '../../components/layout/Container';
import { FooterDark } from '../../components/layout/FooterDark';
import { Header } from '../../components/layout/Header';
import { SEO } from '../../components/layout/SEO';

const illustration = require('../../assets/images/auth-login.jpg');
const NAVY = '#1B2A4A';
const GREEN = '#2E9E5B';

function EnvelopeIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={NAVY} strokeWidth={2}>
      <Rect x={2} y={4} width={20} height={16} rx={2} />
      <Path d="M22 7l-10 6L2 7" />
    </Svg>
  );
}

function LockIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={NAVY} strokeWidth={2}>
      <Rect x={3} y={11} width={18} height={11} rx={2} />
      <Path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </Svg>
  );
}

function Field({
  icon,
  value,
  onChangeText,
  placeholder,
  secure,
  keyboardType,
}: {
  icon: React.ReactNode;
  value: string;
  onChangeText: (t: string) => void;
  placeholder: string;
  secure?: boolean;
  keyboardType?: 'email-address' | 'default';
}) {
  return (
    <View
      className="flex-row items-center gap-3"
      style={{
        borderWidth: 1,
        borderColor: classic.hairline,
        borderRadius: 6,
        paddingHorizontal: 14,
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
      }}
    >
      {icon}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secure}
        keyboardType={keyboardType}
        autoCapitalize="none"
        style={{ flex: 1, fontFamily: fonts.sans, fontSize: 15, color: classic.ink }}
      />
    </View>
  );
}

/**
 * Login — classic BloodLink design: illustration left, form right,
 * green LOGIN button, dark navy footer. Matches the original site.
 */
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View className="flex-1 bg-white">
      <SEO title="Login" description="Login to your BloodLink account." />
      <Header authAction="register" />
      <ScrollView className="flex-1">
        <Container className="py-12 md:py-16">
          <View className="flex-col md:flex-row items-center gap-10">
            <Image
              source={illustration}
              resizeMode="cover"
              style={{ width: '100%', maxWidth: 480, height: 420, borderRadius: 12, flex: 1 }}
            />
            <View style={{ flex: 1, width: '100%', maxWidth: 420 }}>
              <Text style={{ fontFamily: fonts.serifBold, fontSize: 34, color: NAVY }}>Welcome Back!</Text>
              <Text style={{ fontFamily: fonts.sans, fontSize: 14, color: classic.muted, marginTop: 6, marginBottom: 24 }}>
                Login to continue
              </Text>

              <View className="gap-4">
                <Field
                  icon={<EnvelopeIcon />}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email Address"
                  keyboardType="email-address"
                />
                <Field
                  icon={<LockIcon />}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Password"
                  secure
                />
                <Pressable
                  accessibilityRole="button"
                  onPress={() => router.push('/(donor)/dashboard')}
                  style={{ backgroundColor: GREEN, borderRadius: 6, paddingVertical: 14, alignItems: 'center', marginTop: 4 }}
                >
                  <Text style={{ fontFamily: fonts.sansBold, fontSize: 15, color: '#FFFFFF', letterSpacing: 1 }}>
                    LOGIN
                  </Text>
                </Pressable>
                <View className="flex-row justify-center mt-2">
                  <Text style={{ fontFamily: fonts.sans, fontSize: 14, color: classic.inkSoft }}>
                    New User ?{' '}
                  </Text>
                  <Link href="/(auth)/signup" asChild>
                    <Text style={{ fontFamily: fonts.sansSemiBold, fontSize: 14, color: classic.red }}>
                      Sign Up
                    </Text>
                  </Link>
                </View>
              </View>
            </View>
          </View>
        </Container>
        <FooterDark />
      </ScrollView>
    </View>
  );
}
