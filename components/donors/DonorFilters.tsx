import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { BLOOD_GROUPS, type BloodGroup } from '../../lib/demo';
import { fonts, textStyles } from '../../styles/theme';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';
import { Container } from '../layout/Container';

export interface DonorFilters {
  query: string;
  bloodGroup: BloodGroup | 'all';
  maxDistance: number;
  availableOnly: boolean;
}

export interface DonorFiltersProps {
  filters: DonorFilters;
  onChange: (filters: DonorFilters) => void;
  resultCount: number;
}

const distanceOptions = [5, 10, 25, 50];

/**
 * Search + blood-group chips + distance + availability toggle.
 * Editorial filter bar on a paperDeep strip.
 */
export function DonorFilters({ filters, onChange, resultCount }: DonorFiltersProps) {
  const set = (patch: Partial<DonorFilters>) => onChange({ ...filters, ...patch });

  return (
    <View className="mt-8">
      <Container>
        <View className="glass rounded-2xl p-5 md:p-6">
        <Input
          placeholder="Search by name or city…"
          value={filters.query}
          onChangeText={(query) => set({ query })}
          accessibilityLabel="Search donors"
        />

        <Text style={textStyles.eyebrow} className="text-muted mt-5 mb-2">BLOOD GROUP</Text>
        <View className="flex-row flex-wrap gap-2">
          <FilterChip
            active={filters.bloodGroup === 'all'}
            label="All"
            onPress={() => set({ bloodGroup: 'all' })}
          />
          {BLOOD_GROUPS.map((g) => (
            <FilterChip
              key={g}
              active={filters.bloodGroup === g}
              label={g}
              onPress={() => set({ bloodGroup: g })}
            />
          ))}
        </View>

        <View className="flex-col sm:flex-row sm:items-end gap-4 mt-5">
          <View className="flex-1">
            <Text style={textStyles.eyebrow} className="text-muted mb-2">MAX DISTANCE</Text>
            <View className="flex-row gap-2">
              {distanceOptions.map((d) => (
                <FilterChip
                  key={d}
                  active={filters.maxDistance === d}
                  label={`${d} km`}
                  onPress={() => set({ maxDistance: d })}
                />
              ))}
            </View>
          </View>
          <Pressable
            accessibilityRole="checkbox"
            accessibilityState={{ checked: filters.availableOnly }}
            accessibilityLabel="Available donors only"
            onPress={() => set({ availableOnly: !filters.availableOnly })}
            className="flex-row items-center"
          >
            <View className={`w-5 h-5 rounded-md border mr-2 items-center justify-center ${filters.availableOnly ? 'bg-leaf border-leaf' : 'border-hairline bg-white'}`}>
              {filters.availableOnly ? (
                <Text style={{ fontSize: 12 }} className="text-white">✓</Text>
              ) : null}
            </View>
            <Text style={{ fontFamily: fonts.sansMedium, fontSize: 14 }} className="text-ink">
              Available now only
            </Text>
          </Pressable>
        </View>

        <View className="mt-5 pt-4 border-t border-hairline flex-row items-center">
          <Badge tone="ink">{String(resultCount)}</Badge>
          <Text style={textStyles.caption} className="text-muted ml-2">
            donor{resultCount === 1 ? '' : 's'} found · demo data
          </Text>
        </View>
        </View>
      </Container>
    </View>
  );
}

function FilterChip({ active, label, onPress }: { active: boolean; label: string; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      onPress={onPress}
      className={`rounded-md px-3.5 py-2 border ${active ? 'bg-ink border-ink' : 'bg-white border-hairline'}`}
    >
      <Text style={{ fontFamily: fonts.sansSemiBold, fontSize: 14 }} className={active ? 'text-white' : 'text-ink'}>
        {label}
      </Text>
    </Pressable>
  );
}
