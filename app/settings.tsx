import React, { useState } from 'react';
import { Pressable, ScrollView, Switch, Text, View } from 'react-native';
import { colors, fonts, textStyles } from '../styles/theme';
import { Alert, Card } from '../components/ui';
import { Container } from '../components/layout/Container';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { SEO } from '../components/layout/SEO';
import { SectionHeader } from '../components/layout/SectionHeader';

function ToggleRow({
  label,
  blurb,
  value,
  onChange,
}: {
  label: string;
  blurb: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <View className="flex-row items-center justify-between gap-4 py-4 border-b border-hairline last:border-b-0">
      <View className="flex-1">
        <Text style={{ fontFamily: fonts.sansSemiBold, fontSize: 15, color: '#1C1917' }}>
          {label}
        </Text>
        <Text style={textStyles.bodySmall} className="text-muted mt-1">
          {blurb}
        </Text>
      </View>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: colors.hairline, true: colors.crimson }}
        thumbColor={colors.white}
      />
    </View>
  );
}

type Lang = 'en' | 'ur';
type DeleteState = 'idle' | 'confirm' | 'done';

export default function Settings() {
  const [push, setPush] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [location, setLocation] = useState(true);
  const [lang, setLang] = useState<Lang>('en');
  const [deleteState, setDeleteState] = useState<DeleteState>('idle');

  const LANGS: { key: Lang; label: string; note: string }[] = [
    { key: 'en', label: 'English', note: 'Default' },
    { key: 'ur', label: 'اردو (Urdu)', note: 'Coming in this demo as a preview' },
  ];

  return (
    <View className="flex-1 bg-paper">
      <SEO title="Settings" description="Manage notifications, language, and your account." />
      <Header />
      <ScrollView className="flex-1 ambient-paper" showsVerticalScrollIndicator={false}>
        <Container className="py-12 md:py-20">
          <SectionHeader
            eyebrow="SETTINGS"
            title="Your preferences"
            lede="Everything here is local for the demo — flip a toggle and it sticks for this session."
          />

          <View className="mt-8 gap-6 max-w-3xl">
            <Card>
              <Text style={textStyles.eyebrow} className="text-muted mb-2">
                NOTIFICATIONS
              </Text>
              <ToggleRow
                label="Push notifications"
                blurb="Instant alerts when you're matched to a request."
                value={push}
                onChange={setPush}
              />
              <ToggleRow
                label="Email updates"
                blurb="Weekly summary of drives and fulfilled requests near you."
                value={emailUpdates}
                onChange={setEmailUpdates}
              />
              <ToggleRow
                label="Use my location"
                blurb="Needed for proximity scoring and nearby drives. Approximate only."
                value={location}
                onChange={setLocation}
              />
            </Card>

            <Card>
              <Text style={textStyles.eyebrow} className="text-muted mb-4">
                LANGUAGE
              </Text>
              <View className="flex-row gap-3">
                {LANGS.map((l) => {
                  const active = lang === l.key;
                  return (
                    <Pressable
                      key={l.key}
                      accessibilityRole="radio"
                      accessibilityState={{ checked: active }}
                      onPress={() => setLang(l.key)}
                      className={`flex-1 border p-4 ${active ? 'border-crimson bg-crimsonSoft rounded-md' : 'glass rounded-xl'}`}
                    >
                      <Text style={{ fontFamily: fonts.sansSemiBold, fontSize: 15, color: active ? '#C8102E' : '#1C1917' }}>
                        {l.label}
                      </Text>
                      <Text style={textStyles.caption} className="text-muted mt-1">
                        {l.note}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </Card>

            <Card>
              <Text style={textStyles.eyebrow} className="text-crimson mb-3">
                DANGER ZONE
              </Text>
              <Text style={textStyles.bodySmall} className="text-inkSoft mb-4">
                Deleting your account removes your profile, donation history, and alert
                preferences permanently.
              </Text>
              {deleteState === 'done' ? (
                <Alert tone="info" message="Account deletion simulated (demo). Nothing was actually deleted." />
              ) : (
                <View>
                  <Pressable
                    onPress={() =>
                      setDeleteState(deleteState === 'idle' ? 'confirm' : 'done')
                    }
                    className={`rounded-md px-6 py-3 self-start border ${
                      deleteState === 'confirm' ? 'bg-crimson border-crimson' : 'bg-transparent border-crimson'
                    }`}
                  >
                    <Text
                      style={{
                        fontFamily: fonts.sansSemiBold,
                        fontSize: 14,
                        color: deleteState === 'confirm' ? '#FFFFFF' : '#C8102E',
                      }}
                    >
                      {deleteState === 'confirm' ? 'Yes, delete my account' : 'Delete my account'}
                    </Text>
                  </Pressable>
                  {deleteState === 'confirm' ? (
                    <View className="mt-4 flex-row gap-3">
                      <Pressable onPress={() => setDeleteState('idle')} className="rounded-md px-6 py-3 border border-hairline">
                        <Text style={{ fontFamily: fonts.sansSemiBold, fontSize: 14, color: '#1C1917' }}>
                          Keep my account
                        </Text>
                      </Pressable>
                    </View>
                  ) : null}
                </View>
              )}
              <Text style={textStyles.caption} className="text-muted mt-4">
                Demo only — this never touches a real account.
              </Text>
            </Card>
          </View>
        </Container>
        <Footer />
      </ScrollView>
    </View>
  );
}
