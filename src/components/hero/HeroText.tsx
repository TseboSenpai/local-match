// Headline, summary, byline and the two buttons. Plain HTML on top of the 3D scene.
// Each part fades in and rises on first load, 100 ms after the one before it
// (the "hero-rise" animation is in globals.css).

import Link from "next/link";

const rise = (step: number) => ({ className: "hero-rise", style: { animationDelay: `${step * 100}ms` } });

export default function HeroText() {
  return (
    <div className="max-w-[600px]">
      <h1 {...rise(0)} className="hero-rise text-[34px] font-extrabold leading-[1.05] tracking-[-0.025em] text-text lg:text-[clamp(48px,5vw,72px)]">
        Local-Aware
        <br />
        AI Job
        <br />
        Matching
      </h1>
      <p {...rise(1)} className="hero-rise mt-4 max-w-[560px] text-[17px] leading-normal text-text-2 lg:mt-5 lg:text-xl">
        An AI job-matching system that uses local knowledge — South African credentials, equivalence rules and
        location — to recommend fairer, more relevant jobs and training to job seekers in Limpopo.
      </p>
      <p {...rise(2)} className="hero-rise mt-4 text-[13px] leading-normal text-muted lg:text-sm">
        Tsebo Molatelo Molope · Honours in Computer Science (HRCOS82) · University of South Africa · 2026
      </p>
      <div {...rise(3)} className="hero-rise mt-6 flex flex-col gap-3 sm:flex-row lg:mt-7">
        <Link
          href="/run/#colab"
          className="inline-flex min-h-12 items-center justify-center rounded-lg bg-accent px-5 font-semibold text-on-accent hover:bg-accent-hover sm:min-h-11"
        >
          Open in Colab
        </Link>
        <Link
          href="/pipeline/"
          className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border-strong px-5 text-text hover:border-text"
        >
          See the pipeline →
        </Link>
      </div>
    </div>
  );
}
