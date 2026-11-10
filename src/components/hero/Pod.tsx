"use client";
// A plain glossy graphite ball: a job seeker before matching.

import { Graphite } from "./Glow";

export default function Pod({ radius = 0.6 }: { radius?: number }) {
  return (
    <mesh position={[0, radius, 0]} castShadow receiveShadow>
      <sphereGeometry args={[radius, 48, 48]} />
      <Graphite />
    </mesh>
  );
}
