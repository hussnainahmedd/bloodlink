import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Image, ImageBackground, Pressable, Text, TextInput, View } from 'react-native';
import { classic, fonts } from '../../styles/theme';
import { Container } from '../layout/Container';

const heroImg = require('../../assets/images/hero-camp.jpg');
const featureBrowse = require('../../assets/images/feature-browse.jpg');
const featureConnect = require('../../assets/images/feature-connect.jpg');
const featureRecords = require('../../assets/images/feature-records.jpg');
const aboutDonation = require('../../assets/images/about-donation.jpg');
const aboutVolunteers = require('../../assets/images/about-volunteers.jpg');

/** Centered serif section heading with the classic red underline. */
function SectionHeading({ title }: { title: string }) {
  return (
    <View className="items-center mb-10" nativeID={undefined}>
      <Text style={{ fontFamily: fonts.serifSemiBold, fontSize: 36, color: classic.ink }}>{title}</Text>
      <View style={{ width: 120, height: 4, backgroundColor: classic.red, borderRadius: 2, marginTop: 8 }} />
    </View>
  );
}

function RedButton({ title, href, onPress }: { title: string; href?: string; onPress?: () => void }) {
  const inner = (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={{ backgroundColor: classic.red, borderRadius: 6, paddingHorizontal: 24, paddingVertical: 12 }}
    >
      <Text style={{ fontFamily: fonts.sansSemiBold, fontSize: 15, color: '#FFFFFF' }}>{title}</Text>
    </Pressable>
  );
  if (href) {
    return (
      <Link href={href as never} asChild>
        {inner}
      </Link>
    );
  }
  return inner;
}

/* ---------------------------------- hero ---------------------------------- */

export function ClassicHero() {
  return (
    <ImageBackground source={heroImg} resizeMode="cover" style={{ width: '100%', minHeight: 560 }}>
      <View style={{ flex: 1, justifyContent: 'center', paddingVertical: 80 }}>
        <Container>
          <View
            style={{
              backgroundColor: classic.panelBlue,
              borderRadius: 4,
              padding: 40,
              maxWidth: 520,
              shadowColor: '#000',
              shadowOpacity: 0.15,
              shadowRadius: 12,
              shadowOffset: { width: 0, height: 4 },
            }}
          >
            <Text style={{ fontFamily: fonts.serifBold, fontSize: 56, lineHeight: 62, color: classic.ink }}>
              SHARE YOUR
            </Text>
            <Text style={{ fontFamily: fonts.serifBold, fontSize: 56, lineHeight: 62, color: classic.red }}>
              POWER
            </Text>
            <Text style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontSize: 24, color: classic.ink, marginTop: 12 }}>
              Your <Text style={{ color: classic.red }}>blood</Text> can save <Text style={{ textDecorationLine: 'underline' }}>lives</Text>
            </Text>
            <View className="flex-row gap-3 mt-6 flex-wrap">
              <RedButton title="Be a DONOR" href="/(auth)/signup" />
              <RedButton title="Browse Donors" href="/find-donors" />
            </View>
          </View>
        </Container>
      </View>
    </ImageBackground>
  );
}

/* -------------------------------- features -------------------------------- */

const features = [
  {
    title: 'Browse Donors',
    body: 'The platform offers a wide selection of registered users based on the active donors. We also use filters to limit the results into more the specific ones.',
    img: featureBrowse,
  },
  {
    title: 'Connect with others',
    body: 'Surfing the list of donors enables the blood donation seekers to connect with their preferred donors by initiating a request alongside a short message.',
    img: featureConnect,
  },
  {
    title: 'Profile and Past Records',
    body: "In this feature, the users are capable of creating their profiles and see other's profile. The profile includes their donation history and other records.",
    img: featureRecords,
  },
] as const;

export function ClassicFeatures() {
  return (
    <View style={{ backgroundColor: classic.paper }} nativeID="features">
      <Container className="py-16">
        <SectionHeading title="Features" />
        <View className="flex-col md:flex-row gap-6 justify-center">
          {features.map((f) => (
            <View
              key={f.title}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 8,
                borderWidth: 1,
                borderColor: classic.hairline,
                overflow: 'hidden',
                maxWidth: 340,
                flex: 1,
                shadowColor: '#000',
                shadowOpacity: 0.06,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 2 },
              }}
            >
              <Image source={f.img} resizeMode="cover" style={{ width: '100%', height: 190 }} />
              <View style={{ padding: 20 }}>
                <Text style={{ fontFamily: fonts.serifSemiBold, fontSize: 20, color: classic.ink, textAlign: 'center' }}>
                  {f.title}
                </Text>
                <Text style={{ fontFamily: fonts.sans, fontSize: 14, lineHeight: 22, color: classic.inkSoft, textAlign: 'center', marginTop: 10 }}>
                  {f.body}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </Container>
    </View>
  );
}

/* --------------------------------- contact --------------------------------- */

const contactCards = [
  { title: 'Technical Support', email: 'support@bloodlink.com' },
  { title: 'Developer', email: 'developers@bloodlink.com' },
  { title: 'Promotions', email: 'promote@bloodlink.com' },
  { title: 'Bug Report', email: 'report@bloodlink.com' },
] as const;

const inputStyle = {
  fontFamily: fonts.sans,
  fontSize: 14,
  backgroundColor: '#FFFFFF',
  borderWidth: 1,
  borderColor: classic.hairline,
  borderRadius: 4,
  paddingHorizontal: 12,
  paddingVertical: 10,
} as const;

