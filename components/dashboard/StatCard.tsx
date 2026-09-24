import React from 'react';
import { Text, View } from 'react-native';
import { textStyles } from '../../styles/theme';
import { Card } from '../ui/Card';

export interface StatCardProps {
  value: string;
  label: string;
  sub?: string;
  tone?: 'ink' | 'crimson' | 'leaf' | 'amber';
}

const toneClass: Record<NonNullable<StatCardProps['tone']>, string> = {
  ink: 'text-ink',
  crimson: 'text-crimson',
  leaf: 'text-leaf',
  amber: 'text-amber',
};

/**
 * Single dashboard stat: mono number, uppercase label, optional sub-line.
 */
export function StatCard({ value, label, sub, tone = 'ink' }: StatCardProps) {
  return (
    <Card padding="md" className="flex-1 min-w-[140px]">
      <Text style={textStyles.stat} className={toneClass[tone]}>{value}</Text>
      <Text style={textStyles.caption} className="text-muted mt-1 uppercase tracking-widest">{label}</Text>
      {sub ? <Text style={textStyles.caption} className="text-muted mt-1">{sub}</Text> : null}
    </Card>
  );
}

export function StatRow({ children }: { children: React.ReactNode }) {
  return <View className="flex-col sm:flex-row gap-4">{children}</View>;
}
