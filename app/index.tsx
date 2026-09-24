import React from 'react';
import { ScrollView, View } from 'react-native';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { SEO } from '../components/layout/SEO';
import { CTA } from '../components/home/CTA';
import { Hero } from '../components/home/Hero';
import { HowItWorks } from '../components/home/HowItWorks';
import { Stats } from '../components/home/Stats';
import { Stories } from '../components/home/Stories';

/**
 * Homepage: cinematic hero → stats → how it works → stories → CTA.
 */
export default function HomeScreen() {
  return (
    <View className="flex-1 bg-paper">
      <SEO
        title="BloodLink"
        description="AI-powered emergency blood donor network for Pakistan. Request blood, get matched donors in minutes."
      />
      <Header />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <Hero />
        <Stats />
        <HowItWorks />
        <Stories />
        <CTA />
        <Footer />
      </ScrollView>
    </View>
  );
}
