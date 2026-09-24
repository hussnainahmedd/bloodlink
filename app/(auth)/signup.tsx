import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { fonts, textStyles } from '../../styles/theme';
import { BLOOD_GROUPS, type BloodGroup } from '../../lib/demo';
import { Alert, Button, Card, Input } from '../../components/ui';
import { Container } from '../../components/layout/Container';
import { Footer } from '../../components/layout/Footer';
import { Header } from '../../components/layout/Header';
import { SEO } from '../../components/layout/SEO';

type Role = 'donor' | 'hospital';

const ROLES: { key: Role; title: string; blurb: string }[] = [
  { key: 'donor', title: 'Donor', blurb: 'Get matched to requests near you and donate at drives.' },
  { key: 'hospital', title: 'Hospital', blurb: 'Post verified requests and track them in real time.' },
];

export default function Signup() {
  const [role, setRole] = useState<Role>('donor');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [group, setGroup] = useState<BloodGroup | null>(null);
  const [city, setCity] = useState('');

  return (
    <View className="flex-1 bg-paper">
      <SEO title="Create account" description="Join BloodLink as a donor or a hospital." />
      <Header />
      <ScrollView className="flex-1 ambient-paper">
        <Container narrow className="py-12 md:py-20">
          <Card padding="lg">
            <Text style={textStyles.h1} className="text-ink text-balance">
              Create your account
            </Text>
            <Text style={textStyles.bodySmall} className="text-muted mt-2">
              Pick your role, then tell us a little about you.
            </Text>

            <Text style={textStyles.eyebrow} className="text-muted mt-6 mb-3">
              I AM JOINING AS
            </Text>
            <View className="flex-row gap-3">
              {ROLES.map((r) => {
                const active = role === r.key;
                return (
                  <Pressable
                    key={r.key}
                    accessibilityRole="radio"
                    accessibilityState={{ checked: active }}
                    onPress={() => setRole(r.key)}
                    className={`flex-1 border rounded-md p-4 ${active ? 'border-crimson bg-crimsonSoft' : 'border-hairline glass'}`}
                  >
                    <Text style={{ fontFamily: fonts.sansSemiBold, fontSize: 15, color: active ? '#C8102E' : '#1C1917' }}>
                      {r.title}
                    </Text>
                    <Text style={textStyles.caption} className="text-muted mt-1">
                      {r.blurb}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <View className="mt-5 gap-4">
              <Input label={role === 'hospital' ? 'Hospital / contact name' : 'Full name'} value={name} onChangeText={setName} placeholder="Your name" />
              <Input label="Email" value={email} onChangeText={setEmail} placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" />
              <Input label="Phone" value={phone} onChangeText={setPhone} placeholder="+92 300 0000000" keyboardType="phone-pad" />
              <Input label="Password" value={password} onChangeText={setPassword} placeholder="••••••••" secureTextEntry />
              {role === 'donor' ? (
                <View>
                  <Text style={{ fontFamily: fonts.sansSemiBold, fontSize: 14, color: '#1C1917' }} className="mb-2">
                    Blood group
                  </Text>
                  <View className="flex-row flex-wrap gap-2">
                    {BLOOD_GROUPS.map((g) => (
                      <Pressable
                        key={g}
                        accessibilityRole="radio"
                        accessibilityState={{ checked: group === g }}
                        onPress={() => setGroup(g)}
                        className={`rounded-md px-3 py-2 border ${group === g ? 'bg-crimson border-crimson' : 'glass border-hairline'}`}
                      >
                        <Text style={{ fontFamily: fonts.monoSemiBold, fontSize: 13, color: group === g ? '#FFFFFF' : '#1C1917' }}>
                          {g}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </View>
              ) : null}
              <Input label="City" value={city} onChangeText={setCity} placeholder="e.g. Islamabad" />
              <Button title="Create account" onPress={() => router.push('/(donor)/dashboard')} />
              <View className="items-center">
                <Link href="/(auth)/login" asChild>
                  <Text style={{ fontFamily: fonts.sansMedium, fontSize: 14, color: '#C8102E' }}>
                    Already have an account? Sign in
                  </Text>
                </Link>
              </View>
            </View>
          </Card>
          <View className="mt-6">
            <Alert tone="info" message="Demo only — no real account is created." />
          </View>
        </Container>
        <Footer />
      </ScrollView>
    </View>
  );
}
