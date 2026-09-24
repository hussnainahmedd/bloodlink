import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { SEO } from '../../components/layout/SEO';
import { Container } from '../../components/layout/Container';
import { SectionHeader } from '../../components/layout/SectionHeader';
import { ForecastChart } from '../../components/dashboard/ForecastChart';
import { Alert } from '../../components/ui/Alert';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { fonts, textStyles } from '../../styles/theme';

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

const maxUnits = Math.max(...forecastData.flatMap((d) => [d.predicted, d.current]));

function GroupForecastRow({ group, predicted, current }: { group: string; predicted: number; current: number }) {
  const shortfall = predicted - current;
  return (
    <View className="py-5 border-b border-hairline">
      <View className="flex-row items-center justify-between">
        <Badge tone={group.includes('-') ? 'crimson' : 'outline'}>{group}</Badge>
        {shortfall > 0 ? (
          <Text style={textStyles.caption} className="text-crimson">
            SHORTFALL {shortfall} UNITS
          </Text>
        ) : (
          <Text style={textStyles.caption} className="text-leaf">
            COVERED
          </Text>
        )}
      </View>

      <View className="mt-4">
        <View className="flex-row items-center justify-between mb-1.5">
          <Text style={textStyles.caption} className="text-muted">
            Predicted need
          </Text>
          <Text style={{ fontFamily: fonts.monoSemiBold, fontSize: 12 }} className="text-ink">
            {predicted} units
          </Text>
        </View>
        <View className="h-2 rounded-sm bg-skeleton overflow-hidden">
          <View style={{ width: `${(predicted / maxUnits) * 100}%` }} className="h-2 bg-crimson rounded-sm" />
        </View>
      </View>

      <View className="mt-3">
        <View className="flex-row items-center justify-between mb-1.5">
          <Text style={textStyles.caption} className="text-muted">
            Current reserve
          </Text>
          <Text style={{ fontFamily: fonts.monoSemiBold, fontSize: 12 }} className="text-ink">
            {current} units
          </Text>
        </View>
        <View className="h-2 rounded-sm bg-skeleton overflow-hidden">
          <View style={{ width: `${(current / maxUnits) * 100}%` }} className="h-2 bg-ink rounded-sm" />
        </View>
      </View>
    </View>
  );
}

/**
 * Hospital demand forecast: explainer, large forecast chart,
 * and per-group predicted-vs-current bars.
 */
export default function HospitalForecastsScreen() {
  return (
    <View className="flex-1 bg-paper">
      <SEO
        title="Demand Forecast"
        description="Thirty-day blood demand forecast per group for Demo General Hospital."
      />
      <Header />
      <ScrollView className="flex-1 ambient-paper" showsVerticalScrollIndicator={false}>
        <Container className="py-12 md:py-20">
          <SectionHeader
            eyebrow="FORECAST"
            title="Demand, before it happens"
            lede="The forecasting model looks at seasonal donation patterns, scheduled surgeries, and historical emergency draw to predict how many units of each blood group the hospital will need over the next thirty days — so drives can be planned for the groups that will actually run short."
          />

          <View className="mt-10">
            <Card padding="lg">
              <Text style={textStyles.h2} className="text-ink text-balance">
                Next 30 days, all groups
              </Text>
              <View className="flex-row gap-6 mt-3 mb-2">
                <View className="flex-row items-center">
                  <View className="w-3 h-3 rounded-sm bg-crimson mr-1.5" />
                  <Text style={textStyles.caption} className="text-muted">
                    Predicted need
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <View className="w-3 h-3 rounded-sm bg-ink mr-1.5" />
                  <Text style={textStyles.caption} className="text-muted">
                    Current reserve
                  </Text>
                </View>
              </View>
              <ForecastChart data={forecastData} height={280} />
            </Card>
          </View>

          <View className="mt-8">
            <Card padding="lg">
              <Text style={textStyles.h2} className="text-ink text-balance">
                Group by group
              </Text>
              <Text style={textStyles.caption} className="text-muted mt-2">
                Bars are scaled to the largest value across all groups.
              </Text>
              <View className="mt-2">
                {forecastData.map((d) => (
                  <GroupForecastRow key={d.group} group={d.group} predicted={d.predicted} current={d.current} />
                ))}
              </View>
            </Card>
          </View>

          <View className="mt-8">
            <Alert
              tone="warning"
              title="Planning note"
              message="B− shows the widest shortfall in this forecast. The model suggests prioritizing rare-negative donors at the next two drives."
            />
          </View>

          <Text style={textStyles.caption} className="text-muted mt-8 text-center">
            Demo — fictional data · forecasts are simulated
          </Text>
        </Container>

        <Footer />
      </ScrollView>
    </View>
  );
}
