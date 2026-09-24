import React from 'react';
import { Modal as RNModal, Pressable, Text, View } from 'react-native';
import { shadows, textStyles } from '../../styles/theme';

export interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

/**
 * Centered dialog on a dimmed backdrop. Flat white card, hairline
 * border, one subtle float shadow — the only shadow in the system.
 */
export function Modal({ visible, onClose, title, children, footer }: ModalProps) {
  return (
    <RNModal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Close dialog"
        onPress={onClose}
        className="flex-1 items-center justify-center bg-black/50 px-6"
      >
        <Pressable
          onPress={(e) => e.stopPropagation()}
          className="w-full max-w-[480px] bg-white rounded-lg border border-hairline"
          style={shadows.float}
        >
          {title ? (
            <View className="px-6 pt-6 pb-4 border-b border-hairline">
              <Text className="text-ink" style={textStyles.h2}>
                {title}
              </Text>
            </View>
          ) : null}
          <View className="px-6 py-6">{children}</View>
          {footer ? <View className="px-6 pb-6">{footer}</View> : null}
        </Pressable>
      </Pressable>
    </RNModal>
  );
}
