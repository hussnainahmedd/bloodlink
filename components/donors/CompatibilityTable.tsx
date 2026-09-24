import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { BLOOD_GROUPS, CAN_DONATE_TO, compatibilityNote, type BloodGroup } from '../../lib/demo';
import { fonts, textStyles } from '../../styles/theme';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';

/**
 * Interactive compatibility visual: pick a blood group, see who it can
 * donate to and receive from — with a plain-language note.
 */
export function CompatibilityTable() {
  const [selected, setSelected] = useState<BloodGroup>('O-');

  const donateTo = CAN_DONATE_TO[selected];
  const receiveFrom = BLOOD_GROUPS.filter((g) => CAN_DONATE_TO[g].includes(selected));

  return (
    <Card padding="lg">
      <Text style={textStyles.eyebrow} className="text-muted">SELECT YOUR GROUP</Text>
      <View className="flex-row flex-wrap gap-2 mt-3">
        {BLOOD_GROUPS.map((g) => (
          <Pressable
            key={g}
            accessibilityRole="button"
            accessibilityState={{ selected: selected === g }}
            onPress={() => setSelected(g)}
            className={`rounded-md px-4 py-2.5 border ${selected === g ? 'bg-crimson border-crimson' : 'bg-white border-hairline'}`}
          >
            <Text style={{ fontFamily: fonts.sansSemiBold, fontSize: 16 }} className={selected === g ? 'text-white' : 'text-ink'}>
              {g}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={[textStyles.body, { fontFamily: fonts.sansMedium }]} className="text-ink mt-6">
        {compatibilityNote[selected]}
      </Text>

      <View className="flex-col md:flex-row gap-6 mt-6">
        <View className="flex-1">
          <Text style={textStyles.eyebrow} className="text-muted mb-3">CAN DONATE TO</Text>
          <View className="flex-row flex-wrap gap-2">
            {donateTo.map((g) => (
              <Badge key={g} tone="crimson">{g}</Badge>
            ))}
          </View>
        </View>
        <View className="flex-1">
          <Text style={textStyles.eyebrow} className="text-muted mb-3">CAN RECEIVE FROM</Text>
          <View className="flex-row flex-wrap gap-2">
            {receiveFrom.map((g) => (
              <Badge key={g} tone="leaf">{g}</Badge>
            ))}
          </View>
        </View>
      </View>
    </Card>
  );
}
