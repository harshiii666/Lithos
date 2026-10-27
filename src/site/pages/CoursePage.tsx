import { useState } from 'react';
import {
  Check,
  ChevronDown,
  Clock3,
  Compass,
  Layers3,
  Play,
} from 'lucide-react';
import { SiteLayout } from '../SiteLayout';
import {
  Eyebrow,
  Marquee,
  PrimaryLink,
  PageTitle,
  QuietLink,
  Reveal,
  Stat,
  TopoLines,
  cn,
} from '../components';
import { COURSE_CHAPTERS, COURSE_FACTS, FIELD_FACULTY, IMAGES } from '../data';

function CoreSample() {
  const layers = [
    { label: 'Organic horizon', depth: '0.0 m', tint: 'rgba(50, 62, 40, 0.74)' },
    { label: 'Volcanic ash', depth: '0.4 m', tint: 'rgba(204, 134, 74, 0.58)' },
    { label: 'Basalt flow', depth: '1.2 m', tint: 'rgba(17, 18, 19, 0.8)' },
    { label: 'Palagonite', depth: '2.8 m', tint: 'rgba(115, 74, 45, 0.65)' },
    { label: 'Sea-floor sediment', depth: '4.0 m', tint: 'rgba(23, 37, 34, 0.72)' },
  ];

  return (
    <div className="relative mx-auto w-full max-w-[370px]">
      <div className="absolute -inset-10 rounded-full bg-[#e8702a]/10 blur-3xl" />
      <div className="relative overflow-hidden rounded-[180px_180px_26px_26px] border border-white/20 bg-white/[0.035] p-4 backdrop-blur-md">
        <div className="flex items-center justify-between px-2 pb-4 text-[9px] uppercase tracking-[0.2em] text-white/45">
          <span>Core sample</span>
          <span>LTHS–04</span>
        </div>

        <div className="relative h-[390px] overflow-hidden rounded-[160px_160px_14px_14px] sm:h-[450px]">
          <img
            src={IMAGES.lava}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0d0d0b]/20" />
          {layers.map((layer, index) => (
            <div
              key={layer.label}
              className={cn(
                'relative z-10 flex items-end justify-between border-t border-white/20 px-4 pb-3 transition-all duration-500 hover:pb-5',
                index === 0 && 'rounded-t-[160px]',
              )}
              style={{
                height: `${100 / layers.length}%`,
                backgroundColor: layer.tint,
              }}
            >
              <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-white/60">
                {layer.depth}
              </span>
              <span className="text-[9px] font-medium uppercase tracking-[0.12em] text-white/85">
                {layer.label}
              </span>
            </div>
          ))}
          <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
        </div>

        <div className="flex items-center justify-between px-2 pt-4 text-[9px] uppercase tracking-[0.18em] text-white/40">
          <span>62°03′N / 21°56′W</span>
          <span className="flex items-center gap-1.5 text-[#d8c7a6]">
            <span className="site-live-dot" /> Field season 04
          </span>
        </div>
      </div>
    </div>
  );
}

