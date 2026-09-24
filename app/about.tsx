import { Link } from 'expo-router';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { fonts, textStyles } from '../styles/theme';
import { Button, Card } from '../components/ui';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { SEO } from '../components/layout/SEO';

const WRAPPER = 'max-w-6xl w-full mx-auto px-4 md:px-8 py-12 md:py-20';

const TECH = [
  { name: 'Expo + React Native', blurb: 'One codebase for Android, iOS, and web.' },
  { name: 'TypeScript', blurb: 'Strict types across the whole app — matching logic included.' },
  { name: 'Firebase (Spark plan)', blurb: 'Auth, database, and push notifications — free tier.' },
  { name: 'Cloud Functions', blurb: 'Where matching, forecasting, fraud checks, and alerts run.' },
];

const MATCH_STEPS = [
  { n: '01', text: 'Filter to donors whose group can donate to the patient — anything else scores zero.' },
  { n: '02', text: 'Weigh proximity: closer donors rank higher because minutes matter in critical cases.' },
  { n: '03', text: 'Check availability: donation timing and your own paused/active status adjust the score.' },
  { n: '04', text: 'Rank and alert in score order, in small waves, so one request never spams the network.' },
];

export default function About() {
  return (
    <View className="flex-1 bg-paper">
      <SEO title="About" description="BloodLink's mission, how AI matching works, and the technology behind it." />
      <Header />
      <ScrollView className="flex-1">
        <View className={WRAPPER}>
          <Text style={textStyles.eyebrow} className="text-crimson">
            ABOUT
          </Text>
          <Text style={textStyles.h1} className="text-ink mt-3">
            Nobody should wait for blood
            <Text style={{ color: '#C8102E' }}>.</Text>
          </Text>
          <Text style={textStyles.body} className="text-inkSoft mt-3 max-w-2xl">
            BloodLink connects hospitals and families with nearby compatible donors in minutes —
            matching by blood group, distance, and availability, then alerting the best matches
            instantly.
          </Text>

          <View className="mt-10 flex-col md:flex-row gap-6">
            <Card className="flex-1">
              <Text style={textStyles.eyebrow} className="text-muted mb-3">
                OUR MISSION
              </Text>
              <Text style={textStyles.h3} className="text-ink">
                Make finding a donor as fast as sending a message.
              </Text>
              <Text style={textStyles.bodySmall} className="text-inkSoft mt-3">
                Today, families spend hours calling relatives and posting in WhatsApp groups. We
                built BloodLink so a verified request reaches the right donors in minutes —
                ranked, nearby, and ready.
              </Text>
            </Card>
            <Card className="flex-1">
              <Text style={textStyles.eyebrow} className="text-muted mb-3">
                OUR VISION
              </Text>
              <Text style={textStyles.h3} className="text-ink">
                A city where no surgery is delayed for lack of blood.
              </Text>
              <Text style={textStyles.bodySmall} className="text-inkSoft mt-3">
                Enough registered donors, enough awareness, and a matching system fast enough
                that &quot;we couldn&apos;t find blood&quot; stops being a sentence anyone has to
                say.
              </Text>
            </Card>
          </View>

          <Card className="mt-8">
            <Text style={textStyles.eyebrow} className="text-muted mb-3">
              HOW THE AI MATCHING WORKS
            </Text>
            <Text style={textStyles.h2} className="text-ink">
              Three signals, one score.
            </Text>
            <View className="mt-5 gap-4">
              {MATCH_STEPS.map((s) => (
                <View key={s.n} className="flex-row gap-4">
                  <Text style={{ fontFamily: fonts.monoSemiBold, fontSize: 13, color: '#C8102E', width: 28 }}>
                    {s.n}
                  </Text>
                  <Text style={textStyles.bodySmall} className="text-inkSoft flex-1">
                    {s.text}
                  </Text>
                </View>
              ))}
            </View>
            <View className="mt-5 border border-hairline rounded-md bg-paper px-4 py-3">
              <Text style={{ fontFamily: fonts.monoSemiBold, fontSize: 14, color: '#1C1917' }}>
                score = compatibility × proximity × availability
              </Text>
            </View>
          </Card>

          <View className="mt-8">
            <Text style={textStyles.h2} className="text-ink mb-5">
              Built on a $0 stack
            </Text>
            <View className="gap-4">
              {TECH.map((t) => (
                <Card key={t.name} padding="sm">
                  <Text style={{ fontFamily: fonts.sansSemiBold, fontSize: 15, color: '#1C1917' }}>
                    {t.name}
                  </Text>
                  <Text style={textStyles.bodySmall} className="text-muted mt-1">
                    {t.blurb}
                  </Text>
                </Card>
              ))}
            </View>
          </View>

          <Card className="mt-10">
            <Text style={textStyles.h3} className="text-ink">
              Questions, partnerships, or press?
            </Text>
            <Text style={textStyles.bodySmall} className="text-inkSoft mt-2 mb-5">
              Hospitals, universities, and welfare organizations — we&apos;d love to hear from you.
            </Text>
            <Link href="/contact" asChild>
              <Button title="Get in touch" />
            </Link>
          </Card>
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
}
