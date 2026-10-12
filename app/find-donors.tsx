import React, { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { BLOOD_GROUPS, CITIES, PROVINCES, donors, type Donor } from '../lib/demo';
import { classic, fonts } from '../styles/theme';
import { Container } from '../components/layout/Container';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { SEO } from '../components/layout/SEO';

const PAGE_BG = '#F4F5F7';
const BLUE = '#2563EB';
const GRAY_BTN = '#9AA0A6';
const PER_PAGE = 5;

const cardShadow = {
  backgroundColor: '#FFFFFF',
  borderRadius: 8,
  shadowColor: '#000',
  shadowOpacity: 0.06,
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 2 },
  elevation: 2,
} as const;

interface Filters {
  status: string;
  name: string;
  gender: string;
  age: string;
  province: string;
  city: string;
  bloodGroup: string;
  healthStatus: string;
}

const EMPTY: Filters = {
  status: 'All',
  name: '',
  gender: 'All',
  age: '',
  province: 'All',
  city: 'All',
  bloodGroup: 'All',
  healthStatus: 'All',
};

function Dropdown({
  id,
  openId,
  setOpenId,
  value,
  options,
  onChange,
}: {
  id: string;
  openId: string | null;
  setOpenId: (id: string | null) => void;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  const open = openId === id;
  return (
    <View style={{ minWidth: 150 }}>
      <Pressable
        accessibilityRole="button"
        onPress={() => setOpenId(open ? null : id)}
        style={{
          borderWidth: 1,
          borderColor: classic.hairline,
          borderRadius: 6,
          borderBottomLeftRadius: open ? 0 : 6,
          borderBottomRightRadius: open ? 0 : 6,
          paddingHorizontal: 12,
          paddingVertical: 9,
          backgroundColor: '#FFFFFF',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontFamily: fonts.sans, fontSize: 13, color: classic.ink }} numberOfLines={1}>
          {value}
        </Text>
        <Text style={{ fontFamily: fonts.sans, fontSize: 11, color: classic.muted, marginLeft: 8 }}>
          {open ? '▴' : '▾'}
        </Text>
      </Pressable>
      {open && (
        <View
          style={{
            borderWidth: 1,
            borderTopWidth: 0,
            borderColor: classic.hairline,
            borderBottomLeftRadius: 6,
            borderBottomRightRadius: 6,
            backgroundColor: '#FFFFFF',
            maxHeight: 210,
          }}
        >
          <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={true}>
            {options.map((opt) => {
              const selected = opt === value;
              return (
                <Pressable
                  key={opt}
                  accessibilityRole="button"
                  onPress={() => {
                    onChange(opt);
                    setOpenId(null);
                  }}
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 11,
                    backgroundColor: selected ? '#EAF1FE' : '#FFFFFF',
                  }}
                >
                  <Text
                    style={{
                      fontFamily: selected ? fonts.sansSemiBold : fonts.sans,
                      fontSize: 13,
                      color: selected ? '#1D4ED8' : classic.ink,
                    }}
                    numberOfLines={1}
                  >
                    {opt}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View className="flex-row items-center justify-between gap-3" style={{ paddingVertical: 8 }}>
      <Text style={{ fontFamily: fonts.sansMedium, fontSize: 14, color: classic.ink }}>{label}</Text>
      {children}
    </View>
  );
}

function DonorRow({ donor }: { donor: Donor }) {
  return (
    <View style={{ borderWidth: 1, borderColor: classic.hairline, borderRadius: 8, padding: 16, backgroundColor: '#FFFFFF' }}>
      <View className="flex-row items-start justify-between gap-3">
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: fonts.sansSemiBold, fontSize: 16, color: classic.ink }}>{donor.name}</Text>
          <Text style={{ fontFamily: fonts.sans, fontSize: 13, color: classic.muted, marginTop: 3 }}>
            {donor.gender} · {donor.age} yrs · {donor.city}, {donor.province}
          </Text>
        </View>
        <View style={{ backgroundColor: '#FDE8E9', borderRadius: 6, paddingHorizontal: 12, paddingVertical: 6 }}>
          <Text style={{ fontFamily: fonts.sansBold, fontSize: 14, color: classic.red }}>{donor.bloodGroup}</Text>
        </View>
      </View>
      <View className="flex-row items-center justify-between mt-3" style={{ borderTopWidth: 1, borderTopColor: '#F0EDE8', paddingTop: 10 }}>
        <View className="flex-row items-center gap-2">
          <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: donor.available ? '#2E9E5B' : '#B0B0B0' }} />
          <Text style={{ fontFamily: fonts.sansMedium, fontSize: 13, color: donor.available ? '#2E9E5B' : classic.muted }}>
            {donor.available ? 'Available now' : 'Not available'}
          </Text>
        </View>
        <Text style={{ fontFamily: fonts.sans, fontSize: 12, color: classic.muted }}>
          Last donation: {donor.lastDonation} · {donor.donations} total
        </Text>
      </View>
    </View>
  );
}

/**
 * Browse donors — classic BloodLink /search design: results card on the
 * left with pagination, FILTERS card on the right. Matches the original site.
 */
export default function FindDonorsScreen() {
  const [draft, setDraft] = useState<Filters>(EMPTY);
  const [applied, setApplied] = useState<Filters>(EMPTY);
  const [page, setPage] = useState(1);
  const [openId, setOpenId] = useState<string | null>(null);

  const dd = (id: string) => ({ id, openId, setOpenId });

  const set = (k: keyof Filters) => (v: string) => {
    setDraft((d) => ({ ...d, [k]: v }));
    setPage(1);
  };

  const results = donors.filter((d) => {
    if (applied.status === 'Available' && !d.available) return false;
    if (applied.status === 'Not available' && d.available) return false;
    if (applied.name.trim() && !d.name.toLowerCase().includes(applied.name.trim().toLowerCase())) return false;
    if (applied.gender !== 'All' && d.gender !== applied.gender) return false;
    if (applied.age.trim() && d.age !== Number(applied.age)) return false;
    if (applied.province !== 'All' && d.province !== applied.province) return false;
    if (applied.city !== 'All' && d.city !== applied.city) return false;
    if (applied.bloodGroup !== 'All' && d.bloodGroup !== applied.bloodGroup) return false;
    if (applied.healthStatus === 'Eligible' && d.healthStatus !== 'eligible') return false;
    if (applied.healthStatus === 'Deferred' && d.healthStatus !== 'deferred') return false;
    return true;
  });

  const pages = Math.max(1, Math.ceil(results.length / PER_PAGE));
  const safePage = Math.min(page, pages);
  const pageItems = results.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  const reset = () => {
    setDraft(EMPTY);
    setApplied(EMPTY);
    setPage(1);
  };

  return (
    <View className="flex-1" style={{ backgroundColor: PAGE_BG }}>
      <SEO title="Browse Donors" description="Browse the BloodLink donor registry and filter by status, blood group, city and more." />
      <Header />
      <ScrollView className="flex-1">
        <Container className="py-10 md:py-14">
          <View className="flex-col lg:flex-row gap-6 items-start">
            {/* results card */}
            <View style={{ ...cardShadow, flex: 2, width: '100%', padding: 24 }}>
              <View className="flex-row items-center justify-between mb-5">
                <Text style={{ fontFamily: fonts.sansBold, fontSize: 20, color: '#000', letterSpacing: 0.5 }}>
                  BROWSE DONORS
                </Text>
                <View className="flex-row items-center gap-2">
                  <Pressable
                    accessibilityRole="button"
                    disabled={safePage <= 1}
                    onPress={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    <Text style={{ fontFamily: fonts.sansSemiBold, fontSize: 14, color: safePage <= 1 ? '#C9CDD3' : classic.ink }}>
                      {'< '}
                    </Text>
                  </Pressable>
                  <Text style={{ fontFamily: fonts.sans, fontSize: 13, color: classic.muted }}>
                    Page {safePage} / {pages}
                  </Text>
                  <Pressable
                    accessibilityRole="button"
                    disabled={safePage >= pages}
                    onPress={() => setPage((p) => Math.min(pages, p + 1))}
                  >
                    <Text style={{ fontFamily: fonts.sansSemiBold, fontSize: 14, color: safePage >= pages ? '#C9CDD3' : classic.ink }}>
                      {' >'}
                    </Text>
                  </Pressable>
                </View>
              </View>

              {pageItems.length === 0 ? (
                <Text style={{ fontFamily: fonts.sans, fontSize: 15, color: classic.muted, textAlign: 'center', paddingVertical: 48 }}>
                  No Records Found
                </Text>
              ) : (
                <View className="gap-4">
                  {pageItems.map((d) => (
                    <DonorRow key={d.id} donor={d} />
                  ))}
                </View>
              )}
            </View>

            {/* filters card */}
            <View style={{ ...cardShadow, flex: 1, width: '100%', padding: 24 }}>
              <Text style={{ fontFamily: fonts.sansBold, fontSize: 17, color: '#000', textAlign: 'center', marginBottom: 8 }}>
                FILTERS
              </Text>

              <FilterRow label="Status">
                <Dropdown {...dd('status')} value={draft.status} options={['All', 'Available', 'Not available']} onChange={set('status')} />
              </FilterRow>
              <FilterRow label="Name">
                <TextInput
                  value={draft.name}
                  onChangeText={set('name')}
                  placeholder="Empty"
                  style={{
                    borderWidth: 1, borderColor: classic.hairline, borderRadius: 6,
                    paddingHorizontal: 12, paddingVertical: 9, backgroundColor: '#FFFFFF',
                    minWidth: 130, fontFamily: fonts.sans, fontSize: 13,
                  }}
                />
              </FilterRow>
              <FilterRow label="Gender">
                <Dropdown {...dd('gender')} value={draft.gender} options={['All', 'Male', 'Female']} onChange={set('gender')} />
              </FilterRow>
              <FilterRow label="Age">
                <TextInput
                  value={draft.age}
                  onChangeText={set('age')}
                  placeholder="0"
                  keyboardType="numeric"
                  style={{
                    borderWidth: 1, borderColor: classic.hairline, borderRadius: 6,
                    paddingHorizontal: 12, paddingVertical: 9, backgroundColor: '#FFFFFF',
                    minWidth: 130, fontFamily: fonts.sans, fontSize: 13,
                  }}
                />
              </FilterRow>
              <FilterRow label="Province">
                <Dropdown {...dd('province')} value={draft.province} options={['All', ...PROVINCES]} onChange={set('province')} />
              </FilterRow>
              <FilterRow label="City">
                <Dropdown {...dd('city')} value={draft.city} options={['All', ...CITIES]} onChange={set('city')} />
              </FilterRow>
              <FilterRow label="Blood Group">
                <Dropdown {...dd('bloodGroup')} value={draft.bloodGroup} options={['All', ...BLOOD_GROUPS]} onChange={set('bloodGroup')} />
              </FilterRow>
              <FilterRow label="Health Status">
                <Dropdown {...dd('healthStatus')} value={draft.healthStatus} options={['All', 'Eligible', 'Deferred']} onChange={set('healthStatus')} />
              </FilterRow>

              <View className="flex-row gap-3 mt-4">
                <Pressable
                  accessibilityRole="button"
                  onPress={reset}
                  style={{ flex: 1, backgroundColor: GRAY_BTN, borderRadius: 6, paddingVertical: 12, alignItems: 'center' }}
                >
                  <Text style={{ fontFamily: fonts.sansSemiBold, fontSize: 14, color: '#FFFFFF' }}>Reset</Text>
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => { setApplied(draft); setPage(1); }}
                  style={{ flex: 1, backgroundColor: BLUE, borderRadius: 6, paddingVertical: 12, alignItems: 'center' }}
                >
                  <Text style={{ fontFamily: fonts.sansSemiBold, fontSize: 14, color: '#FFFFFF' }}>Filter Results</Text>
                </Pressable>
              </View>
            </View>
          </View>

          <Text style={{ fontFamily: fonts.sans, fontSize: 12, color: classic.muted, textAlign: 'center', marginTop: 24 }}>
            Demo — fictional data
          </Text>
        </Container>
        <Footer />
      </ScrollView>
    </View>
  );
}
