import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import { Footer } from '../../components/layout/Footer';
import { Header } from '../../components/layout/Header';
import { SEO } from '../../components/layout/SEO';
import { MatchResults } from '../../components/requests/MatchResults';
import { RequestTimeline } from '../../components/requests/RequestTimeline';
import { ShareRequest } from '../../components/requests/ShareRequest';
import { Card } from '../../components/ui/Card';
import { activeRequest, pastRequests, urgencyMeta, type BloodRequest } from '../../lib/demo';
import { fonts, textStyles } from '../../styles/theme';

/**
 * Request detail: the live view a requester and donors share —
 * status timeline, AI match results, and a shareable link.
 */
export default function RequestDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const request: BloodRequest =
    [activeRequest, ...pastRequests].find((r) => r.id === id) ?? activeRequest;

  const urgency = urgencyMeta[request.urgency];
  const unitsLabel = `${request.units} unit${request.units > 1 ? 's' : ''}`;

  const detailRows: { label: string; value: string }[] = [
    { label: 'Blood group', value: request.bloodGroup },
    { label: 'Units needed', value: unitsLabel },
    { label: 'Hospital', value: request.hospital },
    { label: 'City', value: request.city },
    { label: 'Contact', value: request.contact },
    { label: 'Notes', value: request.notes },
  ];

  return (
    <View className="flex-1 bg-paper">
      <SEO
        title={`${request.bloodGroup} needed in ${request.city}`}
        description={`Live ${urgency.label.toLowerCase()} blood request for ${request.bloodGroup} in ${request.city}. Watch donors respond in real time.`}
      />
      <Header />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="max-w-3xl w-full mx-auto px-4 md:px-8 py-12 md:py-20">
          <Link href="/requests" asChild>
            <Text
              style={{ fontFamily: fonts.sansMedium, fontSize: 14 }}
              className="text-muted"
              accessibilityRole="link"
            >
              ← All requests
            </Text>
          </Link>

          <View className="flex-row items-center gap-3 mt-6 flex-wrap">
            <View className={`rounded-md px-2.5 py-1 ${urgency.bg}`}>
              <Text style={textStyles.eyebrow} className={urgency.text}>
                {urgency.label.toUpperCase()}
              </Text>
            </View>
            <Text style={{ fontFamily: fonts.monoSemiBold, fontSize: 12 }} className="text-muted">
              {request.patientCode}
            </Text>
            <Text style={textStyles.caption} className="text-muted">
              · {request.postedAgo}
            </Text>
          </View>

          <Text style={textStyles.h1} className="text-ink mt-3">
            {request.bloodGroup} needed in {request.city}
          </Text>

          <Card padding="md" className="mt-8">
            {detailRows.map((row, i) => (
              <View
                key={row.label}
                className={`flex-row justify-between gap-6 py-3 ${
                  i > 0 ? 'border-t border-hairline' : ''
                }`}
              >
                <Text style={textStyles.caption} className="text-muted uppercase shrink-0">
                  {row.label}
                </Text>
                <Text style={textStyles.bodySmall} className="text-ink text-right flex-1">
                  {row.value}
                </Text>
              </View>
            ))}
          </Card>

          <View className="mt-12">
            <Text style={textStyles.eyebrow} className="text-muted">
              LIVE STATUS
            </Text>
            <View className="mt-5">
              <RequestTimeline currentStatus={request.status} />
            </View>
          </View>

          <View className="mt-12">
            <Text style={textStyles.eyebrow} className="text-muted">
              AI MATCHES
            </Text>
            <View className="mt-5">
              <MatchResults donors={request.matchedDonors} />
            </View>
            <Text style={textStyles.caption} className="text-muted mt-3">
              Demo — simulated: AI matching, donor names, and scores are fictional.
            </Text>
          </View>

          <View className="mt-12">
            <Text style={textStyles.eyebrow} className="text-muted">
              SHARE THIS REQUEST
            </Text>
            <View className="mt-5">
              <ShareRequest
                requestId={request.id}
                bloodGroup={request.bloodGroup}
                city={request.city}
              />
            </View>
          </View>
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
}
