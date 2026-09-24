import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { fonts, textStyles } from '../../styles/theme';
import { Alert, Button, Card } from '../../components/ui';
import { Container } from '../../components/layout/Container';
import { Footer } from '../../components/layout/Footer';
import { Header } from '../../components/layout/Header';
import { SEO } from '../../components/layout/SEO';

export default function VerifyEmail() {
  const [sent, setSent] = useState(false);

  return (
    <View className="flex-1 bg-paper">
      <SEO title="Verify your email" description="Confirm your email address to activate your BloodLink account." />
      <Header />
      <ScrollView className="flex-1 ambient-paper">
        <Container narrow className="py-12 md:py-20">
          <Card padding="lg">
            <Text style={textStyles.h1} className="text-ink text-balance">
              Check your inbox
            </Text>
            <Text style={textStyles.body} className="text-inkSoft mt-3">
              We sent a verification link to your email. Tap it within 24 hours to activate your
              account — it confirms we can actually reach you when a matching request goes out.
            </Text>
            <Text style={textStyles.bodySmall} className="text-muted mt-3">
              Didn&apos;t get it? Check your spam folder, or resend below.
            </Text>
            <View className="mt-6 gap-3">
              <Button
                title={sent ? 'Link resent' : 'Resend verification link'}
                variant={sent ? 'secondary' : 'primary'}
                onPress={() => setSent(true)}
              />
              {sent ? (
                <Alert tone="success" message="New link sent (demo). It expires in 24 hours." />
              ) : null}
              <Link href="/(auth)/login" asChild>
                <View className="items-center mt-2">
                  <Text style={{ fontFamily: fonts.sansMedium, fontSize: 14, color: '#C8102E' }}>
                    Continue to sign in
                  </Text>
                </View>
              </Link>
            </View>
          </Card>
        </Container>
        <Footer />
      </ScrollView>
    </View>
  );
}
