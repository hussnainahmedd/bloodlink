import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';
import Svg, { Circle, G, Line } from 'react-native-svg';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { colors } from '../../styles/theme';
import { Magnetic } from '../motion/Magnetic';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface NodeSpec {
  x: number;
  y: number;
  r: number;
  amp: number;
  speed: number;
  phase: number;
  accent: boolean;
}

/** Fixed constellation — designed, not random. viewBox is 800 x 600. */
const NODES: NodeSpec[] = [
  { x: 120, y: 140, r: 5, amp: 14, speed: 1.0, phase: 0.0, accent: false },
  { x: 260, y: 90, r: 4, amp: 10, speed: 0.7, phase: 1.2, accent: false },
  { x: 400, y: 130, r: 6, amp: 16, speed: 0.9, phase: 2.1, accent: true },
  { x: 540, y: 80, r: 4, amp: 12, speed: 1.1, phase: 0.6, accent: false },
  { x: 680, y: 150, r: 5, amp: 14, speed: 0.8, phase: 1.8, accent: false },
  { x: 180, y: 300, r: 4, amp: 12, speed: 0.9, phase: 2.9, accent: false },
  { x: 330, y: 270, r: 7, amp: 18, speed: 0.6, phase: 0.9, accent: true },
  { x: 480, y: 320, r: 4, amp: 10, speed: 1.2, phase: 1.5, accent: false },
  { x: 620, y: 280, r: 5, amp: 14, speed: 0.7, phase: 2.4, accent: false },
  { x: 90, y: 460, r: 4, amp: 12, speed: 1.0, phase: 1.1, accent: false },
  { x: 250, y: 430, r: 5, amp: 15, speed: 0.8, phase: 0.3, accent: false },
  { x: 420, y: 470, r: 6, amp: 13, speed: 1.1, phase: 2.7, accent: true },
  { x: 580, y: 440, r: 4, amp: 11, speed: 0.9, phase: 1.9, accent: false },
  { x: 710, y: 490, r: 5, amp: 14, speed: 0.7, phase: 0.5, accent: false },
];

const LINK_DISTANCE = 250;

function DriftingNode({ spec, t, reduced }: { spec: NodeSpec; t: SharedValue<number>; reduced: boolean }) {
  const animatedProps = useAnimatedProps(() => {
    if (reduced) return { cx: spec.x, cy: spec.y };
    const w = t.value * Math.PI * 2 * spec.speed + spec.phase;
    return {
      cx: spec.x + Math.sin(w) * spec.amp,
      cy: spec.y + Math.cos(w * 0.8) * spec.amp * 0.6,
    };
  });

  return (
    <AnimatedCircle
      animatedProps={animatedProps}
      r={spec.r}
      fill={spec.accent ? colors.crimson : colors.mutedOnDark}
      opacity={spec.accent ? 0.95 : 0.55}
    />
  );
}

function PulseRing({ x, y, delayMs }: { x: number; y: number; delayMs: number }) {
  const r = useSharedValue(6);
  const opacity = useSharedValue(0);

  useEffect(() => {
    r.value = withDelay(
      delayMs,
      withRepeat(
        withSequence(
          withTiming(30, { duration: 2600, easing: Easing.out(Easing.ease) }),
          withTiming(6, { duration: 0 }),
          withDelay(1800, withTiming(6, { duration: 0 })),
        ),
        -1,
      ),
    );
    opacity.value = withDelay(
      delayMs,
      withRepeat(
        withSequence(
          withTiming(0, { duration: 2600, easing: Easing.out(Easing.ease) }),
          withTiming(0.7, { duration: 0 }),
          withDelay(1800, withTiming(0.7, { duration: 0 })),
        ),
        -1,
      ),
    );
  }, [delayMs, r, opacity]);

  const animatedProps = useAnimatedProps(() => ({ r: r.value, opacity: opacity.value }));
  return <AnimatedCircle animatedProps={animatedProps} cx={x} cy={y} fill="none" stroke={colors.crimson} strokeWidth={1.5} />;
}

function StaticGraph() {
  const links: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let i = 0; i < NODES.length; i++) {
    for (let j = i + 1; j < NODES.length; j++) {
      const dx = NODES[i].x - NODES[j].x;
      const dy = NODES[i].y - NODES[j].y;
      if (Math.hypot(dx, dy) < LINK_DISTANCE) {
        links.push({ x1: NODES[i].x, y1: NODES[i].y, x2: NODES[j].x, y2: NODES[j].y });
      }
    }
  }
  return (
    <G>
      {links.map((l, i) => (
        <Line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke={colors.hairlineOnDark} strokeWidth={1} opacity={0.7} />
      ))}
      {NODES.map((n, i) => (
        <Circle key={i} cx={n.x} cy={n.y} r={n.r} fill={n.accent ? colors.crimson : colors.mutedOnDark} opacity={n.accent ? 0.95 : 0.55} />
      ))}
    </G>
  );
}

/**
 * The living donor network: a constellation of donor nodes drifting on
 * slow orbits, linked by hairlines, with two crimson "alert" pulses.
 * Pointer parallax via Magnetic on web; fully static under reduced motion.
 */
export function DonorNetwork() {
  const reduced = useReducedMotion();
  const t = useSharedValue(0);

  useEffect(() => {
    if (reduced) return;
    t.value = withRepeat(withTiming(1, { duration: 36000, easing: Easing.linear }), -1);
  }, [reduced, t]);

  const links: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let i = 0; i < NODES.length; i++) {
    for (let j = i + 1; j < NODES.length; j++) {
      const dx = NODES[i].x - NODES[j].x;
      const dy = NODES[i].y - NODES[j].y;
      if (Math.hypot(dx, dy) < LINK_DISTANCE) {
        links.push({ x1: NODES[i].x, y1: NODES[i].y, x2: NODES[j].x, y2: NODES[j].y });
      }
    }
  }

  return (
    <View className="w-full aspect-[4/3] md:aspect-[16/8]" accessibilityRole="image" accessibilityLabel="Abstract network of donor nodes connected across a map">
      <Magnetic strength={10} style={{ flex: 1 }}>
        <Svg width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          {reduced ? (
            <StaticGraph />
          ) : (
            <G>
              {links.map((l, i) => (
                <Line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke={colors.hairlineOnDark} strokeWidth={1} opacity={0.7} />
              ))}
              <PulseRing x={400} y={130} delayMs={0} />
              <PulseRing x={420} y={470} delayMs={2200} />
              {NODES.map((n, i) => (
                <DriftingNode key={i} spec={n} t={t} reduced={reduced} />
              ))}
            </G>
          )}
        </Svg>
      </Magnetic>
    </View>
  );
}
