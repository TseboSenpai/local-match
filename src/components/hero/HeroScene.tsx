"use client";
// The 3D background of the hero, drawn with React Three Fiber (three.js for React).
// Everything is built from simple shapes; no model files are loaded.

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";
import { c } from "./colours";
import Cube from "./Cube";
import Conveyor from "./Conveyor";

// ---- Camera -----------------------------------------------------------------
// The camera looks down at about 38° from one corner. It never rotates: it only
// slides a little (slow drift + following the mouse), which gives a parallax feel.

const LEFT = new THREE.Vector3(-1, 0, 1).normalize(); // "left" as seen on screen
const DOWN = new THREE.Vector3(1, -0.6, 1).normalize(); // "down" as seen on screen

function CameraRig({ animate }: { animate: boolean }) {
  const { camera, size } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const offset = useRef(new THREE.Vector3());

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  // Wide screens: the cube sits right of centre, leaving room for the text.
  // Narrow screens (the short band on phones): the cube is centred and further away.
  const { target, distance } = useMemo(() => {
    const wide = size.width >= 1024;
    return {
      target: wide ? new THREE.Vector3(-0.9, 0, -0.9).addScaledVector(LEFT, 1.6) : new THREE.Vector3(0.7, 0.7, -0.2),
      distance: wide ? 23 : 21,
    };
  }, [size.width]);

  useFrame(({ clock }) => {
    const want = new THREE.Vector3();
    if (animate) {
      // eased back-and-forth drift towards the bottom-left: 4 s each way
      const drift = 0.5 - 0.5 * Math.cos((clock.elapsedTime * Math.PI) / 4);
      want.addScaledVector(LEFT, drift * 0.45).addScaledVector(DOWN, drift * 0.3);
      want.addScaledVector(LEFT, -mouse.current.x * 0.3).addScaledVector(DOWN, mouse.current.y * 0.2);
    }
    offset.current.lerp(want, 0.06);

    const direction = new THREE.Vector3(1, 1.1, 1).normalize();
    camera.position.copy(target).addScaledVector(direction, distance).add(offset.current);
    camera.lookAt(target.clone().add(offset.current));
  });

  return null;
}

// ---- Light through window blinds -------------------------------------------
// One warm "sun" light shines through a row of slats that sit above the camera,
// out of view. Their shadows are the diagonal stripes on the floor.

function BlindsLight() {
  const slats = Array.from({ length: 22 }, (_, i) => i - 11);
  return (
    <>
      <directionalLight
        position={[-9, 18, 5]}
        color="#FFF1DC"
        intensity={3.4}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-camera-near={1}
        shadow-camera-far={50}
        shadow-radius={7}
        shadow-bias={-0.0004}
      />
      <group position={[-6.5, 13, 3.6]} rotation={[0, 0.5, 0]}>
        {slats.map((i) => (
          <mesh key={i} position={[i * 1.5, 0, 0]} castShadow>
            <boxGeometry args={[0.8, 0.05, 44]} />
            {/* invisible to the camera, but still casts a shadow */}
            <meshBasicMaterial colorWrite={false} depthWrite={false} />
          </mesh>
        ))}
      </group>
    </>
  );
}

// ---- Floor and rail ---------------------------------------------------------

function Floor() {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[90, 90]} />
        <meshStandardMaterial color={c.surface} roughness={0.92} />
      </mesh>
      {/* faint panel seams */}
      <gridHelper args={[90, 18, c.borderSubtle, c.borderSubtle]} position={[2.5, 0.004, 2.5]} />
      {/* raised rail running from the top-left towards the cube */}
      <mesh position={[-10.4, 0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[18, 0.3, 2.7]} />
        <meshStandardMaterial color={c.raised} roughness={0.8} />
      </mesh>
    </>
  );
}

function Scene({ animate }: { animate: boolean }) {
  return (
    <>
      <color attach="background" args={[c.bg]} />
      <fog attach="fog" args={[c.bg, 15, 36]} />
      <CameraRig animate={animate} />

      <ambientLight intensity={0.25} />
      <BlindsLight />
      {/* Reflections for the glossy objects: a few soft light panels, kept dim. */}
      <Environment resolution={128} environmentIntensity={0.55}>
        <Lightformer form="rect" intensity={2.2} color="#FFF1DC" position={[-6, 6, 2]} scale={[8, 3, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={1} color="#F5F5F2" position={[6, 4, 6]} scale={[5, 2, 1]} target={[0, 0, 0]} />
        <Lightformer form="ring" intensity={1.5} color={c.accent} position={[0, -3, 0]} scale={4} target={[0, 0, 0]} />
      </Environment>

      <Floor />
      <Cube animate={animate} />
      <Conveyor animate={animate} />

      {/* Halo around the bright lime parts only (threshold 1 = brighter than white). */}
      <EffectComposer multisampling={4}>
        <Bloom mipmapBlur luminanceThreshold={1} luminanceSmoothing={0.2} intensity={0.55} radius={0.7} />
      </EffectComposer>
    </>
  );
}

export default function HeroScene() {
  const wrapper = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [active, setActive] = useState(true); // false when off-screen or the tab is hidden

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(query.matches);
    sync();
    query.addEventListener("change", sync);

    let onScreen = true;
    const update = () => setActive(onScreen && document.visibilityState === "visible");
    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      update();
    });
    if (wrapper.current) observer.observe(wrapper.current);
    document.addEventListener("visibilitychange", update);

    return () => {
      query.removeEventListener("change", sync);
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  // "always" = keep drawing; "never" = paused; "demand" = draw one still frame.
  const frameloop = reducedMotion ? "demand" : active ? "always" : "never";

  return (
    <div ref={wrapper} aria-hidden="true" className="hero-canvas absolute inset-0">
      <Canvas shadows={{ type: THREE.PCFShadowMap }} dpr={[1, 1.5]} frameloop={frameloop} camera={{ fov: 20, near: 0.5, far: 80 }} gl={{ antialias: false }}>
        <Scene animate={!reducedMotion} />
      </Canvas>
    </div>
  );
}
