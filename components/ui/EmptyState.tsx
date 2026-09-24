import React from 'react';
import { Text, View } from 'react-native';
import { colors, fonts, textStyles } from '../../styles/theme';
import { Button } from './Button';

export interface EmptyStateProps {
  /** Single mono character shown in the hairline ring, e.g. "!" or "0" */
  mark?: string;
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

/**
 * Designed empty state. A hairline ring with a mono mark, a Fraunces
 * title, one honest sentence — never a grey illustration.
 */
export function EmptyState({ mark = '—', title, message, actionLabel, onAction }: EmptyStateProps) {
  return (
    <View className="items-center py-16 px-8">
      <View className="w-14 h-14 rounded-full border border-hairline items-center justify-center bg-white">
        <Text style={{ fontFamily: fonts.monoSemiBold, fontSize: 18, color: colors.muted }}>{mark}</Text>
      </View>
      <Text className="mt-6 text-center text-ink" style={textStyles.h2}>
        {title}
      </Text>
      <Text className="mt-3 text-center text-muted max-w-[320px]" style={textStyles.bodySmall}>
        {message}
      </Text>
      {actionLabel && onAction ? (
        <View className="mt-6">
          <Button title={actionLabel} onPress={onAction} variant="secondary" size="md" />
        </View>
      ) : null}
    </View>
  );
}
