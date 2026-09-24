import { router } from 'expo-router';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { EmptyState } from '../components/ui/EmptyState';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { SEO } from '../components/layout/SEO';

export default function NotFound() {
  return (
    <View className="flex-1 bg-paper">
      <SEO title="Page not found" description="This page doesn't exist on BloodLink." />
      <Header />
      <ScrollView className="flex-1">
        <View className="max-w-6xl w-full mx-auto px-4 md:px-8 py-12 md:py-20">
          <EmptyState
            mark="?"
            title="Page not found"
            message="The page you're looking for doesn't exist or was moved. Let's get you back on track."
            actionLabel="Go home"
            onAction={() => router.push('/')}
          />
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
}
