"use client";
// The loop that tells the story of the project:
// a plain ball rolls along the rail INTO the cube, and comes OUT the other
// side as a robot orb. Several balls are on the way at once, evenly spaced,
// so the movement never stops.

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Pod from "./Pod";
import RobotOrb from "./RobotOrb";

const COUNT = 3; // how many balls (and robots) are travelling at once
const LOOP_SECONDS = 12; // time for one ball to go from the start of the rail to the cube
const RAIL_START = -13; // where plain balls appear (far top-left, in the dark)
const EXIT_END = 12; // where robots disappear (bottom-right)
const RAIL_TOP = 0.3; // height of the rail the balls roll on
const BALL_RADIUS = 0.6;

// 0 → 1 smoothly as x goes from a to b
const ramp = (x: number, a: number, b: number) => THREE.MathUtils.smoothstep(x, a, b);

export default function Conveyor({ animate }: { animate: boolean }) {
  const balls = useRef<(THREE.Group | null)[]>([]);
  const robots = useRef<(THREE.Group | null)[]>([]);

  useFrame(({ clock }) => {
    const t = animate ? clock.elapsedTime : 0;
    for (let i = 0; i < COUNT; i++) {
      // progress of this ball: 0 = start of its trip, 1 = centre of the cube
      const p = (t / LOOP_SECONDS + i / COUNT) % 1;

      const ball = balls.current[i];
      if (ball) {
        const x = THREE.MathUtils.lerp(RAIL_START, 0, p);
        ball.position.x = x;
        // grows in at the start, shrinks away once it is inside the cube
        ball.scale.setScalar(ramp(p, 0, 0.06) * (1 - ramp(x, -1.1, -0.2)));
      }

      // The robot uses the same progress, so it leaves the cube at the very
      // moment its plain ball arrives there.
      const robot = robots.current[i];
      if (robot) {
        const x = THREE.MathUtils.lerp(0, EXIT_END, p);
        robot.position.x = x;
        robot.scale.setScalar(ramp(x, 0.2, 1.1) * (1 - ramp(p, 0.9, 1)));
      }
    }
  });

  const slots = Array.from({ length: COUNT }, (_, i) => i);
  return (
    <>
      {slots.map((i) => (
        <group key={`ball-${i}`} ref={(el) => { balls.current[i] = el; }} position={[RAIL_START, RAIL_TOP, 0]} scale={0}>
          <Pod radius={BALL_RADIUS} />
        </group>
      ))}
      {slots.map((i) => (
        <group key={`robot-${i}`} ref={(el) => { robots.current[i] = el; }} scale={0}>
          <RobotOrb position={[0, 0, 0]} radius={0.55} phase={i * 2.1} animate={animate} />
        </group>
      ))}
    </>
  );
}
