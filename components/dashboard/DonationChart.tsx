import React from 'react';
import { Text, View } from 'react-native';
import Svg, { Line, Rect, Text as SvgText } from 'react-native-svg';
import { colors } from '../../styles/theme';

export interface DonationChartProps {
  /** 12 monthly values */
  data: number[];
  height?: number;
}

/**
 * Minimal editorial bar chart — flat crimson bars on hairline gridlines.
 * Hand-rolled SVG, no chart library.
 */
export function DonationChart({ data, height = 180 }: DonationChartProps) {
  const W = 600;
  const H = height;
  const padL = 36;
  const padB = 28;
  const padT = 12;
  const max = Math.max(...data, 1);
  const bw = (W - padL - 12) / data.length;

  return (
    <View accessibilityRole="image" accessibilityLabel="Bar chart of donations per month">
      <Svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`}>
        {[0.25, 0.5, 0.75, 1].map((f) => {
          const y = padT + (H - padT - padB) * (1 - f);
          return (
            <React.Fragment key={f}>
              <Line x1={padL} y1={y} x2={W - 6} y2={y} stroke={colors.hairline} strokeWidth={1} />
              <SvgText x={padL - 8} y={y + 4} textAnchor="end" fontSize={11} fill={colors.muted} fontFamily="monospace">
                {Math.round(max * f)}
              </SvgText>
            </React.Fragment>
          );
        })}
        {data.map((v, i) => {
          const bh = ((H - padT - padB) * v) / max;
          const x = padL + i * bw + bw * 0.22;
          const y = H - padB - bh;
          return (
            <Rect
              key={i}
              x={x}
              y={y}
              width={bw * 0.56}
              height={Math.max(bh, 2)}
              rx={3}
              fill={i === data.length - 1 ? colors.crimson : colors.ink}
              opacity={i === data.length - 1 ? 1 : 0.85}
            />
          );
        })}
      </Svg>
      <Text className="text-center text-xs text-muted mt-1">Donations per month · demo data</Text>
    </View>
  );
}
