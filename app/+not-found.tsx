import { router } from 'expo-router';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { EmptyState } from '../components/ui/EmptyState';
import { Container } from '../components/layout/Container';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { SEO } from '../components/layout/SEO';

export default function NotFound() {
  return (
    <View className="flex-1 bg-paper">
      <SEO title="Page not found" description="This page doesn't exist on BloodLink." />
      <Header />
      <ScrollView className="flex-1 ambient-paper" showsVerticalScrollIndicator={false}>
        <Container className="py-12 md:py-20">
          <EmptyState
            mark="?"
            title="Page not found"
            message="The page you're looking for doesn't exist or was moved. Let's get you back on track."
            actionLabel="Go home"
            onAction={() => router.push('/')}
          />
        </Container>
        <Footer />
      </ScrollView>
    </View>
  );
}
