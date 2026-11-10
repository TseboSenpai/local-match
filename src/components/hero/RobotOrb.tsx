"use client";
// A small hovering robot: graphite ball, panel lines, a ring cap, and a visor
// with two lime eyes. It bobs above a pulsing lime disc on the floor.

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { c } from "./colours";
import { FloorGlow, Graphite, LimeGlow } from "./Glow";

export default function RobotOrb({
  position,
  radius = 0.6,
  phase = 0, // shifts the bobbing so the two robots are out of step
  animate,
}: {
  position: [number, number, number];
  radius?: number;
  phase?: number;
  animate: boolean;
}) {
  const body = useRef<THREE.Group>(null);
  const disc = useRef<THREE.Group>(null);
  const hover = radius + 0.4;
  const faceTurn = Math.PI / 4; // turn the face towards the camera

  useFrame(({ clock }) => {
    if (!animate || !body.current || !disc.current) return;
    const t = clock.elapsedTime + phase;
    body.current.position.y = hover + Math.sin(t * 1.3) * 0.09;
    body.current.rotation.y = faceTurn + Math.sin(t * 0.7) * 0.22;
    const glow = disc.current.children[0] as THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>;
    glow.material.opacity = 0.4 + Math.sin(t * 1.3) * 0.15;
  });

  return (
    <group position={position}>
      <group ref={disc}>
        <FloorGlow radius={radius * 1.7} opacity={0.4} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
          <ringGeometry args={[radius * 0.5, radius * 0.56, 48]} />
          <meshBasicMaterial color={c.accent} toneMapped={false} />
        </mesh>
      </group>

      <group ref={body} position={[0, hover, 0]} rotation={[0, faceTurn, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[radius, 48, 48]} />
          <Graphite />
        </mesh>
        {/* panel lines */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius * 1.003, 0.012, 8, 64]} />
          <meshStandardMaterial color={c.borderStrong} roughness={0.5} />
        </mesh>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[radius * 1.003, 0.012, 8, 64]} />
          <meshStandardMaterial color={c.borderStrong} roughness={0.5} />
        </mesh>
        {/* ring cap on top */}
        <mesh position={[0, radius * 0.93, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius * 0.36, 0.05, 12, 40]} />
          <meshPhysicalMaterial color={c.borderStrong} roughness={0.25} metalness={0.5} clearcoat={1} />
        </mesh>
        <mesh position={[0, radius * 0.95, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius * 0.2, 0.015, 8, 32]} />
          <LimeGlow strength={1.8} />
        </mesh>
        {/* face, tilted up a little so it looks towards the camera */}
        <group rotation={[-0.5, 0, 0]}>
        <group position={[0, 0, radius * 0.86]}>
          <RoundedBox args={[radius * 0.95, radius * 0.44, 0.1]} radius={0.045} smoothness={3}>
            <meshStandardMaterial color={c.accentTint} emissive={c.accent} emissiveIntensity={0.18} roughness={0.3} />
          </RoundedBox>
          {[-1, 1].map((side) => (
            <mesh key={side} position={[side * radius * 0.2, 0, 0.055]}>
              <boxGeometry args={[radius * 0.15, radius * 0.2, 0.02]} />
              <LimeGlow strength={2.6} />
            </mesh>
          ))}
        </group>
        </group>
      </group>
    </group>
  );
}
