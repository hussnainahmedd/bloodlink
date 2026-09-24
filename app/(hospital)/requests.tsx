import React from 'react';
import { Link } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { SEO } from '../../components/layout/SEO';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import {
  activeRequest,
  pastRequests,
  urgencyMeta,
  type BloodRequest,
} from '../../lib/demo';
import { textStyles } from '../../styles/theme';

const statusTone = {
  matching: 'amber',
  alerted: 'amber',
  responding: 'crimson',
  fulfilled: 'leaf',
} as const;

const statusLabel: Record<BloodRequest['status'], string> = {
  matching: 'MATCHING',
  alerted: 'ALERTED',
  responding: 'RESPONDING',
  fulfilled: 'FULFILLED',
};

function RequestRow({ request }: { request: BloodRequest }) {
  const meta = urgencyMeta[request.urgency];
  return (
    <Link
      href={{ pathname: '/requests/[id]', params: { id: request.id } }}
      asChild
    >
      <Pressable accessibilityRole="link">
        <Card padding="md">
          <View className="flex-row items-center">
            <Badge tone="crimson">{request.bloodGroup}</Badge>
            <View className={`ml-2 rounded-md px-2.5 py-1 ${meta.bg}`}>
              <Text style={textStyles.caption} className={meta.text}>
                {meta.label.toUpperCase()}
              </Text>
            </View>
            <Badge tone={statusTone[request.status]} className="ml-2">
              {statusLabel[request.status]}
            </Badge>
            <Text style={textStyles.caption} className="text-muted ml-auto">
              {request.postedAgo}
            </Text>
          </View>
          <View className="flex-row items-center justify-between mt-4">
            <View className="flex-1 mr-4">
              <Text style={textStyles.h3} className="text-ink">
                {request.patientCode} — {request.units} unit{request.units === 1 ? '' : 's'}
              </Text>
              <Text style={textStyles.caption} className="text-muted mt-1">
                {request.hospital} · {request.city} · {request.matchedDonors.length > 0
                  ? `${request.matchedDonors.length} matched donors`
                  : 'no matches yet'}
              </Text>
            </View>
            <Text style={textStyles.bodySmall} className="text-crimson">
              →
            </Text>
          </View>
        </Card>
      </Pressable>
    </Link>
  );
}

/**
 * Hospital request ledger: the live request plus the fulfilled
 * archive, each linking to its detail page.
 */
export default function HospitalRequestsScreen() {
  return (
    <View className="flex-1 bg-paper">
      <SEO
        title="Blood Requests"
        description="Active and past blood requests for Demo General Hospital."
      />
      <Header />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="max-w-6xl w-full mx-auto px-4 md:px-8 py-12 md:py-20">
          <Text style={textStyles.eyebrow} className="text-muted">
            REQUEST LEDGER
          </Text>
          <Text style={textStyles.display} className="text-ink mt-3">
            Blood requests
          </Text>
          <Text style={[textStyles.body, { color: '#44403C' }]} className="mt-4 max-w-xl">
            Everything this hospital has asked for — the live request at the
            top, fulfilled ones in the archive. Tap any row for the full
            timeline and matched donors.
          </Text>

          <View className="mt-10">
            <Text style={textStyles.eyebrow} className="text-muted mb-4">
              ACTIVE
            </Text>
            <View className="flex-col gap-4">
              <RequestRow request={activeRequest} />
            </View>
          </View>

          <View className="mt-10">
            <Text style={textStyles.eyebrow} className="text-muted mb-4">
              PAST · FULFILLED
            </Text>
            <View className="flex-col gap-4">
              {pastRequests.map((request) => (
                <RequestRow key={request.id} request={request} />
              ))}
            </View>
          </View>

          <Text style={textStyles.caption} className="text-muted mt-10 text-center">
            Demo — fictional data
          </Text>
        </View>

        <Footer />
      </ScrollView>
    </View>
  );
}
