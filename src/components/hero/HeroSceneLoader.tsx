"use client";
// Loads the 3D scene only in the browser (WebGL cannot run while the static
// pages are being built). Until it arrives, the plain gradient behind it shows.

import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export default function HeroSceneLoader() {
  return <HeroScene />;
}
