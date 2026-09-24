import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { SEO } from '../components/layout/SEO';
import { Container } from '../components/layout/Container';
import { SectionHeader } from '../components/layout/SectionHeader';
import { CompatibilityTable } from '../components/donors/CompatibilityTable';
import { Alert } from '../components/ui/Alert';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { fonts, textStyles } from '../styles/theme';

/**
 * Blood-group education page: interactive compatibility explorer,
 * a plain-language explainer, and universal donor / recipient callouts.
 */
export default function BloodGroupsScreen() {
  return (
    <View className="flex-1 bg-paper">
      <SEO
        title="Blood Groups & Compatibility"
        description="Which blood groups can donate to whom? An interactive compatibility guide with plain-language notes."
      />
      <Header />
      <ScrollView className="flex-1 ambient-paper" showsVerticalScrollIndicator={false}>
        <Container className="py-12 md:py-20">
          <SectionHeader
            eyebrow="LEARN"
            title="Blood group compatibility"
            lede="Pick your group below to see who you can donate to and who you can receive from. Matching the right group to the right patient is what keeps transfusions safe — and it is exactly what the matching engine checks before alerting a donor."
          />

          <View className="mt-10">
            <CompatibilityTable />
          </View>

          <View className="mt-12">
            <SectionHeader
              eyebrow="WHY IT MATTERS"
              title="Not all blood is interchangeable"
            />
            <Card padding="lg" className="mt-6">
              <Text style={textStyles.body} className="text-ink">
                Red blood cells carry antigens — markers your immune system
                reads as “self” or “foreign”. Give a patient blood with
                antigens their body doesn’t recognize, and their immune system
                attacks it. That is why O− blood is precious in emergencies:
                it carries no A, B, or Rh antigens, so it can go to anyone
                while the lab confirms the patient’s exact type.
              </Text>
              <Text style={textStyles.body} className="text-ink mt-4">
                The Rh factor matters just as much. Rh-negative patients can
                generally only receive Rh-negative blood, which is why rare
                negative groups — O−, A−, B−, AB− — run short first in every
                blood bank. If you carry a negative group, you are covering
                the patients nobody else can.
              </Text>
              <Alert
                tone="info"
                title="Demo — fictional data"
                message="The chart above is for orientation. Real donation decisions are always confirmed by a hospital lab with a crossmatch test."
              />
            </Card>
          </View>

          <View className="mt-12 flex-col md:flex-row gap-4">
            <Card padding="lg" className="flex-1">
              <View className="flex-row items-center justify-between">
                <Text style={textStyles.eyebrow} className="text-muted">
                  UNIVERSAL DONOR
                </Text>
                <Badge tone="crimson">O−</Badge>
              </View>
              <Text style={textStyles.h2} className="text-ink mt-4 text-balance">
                One group for every emergency
              </Text>
              <Text style={textStyles.bodySmall} className="text-muted mt-3">
                O− red cells can be transfused to patients of any blood group,
                which makes O− the first choice when there is no time to type
                the patient. Hospitals burn through their O− reserve fastest —
                emergency demand never waits for a drive.
              </Text>
            </Card>
            <Card padding="lg" className="flex-1">
              <View className="flex-row items-center justify-between">
                <Text style={textStyles.eyebrow} className="text-muted">
                  UNIVERSAL RECIPIENT
                </Text>
                <Badge tone="ink">AB+</Badge>
              </View>
              <Text style={textStyles.h2} className="text-ink mt-4 text-balance">
                Can receive from everyone
              </Text>
              <Text style={textStyles.bodySmall} className="text-muted mt-3">
                AB+ patients carry no antibodies against A, B, or Rh, so they
                can safely receive red cells from any group. Flip side: AB+
                blood can only go to other AB+ patients, and AB− plasma is
                universal — the rarest group pulls double duty.
              </Text>
            </Card>
          </View>

          <Text style={textStyles.caption} className="text-muted mt-8 text-center">
            <Text style={{ fontFamily: fonts.monoSemiBold }}>NOTE — </Text>
            educational content, not medical advice. Always confirm with a
            hospital blood bank.
          </Text>
        </Container>

        <Footer />
      </ScrollView>
    </View>
  );
}
