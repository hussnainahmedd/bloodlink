import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { SEO } from '../../components/layout/SEO';
import { Container } from '../../components/layout/Container';
import { SectionHeader } from '../../components/layout/SectionHeader';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/ui/EmptyState';
import { donors, drives, type BloodGroup } from '../../lib/demo';
import { textStyles } from '../../styles/theme';

interface HistoryEntry {
  id: string;
  date: string;
  location: string;
  bloodGroup: BloodGroup;
}

/**
 * Donation history, composed from demo.ts records
 * (donor dates + drive venues). EmptyState branch kept for the
 * no-donations-yet case.
 */
const history: HistoryEntry[] = [donors[0], donors[1], donors[2]].map((d, i) => ({
  id: `hist-${d.id}`,
  date: d.lastDonation,
  location: `${drives[i % drives.length].venue}, ${drives[i % drives.length].city}`,
  bloodGroup: d.bloodGroup,
}));

export default function DonorHistoryScreen() {
  return (
    <View className="flex-1 bg-paper">
      <SEO
        title="Donation History"
        description="Every donation you have made — dates, locations, and blood group."
      />
      <Header />
      <ScrollView className="flex-1 ambient-paper" showsVerticalScrollIndicator={false}>
        <Container className="py-12 md:py-20">
          <SectionHeader
            eyebrow="YOUR RECORD"
            title="Donation history"
            lede="A permanent record of every donation — useful for your own tracking and for hospitals that ask for donation history before a drive."
          />

          <View className="mt-10">
            {history.length === 0 ? (
              <EmptyState
                mark="—"
                title="No donations yet"
                message="Your first donation will appear here, with the date, venue, and blood group recorded automatically."
                actionLabel="Find a drive"
                onAction={() => {
                  /* demo only — drives screen is a separate route */
                }}
              />
            ) : (
              <View className="flex-col gap-4">
                {history.map((entry, index) => (
                  <Card key={entry.id} padding="md">
                    <View className="flex-row items-center">
                      <View className="w-10 h-10 rounded-full bg-maroon items-center justify-center mr-4">
                        <Text
                          style={[textStyles.caption, { color: '#FAF9F7' }]}
                        >
                          {String(history.length - index).padStart(2, '0')}
                        </Text>
                      </View>
                      <View className="flex-1">
                        <Text style={textStyles.h3} className="text-ink">
                          {entry.location}
                        </Text>
                        <Text style={textStyles.caption} className="text-muted mt-1">
                          Donated {entry.date} · 1 unit · verified by the drive team
                        </Text>
                      </View>
                      <Badge tone="outline">{entry.bloodGroup}</Badge>
                    </View>
                  </Card>
                ))}
              </View>
            )}
          </View>

          <Text style={textStyles.caption} className="text-muted mt-8 text-center">
            Demo — fictional data
          </Text>
        </Container>

        <Footer />
      </ScrollView>
    </View>
  );
}
