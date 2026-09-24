import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { colors, fonts, typeScale } from '../../styles/theme';

export interface TabOption<T extends string = string> {
  key: T;
  label: string;
}

export interface TabsProps<T extends string = string> {
  tabs: TabOption<T>[];
  value: T;
  onChange: (key: T) => void;
}

/**
 * Editorial underline tabs. Active tab gets ink text + a crimson rule;
 * the row sits on a single hairline — no pill backgrounds.
 */
export function Tabs<T extends string = string>({ tabs, value, onChange }: TabsProps<T>) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="border-b border-hairline">
      <View className="flex-row">
        {tabs.map((tab) => {
          const active = tab.key === value;
          return (
            <Pressable
              key={tab.key}
              accessibilityRole="tab"
              accessibilityState={{ selected: active }}
              onPress={() => onChange(tab.key)}
              className={`mr-8 pb-3 -mb-px border-b-2 ${active ? 'border-crimson' : 'border-transparent'}`}
            >
              <Text
                style={{
                  fontFamily: active ? fonts.sansSemiBold : fonts.sans,
                  fontSize: typeScale.base,
                  color: active ? colors.ink : colors.muted,
                }}
              >
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}
