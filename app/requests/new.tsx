import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Footer } from '../../components/layout/Footer';
import { Header } from '../../components/layout/Header';
import { SEO } from '../../components/layout/SEO';
import { RequestForm } from '../../components/requests/RequestForm';
import { Card } from '../../components/ui/Card';
import { textStyles } from '../../styles/theme';

const nextSteps: { title: string; detail: string }[] = [
  {
    title: 'AI scores nearby donors',
    detail: 'Compatible donors are ranked by distance, availability, and donation history.',
  },
  {
    title: 'Best matches alerted instantly',
    detail: 'The top matches get an alert the second your request goes live.',
  },
  {
    title: 'You watch it live',
    detail: 'Follow every response as it comes in on the live request page.',
  },
];

/**
 * New request: one calm, fast form for emergencies.
 */
export default function NewRequestScreen() {
  return (
    <View className="flex-1 bg-paper">
      <SEO
        title="Request Blood"
        description="Post an emergency blood request in under a minute. BloodLink's AI scores nearby donors and alerts the best matches instantly."
      />
      <Header />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="max-w-3xl w-full mx-auto px-4 md:px-8 py-12 md:py-20">
          <Text style={textStyles.eyebrow} className="text-crimson">
            EMERGENCY REQUEST
          </Text>
          <Text style={textStyles.h1} className="text-ink mt-3">
            Request blood, fast.
          </Text>
          <Text style={textStyles.body} className="text-muted mt-3 max-w-xl">
            Take a breath — this takes under a minute. Tell us what is needed and BloodLink starts
            finding compatible donors the moment you post.
          </Text>

          <View className="mt-10">
            <RequestForm />
            <Text style={textStyles.caption} className="text-muted mt-4">
              Demo — simulated: this form does not contact real hospitals or donors.
            </Text>
          </View>

          <Card padding="lg" className="mt-10">
            <Text style={textStyles.eyebrow} className="text-muted">
              WHAT HAPPENS NEXT
            </Text>
            <View className="mt-5 gap-5">
              {nextSteps.map((step, i) => (
                <View key={step.title} className="flex-row">
                  <View className="w-7 h-7 rounded-full bg-leafSoft border border-leaf/20 items-center justify-center mr-4">
                    <Text style={{ fontSize: 13 }} className="text-leaf">
                      ✓
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text style={textStyles.bodySmall} className="text-ink font-semibold">
                      {i + 1}. {step.title}
                    </Text>
                    <Text style={textStyles.bodySmall} className="text-muted mt-1">
                      {step.detail}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </Card>
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
}
