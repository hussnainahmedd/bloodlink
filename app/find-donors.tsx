import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { SEO } from '../components/layout/SEO';
import { DonorCard } from '../components/donors/DonorCard';
import {
  DonorFilters,
  type DonorFilters as DonorFilterState,
} from '../components/donors/DonorFilters';
import { EmptyState } from '../components/ui/EmptyState';
import { donors } from '../lib/demo';
import { textStyles } from '../styles/theme';

const initialFilters: DonorFilterState = {
  query: '',
  bloodGroup: 'all',
  maxDistance: 25,
  availableOnly: false,
};

/**
 * Donor discovery: search + group / distance / availability filters
 * over the demo donor registry.
 */
export default function FindDonorsScreen() {
  const [filters, setFilters] = useState<DonorFilterState>(initialFilters);

  const q = filters.query.trim().toLowerCase();
  const results = donors.filter((d) => {
    if (filters.bloodGroup !== 'all' && d.bloodGroup !== filters.bloodGroup) return false;
    if (d.distanceKm > filters.maxDistance) return false;
    if (filters.availableOnly && !d.available) return false;
    if (q && !`${d.name} ${d.city}`.toLowerCase().includes(q)) return false;
    return true;
  });

  return (
    <View className="flex-1 bg-paper">
      <SEO
        title="Find Donors"
        description="Search the BloodLink donor network by name, city, blood group, and distance."
      />
      <Header />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="max-w-6xl w-full mx-auto px-4 md:px-8 py-12 md:py-20">
          <Text style={textStyles.eyebrow} className="text-muted">
            DONOR NETWORK
          </Text>
          <Text style={textStyles.display} className="text-ink mt-3">
            Find donors near you
          </Text>
          <Text style={[textStyles.body, { color: '#44403C' }]} className="mt-4 max-w-xl">
            Search the registry by name or city, narrow it down by blood group
            and distance, and toggle to see only donors who are available
            right now. Every match shows last donation and total donations —
            so you can see the track record, not just the blood type.
          </Text>
        </View>

        <DonorFilters filters={filters} onChange={setFilters} resultCount={results.length} />

        <View className="max-w-6xl w-full mx-auto px-4 md:px-8 py-10">
          {results.length === 0 ? (
            <EmptyState
              mark="0"
              title="No donors match"
              message="Try widening the distance, clearing the search, or turning off the available-only toggle."
              actionLabel="Reset filters"
              onAction={() => setFilters(initialFilters)}
            />
          ) : (
            <View className="flex-col gap-4">
              {results.map((donor) => (
                <DonorCard key={donor.id} donor={donor} />
              ))}
            </View>
          )}
          <Text style={textStyles.caption} className="text-muted mt-8 text-center">
            Demo — fictional data
          </Text>
        </View>

        <Footer />
      </ScrollView>
    </View>
  );
}
