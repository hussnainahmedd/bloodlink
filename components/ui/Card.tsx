import React from 'react';
import { Pressable, View, type ViewProps } from 'react-native';

export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends ViewProps {
  padding?: CardPadding;
  onPress?: () => void;
  accessibilityLabel?: string;
}

const paddingClass: Record<CardPadding, string> = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

/**
 * Flat card: white surface, 1px hairline border, 8px radius.
 * No shadows, no gradients — restraint is the design.
 */
export function Card({ padding = 'md', onPress, accessibilityLabel, children, className = '', ...rest }: CardProps) {
  const cls = `bg-white border border-hairline rounded-lg ${paddingClass[padding]} ${className}`;
  if (onPress) {
    return (
      <Pressable accessibilityRole="button" accessibilityLabel={accessibilityLabel} onPress={onPress} className={cls} {...rest}>
        {children}
      </Pressable>
    );
  }
  return (
    <View className={cls} {...rest}>
      {children}
    </View>
  );
}