export function ClassicContact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <View style={{ backgroundColor: classic.paperDeep }} nativeID="contact">
      <Container className="py-16">
        <SectionHeading title="Contact Us" />
        <View
          style={{
            backgroundColor: classic.panelBlue,
            borderRadius: 6,
            padding: 32,
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 32,
          }}
          className="flex-col md:flex-row"
        >
          <View style={{ flex: 1, minWidth: 260, gap: 12 }}>
            {sent ? (
              <Text style={{ fontFamily: fonts.sansMedium, fontSize: 16, color: classic.red }}>
                Thanks for reaching out — we&apos;ll get back to you soon.
              </Text>
            ) : (
              <>
                <TextInput value={name} onChangeText={setName} placeholder="Name" style={inputStyle} />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email Address"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={inputStyle}
                />
                <TextInput
                  value={message}
                  onChangeText={setMessage}
                  placeholder="Message"
                  multiline
                  numberOfLines={5}
                  style={[inputStyle, { minHeight: 120, textAlignVertical: 'top' }]}
                />
                <Pressable
                  accessibilityRole="button"
                  onPress={() => name.trim() && email.trim() && message.trim() && setSent(true)}
                  style={{ backgroundColor: classic.red, borderRadius: 4, paddingVertical: 12, alignItems: 'center' }}
                >
                  <Text style={{ fontFamily: fonts.sansBold, fontSize: 14, color: '#FFFFFF' }}>SEND</Text>
                </Pressable>
              </>
            )}
          </View>

          <View style={{ flex: 1, minWidth: 260 }}>
            <Text style={{ fontFamily: fonts.serifSemiBold, fontSize: 24, color: classic.ink }}>
              Get in <Text style={{ textDecorationLine: 'underline', textDecorationColor: classic.red }}>touch</Text>
            </Text>
            <View className="flex-row gap-2 mt-3 mb-6">
              {['f', 'ig', 'r', 't', 'yt'].map((s) => (
                <View
                  key={s}
                  style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: classic.red, alignItems: 'center', justifyContent: 'center' }}
                >
                  <Text style={{ fontFamily: fonts.sansBold, fontSize: 14, color: '#FFFFFF' }}>{s}</Text>
                </View>
              ))}
            </View>
            <View className="flex-row flex-wrap gap-4">
              {contactCards.map((c) => (
                <View key={c.title} style={{ minWidth: 200, flex: 1 }} className="flex-row items-center gap-3">
                  <View style={{ width: 44, height: 44, borderRadius: 8, backgroundColor: classic.red, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontFamily: fonts.sansBold, fontSize: 16, color: '#FFFFFF' }}>
                      {c.title.charAt(0)}
                    </Text>
                  </View>
                  <View>
                    <Text style={{ fontFamily: fonts.sansSemiBold, fontSize: 14, color: classic.ink }}>{c.title}</Text>
                    <Text style={{ fontFamily: fonts.sans, fontSize: 12, color: classic.inkSoft }}>{c.email}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Container>
    </View>
  );
}

/* ---------------------------------- about ---------------------------------- */

export function ClassicAbout() {
  return (
    <View style={{ backgroundColor: classic.paper }} nativeID="about">
      <Container className="py-16">
        <SectionHeading title="About Us" />
        <View className="flex-col md:flex-row gap-10 items-center mb-14">
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: fonts.serifBold, fontSize: 44, lineHeight: 50, color: classic.ink }}>
              What is{'\n'}
              <Text style={{ color: classic.red }}>BloodLink ?</Text>
            </Text>
            <Text style={{ fontFamily: fonts.sans, fontSize: 15, lineHeight: 24, color: classic.inkSoft, marginTop: 16 }}>
              BloodLink is a community of people motivated to help save others thru blood donation. In this
              platform, people are motivated to become blood donors where any people can browse, search and
              ask for help.
            </Text>
          </View>
          <Image source={aboutDonation} resizeMode="cover" style={{ width: '100%', maxWidth: 460, height: 300, borderRadius: 8, flex: 1 }} />
        </View>

        <View className="flex-col md:flex-row gap-10 items-center">
          <Image source={aboutVolunteers} resizeMode="cover" style={{ width: '100%', maxWidth: 380, height: 300, borderRadius: 8, flex: 1 }} />
          <View style={{ flex: 1 }} className="flex-col md:flex-row gap-8">
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: fonts.serifSemiBold, fontSize: 22, color: classic.ink, textDecorationLine: 'underline', textDecorationColor: classic.hairline }}>
                Our Mission
              </Text>
              <Text style={{ fontFamily: fonts.sans, fontSize: 14, lineHeight: 22, color: classic.inkSoft, marginTop: 10 }}>
                To create and maintain a healthy community of donors by providing an easy-to-use social
                platform where they can connect.
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: fonts.serifSemiBold, fontSize: 22, color: classic.ink, textDecorationLine: 'underline', textDecorationColor: classic.hairline }}>
                Our Vision
              </Text>
              <Text style={{ fontFamily: fonts.sans, fontSize: 14, lineHeight: 22, color: classic.inkSoft, marginTop: 10 }}>
                To be one of pioneers of a united health system where people are continuously being
                motivated and inspired to work together.
              </Text>
            </View>
          </View>
        </View>
      </Container>
    </View>
  );
}
