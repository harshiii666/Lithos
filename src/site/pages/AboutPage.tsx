import { ArrowDownRight } from 'lucide-react';
import { SiteLayout } from '../SiteLayout';
import {
  Eyebrow,
  PageTitle,
  PrimaryLink,
  QuietLink,
  Reveal,
  TopoLines,
} from '../components';

interface Maker {
  index: string;
  slug: string;
  initials: string;
  name: string;
  role: string;
  discipline: string;
  bio: string[];
  practice: string[];
  atLithos: string;
  /**
   * Portrait paths are resolved against the deployed base path so they work
   * both locally and on GitHub Pages.
   */
  portrait?: string;
}

const PORTRAIT_BASE = `${import.meta.env.BASE_URL}portraits/`;

const MAKERS: Maker[] = [
  {
    index: '01',
    slug: 'nisha',
    initials: 'N',
    name: 'Nisha',
    role: 'UI/UX Designer',
    discipline: 'Design',
    portrait: `${PORTRAIT_BASE}nisha.jpg`,
    bio: [
      'Nisha shapes how Lithos looks and feels — from the first line of a hero to the quiet rhythm of a field guide. Her work gives the site its editorial calm, its sense of place, and the small cues that help a visitor find their way.',
      'She works across typography, colour, layout, and interaction, keeping the surface expressive without letting it get in the way of the ground.',
    ],
    practice: ['Interface design', 'Visual systems', 'Interaction'],
    atLithos:
      'The look, the pacing, and the path through each page — held together by one visual language.',
  },
  {
    index: '02',
    slug: 'priyanshu',
    initials: 'P',
    name: 'Priyanshu',
    role: 'Lead Developer',
    discipline: 'Development',
    portrait: `${PORTRAIT_BASE}priyanshu.jpg`,
    bio: [
      'Priyanshu builds what holds Lithos together. He turns the design into a fast, responsive site, carrying its details carefully from the first sketch to the last breakpoint.',
      'His work lives in the front end, the component system, and the small technical decisions that make a large landscape feel effortless to move through.',
    ],
    practice: ['Front-end', 'Component systems', 'Motion'],
    atLithos:
      'Structure, performance, responsive behaviour, and the invisible mechanics behind every page.',
  },
];

