import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  MapPin,
  MessageCircle,
  Radio,
  Video,
} from 'lucide-react';
import { SiteLayout } from '../SiteLayout';
import {
  Eyebrow,
  PageTitle,
  PrimaryLink,
  QuietLink,
  Reveal,
  TopoLines,
} from '../components';
import { IMAGES, PAST_TOURS, TOURS, type Tour } from '../data';

function useCountdown(target: string) {
  const targetTime = useMemo(() => new Date(target).getTime(), [target]);
  const [remaining, setRemaining] = useState(() => Math.max(0, targetTime - Date.now()));

  useEffect(() => {
    const update = () => setRemaining(Math.max(0, targetTime - Date.now()));
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, [targetTime]);

  const totalSeconds = Math.floor(remaining / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function formatDate(iso: string) {
  const date = new Date(iso);
  return {
    day: new Intl.DateTimeFormat('en-GB', { day: '2-digit' }).format(date),
    month: new Intl.DateTimeFormat('en-GB', { month: 'short' }).format(date).toUpperCase(),
    year: new Intl.DateTimeFormat('en-GB', { year: 'numeric' }).format(date),
    long: new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date),
  };
}

function SessionRow({ tour, index }: { tour: Tour; index: number }) {
  const date = formatDate(tour.date);

  return (
    <article className="group border-b border-[#d0c6b7]">
      <div className="grid gap-6 py-8 md:grid-cols-[80px_1.2fr_0.8fr_auto] md:items-center md:gap-8">
        <div className="flex items-baseline gap-3 md:block">
          <p className="font-playfair text-4xl italic leading-none text-[#b85b2a] md:text-5xl">
            {date.day}
          </p>
          <p className="text-[9px] uppercase tracking-[0.16em] text-[#8f8373] md:mt-2">
            {date.month} {date.year}
          </p>
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2 text-[8px] uppercase tracking-[0.15em] text-[#8f8373]">
            <span>Fieldcast 0{index + 1}</span>
            <span className="h-1 w-1 rounded-full bg-[#c8bcab]" />
            <span>{tour.format}</span>
          </div>
          <h3 className="mt-2 text-2xl font-normal tracking-[-0.04em] text-[#1b1812]">
            {tour.title}
          </h3>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-[#6d6355]">{tour.summary}</p>
        </div>

        <div className="text-sm text-[#5f5649]">
          <p className="flex items-center gap-2">
            <MapPin size={13} strokeWidth={1.5} className="text-[#a07555]" />
            {tour.place}
          </p>
          <p className="mt-2 flex items-center gap-2">
            <CalendarDays size={13} strokeWidth={1.5} className="text-[#a07555]" />
            {tour.time}
          </p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.12em] text-[#9a8e7e]">
            {tour.seats} seats · {tour.host}
          </p>
        </div>

        <Link
          to={`/sign-up?tour=${tour.id}`}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-[#bfb3a2] px-5 py-2.5 text-xs font-medium text-[#2d281f] transition-all duration-300 hover:border-[#17140f] hover:bg-[#17140f] hover:text-white"
        >
          Reserve a seat
          <ArrowUpRight
            size={13}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </article>
  );
}

export default function LiveTourPage() {
  const nextTour = TOURS[0];
  const countdown = useCountdown(nextTour.date);
  const nextDate = formatDate(nextTour.date);

  return (
    <SiteLayout>
      <PageTitle title="Live Tour — Lithos" />
      <div className="site-page-in">
        <section className="site-grain relative overflow-hidden bg-[#080808] pt-32 text-white sm:pt-40">
          <div className="absolute inset-0">
            <img
              src={IMAGES.lava}
              alt=""
              className="h-full w-full object-cover object-center opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/95 to-[#080808]/55" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/65" />
          </div>
          <TopoLines className="absolute -right-40 top-4 h-[760px] w-[1100px] text-white opacity-[0.07]" />

          <div className="relative z-10 mx-auto max-w-[1440px] px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
              <Eyebrow index="Fieldcasts">Live tour</Eyebrow>
              <span className="inline-flex items-center gap-2.5 text-[9px] uppercase tracking-[0.2em] text-white/45">
                <span className="site-live-dot" /> Season 02 · Now boarding
              </span>
            </div>

            <div className="mt-12 grid gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-20">
              <Reveal>
                <p className="text-[9px] uppercase tracking-[0.22em] text-white/35">
                  Live from the field
                </p>
                <h1 className="mt-5 max-w-3xl text-[clamp(3.6rem,7.7vw,8rem)] font-normal leading-[0.85] tracking-[-0.07em]">
                  The ground,
                  <span className="block font-playfair italic text-[#cedcc0]">in real time.</span>
                </h1>
                <p className="mt-7 max-w-md text-sm leading-[1.85] text-white/55 sm:text-base">
                  Join a geologist in the landscape itself. Each live fieldcast is
                  a two-way walk through a place — with time to ask the questions
                  that only standing there would answer.
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <PrimaryLink to={`/sign-up?tour=${nextTour.id}`}>Reserve a seat</PrimaryLink>
                  <a
                    href="#season"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm text-white/65 transition-colors hover:border-white/35 hover:text-white"
                  >
                    See the season <ArrowRight size={14} />
                  </a>
                </div>
                <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/10 pt-6 text-[9px] uppercase tracking-[0.15em] text-white/35">
                  <span>2 hours</span>
                  <span>Live Q&amp;A</span>
                  <span>Recording included</span>
                </div>
              </Reveal>

              <Reveal delay={160}>
                <div className="relative ml-auto w-full max-w-[510px] overflow-hidden border border-white/20 bg-white/[0.04] p-3 backdrop-blur-md">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={IMAGES.moss}
                      alt="Mossy volcanic terrain"
                      className="h-full w-full scale-[1.02] object-cover transition-transform duration-1000 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b09]/85 via-transparent to-[#0b0b09]/15" />
                    <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/20 px-3 py-1.5 text-[8px] uppercase tracking-[0.17em] text-white backdrop-blur-md">
                      <span className="site-live-dot" /> Next departure
                    </div>
                    <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4">
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.16em] text-white/55">
                          {nextDate.long}
                        </p>
                        <p className="mt-1 font-playfair text-3xl italic leading-none text-white">
                          {nextTour.title}
                        </p>
                      </div>
                      <span className="shrink-0 text-[9px] uppercase tracking-[0.14em] text-white/55">
                        {nextTour.time}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-4 px-3 py-4">
                    <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.15em] text-white/50">
                      <MapPin size={12} /> {nextTour.place}
                    </div>
                    <div className="flex items-center gap-2">
                      {[
                        [countdown.days, 'd'],
                        [countdown.hours, 'h'],
                        [countdown.minutes, 'm'],
                        [countdown.seconds, 's'],
                      ].map(([value, unit]) => (
                        <span
                          key={unit}
                          className="flex min-w-[34px] flex-col items-center border border-white/15 px-1.5 py-1.5"
                        >
                          <span className="text-sm font-light tabular-nums leading-none">
                            {String(value).padStart(2, '0')}
                          </span>
                          <span className="mt-1 text-[7px] uppercase tracking-[0.1em] text-white/35">
                            {unit}
                          </span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="season" className="relative bg-[#f1ede4] py-24 text-[#171510] sm:py-32">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
              <Reveal>
                <Eyebrow index="01" light>
                  The season
                </Eyebrow>
                <h2 className="mt-6 max-w-2xl text-[clamp(2.7rem,4.8vw,4.9rem)] font-normal leading-[0.94] tracking-[-0.055em]">
                  Three places.
                  <span className="font-playfair italic"> Three live readings.</span>
                </h2>
              </Reveal>
              <Reveal delay={100}>
                <p className="max-w-sm text-sm leading-relaxed text-[#6c6254]">
                  Fieldcasts run for two hours, with a short guided walk, a close
                  reading of the landscape, and an open conversation with the
                  geologist on the ground.
                </p>
              </Reveal>
            </div>

            <div className="mt-12 border-t border-[#d0c6b7]">
              {TOURS.map((tour, index) => (
                <SessionRow key={tour.id} tour={tour} index={index} />
              ))}
            </div>

            <div className="mt-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <p className="flex items-center gap-2.5 text-[9px] uppercase tracking-[0.16em] text-[#8f8373]">
                <Radio size={13} className="text-[#b85b2a]" />
                All times shown locally · recordings sent to every seat
              </p>
              <QuietLink to="/plans" dark>
                Compare membership access
              </QuietLink>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#0b0b0a] py-24 text-white sm:py-32">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <Reveal>
              <Eyebrow index="02">How a fieldcast works</Eyebrow>
              <div className="mt-6 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
                <h2 className="max-w-xl text-[clamp(2.5rem,4.5vw,4.5rem)] font-normal leading-[0.95] tracking-[-0.055em]">
                  A field trip without
                  <span className="font-playfair italic text-[#c7d6b9]"> the flight.</span>
                </h2>
                <p className="max-w-md lg:justify-self-end">
                  <span className="text-sm leading-[1.8] text-white/50">
                    We go live from the rock face with a small camera, a
                    geologist, and a question you can ask in real time. You do
                    not need any equipment beyond a screen and a notebook.
                  </span>
                </p>
              </div>
            </Reveal>

            <div className="mt-14 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: Video,
                  number: '01',
                  title: 'Arrive',
                  body: 'A short, quiet view of the landscape before the interpretation begins.',
                },
                {
                  icon: MapPin,
                  number: '02',
                  title: 'Read the ground',
                  body: 'Your host walks through the stratigraphy, structure, and field evidence at hand.',
                },
                {
                  icon: MessageCircle,
                  number: '03',
                  title: 'Ask anything',
                  body: 'The second half belongs to the room. Bring questions, photographs, or a puzzling stone.',
                },
                {
                  icon: Radio,
                  number: '04',
                  title: 'Keep the record',
                  body: 'Every seat receives the recording, field notes, and a short reading list after the walk.',
                },
              ].map((item, index) => (
                <Reveal key={item.number} delay={index * 90} className="h-full bg-[#0b0b0a] p-7">
                  <div className="flex items-center justify-between">
                    <item.icon size={17} strokeWidth={1.4} className="text-[#e8702a]" />
                    <span className="text-[9px] tracking-[0.15em] text-white/25">{item.number}</span>
                  </div>
                  <h3 className="mt-12 text-lg font-normal tracking-[-0.03em]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-[1.75] text-white/45">{item.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="relative bg-[#0b0b0a] pb-24 text-white sm:pb-32">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <div className="border-t border-white/10 pt-14">
              <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                <div>
                  <Eyebrow index="Archive">Past departures</Eyebrow>
                  <h2 className="mt-5 text-3xl font-normal tracking-[-0.045em] sm:text-4xl">
                    The field remembers.
                  </h2>
                </div>
                <p className="max-w-xs text-xs leading-relaxed text-white/35">
                  Recordings from previous seasons are available in the member
                  archive.
                </p>
              </div>

              <div className="mt-9 grid gap-5 md:grid-cols-2">
                {PAST_TOURS.map((tour, index) => (
                  <article key={tour.title} className="group relative overflow-hidden border border-white/10">
                    <div className="relative h-[320px]">
                      <img
                        src={tour.image}
                        alt=""
                        className="h-full w-full object-cover opacity-65 transition-all duration-700 group-hover:scale-[1.03] group-hover:opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0a] via-[#0b0b0a]/20 to-transparent" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                      <div className="flex items-center justify-between gap-4 text-[9px] uppercase tracking-[0.15em] text-white/45">
                        <span>Fieldcast archive / 0{index + 1}</span>
                        <span>{tour.date}</span>
                      </div>
                      <h3 className="mt-3 font-playfair text-3xl italic">{tour.title}</h3>
                      <p className="mt-2 max-w-md text-sm leading-relaxed text-white/50">{tour.summary}</p>
                      <p className="mt-4 flex items-center gap-2 text-[9px] uppercase tracking-[0.15em] text-white/35">
                        <MapPin size={11} /> {tour.place}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#e9e2d5] text-[#17140f]">
          <div className="mx-auto grid max-w-[1440px] gap-0 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:px-12">
            <div className="py-20 pr-0 sm:py-24 lg:py-28 lg:pr-20">
              <Eyebrow index="03" light>
                From the room
              </Eyebrow>
              <blockquote className="mt-7 max-w-2xl font-playfair text-[clamp(2rem,3.6vw,3.7rem)] italic leading-[1.12] tracking-[-0.035em]">
                “I have walked that beach a hundred times. I have never seen it
                the way I did with a geologist in my ear.”
              </blockquote>
              <p className="mt-6 text-[10px] uppercase tracking-[0.17em] text-[#8d8170]">
                Elin M. · attendee, The basalt coast
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-5">
                <PrimaryLink to="/plans" className="bg-[#17140f] hover:bg-[#2d261d]">
                  Join a live fieldcast
                </PrimaryLink>
                <span className="text-[9px] uppercase tracking-[0.16em] text-[#8d8170]">
                  Included with Prospector
                </span>
              </div>
            </div>
            <div className="relative order-first min-h-[280px] lg:order-none lg:min-h-full">
              <img src={IMAGES.moss} alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#e9e2d5]/20 to-transparent lg:bg-gradient-to-r lg:from-[#e9e2d5]/25" />
              <div className="site-live-dot absolute right-6 top-6" />
            </div>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
