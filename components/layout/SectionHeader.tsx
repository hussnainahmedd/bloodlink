import React from 'react';
import { Text, View } from 'react-native';
import { textStyles } from '../../styles/theme';

export interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  lede?: string;
  /** centered headers for CTAs and closers */
  align?: 'left' | 'center';
  dark?: boolean;
  className?: string;
}

/**
 * The editorial section header every page shares: mono eyebrow,
 * balanced serif title, quiet lede. One rhythm, everywhere.
 */
export function SectionHeader({
  eyebrow,
  title,
  lede,
  align = 'left',
  dark = false,
  className = '',
}: SectionHeaderProps) {
  const centered = align === 'center';
  return (
    <View className={`${centered ? 'items-center text-center' : 'items-start'} ${className}`}>
      <Text style={textStyles.eyebrow} className={dark ? 'text-crimson' : 'text-crimson'}>
        {eyebrow}
      </Text>
      <Text
        style={textStyles.display}
        className={`${dark ? 'text-paperOnDark' : 'text-ink'} mt-4 max-w-2xl text-balance ${
          centered ? 'text-center' : ''
        }`}
      >
        {title}
      </Text>
      {lede ? (
        <Text
          style={textStyles.body}
          className={`${dark ? 'text-mutedOnDark' : 'text-muted'} mt-4 max-w-xl ${
            centered ? 'text-center' : ''
          }`}
        >
          {lede}
        </Text>
      ) : null}
    </View>
  );
}
