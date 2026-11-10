// The Overview page's hero: 3D scene behind, text in front.
// Wide screens: the scene fills the whole first screen, under the navbar,
// with the text bottom-left. Phones: the scene is a short band above the text.

import HeroSceneLoader from "./HeroSceneLoader";
import HeroText from "./HeroText";

export default function Hero() {
  return (
    // The negative top margin slides the hero up behind the see-through navbar.
    <section className="relative -mt-[61px] overflow-hidden border-b border-border lg:-mt-[73px] lg:h-screen lg:min-h-[680px]">
      <div className="relative mt-[61px] h-[280px] lg:absolute lg:inset-0 lg:mt-0 lg:h-auto">
        {/* Shown while the 3D scene loads, or if it cannot run */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(212,255,58,0.14),transparent_45%)] lg:bg-[radial-gradient(circle_at_62%_48%,rgba(212,255,58,0.14),transparent_40%)]" />
        <HeroSceneLoader />
        {/* Fades the bottom of the band into the page on phones */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-bg to-transparent lg:hidden" />
      </div>

      {/* Dark patch behind the text so it stays readable over the scene */}
      <div className="pointer-events-none absolute inset-0 hidden bg-[radial-gradient(ellipse_at_0%_100%,#0B0B0C_0%,rgba(11,11,12,0.75)_32%,transparent_62%)] lg:block" />

      <div className="relative px-4 pb-10 pt-2 lg:absolute lg:bottom-[7%] lg:left-[5%] lg:p-0">
        <HeroText />
      </div>
    </section>
  );
}
