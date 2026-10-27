import { useState } from 'react';
import { ArrowUpRight, Clock3 } from 'lucide-react';
import { SiteLayout } from '../SiteLayout';
import {
  Eyebrow,
  PageTitle,
  PrimaryLink,
  QuietLink,
  Reveal,
  TopoLines,
  cn,
} from '../components';
import { ERAS, GEOLOGY_STORIES, IMAGES } from '../data';

function EraExplorer({
  activeEra,
  onChange,
}: {
  activeEra: number;
  onChange: (index: number) => void;
}) {
  const era = ERAS[activeEra];

  return (
    <section id="deep-time" className="relative overflow-hidden bg-[#f1ede4] py-24 text-[#171510] sm:py-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col justify-between gap-8 border-b border-[#d1c8ba] pb-9 lg:flex-row lg:items-end">
          <div>
            <Eyebrow index="01" light>
              The deep time atlas
            </Eyebrow>
            <h2 className="mt-6 max-w-2xl text-[clamp(2.7rem,4.8vw,4.9rem)] font-normal leading-[0.94] tracking-[-0.055em]">
              Five worlds,
              <span className="font-playfair italic"> held in stone.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-[#675e50]">
            Move through the archive. Each period is a different arrangement of
            the same planet — and a different way of being alive on it.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.32fr_0.68fr] lg:gap-14">
          <div className="flex flex-col border-t border-[#cfc5b7]">
            {ERAS.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onChange(index)}
                aria-pressed={activeEra === index}
                className={cn(
                  'group flex items-center justify-between border-b border-[#cfc5b7] py-5 text-left transition-colors',
                  activeEra === index ? 'text-[#171510]' : 'text-[#7e7465] hover:text-[#171510]',
                )}
              >
                <span className="flex items-center gap-4">
                  <span className="text-[9px] tracking-[0.14em] text-[#a19686]">0{index + 1}</span>
                  <span
                    className={cn(
                      'text-lg font-normal tracking-[-0.03em] transition-colors sm:text-xl',
                      activeEra === index && 'text-[#c25e27]',
                    )}
                  >
                    {item.name}
                  </span>
                </span>
                <span className="flex items-center gap-4">
                  <span className="text-[9px] uppercase tracking-[0.12em]">{item.range}</span>
                  <span
                    className={cn(
                      'h-1.5 w-1.5 rounded-full transition-colors',
                      activeEra === index ? 'bg-[#e8702a]' : 'bg-[#cec4b5]',
                    )}
                  />
                </span>
              </button>
            ))}
          </div>

          <div
            key={era.id}
            className="site-page-in relative min-h-[480px] overflow-hidden border border-[#d3c8b9] bg-[#e8e0d4] p-7 sm:p-10 lg:p-12"
          >
            <TopoLines
              className="absolute -right-28 -top-24 h-[620px] w-[780px] opacity-[0.18]"
              style={{ color: era.colour }}
            />
            <span
              className="pointer-events-none absolute -right-2 top-10 font-playfair text-[9rem] italic leading-none opacity-[0.08] sm:text-[15rem] lg:text-[19rem]"
              style={{ color: era.colour }}
            >
              {era.name.slice(0, 2)}
            </span>
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <Eyebrow index="Era in focus" light>
                    {era.range}
                  </Eyebrow>
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: era.colour }}
                  />
                </div>
                <h3 className="mt-10 max-w-2xl text-[clamp(2.2rem,4.2vw,4.6rem)] font-normal leading-[0.96] tracking-[-0.055em]">
                  {era.title}
                </h3>
                <p className="mt-7 max-w-2xl text-sm leading-[1.9] text-[#5d5548] sm:text-[15px]">
                  {era.body}
                </p>
              </div>

              <div className="mt-8 grid gap-7 border-t border-[#cbbfae] pt-6 sm:grid-cols-[0.7fr_1.3fr]">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.16em] text-[#8c8170]">Marker</p>
                  <p className="mt-2 text-sm text-[#3d372d]">{era.marker}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.16em] text-[#8c8170]">What survives</p>
                  <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
                    {era.evidence.map((item) => (
                      <span key={item} className="text-xs text-[#5d5548]">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function GeologyPage() {
  const [activeEra, setActiveEra] = useState(1);

  const selectEraFromBand = (index: number) => {
    setActiveEra(index);
    document.getElementById('deep-time')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <SiteLayout>
      <PageTitle title="Geology — Lithos" />
      <div className="site-page-in">
        <section className="site-grain relative overflow-hidden bg-[#080808] pb-0 pt-32 text-white sm:pt-40">
          <TopoLines className="absolute -right-48 -top-24 h-[860px] w-[1250px] text-white opacity-[0.08]" />
          <div className="absolute left-1/3 top-0 h-[550px] w-[550px] rounded-full bg-[#e8702a]/[0.055] blur-[120px]" />

          <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
              <Eyebrow index="The archive">Geology</Eyebrow>
              <p className="text-[9px] uppercase tracking-[0.22em] text-white/35">
                Notes from a planetary present
              </p>
            </div>

            <div className="grid gap-10 pb-16 pt-12 lg:grid-cols-[1.13fr_0.87fr] lg:items-end lg:gap-20 lg:pb-20">
              <Reveal>
                <h1 className="max-w-4xl text-[clamp(3.7rem,8.2vw,8.6rem)] font-normal leading-[0.84] tracking-[-0.07em]">
                  The ground is
                  <span className="block font-playfair italic text-[#cbd9bc]">a library.</span>
                </h1>
              </Reveal>
              <Reveal delay={140} className="lg:pb-2">
                <p className="max-w-md text-sm leading-[1.85] text-white/55 sm:text-base">
                  A slow-changing archive of fire, water, weather, and life. These
                  are the long stories we return to — not to master the planet,
                  but to learn how to read it.
                </p>
                <div className="mt-8 grid grid-cols-3 gap-5 border-t border-white/10 pt-5">
                  {[
                    ['4.6bn', 'years of record'],
                    ['05', 'eras in focus'],
                    ['01', 'edgeless archive'],
                  ].map(([value, label]) => (
                    <div key={label}>
                      <p className="text-xl font-light tracking-[-0.04em] sm:text-2xl">{value}</p>
                      <p className="mt-1 text-[8px] uppercase leading-relaxed tracking-[0.15em] text-white/30">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>

          <div className="grid w-full grid-cols-2 sm:grid-cols-5">
            {ERAS.map((era, index) => (
              <button
                key={era.id}
                type="button"
                onClick={() => selectEraFromBand(index)}
                aria-label={`Show the ${era.name} era`}
                aria-pressed={activeEra === index}
                className={cn(
                  'group relative flex min-h-[130px] flex-col justify-between overflow-hidden border-t border-white/15 p-4 text-left transition-all duration-500 hover:min-h-[150px] sm:min-h-[170px] sm:p-6',
                  index === ERAS.length - 1 && 'col-span-2 sm:col-span-1',
                )}
                style={{ backgroundColor: era.colour }}
              >
                <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:opacity-0" />
                <div className="relative flex items-center justify-between text-[9px] uppercase tracking-[0.14em] text-white/60">
                  <span>0{index + 1}</span>
                  <span className="h-1 w-1 rounded-full bg-white/70" />
                </div>
                <div className="relative">
                  <p className="text-base font-normal tracking-[-0.02em] text-white sm:text-xl">
                    {era.name}
                  </p>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.13em] text-white/50">
                    {era.range}
                  </p>
                </div>
                <ArrowUpRight
                  size={16}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/0 transition-all duration-300 group-hover:right-5 group-hover:text-white/80 sm:right-5"
                />
              </button>
            ))}
          </div>
        </section>

        <EraExplorer activeEra={activeEra} onChange={setActiveEra} />

        <section className="relative overflow-hidden bg-[#0b0b0a] py-24 text-white sm:py-32">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <Reveal>
                <Eyebrow index="02">Field dispatches</Eyebrow>
                <h2 className="mt-5 max-w-xl text-[clamp(2.5rem,4.2vw,4.3rem)] font-normal leading-[0.96] tracking-[-0.05em]">
                  From the edge of
                  <span className="font-playfair italic"> the map.</span>
                </h2>
              </Reveal>
              <Reveal delay={100} className="sm:pb-2">
                <p className="max-w-xs text-sm leading-relaxed text-white/45">
                  Short reports from the ground: places where the planet is
                  conspicuously still becoming itself.
                </p>
              </Reveal>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {GEOLOGY_STORIES.map((story, index) => (
                <Reveal key={story.title} delay={index * 100}>
                  <article className="group h-full border border-white/10 bg-white/[0.025]">
                    <div className="relative h-[220px] overflow-hidden">
                      <img
                        src={index === 0 ? IMAGES.moss : IMAGES.lava}
                        alt=""
                        className={cn(
                          'h-full w-full object-cover opacity-70 transition-all duration-700 group-hover:scale-[1.04] group-hover:opacity-90',
                          index === 0 ? 'object-[58%_center]' : index === 1 ? 'object-[42%_center]' : 'object-[66%_center] grayscale',
                        )}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0a] via-[#0b0b0a]/10 to-transparent" />
                      <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-black/25 px-3 py-1 text-[8px] uppercase tracking-[0.15em] text-white/80 backdrop-blur-sm">
                        {story.tag}
                      </span>
                      <span className="absolute right-4 top-4 text-[9px] uppercase tracking-[0.15em] text-white/55">
                        0{index + 1}
                      </span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between gap-4 text-[9px] uppercase tracking-[0.15em] text-white/35">
                        <span>{story.eyebrow}</span>
                        <span className="flex items-center gap-1.5">
                          <Clock3 size={10} /> {story.readTime}
                        </span>
                      </div>
                      <h3 className="mt-4 font-playfair text-3xl italic leading-[1.05] tracking-[-0.025em]">
                        {story.title}
                      </h3>
                      <p className="mt-4 text-sm leading-[1.75] text-white/45">{story.summary}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            <div className="mt-12 flex items-center justify-between border-t border-white/10 pt-6">
              <p className="max-w-md text-xs leading-relaxed text-white/35">
                The full geology journal is part of the Lithos archive. New
                dispatches arrive with each field season.
              </p>
              <QuietLink to="/field-guides">Explore the field library</QuietLink>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#e8702a] text-[#1a130e]">
          <TopoLines className="absolute -right-16 top-0 h-full w-[900px] opacity-20" />
          <div className="relative mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#2d1c11]/60">A working principle / 001</p>
                <blockquote className="mt-6 max-w-2xl font-playfair text-[clamp(2.1rem,4.3vw,4.4rem)] italic leading-[1.02] tracking-[-0.04em]">
                  “A landscape is not a scene. It is an argument that has been
                  going on for longer than we have.”
                </blockquote>
              </div>
              <div className="lg:justify-self-end lg:pb-2">
                <p className="max-w-xs text-sm leading-relaxed text-[#3b2415]/70">
                  Read a little deeper. Our field guides turn the ideas in this
                  atlas into a practice you can take outside.
                </p>
                <PrimaryLink
                  to="/field-guides"
                  className="mt-6 bg-[#17110c] text-white hover:bg-[#2b1d14] hover:shadow-black/20"
                >
                  Browse the field guides
                </PrimaryLink>
              </div>
            </div>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
