import React from 'react';
import { ScrollView, View } from 'react-native';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { SEO } from '../components/layout/SEO';
import { ClassicAbout, ClassicContact, ClassicFeatures, ClassicHero } from '../components/home/ClassicSections';

/**
 * Homepage — classic BloodLink design: hero → features → contact → about.
 * Matches the original bloodlink.vercel.app look, with Pakistan imagery.
 */
export default function HomeScreen() {
  return (
    <View className="flex-1 bg-white">
      <SEO
        title="BloodLink"
        description="BloodLink is a community of people motivated to help save others through blood donation in Pakistan."
      />
      <Header />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <ClassicHero />
        <ClassicFeatures />
        <ClassicContact />
        <ClassicAbout />
        <Footer />
      </ScrollView>
    </View>
  );
}