function PortraitPlate({ maker }: { maker: Maker }) {
  return (
    <div className="relative min-h-[350px] overflow-hidden border-b border-[#c7baa8] bg-[#14110d] sm:min-h-[470px] lg:min-h-[620px] lg:border-b-0 lg:border-r">
      {maker.portrait ? (
        <>
          <img
            src={maker.portrait}
            alt={`Portrait of ${maker.name}`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/80 via-black/35 to-transparent" />
        </>
      ) : (
        <div
          role="img"
          aria-label={`Portrait of ${maker.name} forthcoming`}
          className="absolute inset-0"
        >
          <TopoLines className="absolute inset-0 h-full w-full text-[#f5f1e8] opacity-[0.10]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(232,112,42,0.16),transparent_58%)]" />
          <div className="absolute inset-3 border border-white/10 sm:inset-5" />

          <div
            aria-hidden="true"
            className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center"
          >
            <span className="font-playfair select-none text-[clamp(7rem,17vw,12rem)] italic leading-none text-[#f5f1e8]/20">
              {maker.initials}
            </span>
            <span className="mt-2 h-px w-14 bg-[#e8702a]/60" />
            <p className="mt-5 text-[8px] uppercase tracking-[0.24em] text-white/40">
              Portrait forthcoming
            </p>
            <p className="mt-2 max-w-[180px] text-[10px] leading-relaxed text-white/25">
              A field portrait of {maker.name} will rest here.
            </p>
          </div>

          <div
            aria-hidden="true"
            className="absolute inset-x-5 bottom-5 flex items-center justify-between gap-4 text-[8px] uppercase tracking-[0.18em] text-white/25"
          >
            <span>Lithos / makers</span>
            <span>{maker.name}</span>
          </div>

          <span
            aria-hidden="true"
            className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full border border-white/10"
          />
        </div>
      )}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-4 top-4 z-10 flex items-center justify-between gap-4 text-[8px] uppercase tracking-[0.2em] text-white/75 [text-shadow:0_1px_3px_rgba(0,0,0,0.8)] sm:inset-x-6 sm:top-6"
      >
        <span>Plate {maker.index}</span>
        <span>{maker.portrait ? 'Portrait' : 'Portrait reserved'}</span>
      </div>
    </div>
  );
}

function ProfileCard({ maker, order }: { maker: Maker; order: number }) {
  return (
    <Reveal delay={order * 120}>
      <article
        id={maker.slug}
        className="site-grain scroll-mt-28 overflow-hidden border border-[#c7baa8] bg-[#f8f3e9]"
      >
        <div className="grid lg:grid-cols-[0.43fr_0.57fr]">
          <PortraitPlate maker={maker} />

          <div className="flex flex-col p-6 sm:p-9 lg:p-11 xl:p-14">
            <div className="flex items-center justify-between gap-5 border-b border-[#d8ccbc] pb-4 text-[8px] uppercase tracking-[0.2em] text-[#8f8271] sm:text-[9px]">
              <span>Profile / {maker.index}</span>
              <span>{maker.discipline}</span>
            </div>

            <div className="mt-8">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#b25c2b]">
                {maker.role}
              </p>
              <h3 className="mt-3 font-playfair text-[clamp(3.7rem,6vw,6.2rem)] italic leading-[0.9] tracking-[-0.055em] text-[#17140f]">
                {maker.name}
              </h3>
              <div className="mt-7 max-w-xl space-y-4 text-sm leading-[1.85] text-[#5e5548]">
                {maker.bio.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-10">
              <div className="grid gap-6 border-t border-[#d8ccbc] pt-6 sm:grid-cols-[0.85fr_1.15fr]">
                <div>
                  <p className="text-[8px] uppercase tracking-[0.18em] text-[#948777]">
                    Practice
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {maker.practice.map((item) => (
                      <li
                        key={item}
                        className="border border-[#cabdab] px-3 py-1.5 text-[9px] uppercase tracking-[0.13em] text-[#5e5548]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[8px] uppercase tracking-[0.18em] text-[#948777]">
                    At Lithos
                  </p>
                  <p className="mt-4 text-xs leading-[1.8] text-[#6d6355]">
                    {maker.atLithos}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

const CREDITS = [
  { label: 'Design & interface', value: 'Nisha' },
  { label: 'Development', value: 'Priyanshu' },
  { label: 'Field office', value: '2026' },
] as const;

export default function AboutPage() {
  return (
    <SiteLayout>
      <PageTitle title="About — Lithos" />
      <div className="site-page-in">
        <section className="site-grain relative overflow-hidden bg-[#080808] pb-12 pt-32 text-white sm:pb-16 sm:pt-40">
          <div className="site-contour-grid absolute inset-0 opacity-70" />
          <TopoLines className="absolute -right-52 top-4 h-[780px] w-[1080px] text-white opacity-[0.07]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#080808] to-transparent" />

          <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end lg:gap-20">
              <div>
                <Reveal>
                  <Eyebrow index="About / 01">The people behind Lithos</Eyebrow>
                </Reveal>

                <Reveal delay={100}>
                  <h1 className="mt-7 max-w-4xl text-[clamp(3.2rem,7vw,7.4rem)] font-normal leading-[0.88] tracking-[-0.065em]">
                    Two hands.
                    <span className="block font-playfair italic font-normal text-[#d8e3ca]">
                      One field.
                    </span>
                  </h1>
                </Reveal>

                <Reveal delay={220}>
                  <p className="mt-8 max-w-xl text-sm leading-[1.85] text-white/55 sm:text-base">
                    Lithos is designed and built by Nisha and Priyanshu. Two
                    disciplines, one shared standard — make the field legible, and
                    keep the wonder intact.
                  </p>
                </Reveal>
              </div>

              <Reveal delay={340}>
                <div className="border-t border-white/15 pt-5">
                  <div className="flex items-center justify-between gap-5 text-[8px] uppercase tracking-[0.22em] text-white/35">
                    <span>Maker index</span>
                    <span>02 profiles</span>
                  </div>

                  <div className="mt-2 divide-y divide-white/10">
                    {MAKERS.map((maker) => (
                      <a
                        key={maker.slug}
                        href={`#${maker.slug}`}
                        className="group flex items-center gap-4 py-5"
                      >
                        <span className="w-5 shrink-0 text-[9px] tracking-[0.15em] text-white/30">
                          {maker.index}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-playfair text-2xl italic leading-none text-white/85 transition-colors group-hover:text-white">
                            {maker.name}
                          </span>
                          <span className="mt-1.5 block text-[8px] uppercase tracking-[0.18em] text-white/35">
                            {maker.role}
                          </span>
                        </span>
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/40 transition-all duration-300 group-hover:border-[#e8702a]/60 group-hover:text-[#e8702a]">
                          <ArrowDownRight size={14} strokeWidth={1.6} />
                        </span>
                      </a>
                    ))}
                  </div>

                  <p className="mt-5 text-[8px] uppercase tracking-[0.18em] text-white/25">
                    Independent field school / Design & development / 2026
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={420}>
              <div className="mt-14 flex flex-wrap justify-between gap-4 border-t border-white/10 pt-5 text-[9px] uppercase tracking-[0.18em] text-white/30">
                <span>One shared ground</span>
                <span className="hidden sm:inline">Reykjavík · Portland</span>
                <span>45°28′N&nbsp;&nbsp;122°42′W</span>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="site-grain relative overflow-hidden bg-[#f1ede4] py-20 text-[#17140f] sm:py-28">
          <TopoLines className="absolute -left-52 top-12 h-[760px] w-[1050px] text-[#746a5c] opacity-[0.11]" />
          <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
            <div className="grid gap-7 border-b border-[#c8bbaa] pb-10 lg:grid-cols-[0.62fr_0.38fr] lg:items-end lg:gap-16">
              <Reveal>
                <Eyebrow index="02" light>
                  The makers
                </Eyebrow>
                <h2 className="mt-6 text-[clamp(2.7rem,4.8vw,5rem)] font-normal leading-[0.92] tracking-[-0.06em]">
                  Different disciplines.
                  <span className="block font-playfair italic text-[#6c795f]">
                    Same attention.
                  </span>
                </h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="max-w-sm text-sm leading-[1.8] text-[#6b6152] lg:justify-self-end">
                  One shapes the surface of Lithos; the other builds the structure
                  beneath it. Both work from the same brief: a field school that
                  feels considered, clear, and alive.
                </p>
              </Reveal>
            </div>

            <div className="mt-9 flex flex-col gap-7">
              {MAKERS.map((maker, index) => (
                <ProfileCard key={maker.slug} maker={maker} order={index} />
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#0b0b0a] py-20 text-white sm:py-28">
          <div className="site-contour-grid absolute inset-0 opacity-40" />
          <TopoLines className="absolute -right-44 -top-24 h-[700px] w-[940px] text-white opacity-[0.06]" />
          <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
            <div className="grid gap-12 lg:grid-cols-[1fr_0.82fr] lg:items-end lg:gap-24">
              <Reveal>
                <Eyebrow index="03">A shared field</Eyebrow>
                <h2 className="mt-6 text-[clamp(2.8rem,5vw,5.3rem)] font-normal leading-[0.92] tracking-[-0.06em]">
                  A small team.
                  <span className="block font-playfair italic text-[#d8e3ca]">
                    A long view.
                  </span>
                </h2>
                <p className="mt-7 max-w-lg text-sm leading-[1.85] text-white/50">
                  Lithos began as a shared idea: that geology is less a subject than
                  a way of looking. Nisha gave it a surface. Priyanshu gave it
                  structure. The result is a field school built to be explored
                  slowly.
                </p>
              </Reveal>

              <Reveal delay={120}>
                <div className="border-t border-white/15">
                  {CREDITS.map((credit) => (
                    <div
                      key={credit.label}
                      className="flex items-center justify-between gap-6 border-b border-white/10 py-4"
                    >
                      <span className="text-[8px] uppercase tracking-[0.18em] text-white/30">
                        {credit.label}
                      </span>
                      <span className="text-sm text-white/70">{credit.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                  <PrimaryLink to="/course">Enter the field school</PrimaryLink>
                  <QuietLink to="/license">Site license</QuietLink>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
