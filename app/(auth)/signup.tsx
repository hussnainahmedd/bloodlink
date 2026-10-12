import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { BLOOD_GROUPS, type BloodGroup } from '../../lib/demo';
import { classic, fonts } from '../../styles/theme';
import { Container } from '../../components/layout/Container';
import { FooterDark } from '../../components/layout/FooterDark';
import { Header } from '../../components/layout/Header';
import { SEO } from '../../components/layout/SEO';

const illustration = require('../../assets/images/auth-register.jpg');
const NAVY = '#1B2A4A';
const GREEN = '#2E9E5B';

const STEPS = ['Personal Information', 'Donor Details', 'Account Security', 'Review & Confirm'] as const;
const GENDERS = ['Male', 'Female', 'Other'] as const;

const inputStyle = {
  fontFamily: fonts.sans,
  fontSize: 14,
  backgroundColor: '#FFFFFF',
  borderWidth: 1,
  borderColor: classic.hairline,
  borderRadius: 6,
  paddingHorizontal: 14,
  paddingVertical: 12,
  flex: 1,
} as const;

function Field({ placeholder, value, onChangeText, keyboardType, secure }: {
  placeholder: string;
  value: string;
  onChangeText: (t: string) => void;
  keyboardType?: 'email-address' | 'phone-pad' | 'numeric' | 'default';
  secure?: boolean;
}) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType={keyboardType}
      secureTextEntry={secure}
      autoCapitalize="none"
      style={inputStyle}
    />
  );
}

function Label({ children }: { children: string }) {
  return (
    <Text style={{ fontFamily: fonts.sansSemiBold, fontSize: 13, color: classic.inkSoft, marginBottom: 6 }}>
      {children}
    </Text>
  );
}

/**
 * Register — classic BloodLink 4-step wizard: illustration left,
 * stepped form right, green NEXT / gray BACK, dark navy footer.
 * Matches the original bloodlink.vercel.app/register design.
 */
