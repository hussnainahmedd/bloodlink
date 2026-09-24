import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Container } from '../components/layout/Container';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { SEO } from '../components/layout/SEO';
import { SectionHeader } from '../components/layout/SectionHeader';
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
      <ScrollView className="flex-1 ambient-paper" showsVerticalScrollIndicator={false}>
        <Container className="pt-12 md:pt-20">
          <SectionHeader
            eyebrow="DONOR NETWORK"
            title="Find donors near you."
            lede="Search the registry by name or city, narrow it down by blood group and distance, and toggle to see only donors who are available right now. Every match shows last donation and total donations — so you can see the track record, not just the blood type."
          />
        </Container>

        <DonorFilters filters={filters} onChange={setFilters} resultCount={results.length} />

        <Container className="py-10">
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
        </Container>

        <Footer />
      </ScrollView>
    </View>
  );
}
