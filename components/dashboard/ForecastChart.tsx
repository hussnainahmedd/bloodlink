import React from 'react';
import { Text, View } from 'react-native';
import Svg, { Circle, Line, Path, Rect, Text as SvgText } from 'react-native-svg';
import { colors } from '../../styles/theme';

export interface ForecastChartProps {
  /** predicted units needed per blood group */
  data: { group: string; predicted: number; current: number }[];
  height?: number;
}

/**
 * Demand forecast chart: current stock (hairline bars) vs predicted need
 * (crimson outline bars) per blood group. Editorial, flat, no decoration.
 */
export function ForecastChart({ data, height = 200 }: ForecastChartProps) {
  const W = 600;
  const H = height;
  const padL = 36;
  const padB = 28;
  const padT = 12;
  const max = Math.max(...data.flatMap((d) => [d.predicted, d.current]), 1);
  const bw = (W - padL - 12) / data.length;

  const line = data
    .map((d, i) => {
      const x = padL + i * bw + bw / 2;
      const y = padT + ((H - padT - padB) * (1 - d.predicted / max));
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <View accessibilityRole="image" accessibilityLabel="Forecast chart of predicted blood demand by group">
      <Svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`}>
        {[0.5, 1].map((f) => {
          const y = padT + (H - padT - padB) * (1 - f);
          return <Line key={f} x1={padL} y1={y} x2={W - 6} y2={y} stroke={colors.hairline} strokeWidth={1} />;
        })}
        {data.map((d, i) => {
          const bh = ((H - padT - padB) * d.current) / max;
          const x = padL + i * bw + bw * 0.28;
          const y = H - padB - bh;
          const px = padL + i * bw + bw / 2;
          const py = padT + ((H - padT - padB) * (1 - d.predicted / max));
          return (
            <React.Fragment key={d.group}>
              <Rect x={x} y={y} width={bw * 0.44} height={Math.max(bh, 2)} rx={3} fill={colors.skeleton} />
              <Circle cx={px} cy={py} r={4.5} fill={colors.crimson} />
              <SvgText x={px} y={H - 8} textAnchor="middle" fontSize={12} fill={colors.muted} fontFamily="monospace">
                {d.group}
              </SvgText>
            </React.Fragment>
          );
        })}
        <Path d={line} fill="none" stroke={colors.crimson} strokeWidth={2} strokeDasharray="6 4" opacity={0.8} />
      </Svg>
      <View className="flex-row justify-center gap-6 mt-1">
        <View className="flex-row items-center">
          <View className="w-3 h-3 rounded-sm bg-skeleton mr-1.5" />
          <Text className="text-xs text-muted">Current stock</Text>
        </View>
        <View className="flex-row items-center">
          <View className="w-3 h-3 rounded-full bg-crimson mr-1.5" />
          <Text className="text-xs text-muted">Predicted need</Text>
        </View>
      </View>
      <Text className="text-center text-xs text-muted mt-1">Next 30 days · demo forecast</Text>
    </View>
  );
}
