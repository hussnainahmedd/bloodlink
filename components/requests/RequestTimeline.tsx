import React from 'react';
import { Text, View } from 'react-native';
import { timelineSteps } from '../../lib/demo';
import { fonts, textStyles } from '../../styles/theme';

export interface RequestTimelineProps {
  currentStatus: 'matching' | 'alerted' | 'responding' | 'fulfilled';
}

const statusIndex: Record<RequestTimelineProps['currentStatus'], number> = {
  matching: 1,
  alerted: 2,
  responding: 3,
  fulfilled: 4,
};

/**
 * Live request timeline: requested → matching → alerted → responding →
 * fulfilled. Completed steps in crimson, current step pulsing.
 */
export function RequestTimeline({ currentStatus }: RequestTimelineProps) {
  const current = statusIndex[currentStatus];

  return (
    <View accessibilityRole="list" accessibilityLabel="Request status timeline">
      {timelineSteps.map((step, i) => {
        const done = i < current;
        const isCurrent = i === current;
        const isLast = i === timelineSteps.length - 1;
        return (
          <View key={step.key} className="flex-row">
            <View className="items-center mr-4">
              <View
                className={`w-8 h-8 rounded-full items-center justify-center border ${
                  done ? 'bg-crimson border-crimson' : isCurrent ? 'border-crimson bg-crimsonSoft' : 'border-hairline bg-white'
                }`}
              >
                {done ? (
                  <Text style={{ fontSize: 14 }} className="text-white">✓</Text>
                ) : (
                  <View className={`w-2 h-2 rounded-full ${isCurrent ? 'bg-crimson' : 'bg-hairline'}`} />
                )}
              </View>
              {!isLast ? (
                <View className={`w-px flex-1 my-1 ${done ? 'bg-crimson' : 'bg-hairline'}`} />
              ) : null}
            </View>
            <View className="pb-8 flex-1">
              <Text
                style={{ fontFamily: isCurrent || done ? fonts.sansSemiBold : fonts.sans, fontSize: 16 }}
                className={isCurrent ? 'text-crimson' : 'text-ink'}
              >
                {step.label}
                {isCurrent ? ' — in progress' : ''}
              </Text>
              <Text style={textStyles.caption} className="text-muted mt-0.5">{step.detail}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}
