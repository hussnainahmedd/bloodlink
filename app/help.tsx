import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { fonts, textStyles } from '../styles/theme';
import { Card } from '../components/ui';
import { Container } from '../components/layout/Container';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { SEO } from '../components/layout/SEO';
import { SectionHeader } from '../components/layout/SectionHeader';

const FAQS = [
  {
    q: 'How do I create an account?',
    a: 'Tap Sign up, choose Donor or Hospital, and fill in your details. Donors also pick their blood group. It takes about a minute — demo accounts work instantly with no email check on this build.',
  },
  {
    q: 'How do I request blood for a patient?',
    a: 'Hospitals post verified requests with the blood group, units needed, and urgency. The matching engine then scores nearby compatible donors and alerts the top matches automatically.',
  },
  {
    q: 'I got an alert — what should I do?',
    a: 'Check the blood group, hospital, and distance. If you can go, tap Respond — the family gets your confirmation and directions are shown. Only respond if you can actually make it.',
  },
  {
    q: 'How do the donor alerts work?',
    a: 'When a request is posted, compatible donors are ranked by the match score (compatibility × proximity × availability) and the top matches get a push notification, plus a WhatsApp-style alert in this demo build.',
  },
  {
    q: 'Is my data private?',
    a: 'Your phone number and location are only shared with the hospital and family behind a request you respond to — never publicly. You can pause alerts or delete your account from Settings at any time.',
  },
  {
    q: 'Do you use real WhatsApp messages?',
    a: 'Not in this version. Alerts are simulated in-app so you can see the flow end to end. A real WhatsApp Business channel can plug into the same alert trigger later without changing the app.',
  },
];

function FaqItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <Card padding="none">
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        onPress={onToggle}
        className="px-6 py-5 flex-row items-center justify-between gap-4"
      >
        <Text style={{ fontFamily: fonts.sansSemiBold, fontSize: 16, color: '#1C1917' }} className="flex-1">
          {q}
        </Text>
        <Text style={{ fontFamily: fonts.monoSemiBold, fontSize: 18, color: '#C8102E' }}>
          {open ? '−' : '+'}
        </Text>
      </Pressable>
      {open ? (
        <View className="px-6 pb-5 border-t border-hairline pt-4">
          <Text style={textStyles.bodySmall} className="text-inkSoft">
            {a}
          </Text>
        </View>
      ) : null}
    </Card>
  );
}

export default function Help() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <View className="flex-1 bg-paper">
      <SEO title="Help & FAQ" description="Answers to common questions about requesting, donating, alerts, and privacy." />
      <Header />
      <ScrollView className="flex-1 ambient-paper" showsVerticalScrollIndicator={false}>
        <Container className="py-12 md:py-20">
          <SectionHeader
            eyebrow="HELP CENTER"
            title="Questions, answered"
            lede="The short version of everything people ask us about accounts, requests, donating, alerts, and privacy."
          />

          <View className="mt-8 gap-4 max-w-3xl">
            {FAQS.map((f, i) => (
              <FaqItem
                key={f.q}
                q={f.q}
                a={f.a}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </View>

          <Card className="mt-10 max-w-3xl">
            <Text style={textStyles.h3} className="text-ink text-balance">
              Still stuck?
            </Text>
            <Text style={textStyles.bodySmall} className="text-inkSoft mt-2 mb-5">
              Message us and a human will reply within two working days.
            </Text>
            <Link href="/contact" className="self-start">
              <Text style={{ fontFamily: fonts.sansSemiBold, fontSize: 15, color: '#C8102E' }}>
                Contact us →
              </Text>
            </Link>
          </Card>
        </Container>
        <Footer />
      </ScrollView>
    </View>
  );
}
