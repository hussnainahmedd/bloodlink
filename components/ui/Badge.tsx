import React from 'react';
import { Text, View, type ViewProps } from 'react-native';
import { colors, fonts, typeScale } from '../../styles/theme';

export type BadgeTone = 'crimson' | 'ink' | 'leaf' | 'amber' | 'muted' | 'outline';

export interface BadgeProps extends ViewProps {
  tone?: BadgeTone;
  children: React.ReactNode;
}

const containerClass: Record<BadgeTone, string> = {
  crimson: 'bg-crimsonSoft border border-crimson/25',
  ink: 'bg-ink',
  leaf: 'bg-leafSoft border border-leaf/25',
  amber: 'bg-amberSoft border border-amber/25',
  muted: 'bg-paperDeep border border-hairline',
  outline: 'bg-transparent border border-hairline',
};

const textColor: Record<BadgeTone, string> = {
  crimson: colors.crimson,
  ink: colors.paperOnDark,
  leaf: colors.leaf,
  amber: colors.amber,
  muted: colors.muted,
  outline: colors.ink,
};

/**
 * Small uppercase mono badge. Used for blood groups, statuses,
 * categories — anywhere a label needs to read as metadata.
 */
export function Badge({ tone = 'muted', children, className = '', ...rest }: BadgeProps) {
  return (
    <View className={`self-start rounded-md px-2.5 py-1 ${containerClass[tone]} ${className}`} {...rest}>
      <Text
        style={{
          fontFamily: fonts.monoSemiBold,
          fontSize: typeScale.xs - 1,
          letterSpacing: (typeScale.xs - 1) * 0.14,
          color: textColor[tone],
          textTransform: 'uppercase',
        }}
      >
        {children}
      </Text>
    </View>
  );
}