export default function Signup() {
  const [step, setStep] = useState(0);

  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [mobile, setMobile] = useState('');
  const [gender, setGender] = useState<string | null>(null);

  const [group, setGroup] = useState<BloodGroup | null>(null);
  const [city, setCity] = useState('');

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const canNext =
    step === 0
      ? firstName.trim() && lastName.trim() && email.trim() && mobile.trim() && gender
      : step === 1
        ? group && city.trim()
        : step === 2
          ? password.length >= 6 && password === confirm
          : true;

  const finish = () => router.push('/(donor)/dashboard');

  return (
    <View className="flex-1 bg-white">
      <SEO title="Register" description="Join our community — register as a BloodLink donor." />
      <Header authAction="login" />
      <ScrollView className="flex-1">
        <Container className="py-12 md:py-16">
          <View className="flex-col md:flex-row gap-10">
            <Image
              source={illustration}
              resizeMode="cover"
              style={{ width: '100%', maxWidth: 440, height: 520, borderRadius: 12 }}
            />

            <View style={{ flex: 1, minWidth: 280 }}>
              <Text style={{ fontFamily: fonts.serifBold, fontSize: 34, color: NAVY }}>Join our Community!</Text>
              <Text style={{ fontFamily: fonts.sans, fontSize: 14, color: classic.muted, marginTop: 6 }}>
                Register and be a member
              </Text>

              {/* progress */}
              <View className="flex-row gap-2 mt-6 mb-2">
                {STEPS.map((_, i) => (
                  <View
                    key={i}
                    style={{
                      flex: 1,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: i <= step ? GREEN : '#E5E7EB',
                    }}
                  />
                ))}
              </View>
              <Text style={{ fontFamily: fonts.sansSemiBold, fontSize: 14, color: NAVY, marginBottom: 20 }}>
                {STEPS[step]}
              </Text>

              {step === 0 && (
                <View className="gap-4">
                  <View className="flex-row gap-3 flex-wrap">
                    <View style={{ flex: 1, minWidth: 120 }}>
                      <Label>First Name</Label>
                      <Field placeholder="First Name" value={firstName} onChangeText={setFirstName} />
                    </View>
                    <View style={{ flex: 1, minWidth: 120 }}>
                      <Label>Middle Name</Label>
                      <Field placeholder="Middle Name" value={middleName} onChangeText={setMiddleName} />
                    </View>
                    <View style={{ flex: 1, minWidth: 120 }}>
                      <Label>Last Name</Label>
                      <Field placeholder="Last Name" value={lastName} onChangeText={setLastName} />
                    </View>
                  </View>
                  <View className="flex-row gap-3 flex-wrap">
                    <View style={{ flex: 2, minWidth: 180 }}>
                      <Label>Email</Label>
                      <Field placeholder="youremail@domain" value={email} onChangeText={setEmail} keyboardType="email-address" />
                    </View>
                    <View style={{ flex: 1, minWidth: 100 }}>
                      <Label>Age</Label>
                      <Field placeholder="Age" value={age} onChangeText={setAge} keyboardType="numeric" />
                    </View>
                  </View>
                  <View className="flex-row gap-3 flex-wrap">
                    <View style={{ flex: 1, minWidth: 160 }}>
                      <Label>Mobile No</Label>
                      <Field placeholder="03XXXXXXXXX" value={mobile} onChangeText={setMobile} keyboardType="phone-pad" />
                    </View>
                    <View style={{ flex: 1, minWidth: 160 }}>
                      <Label>Gender</Label>
                      <View className="flex-row gap-2">
                        {GENDERS.map((g) => (
                          <Pressable
                            key={g}
                            onPress={() => setGender(g)}
                            style={{
                              flex: 1,
                              borderWidth: 1,
                              borderRadius: 6,
                              paddingVertical: 12,
                              alignItems: 'center',
                              borderColor: gender === g ? GREEN : classic.hairline,
                              backgroundColor: gender === g ? '#E8F5EC' : '#FFFFFF',
                            }}
                          >
                            <Text style={{ fontFamily: fonts.sansMedium, fontSize: 13, color: gender === g ? GREEN : classic.inkSoft }}>
                              {g}
                            </Text>
                          </Pressable>
                        ))}
                      </View>
                    </View>
                  </View>
                </View>
              )}

              {step === 1 && (
                <View className="gap-4">
                  <View>
                    <Label>Blood Group</Label>
                    <View className="flex-row flex-wrap gap-2">
                      {BLOOD_GROUPS.map((g) => (
                        <Pressable
                          key={g}
                          onPress={() => setGroup(g)}
                          style={{
                            borderWidth: 1,
                            borderRadius: 6,
                            paddingHorizontal: 16,
                            paddingVertical: 10,
                            borderColor: group === g ? GREEN : classic.hairline,
                            backgroundColor: group === g ? '#E8F5EC' : '#FFFFFF',
                          }}
                        >
                          <Text style={{ fontFamily: fonts.sansSemiBold, fontSize: 14, color: group === g ? GREEN : classic.ink }}>
                            {g}
                          </Text>
                        </Pressable>
                      ))}
                    </View>
                  </View>
                  <View>
                    <Label>City</Label>
                    <Field placeholder="e.g. Islamabad" value={city} onChangeText={setCity} />
                  </View>
                </View>
              )}

              {step === 2 && (
                <View className="gap-4">
                  <View>
                    <Label>Password</Label>
                    <Field placeholder="Minimum 6 characters" value={password} onChangeText={setPassword} secure />
                  </View>
                  <View>
                    <Label>Confirm Password</Label>
                    <Field placeholder="Repeat your password" value={confirm} onChangeText={setConfirm} secure />
                  </View>
                </View>
              )}

              {step === 3 && (
                <View className="gap-3" style={{ borderWidth: 1, borderColor: classic.hairline, borderRadius: 8, padding: 18 }}>
                  {[
                    ['Name', `${firstName} ${middleName} ${lastName}`.replace(/\s+/g, ' ').trim()],
                    ['Email', email],
                    ['Mobile', mobile],
                    ['Gender', gender ?? ''],
                    ['Blood Group', group ?? ''],
                    ['City', city],
                  ].map(([k, v]) => (
                    <View key={k} className="flex-row justify-between">
                      <Text style={{ fontFamily: fonts.sans, fontSize: 14, color: classic.muted }}>{k}</Text>
                      <Text style={{ fontFamily: fonts.sansSemiBold, fontSize: 14, color: classic.ink }}>{v}</Text>
                    </View>
                  ))}
                </View>
              )}

              {/* nav buttons */}
              <View className="flex-row gap-3 mt-8">
                <Pressable
                  accessibilityRole="button"
                  disabled={step === 0}
                  onPress={() => setStep((s) => Math.max(0, s - 1))}
                  style={{
                    flex: 1,
                    borderRadius: 6,
                    paddingVertical: 13,
                    alignItems: 'center',
                    backgroundColor: step === 0 ? '#E5E7EB' : '#9AA0A6',
                  }}
                >
                  <Text style={{ fontFamily: fonts.sansBold, fontSize: 14, color: '#FFFFFF', letterSpacing: 1 }}>
                    BACK
                  </Text>
                </Pressable>
                {step < STEPS.length - 1 ? (
                  <Pressable
                    accessibilityRole="button"
                    disabled={!canNext}
                    onPress={() => canNext && setStep((s) => s + 1)}
                    style={{
                      flex: 1,
                      borderRadius: 6,
                      paddingVertical: 13,
                      alignItems: 'center',
                      backgroundColor: canNext ? GREEN : '#B9DCC4',
                    }}
                  >
                    <Text style={{ fontFamily: fonts.sansBold, fontSize: 14, color: '#FFFFFF', letterSpacing: 1 }}>
                      NEXT
                    </Text>
                  </Pressable>
                ) : (
                  <Pressable
                    accessibilityRole="button"
                    onPress={finish}
                    style={{ flex: 1, borderRadius: 6, paddingVertical: 13, alignItems: 'center', backgroundColor: GREEN }}
                  >
                    <Text style={{ fontFamily: fonts.sansBold, fontSize: 14, color: '#FFFFFF', letterSpacing: 1 }}>
                      FINISH
                    </Text>
                  </Pressable>
                )}
              </View>

              <View className="flex-row justify-center mt-4">
                <Text style={{ fontFamily: fonts.sans, fontSize: 14, color: classic.inkSoft }}>
                  Already Registered ?{' '}
                </Text>
                <Link href="/(auth)/login" asChild>
                  <Text style={{ fontFamily: fonts.sansSemiBold, fontSize: 14, color: classic.red }}>
                    Sign In
                  </Text>
                </Link>
              </View>
            </View>
          </View>
        </Container>
        <FooterDark />
      </ScrollView>
    </View>
  );
}
