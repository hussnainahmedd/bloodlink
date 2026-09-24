import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { SEO } from '../../components/layout/SEO';
import { Container } from '../../components/layout/Container';
import { SectionHeader } from '../../components/layout/SectionHeader';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/ui/EmptyState';
import { activeRequest, urgencyMeta, type BloodGroup } from '../../lib/demo';
import { textStyles } from '../../styles/theme';

type Urgency = 'critical' | 'urgent' | 'scheduled';
type Decision = 'accepted' | 'declined';

interface DemoAlert {
  id: string;
  bloodGroup: BloodGroup;
  units: number;
  hospital: string;
  city: string;
  distanceKm: number;
  postedAgo: string;
  urgency: Urgency;
}

/** Demo push alerts, built from demo.ts records. */
const demoAlerts: DemoAlert[] = [
  {
    id: 'alert-1',
    bloodGroup: activeRequest.bloodGroup,
    units: activeRequest.units,
    hospital: activeRequest.hospital,
    city: activeRequest.city,
    distanceKm: 2.1,
    postedAgo: activeRequest.postedAgo,
    urgency: activeRequest.urgency,
  },
  {
    id: 'alert-2',
    bloodGroup: 'O-',
    units: 1,
    hospital: activeRequest.hospital,
    city: activeRequest.city,
    distanceKm: 4.2,
    postedAgo: '1 hr ago',
    urgency: 'urgent',
  },
  {
    id: 'alert-3',
    bloodGroup: 'A+',
    units: 3,
    hospital: 'Demo Children\u2019s Hospital',
    city: 'Rawalpindi',
    distanceKm: 8.5,
    postedAgo: '3 hrs ago',
    urgency: 'scheduled',
  },
];

/**
 * Donor alerts inbox: push-style cards with Accept / Decline,
 * decided locally in state (frontend demo only).
 */
export default function DonorAlertsScreen() {
  const [decisions, setDecisions] = useState<Record<string, Decision>>({});

  const decide = (id: string, decision: Decision) =>
    setDecisions((prev) => ({ ...prev, [id]: decision }));

  const pending = demoAlerts.filter((a) => !decisions[a.id]);

  return (
    <View className="flex-1 bg-paper">
      <SEO
        title="Alerts"
        description="Urgent blood requests near you, matched to your blood group."
      />
      <Header />
      <ScrollView className="flex-1 ambient-paper" showsVerticalScrollIndicator={false}>
        <Container className="py-12 md:py-20">
          <SectionHeader
            eyebrow="DONOR ALERTS"
            title="Requests that need you"
            lede="These alerts matched your blood group and location. Accepting tells the hospital you are on your way — declining simply passes the alert to the next closest donor."
          />

          <View className="mt-10 flex-col gap-4">
            {demoAlerts.map((alert) => {
              const meta = urgencyMeta[alert.urgency];
              const decision = decisions[alert.id];
              return (
                <Card key={alert.id} padding="lg">
                  <View className="flex-row items-center">
                    <Badge tone="crimson">{alert.bloodGroup}</Badge>
                    <View className={`ml-2 rounded-md px-2.5 py-1 ${meta.bg}`}>
                      <Text style={textStyles.caption} className={meta.text}>
                        {meta.label.toUpperCase()}
                      </Text>
                    </View>
                    <Text style={textStyles.caption} className="text-muted ml-auto">
                      {alert.postedAgo}
                    </Text>
                  </View>

                  <Text style={textStyles.h2} className="text-ink mt-4 text-balance">
                    {alert.units} unit{alert.units === 1 ? '' : 's'} needed · {alert.hospital}
                  </Text>
                  <Text style={textStyles.bodySmall} className="text-muted mt-1">
                    {alert.distanceKm.toFixed(1)} km away · {alert.city}
                  </Text>

                  {decision ? (
                    <View className="mt-5 pt-4 border-t border-hairline">
                      <Badge tone={decision === 'accepted' ? 'leaf' : 'muted'}>
                        {decision === 'accepted'
                          ? 'ACCEPTED — HOSPITAL NOTIFIED'
                          : 'DECLINED — PASSED TO NEXT DONOR'}
                      </Badge>
                      <Text style={textStyles.caption} className="text-muted mt-2">
                        {decision === 'accepted'
                          ? 'The hospital has your contact. Please head to reception when you arrive.'
                          : 'No pressure — the next closest matching donor has been alerted.'}
                      </Text>
                    </View>
                  ) : (
                    <View className="flex-row gap-3 mt-5">
                      <View className="flex-1">
                        <Button
                          title="Accept"
                          variant="primary"
                          size="md"
                          onPress={() => decide(alert.id, 'accepted')}
                        />
                      </View>
                      <View className="flex-1">
                        <Button
                          title="Decline"
                          variant="secondary"
                          size="md"
                          onPress={() => decide(alert.id, 'declined')}
                        />
                      </View>
                    </View>
                  )}
                </Card>
              );
            })}
          </View>

          {pending.length === 0 ? (
            <EmptyState
              mark="✓"
              title="All caught up"
              message="You have responded to every alert. New requests that match your group will appear here."
            />
          ) : null}

          <Text style={textStyles.caption} className="text-muted mt-8 text-center">
            Demo — fictional data · decisions stay on this device
          </Text>
        </Container>

        <Footer />
      </ScrollView>
    </View>
  );
}
