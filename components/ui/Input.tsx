import React, { useState } from 'react';
import {
  Text,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';
import { colors, fonts, typeScale } from '../../styles/theme';

export interface InputProps extends Omit<TextInputProps, 'onChangeText'> {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

/**
 * Calm form input. 6px radius, hairline border; focus turns the border
 * ink, errors turn it crimson. Label sits above in semibold 14.
 */
export function Input({
  label,
  value,
  onChangeText,
  error,
  hint,
  leftIcon,
  rightIcon,
  editable = true,
  ...rest
}: InputProps) {
  const [focused, setFocused] = useState(false);
  const borderColor = error ? colors.crimson : focused ? colors.crimson : colors.hairline;

  return (
    <View className="w-full">
      {label ? (
        <Text className="mb-2 text-ink" style={{ fontFamily: fonts.sansSemiBold, fontSize: typeScale.sm }}>
          {label}
        </Text>
      ) : null}
      <View
        className="flex-row items-center bg-white rounded-md px-4"
        style={{
          borderWidth: 1,
          borderColor,
          opacity: editable ? 1 : 0.6,
          // Focus ring drawn on the wrapper (not the browser default outline),
          // so it always hugs the field's own border-radius.
          boxShadow:
            focused && !error ? '0 0 0 4px rgba(200, 16, 46, 0.12)' : undefined,
        }}
      >
        {leftIcon ? <View className="mr-3">{leftIcon}</View> : null}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          editable={editable}
          placeholderTextColor={colors.muted}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="flex-1 text-ink py-3"
          style={{ fontFamily: fonts.sans, fontSize: typeScale.base }}
          {...rest}
        />
        {rightIcon ? <View className="ml-3">{rightIcon}</View> : null}
      </View>
      {error ? (
        <Text className="mt-2 text-crimson" style={{ fontFamily: fonts.sans, fontSize: typeScale.xs }}>
          {error}
        </Text>
      ) : hint ? (
        <Text className="mt-2 text-muted" style={{ fontFamily: fonts.sans, fontSize: typeScale.xs }}>
          {hint}
        </Text>
      ) : null}
    </View>
  );
}
