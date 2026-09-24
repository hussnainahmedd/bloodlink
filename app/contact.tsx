import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { textStyles } from '../styles/theme';
import { Alert, Button, Card, Input } from '../components/ui';
import { Container } from '../components/layout/Container';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { SEO } from '../components/layout/SEO';
import { SectionHeader } from '../components/layout/SectionHeader';

const INFO_ROWS = [
  { label: 'Email', value: 'hello@bloodlink.demo' },
  { label: 'Phone', value: '+92 300 0000000' },
  { label: 'Hours', value: 'Mon–Sat, 9 AM – 6 PM (PKT)' },
  { label: 'Address', value: 'Demo Street 12, Islamabad, Pakistan' },
];

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <View className="flex-1 bg-paper">
      <SEO title="Contact" description="Get in touch with the BloodLink team." />
      <Header />
      <ScrollView className="flex-1 ambient-paper" showsVerticalScrollIndicator={false}>
        <Container className="py-12 md:py-20">
          <SectionHeader
            eyebrow="CONTACT"
            title="Say hello"
            lede="Hospitals, volunteers, donors, or the just-curious — we read everything."
          />

          <View className="mt-8 flex-col md:flex-row gap-6">
            <Card className="flex-1">
              <Text style={textStyles.h3} className="text-ink mb-5 text-balance">
                Send a message
              </Text>
              {sent ? (
                <Alert
                  tone="success"
                  title="Message sent (demo)"
                  message="Thanks — we'll get back to you within two working days. Nothing was actually sent; this is a frontend demo."
                />
              ) : (
                <View className="gap-4">
                  <Input label="Your name" value={name} onChangeText={setName} placeholder="Your name" />
                  <Input label="Email" value={email} onChangeText={setEmail} placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" />
                  <Input label="Message" value={message} onChangeText={setMessage} placeholder="How can we help?" multiline numberOfLines={5} textAlignVertical="top" />
                  <Button title="Send message" onPress={() => setSent(true)} />
                  <Text style={textStyles.caption} className="text-muted">
                    Demo form — messages are not actually sent anywhere.
                  </Text>
                </View>
              )}
            </Card>

            <Card className="md:w-96 shrink-0">
              <Text style={textStyles.h3} className="text-ink mb-5 text-balance">
                Contact info
              </Text>
              <View className="gap-4">
                {INFO_ROWS.map((r) => (
                  <View key={r.label} className="border-b border-hairline pb-4 last:border-b-0 last:pb-0">
                    <Text style={textStyles.eyebrow} className="text-muted mb-1">
                      {r.label.toUpperCase()}
                    </Text>
                    <Text style={textStyles.bodySmall} className="text-ink">
                      {r.value}
                    </Text>
                  </View>
                ))}
              </View>
            </Card>
          </View>
        </Container>
        <Footer />
      </ScrollView>
    </View>
  );
}