function Curriculum() {
  const [openChapter, setOpenChapter] = useState(0);

  return (
    <section id="curriculum" className="relative overflow-hidden bg-[#f1ede4] text-[#17150f]">
      <div className="site-contour-grid absolute inset-0 opacity-[0.4]" />
      <div className="relative mx-auto max-w-[1440px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:gap-24">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow index="02" light>
              The curriculum
            </Eyebrow>
            <h2 className="mt-7 max-w-md text-[clamp(2.7rem,4.8vw,4.8rem)] font-normal leading-[0.94] tracking-[-0.055em]">
              Six chapters.
              <br />
              <span className="font-playfair italic">One planetary story.</span>
            </h2>
            <p className="mt-7 max-w-sm text-sm leading-[1.8] text-[#6a6255]">
              Each chapter is built around a question you can ask a real
              landscape. Work through it at your own pace, with a field notebook,
              a hand lens, and no prior geology required.
            </p>

            <div className="mt-10 border border-[#d3cabd] bg-[#e9e3d8]/80 p-5">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
                  <img src={IMAGES.moss} alt="" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-[#1d2719]/25" />
                </div>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#8b5a36]">
                    Included in every seat
                  </p>
                  <p className="mt-1.5 text-sm font-medium text-[#201d17]">
                    One live field day
                  </p>
                </div>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-[#6a6255]">
                Join Imani and the cohort for a live, two-hour reading of a
                coastal landscape — with time to test what you have learned.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-7 gap-y-4 text-[10px] uppercase tracking-[0.15em] text-[#766c5c]">
              <span className="flex items-center gap-2">
                <Clock3 size={13} /> 6 hours total
              </span>
              <span className="flex items-center gap-2">
                <Layers3 size={13} /> 28 lessons
              </span>
            </div>
          </div>

          <div className="border-t border-[#d5ccbe]">
            {COURSE_CHAPTERS.map((chapter, index) => {
              const isOpen = openChapter === index;
              return (
                <div key={chapter.number} className="border-b border-[#d5ccbe]">
                  <button
                    type="button"
                    className="group flex w-full items-start gap-4 py-6 text-left sm:items-center sm:gap-7 sm:py-7"
                    aria-expanded={isOpen}
                    aria-controls={`chapter-${chapter.number}`}
                    onClick={() => setOpenChapter(isOpen ? -1 : index)}
                  >
                    <span
                      className={cn(
                        'mt-1 text-[10px] font-medium tracking-[0.12em] transition-colors sm:mt-0',
                        isOpen ? 'text-[#e8702a]' : 'text-[#9b9182]',
                      )}
                    >
                      {chapter.number}
                    </span>
                    <span className="flex-1">
                      <span
                        className={cn(
                          'block text-xl font-normal tracking-[-0.035em] transition-colors sm:text-2xl',
                          isOpen ? 'text-[#17150f]' : 'text-[#3d382f] group-hover:text-[#17150f]',
                        )}
                      >
                        {chapter.title}
                      </span>
                      <span className="mt-1.5 block text-[10px] uppercase tracking-[0.14em] text-[#8d8374]">
                        {chapter.lessons} lessons · {chapter.duration}
                      </span>
                    </span>
                    <span
                      className={cn(
                        'mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 sm:mt-0',
                        isOpen
                          ? 'rotate-180 border-[#e8702a] bg-[#e8702a] text-white'
                          : 'border-[#c8beaf] text-[#5f574a] group-hover:border-[#8c8171]',
                      )}
                    >
                      <ChevronDown size={15} strokeWidth={1.7} />
                    </span>
                  </button>

                  <div
                    id={`chapter-${chapter.number}`}
                    className={cn(
                      'grid transition-all duration-500 ease-out',
                      isOpen ? 'grid-rows-[1fr] pb-8 opacity-100' : 'grid-rows-[0fr] opacity-0',
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="ml-0 max-w-xl sm:ml-10">
                        <p className="text-sm leading-[1.8] text-[#645b4e]">{chapter.summary}</p>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {chapter.topics.map((topic) => (
                            <span
                              key={topic}
                              className="rounded-full border border-[#ccc1b1] px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] text-[#5d5447]"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CoursePage() {
  return (
    <SiteLayout>
      <PageTitle title="Course — Lithos" />
      <div className="site-page-in">
        <section className="site-grain relative flex min-h-[100svh] items-center overflow-hidden bg-[#080808] pb-16 pt-32 text-white sm:pb-20 sm:pt-36">
          <div className="absolute inset-0">
            <img
              src={IMAGES.lava}
              alt=""
              className="h-full w-full scale-[1.04] object-cover object-[65%_center] opacity-60"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,#080808_0%,rgba(8,8,8,0.92)_32%,rgba(8,8,8,0.44)_68%,rgba(8,8,8,0.18)_100%)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/35" />
            <TopoLines className="absolute -right-16 top-10 h-[720px] w-[900px] text-white opacity-[0.09]" />
          </div>

          <div className="relative z-10 mx-auto grid w-full max-w-[1440px] gap-14 px-5 sm:px-8 lg:grid-cols-[1.18fr_0.82fr] lg:items-center lg:gap-16 lg:px-12">
            <div>
              <Reveal>
                <div className="flex flex-wrap items-center gap-4">
                  <span className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/[0.06] px-3.5 py-2 text-[9px] font-medium uppercase tracking-[0.2em] text-white/75 backdrop-blur-sm">
                    <span className="site-live-dot" />
                    Cohort 04 · Enrolling now
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/40">
                    Winter 2027
                  </span>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <h1 className="mt-8 max-w-3xl text-[clamp(3.4rem,7.1vw,7.4rem)] font-normal leading-[0.88] tracking-[-0.065em]">
                  The earth is a text.
                  <span className="mt-2 block font-playfair italic font-normal text-[#d8e3ca]">
                    Learn to read it.
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={200}>
                <p className="mt-8 max-w-lg text-sm leading-[1.85] text-white/60 sm:text-base">
                  A six-week field course in deep time — for the curious, the
                  walkers, and anyone who has picked up a stone and wondered
                  what it has seen.
                </p>
              </Reveal>

              <Reveal delay={300}>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <PrimaryLink to="/plans">Reserve your place</PrimaryLink>
                  <a
                    href="#curriculum"
                    className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/[0.03] px-6 py-3 text-sm font-medium text-white/75 backdrop-blur-sm transition-colors hover:border-white/35 hover:text-white"
                  >
                    <Play size={13} fill="currentColor" className="text-[#e8702a]" />
                    Explore the syllabus
                  </a>
                </div>
              </Reveal>

              <Reveal delay={420}>
                <div className="mt-14 grid max-w-xl grid-cols-2 gap-x-6 gap-y-7 border-t border-white/15 pt-7 sm:grid-cols-4">
                  {COURSE_FACTS.map((fact) => (
                    <Stat key={fact.label} value={fact.value} label={fact.label} />
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal delay={500} className="hidden justify-self-end lg:block">
              <CoreSample />
            </Reveal>
          </div>

          <div className="absolute bottom-8 right-8 hidden items-center gap-3 text-[9px] uppercase tracking-[0.22em] text-white/35 lg:flex">
            Scroll to begin
            <span className="block h-10 w-px bg-gradient-to-b from-white/50 to-transparent" />
          </div>
        </section>

        <Marquee />

        <section className="relative overflow-hidden bg-[#0b0b0a] py-24 text-white sm:py-32">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-28">
              <Reveal>
                <Eyebrow index="01">Why Lithos</Eyebrow>
                <h2 className="mt-7 max-w-xl text-[clamp(2.7rem,4.7vw,5.1rem)] font-normal leading-[0.95] tracking-[-0.055em]">
                  A way of seeing,
                  <br />
                  not a set of facts to
                  <span className="font-playfair italic text-[#e8702a]"> memorise.</span>
                </h2>
              </Reveal>

              <div className="lg:pt-16">
                <Reveal delay={120}>
                  <p className="max-w-lg text-base leading-[1.8] text-white/60">
                    Deep time is difficult because it is invisible. Our work is to
                    give it edges: a colour in a cliff, a grain under a lens, a
                    seam that does not line up. By the end, the ordinary ground
                    will be legible in a new way.
                  </p>
                </Reveal>

                <div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10">
                  {[
                    {
                      icon: Compass,
                      title: 'Field-first teaching',
                      body: 'Every concept is anchored in a real place, with field footage, photographs, and a practice of close looking.',
                    },
                    {
                      icon: Layers3,
                      title: 'Built for deep attention',
                      body: 'Short lessons, long ideas. Each chapter leaves room for a walk, a notebook page, and a second look.',
                    },
                    {
                      icon: Check,
                      title: 'A durable foundation',
                      body: 'Learn the core grammar of geology once, and it will keep unfolding every landscape you meet.',
                    },
                  ].map((item, index) => (
                    <Reveal
                      key={item.title}
                      delay={index * 100}
                      className="bg-[#0b0b0a] p-6 sm:flex sm:items-start sm:gap-5 sm:p-7"
                    >
                      <span className="mb-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-[#e8702a] sm:mb-0">
                        <item.icon size={16} strokeWidth={1.5} />
                      </span>
                      <div>
                        <h3 className="text-base font-medium tracking-[-0.02em]">{item.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-white/45">{item.body}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>

                <Reveal delay={180} className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                    No prerequisites
                  </span>
                  <QuietLink to="/field-guides">Try a free field guide</QuietLink>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        <Curriculum />

        <section className="site-grain relative overflow-hidden bg-[#0b0b0a] py-24 text-white sm:py-32">
          <TopoLines className="absolute -left-28 top-10 h-[700px] w-[1000px] text-white opacity-[0.055]" />
          <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
              <Reveal>
                <Eyebrow index="03">Your companions</Eyebrow>
                <h2 className="mt-7 max-w-xl text-[clamp(2.7rem,4.6vw,4.8rem)] font-normal leading-[0.95] tracking-[-0.055em]">
                  Taught by people who
                  <br />
                  <span className="font-playfair italic text-[#c5d4b4]">read the ground.</span>
                </h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="max-w-xs text-sm leading-relaxed text-white/45">
                  Three field geologists, one shared belief: that attention is a
                  skill, and stone is a generous teacher.
                </p>
              </Reveal>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {FIELD_FACULTY.map((person, index) => (
                <Reveal key={person.name} delay={index * 110}>
                  <article className="group h-full border border-white/10 bg-white/[0.025] p-7 transition-colors duration-500 hover:border-white/20 hover:bg-white/[0.045]">
                    <div className="relative flex h-44 items-center justify-center overflow-hidden border border-white/10 bg-[#11110e]">
                      <img
                        src={index === 1 ? IMAGES.moss : IMAGES.lava}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover opacity-25 grayscale transition-all duration-700 group-hover:scale-105 group-hover:opacity-35 group-hover:grayscale-0"
                      />
                      <span className="font-playfair relative text-6xl italic text-white/80">
                        {person.initials}
                      </span>
                      <span className="absolute bottom-3 left-3 text-[8px] uppercase tracking-[0.18em] text-white/30">
                        Field faculty / 0{index + 1}
                      </span>
                    </div>
                    <h3 className="mt-6 text-lg font-medium tracking-[-0.03em]">{person.name}</h3>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-[#e8702a]">
                      {person.role}
                    </p>
                    <p className="mt-4 text-sm leading-[1.75] text-white/45">{person.bio}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#080807]">
          <img
            src={IMAGES.moss}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080807] via-[#080807]/80 to-[#080807]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080807] via-transparent to-[#080807]/30" />
          <div className="relative mx-auto max-w-[1440px] px-5 py-28 sm:px-8 sm:py-40 lg:px-12">
            <Reveal>
              <Eyebrow index="04">Join the cohort</Eyebrow>
              <h2 className="mt-7 max-w-2xl text-[clamp(3rem,6.2vw,6.4rem)] font-normal leading-[0.92] tracking-[-0.06em] text-white">
                The ground is
                <span className="block font-playfair italic text-[#d9e4ce]">already waiting.</span>
              </h2>
              <p className="mt-7 max-w-md text-sm leading-[1.8] text-white/55">
                Next cohort begins January 14, 2027. Twenty-eight lessons, six
                chapters, and one live day in the field. Places are limited to
                keep the conversation close.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-6">
                <PrimaryLink to="/plans">Reserve your place</PrimaryLink>
                <span className="text-[10px] uppercase tracking-[0.18em] text-white/40">
                  18 of 60 seats remaining
                </span>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
