import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { fonts, textStyles } from '../../styles/theme';
import { Alert, Button, Card, Input } from '../../components/ui';
import { Footer } from '../../components/layout/Footer';
import { Header } from '../../components/layout/Header';
import { SEO } from '../../components/layout/SEO';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View className="flex-1 bg-paper">
      <SEO title="Sign in" description="Sign in to your BloodLink account." />
      <Header />
      <ScrollView className="flex-1">
        <View className="max-w-md w-full mx-auto px-4 md:px-8 py-12 md:py-20">
          <Card padding="lg">
            <Text style={textStyles.h1} className="text-ink">
              Welcome back
            </Text>
            <Text style={textStyles.bodySmall} className="text-muted mt-2">
              Sign in to respond to requests and manage your donations.
            </Text>
            <View className="mt-6 gap-4">
              <Input label="Email" value={email} onChangeText={setEmail} placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" />
              <Input label="Password" value={password} onChangeText={setPassword} placeholder="••••••••" secureTextEntry />
              <Button title="Sign in" onPress={() => router.push('/(donor)/dashboard')} />
              <View className="flex-row items-center justify-between">
                <Link href="/(auth)/forgot-password" asChild>
                  <Text style={{ fontFamily: fonts.sansMedium, fontSize: 14, color: '#C8102E' }}>
                    Forgot password?
                  </Text>
                </Link>
                <Link href="/(auth)/signup" asChild>
                  <Text style={{ fontFamily: fonts.sansMedium, fontSize: 14, color: '#C8102E' }}>
                    Create account
                  </Text>
                </Link>
              </View>
            </View>
          </Card>
          <View className="mt-6">
            <Alert tone="info" message="Demo only — no real account or password is checked." />
          </View>
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
}
