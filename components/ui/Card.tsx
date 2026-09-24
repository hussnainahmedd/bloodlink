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
 * Frosted-glass card: translucent white surface, blur, bright hairline
 * edge, 12px radius. Floats over the ambient paper wash.
 */
export function Card({ padding = 'md', onPress, accessibilityLabel, children, className = '', ...rest }: CardProps) {
  const cls = `glass rounded-xl ${paddingClass[padding]} ${className}`;
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
