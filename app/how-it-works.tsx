import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { fonts, textStyles } from '../styles/theme';
import { Alert, Badge, Card } from '../components/ui';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { SEO } from '../components/layout/SEO';

const WRAPPER = 'max-w-6xl w-full mx-auto px-4 md:px-8 py-12 md:py-20';

interface Step {
  n: string;
  title: string;
  see: string;
  behind: string;
}

const STEPS: Step[] = [
  {
    n: '01',
    title: 'Request',
    see: 'A hospital or family posts a request: blood group, units needed, city, urgency. The request shows a live status so you can watch it move.',
    behind:
      'Every request is verified before it goes live — a duplicate check runs against open requests, the contact number is confirmed, and the status machine moves from "requested" to "matching" the moment verification passes.',
  },
  {
    n: '02',
    title: 'AI Match',
    see: 'Compatible donors see a match score next to the request. A 96 means: right group, close by, and actually available.',
    behind:
      'Each candidate donor is scored on three signals multiplied together — compatibility × proximity × availability. Incompatible groups score zero and drop out immediately; the rest are ranked and the top matches move forward.',
  },
  {
    n: '03',
    title: 'Alert',
    see: 'The top matches get a push notification instantly, plus a WhatsApp-style alert. One tap to respond, with directions to the hospital.',
    behind:
      'Alerts go out in score order with a short cooldown between waves so we never spam the whole network for one request. In this demo the WhatsApp-style alert is simulated; a real WhatsApp Business channel can plug into the same trigger later.',
  },
  {
    n: '04',
    title: 'Donate',
    see: 'You arrive, pass the on-site health check, donate in about twelve minutes, rest with juice — and the request moves to "fulfilled".',
    behind:
      'Once donors accept, the request status advances through "responding" and finally "fulfilled" when the units are confirmed. The full timeline stays visible to the family that posted it.',
  },
];

export default function HowItWorks() {
  return (
    <View className="flex-1 bg-paper">
      <SEO title="How it works" description="The four-step BloodLink flow: request, AI match, alert, donate — and the scoring formula behind it." />
      <Header />
      <ScrollView className="flex-1">
        <View className={WRAPPER}>
          <Text style={textStyles.eyebrow} className="text-crimson">
            HOW IT WORKS
          </Text>
          <Text style={textStyles.h1} className="text-ink mt-3">
            Four steps. Zero guesswork.
          </Text>
          <Text style={textStyles.body} className="text-inkSoft mt-3 max-w-2xl">
            From a family posting a request in a hospital corridor to a donor walking out with a
            bandage and a juice box — this is exactly what happens, and what happens behind the
            scenes.
          </Text>

          <View className="mt-10 gap-6">
            {STEPS.map((s) => (
              <Card key={s.n}>
                <View className="flex-col md:flex-row gap-6">
                  <View className="md:w-56 shrink-0">
                    <Text style={{ fontFamily: fonts.monoSemiBold, fontSize: 13, color: '#78716C' }}>
                      {s.n}
                    </Text>
                    <Text style={textStyles.h2} className="text-ink mt-2">
                      {s.title}
                    </Text>
                  </View>
                  <View className="flex-1 gap-4">
                    <View className="border border-hairline rounded-md p-4 bg-paper">
                      <Text
                        style={textStyles.eyebrow}
                        className="text-muted mb-2"
                      >
                        WHAT YOU SEE
                      </Text>
                      <Text style={textStyles.bodySmall} className="text-inkSoft">
                        {s.see}
                      </Text>
                    </View>
                    <View className="border border-hairline rounded-md p-4 bg-white">
                      <Text style={textStyles.eyebrow} className="text-muted mb-2">
                        WHAT HAPPENS BEHIND THE SCENES
                      </Text>
                      <Text style={textStyles.bodySmall} className="text-inkSoft">
                        {s.behind}
                      </Text>
                    </View>
                  </View>
                </View>
              </Card>
            ))}
          </View>

          <Card className="mt-8">
            <Badge tone="ink">The scoring formula</Badge>
            <Text style={textStyles.h3} className="text-ink mt-4">
              Compatibility × Proximity × Availability
            </Text>
            <Text style={textStyles.bodySmall} className="text-inkSoft mt-3">
              <Text style={{ fontFamily: fonts.sansSemiBold, color: '#1C1917' }}>Compatibility</Text>{' '}
              is binary: can your blood group donate to the patient&apos;s? A &quot;no&quot; scores
              zero and you are out — no partial credit. That keeps rare groups like O− exactly where
              they belong: at the top of the list for patients who can&apos;t take anything else.
            </Text>
            <Text style={textStyles.bodySmall} className="text-inkSoft mt-3">
              <Text style={{ fontFamily: fonts.sansSemiBold, color: '#1C1917' }}>Proximity</Text>{' '}
              decays with distance. A compatible donor 2 km away outranks an identical one 20 km
              away — because in a critical request, minutes are the currency.
            </Text>
            <Text style={textStyles.bodySmall} className="text-inkSoft mt-3">
              <Text style={{ fontFamily: fonts.sansSemiBold, color: '#1C1917' }}>Availability</Text>{' '}
              checks donation timing and your own status. Donated eight weeks ago? Your score drops
              until the three-month window passes. Paused donations? You sit this one out.
            </Text>
            <View className="mt-5 border border-hairline rounded-md bg-paper px-4 py-3">
              <Text style={{ fontFamily: fonts.monoSemiBold, fontSize: 14, color: '#1C1917' }}>
                score = compatibility × proximity × availability
              </Text>
              <Text style={textStyles.caption} className="text-muted mt-2">
                0–100 scale. Demo data — the formula is real, the donors are fictional.
              </Text>
            </View>
          </Card>

          <View className="mt-8">
            <Alert
              tone="info"
              title="Demo walkthrough"
              message="The Request and Find donors screens use fictional demo data so you can see this flow end to end. Nothing here sends a real alert."
            />
          </View>
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
}
