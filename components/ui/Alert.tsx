import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { colors, fonts, typeScale } from '../../styles/theme';

export type AlertTone = 'info' | 'success' | 'warning' | 'error';

export interface AlertAction {
  label: string;
  onPress: () => void;
}

export interface AlertProps {
  tone?: AlertTone;
  title?: string;
  message: string;
  action?: AlertAction;
}

const toneStyles: Record<AlertTone, { bar: string; bg: string; text: string; eyebrow: string }> = {
  info: { bar: 'bg-ink', bg: 'bg-white', text: colors.ink, eyebrow: 'Note' },
  success: { bar: 'bg-leaf', bg: 'bg-leafSoft', text: colors.ink, eyebrow: 'Success' },
  warning: { bar: 'bg-amber', bg: 'bg-amberSoft', text: colors.ink, eyebrow: 'Heads up' },
  error: { bar: 'bg-crimson', bg: 'bg-crimsonSoft', text: colors.ink, eyebrow: 'Something went wrong' },
};

/**
 * Inline banner with a 3px tone bar. Calm, editorial — never a
 * screaming red box.
 */
export function Alert({ tone = 'info', title, message, action }: AlertProps) {
  const s = toneStyles[tone];
  return (
    <View
      accessibilityRole="alert"
      className={`flex-row rounded-md border border-hairline overflow-hidden ${s.bg}`}
    >
      <View className={`w-[3px] ${s.bar}`} />
      <View className="flex-1 px-4 py-3">
        <Text
          style={{
            fontFamily: fonts.monoSemiBold,
            fontSize: typeScale.xs - 1,
            letterSpacing: (typeScale.xs - 1) * 0.14,
            textTransform: 'uppercase',
            color: colors.muted,
          }}
        >
          {s.eyebrow}
        </Text>
        {title ? (
          <Text className="mt-1" style={{ fontFamily: fonts.sansSemiBold, fontSize: typeScale.base, color: s.text }}>
            {title}
          </Text>
        ) : null}
        <Text className="mt-1" style={{ fontFamily: fonts.sans, fontSize: typeScale.sm, lineHeight: typeScale.sm * 1.5, color: s.text }}>
          {message}
        </Text>
        {action ? (
          <Pressable accessibilityRole="button" onPress={action.onPress} className="mt-2 self-start">
            <Text style={{ fontFamily: fonts.sansSemiBold, fontSize: typeScale.sm, color: colors.crimson }}>
              {action.label}
            </Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}
