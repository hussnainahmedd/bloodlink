import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { colors, fonts, shadows, typeScale } from '../../styles/theme';

export interface TooltipProps {
  text: string;
  label?: string;
}

/**
 * Tap-to-reveal hint. A mono "i" in a hairline circle toggles a small
 * dark card above the trigger. No hover dependency — works on touch.
 */
export function Tooltip({ text, label = 'More information' }: TooltipProps) {
  const [open, setOpen] = useState(false);
  return (
    <View className="relative">
      {open ? (
        <View
          className="absolute bottom-8 left-1/2 -ml-28 w-56 bg-ink rounded-md p-3 z-10"
          style={shadows.float}
        >
          <Text style={{ fontFamily: fonts.sans, fontSize: typeScale.xs, lineHeight: typeScale.xs * 1.5, color: colors.paperOnDark }}>
            {text}
          </Text>
        </View>
      ) : null}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{ expanded: open }}
        onPress={() => setOpen((v) => !v)}
        className="w-5 h-5 rounded-full border border-hairline items-center justify-center bg-white"
      >
        <Text style={{ fontFamily: fonts.monoSemiBold, fontSize: 11, color: colors.muted }}>i</Text>
      </Pressable>
    </View>
  );
}
