import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { fonts, textStyles } from '../styles/theme';
import { Alert, Card, Input } from '../components/ui';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { SEO } from '../components/layout/SEO';

const WRAPPER = 'max-w-6xl w-full mx-auto px-4 md:px-8 py-12 md:py-20';

interface CheckItem {
  key: 'illness' | 'tattoo' | 'meds';
  label: string;
  reason: string;
}

const CHECKS: CheckItem[] = [
  {
    key: 'illness',
    label: 'I have had a fever, flu, or infection in the last 2 weeks',
    reason: 'Recent illness usually means a temporary deferral — your body needs to fully recover first.',
  },
  {
    key: 'tattoo',
    label: 'I got a tattoo or piercing in the last 6 months',
    reason: 'New tattoos/piercings usually mean waiting 6 months, to rule out any infection risk.',
  },
  {
    key: 'meds',
    label: 'I take medication that affects blood (blood thinners, antibiotics, etc.)',
    reason: 'Certain medications mean a temporary deferral — the on-site doctor will confirm which ones.',
  },
];

function CheckRow({ checked, label, onToggle }: { checked: boolean; label: string; onToggle: () => void }) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      onPress={onToggle}
      className="flex-row items-start gap-3 border border-hairline rounded-md px-4 py-3 bg-white"
    >
      <View
        className={`w-5 h-5 rounded-md border items-center justify-center mt-0.5 ${
          checked ? 'bg-crimson border-crimson' : 'border-hairline bg-paper'
        }`}
      >
        {checked ? (
          <Text style={{ fontFamily: fonts.sansSemiBold, fontSize: 13, color: '#FFFFFF' }}>✓</Text>
        ) : null}
      </View>
      <Text style={textStyles.bodySmall} className="text-inkSoft flex-1">
        {label}
      </Text>
    </Pressable>
  );
}

export default function Eligibility() {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [hemoglobin, setHemoglobin] = useState('');
  const [monthsSince, setMonthsSince] = useState('');
  const [flags, setFlags] = useState<Record<CheckItem['key'], boolean>>({
    illness: false,
    tattoo: false,
    meds: false,
  });

  const toggle = (key: CheckItem['key']) => setFlags((f) => ({ ...f, [key]: !f[key] }));

  const result = useMemo(() => {
    const reasons: string[] = [];
    const ageN = parseFloat(age);
    const weightN = parseFloat(weight);
    const hbN = parseFloat(hemoglobin);
    const monthsN = parseFloat(monthsSince);

    if (age === '' || Number.isNaN(ageN)) reasons.push('Enter your age to continue.');
    else if (ageN < 18) reasons.push('You need to be at least 18 to donate.');
    else if (ageN > 65) reasons.push('Donors are generally accepted up to age 65.');

    if (weight === '' || Number.isNaN(weightN)) reasons.push('Enter your weight to continue.');
    else if (weightN < 50) reasons.push('You generally need to weigh at least 50 kg.');

    if (hemoglobin === '' || Number.isNaN(hbN)) reasons.push('Enter your hemoglobin to continue.');
    else if (hbN < 12.5) reasons.push('Hemoglobin below 12.5 g/dL usually means a deferral — eat iron-rich food and recheck later.');

    if (monthsSince === '' || Number.isNaN(monthsN)) reasons.push('Tell us how long since your last donation.');
    else if (monthsN < 3) reasons.push('Wait at least 3 months between whole-blood donations.');

    CHECKS.forEach((c) => {
      if (flags[c.key]) reasons.push(c.reason);
    });

    const missing = reasons.some((r) => r.endsWith('to continue.') || r.endsWith('last donation.'));
    return { reasons, missing, eligible: reasons.length === 0 };
  }, [age, weight, hemoglobin, monthsSince, flags]);

  return (
    <View className="flex-1 bg-paper">
      <SEO title="Eligibility check" description="A quick self-check for blood donation eligibility — age, weight, hemoglobin, and timing." />
      <Header />
      <ScrollView className="flex-1">
        <View className={WRAPPER}>
          <Text style={textStyles.eyebrow} className="text-crimson">
            ELIGIBILITY CHECK
          </Text>
          <Text style={textStyles.h1} className="text-ink mt-3">
            Can you donate today?
          </Text>
          <Text style={textStyles.body} className="text-inkSoft mt-3 max-w-2xl">
            Answer a few questions and get an instant read. This is a screening guide — the
            on-site health check always has the final word.
          </Text>

          <View className="mt-8 flex-col md:flex-row gap-8">
            <View className="flex-1 gap-5">
              <Card>
                <Text style={textStyles.h3} className="text-ink mb-5">
                  Your details
                </Text>
                <View className="gap-4">
                  <View className="flex-col md:flex-row gap-4">
                    <View className="flex-1">
                      <Input label="Age" value={age} onChangeText={setAge} placeholder="e.g. 24" keyboardType="numeric" hint="18–65 years" />
                    </View>
                    <View className="flex-1">
                      <Input label="Weight (kg)" value={weight} onChangeText={setWeight} placeholder="e.g. 68" keyboardType="numeric" hint="Minimum 50 kg" />
                    </View>
                  </View>
                  <View className="flex-col md:flex-row gap-4">
                    <View className="flex-1">
                      <Input label="Hemoglobin (g/dL)" value={hemoglobin} onChangeText={setHemoglobin} placeholder="e.g. 14.2" keyboardType="numeric" hint="Minimum 12.5 g/dL" />
                    </View>
                    <View className="flex-1">
                      <Input label="Months since last donation" value={monthsSince} onChangeText={setMonthsSince} placeholder="e.g. 6" keyboardType="numeric" hint="At least 3 months" />
                    </View>
                  </View>
                </View>
              </Card>

              <Card>
                <Text style={textStyles.h3} className="text-ink mb-2">
                  Quick health questions
                </Text>
                <Text style={textStyles.bodySmall} className="text-muted mb-4">
                  Check anything that applies to you right now.
                </Text>
                <View className="gap-3">
                  {CHECKS.map((c) => (
                    <CheckRow key={c.key} checked={flags[c.key]} label={c.label} onToggle={() => toggle(c.key)} />
                  ))}
                </View>
              </Card>
            </View>

            <View className="md:w-96 shrink-0">
              <Card>
                <Text style={textStyles.h3} className="text-ink mb-4">
                  Your result
                </Text>
                {result.eligible ? (
                  <Alert
                    tone="success"
                    title="Looks like you're eligible"
                    message="Based on what you told us, nothing is holding you back. Register for a drive or respond to a request — and eat a proper meal first."
                  />
                ) : result.missing ? (
                  <Alert
                    tone="info"
                    title="Almost there"
                    message="Fill in the remaining fields and your result will appear here."
                  />
                ) : (
                  <Alert
                    tone="warning"
                    title="Likely deferred for now"
                    message="One or more answers suggest waiting. See the details below."
                  />
                )}
                {result.reasons.length > 0 && !result.missing ? (
                  <View className="mt-4 gap-2">
                    {result.reasons.map((r) => (
                      <View key={r} className="flex-row gap-2">
                        <Text style={{ fontFamily: fonts.sans, fontSize: 14, color: '#78716C' }}>•</Text>
                        <Text style={textStyles.bodySmall} className="text-inkSoft flex-1">
                          {r}
                        </Text>
                      </View>
                    ))}
                  </View>
                ) : null}
                <View className="mt-5 border-t border-hairline pt-4">
                  <Alert
                    tone="warning"
                    message="This is a guide, not medical advice — the on-site check decides."
                  />
                </View>
              </Card>
            </View>
          </View>
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
}
