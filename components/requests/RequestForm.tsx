import { router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { BLOOD_GROUPS, type BloodGroup } from '../../lib/demo';
import { fonts, textStyles } from '../../styles/theme';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';

type Urgency = 'critical' | 'urgent' | 'scheduled';

const urgencyOptions: { key: Urgency; label: string; hint: string }[] = [
  { key: 'critical', label: 'Critical', hint: 'Needed within hours' },
  { key: 'urgent', label: 'Urgent', hint: 'Needed within a day' },
  { key: 'scheduled', label: 'Scheduled', hint: 'Planned transfusion' },
];

/**
 * The emergency request form. Fast, calm, accessible — the requester
 * may be stressed, so every step is one clear decision.
 */
export function RequestForm() {
  const [group, setGroup] = useState<BloodGroup | null>(null);
  const [units, setUnits] = useState('2');
  const [city, setCity] = useState('');
  const [hospital, setHospital] = useState('');
  const [contact, setContact] = useState('');
  const [urgency, setUrgency] = useState<Urgency>('urgent');
  const [submitting, setSubmitting] = useState(false);

  const valid = group !== null && city.trim().length > 0 && contact.trim().length > 0;

  const submit = () => {
    if (!valid || submitting) return;
    setSubmitting(true);
    // Frontend demo: simulate the matching pass, then open the live request.
    setTimeout(() => {
      setSubmitting(false);
      router.push('/requests/req-1042');
    }, 1600);
  };

  return (
    <View className="gap-6">
      <Card padding="lg">
        <Text style={textStyles.eyebrow} className="text-muted">1 · BLOOD GROUP NEEDED</Text>
        <View className="flex-row flex-wrap gap-2 mt-3">
          {BLOOD_GROUPS.map((g) => (
            <Pressable
              key={g}
              accessibilityRole="radio"
              accessibilityState={{ selected: group === g }}
              onPress={() => setGroup(g)}
              className={`rounded-md px-5 py-3 border ${group === g ? 'bg-crimson border-crimson' : 'bg-white border-hairline'}`}
            >
              <Text style={{ fontFamily: fonts.sansSemiBold, fontSize: 18 }} className={group === g ? 'text-white' : 'text-ink'}>
                {g}
              </Text>
            </Pressable>
          ))}
        </View>
      </Card>

      <Card padding="lg">
        <Text style={textStyles.eyebrow} className="text-muted">2 · DETAILS</Text>
        <View className="gap-4 mt-4">
          <View className="flex-col sm:flex-row gap-4">
            <View className="flex-1">
              <Text style={textStyles.caption} className="text-muted mb-1.5">UNITS NEEDED</Text>
              <Input value={units} onChangeText={setUnits} keyboardType="numeric" accessibilityLabel="Units needed" />
            </View>
            <View className="flex-1">
              <Text style={textStyles.caption} className="text-muted mb-1.5">CITY</Text>
              <Input value={city} onChangeText={setCity} placeholder="e.g. Islamabad" accessibilityLabel="City" />
            </View>
          </View>
          <View>
            <Text style={textStyles.caption} className="text-muted mb-1.5">HOSPITAL / LOCATION</Text>
            <Input value={hospital} onChangeText={setHospital} placeholder="Hospital name" accessibilityLabel="Hospital" />
          </View>
          <View>
            <Text style={textStyles.caption} className="text-muted mb-1.5">CONTACT NUMBER</Text>
            <Input value={contact} onChangeText={setContact} placeholder="+92 3XX XXXXXXX" keyboardType="phone-pad" accessibilityLabel="Contact number" />
          </View>
        </View>
      </Card>

      <Card padding="lg">
        <Text style={textStyles.eyebrow} className="text-muted">3 · URGENCY</Text>
        <View className="gap-2 mt-3">
          {urgencyOptions.map((u) => (
            <Pressable
              key={u.key}
              accessibilityRole="radio"
              accessibilityState={{ selected: urgency === u.key }}
              onPress={() => setUrgency(u.key)}
              className={`rounded-lg border p-4 flex-row items-center ${urgency === u.key ? 'border-crimson bg-crimsonSoft' : 'border-hairline bg-white'}`}
            >
              <View className={`w-4 h-4 rounded-full border-2 mr-3 ${urgency === u.key ? 'border-crimson bg-crimson' : 'border-hairline'}`} />
              <View>
                <Text style={{ fontFamily: fonts.sansSemiBold, fontSize: 16 }} className="text-ink">{u.label}</Text>
                <Text style={textStyles.caption} className="text-muted">{u.hint}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </Card>

      <Button
        title={submitting ? 'Finding donors…' : 'Find Donors Now'}
        size="lg"
        loading={submitting}
        disabled={!valid}
        onPress={submit}
      />
      {!valid ? (
        <Text style={textStyles.caption} className="text-muted text-center">
          Select a blood group and add a city + contact number to continue.
        </Text>
      ) : null}
      <Text style={textStyles.caption} className="text-muted text-center">
        Demo mode — this opens a simulated live request. No real alert is sent.
      </Text>
    </View>
  );
}
