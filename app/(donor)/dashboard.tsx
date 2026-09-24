import React from 'react';
import { Link } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { SEO } from '../../components/layout/SEO';
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
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="max-w-6xl w-full mx-auto px-4 md:px-8 py-12 md:py-20">
          <Text style={textStyles.eyebrow} className="text-muted">
            DONOR DASHBOARD
          </Text>
          <Text style={textStyles.display} className="text-ink mt-3">
            Good evening, Ayesha
          </Text>
          <Text style={[textStyles.body, { color: '#44403C' }]} className="mt-4 max-w-xl">
            Here is your donation story so far — and the patients closest to
            you who could use your blood type right now.
          </Text>

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
                <Text style={textStyles.h2} className="text-ink">
                  Your year in donations
                </Text>
                <Badge tone="muted">2026</Badge>
              </View>
              <DonationChart data={monthlyDonations} height={200} />
            </Card>
          </View>

          <View className="mt-12">
            <View className="flex-row items-center justify-between">
              <Text style={textStyles.h1} className="text-ink">
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
            <Text style={textStyles.eyebrow} className="text-muted">
              BADGES
            </Text>
            <Text style={textStyles.h2} className="text-ink mt-3">
              Milestones you have unlocked
            </Text>
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
        </View>

        <Footer />
      </ScrollView>
    </View>
  );
}
