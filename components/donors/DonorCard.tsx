import React from 'react';
import { Text, View } from 'react-native';
import type { Donor } from '../../lib/demo';
import { fonts, textStyles } from '../../styles/theme';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';

export interface DonorCardProps {
  donor: Donor;
  showScore?: boolean;
}

const initials = (name: string) =>
  name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

/**
 * Donor card: avatar initials, name, blood-group badge, distance,
 * availability, last donation — and a match score on request results.
 */
export function DonorCard({ donor, showScore = false }: DonorCardProps) {
  return (
    <Card padding="lg">
      <View className="flex-row items-center">
        <View className="w-12 h-12 rounded-full bg-maroon items-center justify-center mr-4">
          <Text style={{ fontFamily: fonts.sansSemiBold, fontSize: 16 }} className="text-paperOnDark">
            {initials(donor.name)}
          </Text>
        </View>
        <View className="flex-1">
          <Text style={textStyles.h3} className="text-ink">{donor.name}</Text>
          <Text style={textStyles.caption} className="text-muted mt-0.5">
            {donor.city} · {donor.distanceKm.toFixed(1)} km away
          </Text>
        </View>
        <Badge tone={donor.bloodGroup.includes('-') ? 'crimson' : 'outline'}>{donor.bloodGroup}</Badge>
      </View>

      <View className="flex-row items-center mt-4 pt-4 border-t border-hairline">
        <View className={`w-2 h-2 rounded-full mr-2 ${donor.available ? 'bg-leaf' : 'bg-muted'}`} />
        <Text style={textStyles.caption} className={donor.available ? 'text-leaf' : 'text-muted'}>
          {donor.available ? 'Available now' : 'Not available'}
        </Text>
        <Text style={textStyles.caption} className="text-muted ml-auto">
          Last donation: {donor.lastDonation} · {donor.donations} total
        </Text>
      </View>

      {showScore && donor.matchScore !== undefined ? (
        <View className="mt-4 pt-4 border-t border-hairline flex-row items-center justify-between">
          <Text style={textStyles.caption} className="text-muted">AI MATCH SCORE</Text>
          <Text style={{ fontFamily: fonts.monoSemiBold, fontSize: 20 }} className="text-crimson">
            {donor.matchScore}
          </Text>
        </View>
      ) : null}
    </Card>
  );
}
