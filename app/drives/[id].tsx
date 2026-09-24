import { Link, router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { fonts, textStyles } from '../../styles/theme';
import { drives } from '../../lib/demo';
import { Alert, Badge, Button, Card, EmptyState, Progress } from '../../components/ui';
import { Footer } from '../../components/layout/Footer';
import { Header } from '../../components/layout/Header';
import { SEO } from '../../components/layout/SEO';
import { Container } from '../../components/layout/Container';
import { SectionHeader } from '../../components/layout/SectionHeader';

export default function DriveDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const drive = drives.find((d) => d.id === id);
  const [registered, setRegistered] = useState(false);

  return (
    <View className="flex-1 bg-paper">
      <SEO title={drive ? drive.title : 'Drive not found'} description={drive?.description} />
      <Header />
      <ScrollView className="flex-1 ambient-paper">
        <Container className="py-12 md:py-20">
          <Link href="/drives" asChild>
            <Text style={{ fontFamily: fonts.sansMedium, fontSize: 14, color: '#C8102E' }}>
              ← All drives
            </Text>
          </Link>

          {!drive ? (
            <View className="mt-6">
              <EmptyState
                mark="!"
                title="Drive not found"
                message="This drive doesn't exist or has been removed."
                actionLabel="Back to drives"
                onAction={() => router.push('/drives')}
              />
            </View>
          ) : (
            <View className="mt-6">
              <SectionHeader
                eyebrow="DONATION DRIVE"
                title={drive.title}
                lede={`Organized by ${drive.organizer}`}
              />

              <View className="mt-8 flex-col md:flex-row gap-6">
                <View className="flex-1">
                  <Card>
                    <Text style={textStyles.eyebrow} className="text-muted mb-4">
                      DETAILS
                    </Text>
                    <View className="gap-3">
                      <View className="flex-row justify-between gap-4">
                        <Text style={textStyles.bodySmall} className="text-muted">Date</Text>
                        <Text style={textStyles.bodySmall} className="text-ink text-right">{drive.date}</Text>
                      </View>
                      <View className="flex-row justify-between gap-4">
                        <Text style={textStyles.bodySmall} className="text-muted">Time</Text>
                        <Text style={textStyles.bodySmall} className="text-ink text-right">{drive.time}</Text>
                      </View>
                      <View className="flex-row justify-between gap-4">
                        <Text style={textStyles.bodySmall} className="text-muted">Venue</Text>
                        <Text style={textStyles.bodySmall} className="text-ink text-right flex-1">{drive.venue}</Text>
                      </View>
                      <View className="flex-row justify-between gap-4">
                        <Text style={textStyles.bodySmall} className="text-muted">City</Text>
                        <Text style={textStyles.bodySmall} className="text-ink">{drive.city}</Text>
                      </View>
                    </View>
                    <View className="mt-5">
                      <Text style={textStyles.eyebrow} className="text-muted mb-2">
                        ESPECIALLY NEEDED
                      </Text>
                      <View className="flex-row flex-wrap gap-1.5">
                        {drive.targetGroups.map((g) => (
                          <Badge key={g} tone="crimson">{g}</Badge>
                        ))}
                      </View>
                    </View>
                    <Text style={textStyles.body} className="text-inkSoft mt-6">
                      {drive.description}
                    </Text>
                  </Card>
                </View>

                <View className="md:w-96 shrink-0">
                  <Card>
                    <Text style={textStyles.h3} className="text-ink mb-4 text-balance">
                      Register your seat
                    </Text>
                    <View className="flex-row items-baseline justify-between mb-2">
                      <Text style={textStyles.caption} className="text-muted">
                        {drive.registered + (registered ? 1 : 0)} of {drive.capacity} registered
                      </Text>
                      <Text style={textStyles.caption} className="text-ink">
                        {Math.round(((drive.registered + (registered ? 1 : 0)) / drive.capacity) * 100)}% full
                      </Text>
                    </View>
                    <Progress value={(drive.registered + (registered ? 1 : 0)) / drive.capacity} tone="crimson" />
                    {registered ? (
                      <View className="mt-5">
                        <Alert
                          tone="success"
                          title="You're registered (demo)"
                          message={`We'll see you at ${drive.venue} on ${drive.date}. Bring an ID and eat beforehand — no real registration was made.`}
                        />
                      </View>
                    ) : (
                      <View className="mt-5">
                        <Button title="Register for this drive" onPress={() => setRegistered(true)} />
                        <Text style={textStyles.caption} className="text-muted mt-3 text-center">
                          Free. Takes 30 seconds. Cancel anytime.
                        </Text>
                      </View>
                    )}
                  </Card>
                </View>
              </View>
            </View>
          )}
        </Container>
        <Footer />
      </ScrollView>
    </View>
  );
}
