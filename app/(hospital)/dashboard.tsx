import React from 'react';
import { Link } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { SEO } from '../../components/layout/SEO';
import { Container } from '../../components/layout/Container';
import { SectionHeader } from '../../components/layout/SectionHeader';
import { StatCard, StatRow } from '../../components/dashboard/StatCard';
import { ForecastChart } from '../../components/dashboard/ForecastChart';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { activeRequest, urgencyMeta } from '../../lib/demo';
import { textStyles } from '../../styles/theme';

/** Next-30-day predicted units per group (demo forecast). */
const forecastData: { group: string; predicted: number; current: number }[] = [
  { group: 'O-', predicted: 42, current: 30 },
  { group: 'O+', predicted: 118, current: 96 },
  { group: 'A-', predicted: 28, current: 24 },
  { group: 'A+', predicted: 86, current: 74 },
  { group: 'B-', predicted: 22, current: 12 },
  { group: 'B+', predicted: 64, current: 58 },
  { group: 'AB-', predicted: 12, current: 8 },
  { group: 'AB+', predicted: 34, current: 31 },
];

const statusTone = {
  matching: 'amber',
  alerted: 'amber',
  responding: 'crimson',
  fulfilled: 'leaf',
} as const;

const statusLabel: Record<keyof typeof statusTone, string> = {
  matching: 'MATCHING',
  alerted: 'ALERTED',
  responding: 'RESPONDING',
  fulfilled: 'FULFILLED',
};

/**
 * Hospital home: operational stats, demand forecast, and the
 * active request with a link into its detail page.
 */
export default function HospitalDashboardScreen() {
  const meta = urgencyMeta[activeRequest.urgency];

  return (
    <View className="flex-1 bg-paper">
      <SEO
        title="Hospital Dashboard"
        description="Active requests, demand forecasts, and response performance for Demo General Hospital."
      />
      <Header />
      <ScrollView className="flex-1 ambient-paper" showsVerticalScrollIndicator={false}>
        <Container className="py-12 md:py-20">
          <SectionHeader
            eyebrow="HOSPITAL DASHBOARD"
            title="Demo General Hospital"
            lede="Live requests, who is being alerted, and what the next thirty days of demand look like — one screen, updated as donors respond."
          />

          <View className="mt-10">
            <StatRow>
              <StatCard value="3" label="Active requests" sub="1 critical, 2 scheduled" tone="crimson" />
              <StatCard value="47 min" label="Avg response" sub="median, last 30 days" tone="leaf" />
              <StatCard value="1,240" label="Donors alerted" sub="this month" />
              <StatCard value="92%" label="Fulfillment" sub="requests closed with donation" tone="leaf" />
            </StatRow>
          </View>

          <View className="mt-8">
            <Card padding="lg">
              <View className="flex-row items-center justify-between mb-2">
                <Text style={textStyles.h2} className="text-ink text-balance">
                  30-day demand forecast
                </Text>
                <Link href="/forecasts" asChild>
                  <Pressable accessibilityRole="link">
                    <Text style={textStyles.bodySmall} className="text-crimson">
                      Full forecast →
                    </Text>
                  </Pressable>
                </Link>
              </View>
              <Text style={textStyles.caption} className="text-muted mb-4">
                Predicted units needed vs. current reserve, per blood group.
              </Text>
              <ForecastChart data={forecastData} height={220} />
            </Card>
          </View>

          <View className="mt-12">
            <Text style={textStyles.h1} className="text-ink text-balance">
              Active request
            </Text>
            <Text style={textStyles.bodySmall} className="text-muted mt-2">
              The most urgent open request at this hospital.
            </Text>

            <View className="mt-6">
              <Link
                href={{ pathname: '/requests/[id]', params: { id: activeRequest.id } }}
                asChild
              >
                <Pressable accessibilityRole="link">
                  <Card padding="lg">
                    <View className="flex-row items-center">
                      <Badge tone="crimson">{activeRequest.bloodGroup}</Badge>
                      <View className={`ml-2 rounded-md px-2.5 py-1 ${meta.bg}`}>
                        <Text style={textStyles.caption} className={meta.text}>
                          {meta.label.toUpperCase()}
                        </Text>
                      </View>
                      <Badge tone={statusTone[activeRequest.status]} className="ml-2">
                        {statusLabel[activeRequest.status]}
                      </Badge>
                      <Text style={textStyles.caption} className="text-muted ml-auto">
                        {activeRequest.postedAgo}
                      </Text>
                    </View>
                    <Text style={textStyles.h2} className="text-ink mt-4 text-balance">
                      {activeRequest.patientCode} — {activeRequest.units} units
                    </Text>
                    <Text style={textStyles.bodySmall} className="text-muted mt-1">
                      {activeRequest.notes}
                    </Text>
                    <View className="mt-5 pt-4 border-t border-hairline flex-row items-center justify-between">
                      <Text style={textStyles.bodySmall} className="text-ink">
                        {activeRequest.matchedDonors.length} matched donors ·{' '}
                        {activeRequest.notes.split('.')[0]}.
                      </Text>
                      <Text style={textStyles.bodySmall} className="text-crimson">
                        Open detail →
                      </Text>
                    </View>
                  </Card>
                </Pressable>
              </Link>
            </View>
          </View>

          <Text style={textStyles.caption} className="text-muted mt-10 text-center">
            Demo — fictional data
          </Text>
        </Container>

        <Footer />
      </ScrollView>
    </View>
  );
}
