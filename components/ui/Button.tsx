import React, { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  Text,
  View,
  type PressableProps,
} from 'react-native';
import { colors, fonts, typeScale } from '../../styles/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'dark';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<PressableProps, 'children'> {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const baseClass: Record<ButtonVariant, string> = {
  primary: 'bg-crimson',
  secondary: 'bg-transparent border border-hairline',
  ghost: 'bg-transparent',
  dark: 'bg-maroon',
};

const pressedClass: Record<ButtonVariant, string> = {
  primary: 'bg-crimsonDeep',
  secondary: 'bg-paperDeep',
  ghost: 'bg-crimsonSoft',
  dark: 'bg-maroonSoft',
};

const textClass: Record<ButtonVariant, string> = {
  primary: 'text-white',
  secondary: 'text-ink',
  ghost: 'text-crimson',
  dark: 'text-paperOnDark',
};

const sizeClass: Record<ButtonSize, string> = {
  sm: 'px-4 py-2',
  md: 'px-6 py-3',
  lg: 'px-8 py-4',
};

const labelSize: Record<ButtonSize, number> = {
  sm: typeScale.sm,
  md: typeScale.base,
  lg: typeScale.lg,
};

const spinnerColor: Record<ButtonVariant, string> = {
  primary: colors.white,
  secondary: colors.ink,
  ghost: colors.crimson,
  dark: colors.paperOnDark,
};

/**
 * Editorial button. Flat surfaces, 8px radius, hairline borders for
 * secondary. Crimson is reserved for the primary action only.
 */
export function Button({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  leftIcon,
  rightIcon,
  accessibilityLabel,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const [pressed, setPressed] = useState(false);
  const showPressed = pressed && !isDisabled;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      onPressIn={(e) => {
        setPressed(true);
        rest.onPressIn?.(e);
      }}
      onPressOut={(e) => {
        setPressed(false);
        rest.onPressOut?.(e);
      }}
      className={`rounded-lg flex-row items-center justify-center ${sizeClass[size]} ${
        showPressed ? pressedClass[variant] : baseClass[variant]
      } ${isDisabled ? 'opacity-50' : ''}`}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator size="small" color={spinnerColor[variant]} />
      ) : (
        <View className="flex-row items-center">
          {leftIcon ? <View className="mr-2">{leftIcon}</View> : null}
          <Text
            className={textClass[variant]}
            style={{ fontFamily: fonts.sansSemiBold, fontSize: labelSize[size] }}
          >
            {title}
          </Text>
          {rightIcon ? <View className="ml-2">{rightIcon}</View> : null}
        </View>
      )}
    </Pressable>
  );
}
