import React, { useState } from 'react';
import {
  Alert as RNAlert,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { SEO } from '../../components/layout/SEO';
import { Container } from '../../components/layout/Container';
import { Alert } from '../../components/ui/Alert';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { donors } from '../../lib/demo';
import { textStyles } from '../../styles/theme';

const demoDonor = donors[0];

const initials = (name: string) =>
  name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

function Toggle({
  label,
  hint,
  value,
  onToggle,
}: {
  label: string;
  hint?: string;
  value: boolean;
  onToggle: (next: boolean) => void;
}) {
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      accessibilityLabel={label}
      onPress={() => onToggle(!value)}
      className="flex-row items-center justify-between py-4 border-b border-hairline"
    >
      <View className="flex-1 mr-4">
        <Text style={textStyles.bodySmall} className="text-ink">
          {label}
        </Text>
        {hint ? (
          <Text style={textStyles.caption} className="text-muted mt-1">
            {hint}
          </Text>
        ) : null}
      </View>
      <View
        className={`w-12 h-7 rounded-full px-1 justify-center ${
          value ? 'bg-leaf items-end' : 'bg-skeleton items-start'
        }`}
      >
        <View className="w-5 h-5 rounded-full bg-white" />
      </View>
    </Pressable>
  );
}

/**
 * Donor profile: header with initials avatar, editable contact fields,
 * notification preference toggles, and a demo save action.
 */
export default function DonorProfileScreen() {
  const [name, setName] = useState(demoDonor.name);
  const [city, setCity] = useState(demoDonor.city);
  const [phone, setPhone] = useState('+92 300 1234567');
  const [pushAlerts, setPushAlerts] = useState(true);
  const [smsFallback, setSmsFallback] = useState(false);
  const [driveInvites, setDriveInvites] = useState(true);
  const [saved, setSaved] = useState(false);

  const save = () => {
    setSaved(true);
    RNAlert.alert('Profile saved', 'Your donor profile has been updated (demo).');
  };

  return (
    <View className="flex-1 bg-paper">
      <SEO
        title="Profile"
        description="Manage your donor profile, contact details, and alert preferences."
      />
      <Header />
      <ScrollView className="flex-1 ambient-paper" showsVerticalScrollIndicator={false}>
        <Container className="py-12 md:py-20">
          <Text style={textStyles.eyebrow} className="text-muted">
            DONOR PROFILE
          </Text>

          <Card padding="lg" className="mt-6">
            <View className="flex-row items-center">
              <View className="w-16 h-16 rounded-full bg-maroon items-center justify-center mr-5">
                <Text style={[textStyles.h2, { color: '#FAF9F7' }]}>
                  {initials(name)}
                </Text>
              </View>
              <View className="flex-1">
                <Text style={textStyles.h1} className="text-ink text-balance">
                  {name}
                </Text>
                <Text style={textStyles.caption} className="text-muted mt-1">
                  {city} · {demoDonor.donations} donations · last donated {demoDonor.lastDonation}
                </Text>
              </View>
              <Badge tone="crimson">{demoDonor.bloodGroup}</Badge>
            </View>
          </Card>

          <View className="mt-8">
            <Text style={textStyles.h2} className="text-ink text-balance">
              Contact details
            </Text>
            <Text style={textStyles.bodySmall} className="text-muted mt-2">
              Hospitals only see your phone number after you accept an alert.
            </Text>
            <View className="mt-5 flex-col gap-4">
              <Input
                label="Full name"
                value={name}
                onChangeText={(t) => {
                  setName(t);
                  setSaved(false);
                }}
                placeholder="Your name"
              />
              <Input
                label="City"
                value={city}
                onChangeText={(t) => {
                  setCity(t);
                  setSaved(false);
                }}
                placeholder="City"
              />
              <Input
                label="Phone"
                value={phone}
                onChangeText={(t) => {
                  setPhone(t);
                  setSaved(false);
                }}
                placeholder="+92 3XX XXXXXXX"
                keyboardType="phone-pad"
                hint="Used only for alerts you accept."
              />
            </View>
          </View>

          <View className="mt-10">
            <Text style={textStyles.h2} className="text-ink text-balance">
              Notification preferences
            </Text>
            <Card padding="md" className="mt-5">
              <Toggle
                label="Push alerts for urgent requests"
                hint="Instant notification when a matching request is posted nearby."
                value={pushAlerts}
                onToggle={(v) => {
                  setPushAlerts(v);
                  setSaved(false);
                }}
              />
              <Toggle
                label="SMS fallback"
                hint="If a push alert goes unseen for 10 minutes, resend it as a text."
                value={smsFallback}
                onToggle={(v) => {
                  setSmsFallback(v);
                  setSaved(false);
                }}
              />
              <View>
                <Toggle
                  label="Drive invitations"
                  hint="Occasional invites to donation drives in your city."
                  value={driveInvites}
                  onToggle={(v) => {
                    setDriveInvites(v);
                    setSaved(false);
                  }}
                />
              </View>
            </Card>
          </View>

          {saved ? (
            <View className="mt-6">
              <Alert
                tone="success"
                title="Saved"
                message="Your profile changes are stored on this device (demo)."
              />
            </View>
          ) : null}

          <View className="mt-8">
            <Button title="Save changes" variant="primary" size="lg" onPress={save} />
          </View>

          <Text style={textStyles.caption} className="text-muted mt-8 text-center">
            Demo — fictional data · nothing leaves this device
          </Text>
        </Container>

        <Footer />
      </ScrollView>
    </View>
  );
}
