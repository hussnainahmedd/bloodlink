import { Link } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { textStyles } from '../../styles/theme';
import { drives, type Drive } from '../../lib/demo';
import { Badge, Card, Progress } from '../../components/ui';
import { Footer } from '../../components/layout/Footer';
import { Header } from '../../components/layout/Header';
import { SEO } from '../../components/layout/SEO';
import { Container } from '../../components/layout/Container';
import { SectionHeader } from '../../components/layout/SectionHeader';

function DriveCard({ drive }: { drive: Drive }) {
  const pct = Math.round((drive.registered / drive.capacity) * 100);
  return (
    <Link
      href={{ pathname: '/drives/[id]', params: { id: drive.id } }}
      asChild
    >
      <Pressable>
        <Card>
          <View className="flex-row items-start justify-between gap-3">
            <View className="flex-1">
              <Text style={textStyles.h3} className="text-ink text-balance">
                {drive.title}
              </Text>
              <Text style={textStyles.bodySmall} className="text-muted mt-1">
                {drive.organizer}
              </Text>
            </View>
            <Badge tone="outline">{drive.city}</Badge>
          </View>
          <View className="mt-4 gap-1.5">
            <Text style={textStyles.bodySmall} className="text-inkSoft">
              {drive.date} · {drive.time}
            </Text>
            <Text style={textStyles.bodySmall} className="text-inkSoft">
              {drive.venue}
            </Text>
          </View>
          <View className="mt-4 flex-row flex-wrap gap-1.5">
            <Text style={textStyles.eyebrow} className="text-muted self-center mr-1">
              NEEDS
            </Text>
            {drive.targetGroups.map((g) => (
              <Badge key={g} tone="crimson">
                {g}
              </Badge>
            ))}
          </View>
          <View className="mt-5">
            <View className="flex-row items-baseline justify-between mb-2">
              <Text style={textStyles.caption} className="text-muted">
                {drive.registered} of {drive.capacity} registered
              </Text>
              <Text style={textStyles.caption} className="text-ink">
                {pct}% full
              </Text>
            </View>
            <Progress value={drive.registered / drive.capacity} tone="crimson" accessibilityLabel={`${pct} percent of seats registered`} />
          </View>
        </Card>
      </Pressable>
    </Link>
  );
}

export default function Drives() {
  return (
    <View className="flex-1 bg-paper">
      <SEO title="Blood drives" description="Upcoming donation drives — find one near you and register your seat." />
      <Header />
      <ScrollView className="flex-1 ambient-paper">
        <Container className="py-12 md:py-20">
          <SectionHeader
            eyebrow="DONATION DRIVES"
            title="Upcoming drives"
            lede="Organized camps with doctors, volunteers, and refreshments. The whole visit takes about 30 minutes — register a seat so the team can plan for you."
          />
          <View className="mt-8 gap-5">
            {drives.map((d) => (
              <DriveCard key={d.id} drive={d} />
            ))}
          </View>
        </Container>
        <Footer />
      </ScrollView>
    </View>
  );
}
