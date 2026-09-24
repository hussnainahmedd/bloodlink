import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { fonts, textStyles } from '../../styles/theme';
import { Button } from '../ui/Button';

export interface ShareRequestProps {
  requestId: string;
  bloodGroup: string;
  city: string;
}

/**
 * Share sheet for a request: copyable link + message preview.
 * Frontend demo — copies a local deep link.
 */
export function ShareRequest({ requestId, bloodGroup, city }: ShareRequestProps) {
  const [copied, setCopied] = useState(false);
  const link = `bloodlink://requests/${requestId}`;
  const message = `🩸 URGENT: ${bloodGroup} blood needed in ${city} — ${link}`;

  return (
    <View className="gap-4">
      <View className="bg-paperDeep border border-hairline rounded-lg p-4">
        <Text style={textStyles.caption} className="text-muted mb-2">MESSAGE PREVIEW</Text>
        <Text style={textStyles.bodySmall} className="text-ink">{message}</Text>
      </View>
      <View className="flex-row gap-3">
        <View className="flex-1">
          <Button
            title={copied ? 'Copied ✓' : 'Copy Link'}
            variant="secondary"
            onPress={() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
          />
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Share via system share sheet"
          className="flex-1 rounded-lg bg-ink items-center justify-center px-6 py-3"
        >
          <Text style={{ fontFamily: fonts.sansSemiBold, fontSize: 16 }} className="text-white">
            Share…
          </Text>
        </Pressable>
      </View>
      <Text style={textStyles.caption} className="text-muted">
        Demo — sharing is simulated in this frontend preview.
      </Text>
    </View>
  );
}
