import React from 'react';
import { Link } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { SEO } from '../../components/layout/SEO';
import { Container } from '../../components/layout/Container';
import { SectionHeader } from '../../components/layout/SectionHeader';
import { StatCard, StatRow } from '../../components/dashboard/StatCard';
import { DonationChart } from '../../components/dashboard/DonationChart';
import { Alert } from '../../components/ui/Alert';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { activeRequest, drives, urgencyMeta } from '../../lib/demo';
import { textStyles } from '../../styles/theme';

const monthlyDonations = [2, 1, 3, 2, 4, 3, 5, 2, 3, 4, 2, 3];

/**
 * Donor home: greeting, impact stats, yearly donation chart,
 * nearby alerts, and earned badges. All data is fictional demo data.
 */
export default function DonorDashboardScreen() {
  const driveAlert = drives[0];
  const criticalMeta = urgencyMeta[activeRequest.urgency];

  return (
    <View className="flex-1 bg-paper">
      <SEO
        title="Donor Dashboard"
        description="Your donations, alerts near you, and impact at a glance."
      />
      <Header />
      <ScrollView className="flex-1 ambient-paper" showsVerticalScrollIndicator={false}>
        <Container className="py-12 md:py-20">
          <SectionHeader
            eyebrow="DONOR DASHBOARD"
            title="Good evening, Ayesha"
            lede="Here is your donation story so far — and the patients closest to you who could use your blood type right now."
          />

          <View className="mt-10">
            <StatRow>
              <StatCard value="12" label="Donations" sub="lifetime total" tone="crimson" />
              <StatCard value="36" label="Lives touched" sub="est. 3 per donation" />
              <StatCard value="4" label="Year streak" sub="donating every year since 2022" tone="leaf" />
              <StatCard value="Nov 12" label="Next eligible" sub="in 49 days" tone="amber" />
            </StatRow>
          </View>

          <View className="mt-8">
            <Card padding="lg">
              <View className="flex-row items-center justify-between mb-4">
                <Text style={textStyles.h2} className="text-ink text-balance">
                  Your year in donations
                </Text>
                <Badge tone="muted">2026</Badge>
              </View>
              <DonationChart data={monthlyDonations} height={200} />
            </Card>
          </View>

          <View className="mt-12">
            <View className="flex-row items-center justify-between">
              <Text style={textStyles.h1} className="text-ink text-balance">
                Alerts near you
              </Text>
              <Link href="/find-donors" asChild>
                <Pressable accessibilityRole="link">
                  <Text style={textStyles.bodySmall} className="text-crimson">
                    View all →
                  </Text>
                </Pressable>
              </Link>
            </View>
            <Text style={textStyles.bodySmall} className="text-muted mt-2">
              Patients within 10 km whose hospitals are asking for your group.
            </Text>

            <View className="mt-6 flex-col gap-4">
              <Link href="/find-donors" asChild>
                <Pressable accessibilityRole="link">
                  <Card padding="md">
                    <View className="flex-row items-center">
                      <Badge tone="crimson">{activeRequest.bloodGroup}</Badge>
                      <View className={`ml-2 rounded-md px-2.5 py-1 ${criticalMeta.bg}`}>
                        <Text style={textStyles.caption} className={criticalMeta.text}>
                          {criticalMeta.label.toUpperCase()}
                        </Text>
                      </View>
                      <Text style={textStyles.caption} className="text-muted ml-auto">
                        {activeRequest.postedAgo}
                      </Text>
                    </View>
                    <Text style={textStyles.h3} className="text-ink mt-4">
                      {activeRequest.units} units needed · {activeRequest.hospital}
                    </Text>
                    <Text style={textStyles.caption} className="text-muted mt-1">
                      2.1 km away · Islamabad · tap to see matching donors
                    </Text>
                  </Card>
                </Pressable>
              </Link>

              <Link href="/find-donors" asChild>
                <Pressable accessibilityRole="link">
                  <Card padding="md">
                    <View className="flex-row items-center">
                      <Badge tone="crimson">O−</Badge>
                      <Badge tone="muted">{driveAlert.targetGroups.join(' · ')}</Badge>
                      <Text style={textStyles.caption} className="text-muted ml-auto">
                        {driveAlert.date}
                      </Text>
                    </View>
                    <Text style={textStyles.h3} className="text-ink mt-4">
                      {driveAlert.title}
                    </Text>
                    <Text style={textStyles.caption} className="text-muted mt-1">
                      {driveAlert.venue}, {driveAlert.city} · {driveAlert.registered}/{driveAlert.capacity} registered
                    </Text>
                  </Card>
                </Pressable>
              </Link>
            </View>
          </View>

          <View className="mt-12">
            <SectionHeader eyebrow="BADGES" title="Milestones you have unlocked" />
            <View className="flex-row flex-wrap gap-2 mt-5">
              <Badge tone="leaf">First donation</Badge>
              <Badge tone="ink">5 donations</Badge>
              <Badge tone="crimson">Emergency hero</Badge>
              <Badge tone="muted">10 donations · locked</Badge>
            </View>
            <Alert
              tone="success"
              title="Keep going"
              message="Two more donations unlock the 10-donation badge — and put you on the city leaderboard."
            />
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
