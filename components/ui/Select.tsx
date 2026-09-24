import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  View,
} from 'react-native';
import { colors, fonts, textStyles, typeScale } from '../../styles/theme';

export interface SelectOption<T extends string = string> {
  label: string;
  value: T;
  hint?: string;
}

export interface SelectProps<T extends string = string> {
  label?: string;
  value: T | null;
  options: SelectOption<T>[];
  onChange: (value: T) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
}

/**
 * Bottom-sheet select. The field mirrors Input styling; options open in
 * a modal sheet with hairline-divided rows and a crimson check on the
 * selected row.
 */
export function Select<T extends string = string>({
  label,
  value,
  options,
  onChange,
  placeholder = 'Select an option',
  error,
  disabled = false,
}: SelectProps<T>) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value) ?? null;

  const pick = (option: SelectOption<T>) => {
    onChange(option.value);
    setOpen(false);
  };

  return (
    <View className="w-full">
      {label ? (
        <Text className="mb-2 text-ink" style={{ fontFamily: fonts.sansSemiBold, fontSize: typeScale.sm }}>
          {label}
        </Text>
      ) : null}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label ?? placeholder}
        accessibilityState={{ disabled, expanded: open }}
        disabled={disabled}
        onPress={() => setOpen(true)}
        className={`flex-row items-center justify-between bg-white rounded-md px-4 py-3 border ${
          error ? 'border-crimson' : 'border-hairline'
        } ${disabled ? 'opacity-50' : ''}`}
      >
        <Text
          className={selected ? 'text-ink' : 'text-muted'}
          style={{ fontFamily: fonts.sans, fontSize: typeScale.base }}
          numberOfLines={1}
        >
          {selected ? selected.label : placeholder}
        </Text>
        <Text className="text-muted" style={{ fontSize: typeScale.base }}>
          {'\u2304'}
        </Text>
      </Pressable>
      {error ? (
        <Text className="mt-2 text-crimson" style={{ fontFamily: fonts.sans, fontSize: typeScale.xs }}>
          {error}
        </Text>
      ) : null}

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable className="flex-1 justify-end bg-black/50" onPress={() => setOpen(false)}>
          <Pressable
            onPress={(e) => e.stopPropagation()}
            className="bg-white rounded-t-2xl border-t border-x border-hairline max-h-[70%]"
          >
            <View className="px-6 pt-5 pb-3 border-b border-hairline">
              <Text className="text-ink" style={textStyles.h3}>
                {label ?? placeholder}
              </Text>
            </View>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => {
                const isSelected = item.value === value;
                return (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityState={{ selected: isSelected }}
                    onPress={() => pick(item)}
                    className="flex-row items-center justify-between px-6 py-4 border-b border-hairline"
                  >
                    <View className="flex-1 pr-4">
                      <Text
                        style={{
                          fontFamily: isSelected ? fonts.sansSemiBold : fonts.sans,
                          fontSize: typeScale.base,
                          color: isSelected ? colors.crimson : colors.ink,
                        }}
                      >
                        {item.label}
                      </Text>
                      {item.hint ? (
                        <Text className="text-muted mt-1" style={{ fontFamily: fonts.sans, fontSize: typeScale.xs }}>
                          {item.hint}
                        </Text>
                      ) : null}
                    </View>
                    {isSelected ? (
                      <Text className="text-crimson" style={{ fontSize: typeScale.lg }}>
                        {'\u2713'}
                      </Text>
                    ) : null}
                  </Pressable>
                );
              }}
            />
            <View className="h-8" />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
