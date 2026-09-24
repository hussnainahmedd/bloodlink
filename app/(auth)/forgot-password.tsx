import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { fonts, textStyles } from '../../styles/theme';
import { Alert, Button, Card, Input } from '../../components/ui';
import { Container } from '../../components/layout/Container';
import { Footer } from '../../components/layout/Footer';
import { Header } from '../../components/layout/Header';
import { SEO } from '../../components/layout/SEO';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <View className="flex-1 bg-paper">
      <SEO title="Forgot password" description="Reset your BloodLink password." />
      <Header />
      <ScrollView className="flex-1 ambient-paper">
        <Container narrow className="py-12 md:py-20">
          <Card padding="lg">
            <Text style={textStyles.h1} className="text-ink text-balance">
              Reset your password
            </Text>
            <Text style={textStyles.bodySmall} className="text-muted mt-2">
              Enter the email you signed up with and we&apos;ll send you a reset link.
            </Text>
            {sent ? (
              <View className="mt-6">
                <Alert tone="success" title="Reset link sent (demo)" message={`If ${email || 'that address'} has an account, a reset link is on its way. Check your inbox.`} />
                <View className="mt-4">
                  <Button title="Back to sign in" variant="secondary" onPress={() => router.push('/(auth)/login')} />
                </View>
              </View>
            ) : (
              <View className="mt-6 gap-4">
                <Input label="Email" value={email} onChangeText={setEmail} placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" />
                <Button title="Send reset link" onPress={() => setSent(true)} />
                <View className="items-center">
                  <Link href="/(auth)/login" asChild>
                    <Text style={{ fontFamily: fonts.sansMedium, fontSize: 14, color: '#C8102E' }}>
                      Back to sign in
                    </Text>
                  </Link>
                </View>
              </View>
            )}
          </Card>
        </Container>
        <Footer />
      </ScrollView>
    </View>
  );
}
