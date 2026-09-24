import React from 'react';
import { Image, Text, View, type ViewProps } from 'react-native';
import { colors, fonts, typeScale } from '../../styles/theme';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps extends ViewProps {
  name: string;
  uri?: string;
  size?: AvatarSize;
}

const sizeClass: Record<AvatarSize, string> = {
  sm: 'w-8 h-8',
  md: 'w-11 h-11',
  lg: 'w-14 h-14',
  xl: 'w-20 h-20',
};

const labelSize: Record<AvatarSize, number> = {
  sm: typeScale.xs,
  md: typeScale.sm,
  lg: typeScale.base,
  xl: typeScale.xl,
};

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Donor avatar. Photo when available, otherwise warm maroon disc with
 * initials — never a grey placeholder silhouette.
 */
export function Avatar({ name, uri, size = 'md', className = '', ...rest }: AvatarProps) {
  return (
    <View
      accessibilityRole="image"
      accessibilityLabel={`Avatar for ${name}`}
      className={`rounded-full bg-maroon items-center justify-center overflow-hidden ${sizeClass[size]} ${className}`}
      {...rest}
    >
      {uri ? (
        <Image source={{ uri }} className="w-full h-full" resizeMode="cover" />
      ) : (
        <Text
          style={{
            fontFamily: fonts.sansSemiBold,
            fontSize: labelSize[size],
            color: colors.paperOnDark,
          }}
        >
          {initialsOf(name)}
        </Text>
      )}
    </View>
  );
}
