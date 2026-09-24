import React, { useRef, useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { colors, fonts, shadows, typeScale } from '../../styles/theme';

export interface DropdownItem {
  key: string;
  label: string;
  hint?: string;
  destructive?: boolean;
  onSelect: () => void;
}

export interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  accessibilityLabel?: string;
}

interface MenuPosition {
  x: number;
  y: number;
  width: number;
}

/**
 * Anchored popover menu. Measures the trigger and positions a small
 * flat card beneath it; closes on backdrop tap or item select.
 */
export function Dropdown({ trigger, items, accessibilityLabel = 'Open menu' }: DropdownProps) {
  const triggerRef = useRef<View>(null);
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<MenuPosition>({ x: 0, y: 0, width: 192 });

  const openMenu = () => {
    const node = triggerRef.current;
    if (node && typeof node.measure === 'function') {
      node.measure((_x, _y, width, _height, pageX, pageY) => {
        setPos({ x: pageX, y: pageY + _height + 6, width: Math.max(width, 192) });
        setOpen(true);
      });
    } else {
      setOpen(true);
    }
  };

  const choose = (item: DropdownItem) => {
    setOpen(false);
    item.onSelect();
  };

  return (
    <>
      <View ref={triggerRef} collapsable={false}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={accessibilityLabel}
          accessibilityState={{ expanded: open }}
          onPress={openMenu}
        >
          {trigger}
        </Pressable>
      </View>
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable className="flex-1" onPress={() => setOpen(false)}>
          <View
            className="absolute bg-white rounded-md border border-hairline py-1"
            style={[{ left: pos.x, top: pos.y, width: pos.width }, shadows.float]}
          >
            {items.map((item) => (
              <Pressable
                key={item.key}
                accessibilityRole="menuitem"
                onPress={() => choose(item)}
                className="px-4 py-3"
              >
                <Text
                  style={{
                    fontFamily: fonts.sans,
                    fontSize: typeScale.sm,
                    color: item.destructive ? colors.crimson : colors.ink,
                  }}
                >
                  {item.label}
                </Text>
                {item.hint ? (
                  <Text className="text-muted mt-0.5" style={{ fontFamily: fonts.sans, fontSize: typeScale.xs }}>
                    {item.hint}
                  </Text>
                ) : null}
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
