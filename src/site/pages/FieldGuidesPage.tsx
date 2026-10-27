import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Search } from 'lucide-react';
import { SiteLayout } from '../SiteLayout';
import {
  Eyebrow,
  GuideArtwork,
  PageTitle,
  PrimaryLink,
  QuietLink,
  Reveal,
  TopoLines,
  cn,
} from '../components';
import { GUIDE_CATEGORIES, GUIDES, IMAGES } from '../data';

export default function FieldGuidesPage() {
  const [category, setCategory] = useState<(typeof GUIDE_CATEGORIES)[number]>('All');
  const [query, setQuery] = useState('');

  const filteredGuides = useMemo(() => {
    const normalised = query.trim().toLowerCase();
    return GUIDES.filter((guide) => {
      const matchesCategory = category === 'All' || guide.category === category;
      const matchesQuery =
        !normalised ||
        guide.title.toLowerCase().includes(normalised) ||
        guide.summary.toLowerCase().includes(normalised) ||
        guide.category.toLowerCase().includes(normalised);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const featured = GUIDES[0];

  return (
    <SiteLayout>
      <PageTitle title="Field Guides — Lithos" />
      <div className="site-page-in">
        <section className="site-grain relative overflow-hidden bg-[#080808] pb-16 pt-32 text-white sm:pb-20 sm:pt-40">
          <div className="absolute inset-0">
            <img
              src={IMAGES.moss}
              alt=""
              className="h-full w-full object-cover object-[70%_center] opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/95 to-[#080808]/55" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/70" />
          </div>
          <TopoLines className="absolute -right-36 top-[-60px] h-[760px] w-[1100px] text-white opacity-[0.07]" />

          <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <div className="flex flex-wrap items-center justify-between gap-5 border-b border-white/10 pb-6">
              <Eyebrow index="Archive / 01">Field guides</Eyebrow>
              <p className="text-[9px] uppercase tracking-[0.22em] text-white/35">
                24 guides · Vol. 03
              </p>
            </div>

            <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20">
              <Reveal>
                <h1 className="max-w-3xl text-[clamp(3.5rem,7.5vw,7.8rem)] font-normal leading-[0.86] tracking-[-0.065em]">
                  Guides for the
                  <span className="mt-1 block font-playfair italic text-[#c9d8bb]">
                    ground beneath.
                  </span>
                </h1>
              </Reveal>
              <Reveal delay={120} className="lg:pb-2">
                <p className="max-w-md text-sm leading-[1.85] text-white/55 sm:text-base">
                  Compact, field-ready readings on stone, time, life, and
                  landscape. Made to be carried outside — and returned to with
                  muddy boots.
                </p>
              </Reveal>
            </div>

            <Reveal delay={180} className="mt-14">
              <article className="grid overflow-hidden border border-white/15 bg-white/[0.035] backdrop-blur-sm md:grid-cols-[0.82fr_1.18fr]">
                <div className="relative min-h-[340px] overflow-hidden md:min-h-[440px]">
                  <GuideArtwork guide={featured} className="absolute inset-0 h-full w-full" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                  <span className="absolute left-5 top-5 rounded-full border border-white/25 bg-black/20 px-3 py-1.5 text-[9px] uppercase tracking-[0.17em] text-white backdrop-blur-sm">
                    Latest release
                  </span>
                </div>
                <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-12">
                  <div>
                    <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.17em] text-white/40">
                      <span>Field atlas {featured.index}</span>
                      <span>{featured.readTime} read</span>
                    </div>
                    <h2 className="mt-8 font-playfair text-5xl italic tracking-[-0.035em] sm:text-6xl">
                      {featured.title}
                    </h2>
                    <p className="mt-6 max-w-lg text-sm leading-[1.8] text-white/55">
                      {featured.summary}
                    </p>
                  </div>
                  <div className="mt-10 flex flex-col gap-6 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <span className="flex items-center gap-2 text-[9px] uppercase tracking-[0.17em] text-white/35">
                      <span className="site-live-dot" /> {featured.coordinates}
                    </span>
                    <QuietLink to={`/field-guides/${featured.slug}`}>Open the guide</QuietLink>
                  </div>
                </div>
              </article>
            </Reveal>
          </div>
        </section>

        <section className="relative bg-[#f1ede4] py-20 text-[#171510] sm:py-28">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <div className="flex flex-col justify-between gap-8 border-b border-[#d4ccbf] pb-8 lg:flex-row lg:items-end">
              <div>
                <Eyebrow index="02" light>
                  Browse the archive
                </Eyebrow>
                <h2 className="mt-5 text-[clamp(2.3rem,4vw,3.8rem)] font-normal leading-[0.98] tracking-[-0.05em]">
                  Choose your <span className="font-playfair italic">way in.</span>
                </h2>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex max-w-full flex-wrap gap-1.5">
                  {GUIDE_CATEGORIES.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setCategory(item)}
                      className={cn(
                        'rounded-full border px-3.5 py-2 text-[10px] font-medium uppercase tracking-[0.12em] transition-all',
                        category === item
                          ? 'border-[#171510] bg-[#171510] text-[#f1ede4]'
                          : 'border-[#cfc6b8] text-[#6c6355] hover:border-[#918574] hover:text-[#171510]',
                      )}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                <label className="flex items-center gap-2 border-b border-[#bfb4a4] pb-2 focus-within:border-[#e8702a]">
                  <Search size={14} className="shrink-0 text-[#8a7f70]" />
                  <span className="sr-only">Search field guides</span>
                  <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search"
                    className="w-24 bg-transparent text-xs text-[#171510] outline-none placeholder:text-[#9d9283] sm:w-32"
                  />
                </label>
              </div>
            </div>

            <div className="mt-9 flex items-center justify-between text-[9px] uppercase tracking-[0.17em] text-[#8b806f]">
              <span>{filteredGuides.length} guides in view</span>
              <span className="hidden sm:inline">Read slowly · carry a hand lens</span>
            </div>

            {filteredGuides.length > 0 ? (
              <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {filteredGuides.map((guide, index) => (
                  <Reveal key={guide.slug} delay={(index % 3) * 90}>
                    <Link
                      to={`/field-guides/${guide.slug}`}
                      className="group block"
                      aria-label={`Read ${guide.title}`}
                    >
                      <div className="relative overflow-hidden border border-[#171510]/10 bg-[#dcd2c2]">
                        <GuideArtwork
                          guide={guide}
                          className="aspect-[4/5] w-full transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                        />
                        <div className="absolute inset-x-0 bottom-0 flex translate-y-3 items-center justify-between bg-gradient-to-t from-black/35 to-transparent px-4 pb-4 pt-10 text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                          <span className="text-[9px] uppercase tracking-[0.16em]">Read the guide</span>
                          <ArrowUpRight size={15} strokeWidth={1.5} />
                        </div>
                      </div>
                      <div className="border-b border-[#d1c8ba] pb-6 pt-5">
                        <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.16em] text-[#8a7f6e]">
                          <span>
                            {guide.category} / {guide.index}
                          </span>
                          <span>{guide.readTime}</span>
                        </div>
                        <h3 className="mt-3 text-2xl font-normal tracking-[-0.04em] transition-colors duration-300 group-hover:text-[#c25e27]">
                          {guide.title}
                        </h3>
                        <p className="mt-3 text-sm leading-[1.75] text-[#696052]">
                          {guide.summary}
                        </p>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="mt-14 border border-[#d1c8ba] px-6 py-16 text-center">
                <p className="font-playfair text-3xl italic">No page for that ground.</p>
                <p className="mx-auto mt-3 max-w-sm text-sm text-[#6c6355]">
                  Try another category or a wider search. The archive is always
                  growing.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setCategory('All');
                    setQuery('');
                  }}
                  className="mt-6 text-[10px] font-medium uppercase tracking-[0.18em] text-[#c25e27]"
                >
                  Reset the archive
                </button>
              </div>
            )}

            <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-[#d1c8ba] pt-8 sm:flex-row sm:items-center">
              <p className="max-w-md text-sm leading-relaxed text-[#665d50]">
                Every guide belongs to the Lithos field library. Members receive
                the complete archive, field cards, and new releases.
              </p>
              <PrimaryLink to="/plans">Unlock the atlas</PrimaryLink>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#0b0b0a] py-24 text-white sm:py-32">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <div className="grid gap-12 border border-white/10 lg:grid-cols-[1fr_0.82fr]">
              <div className="p-7 sm:p-12">
                <Eyebrow index="03">A field note on attention</Eyebrow>
                <blockquote className="mt-9 max-w-xl font-playfair text-[clamp(2rem,3.8vw,4rem)] italic leading-[1.1] tracking-[-0.035em]">
                  “The first instrument is not a hammer or a lens. It is the
                  decision to stay a little longer.”
                </blockquote>
                <p className="mt-7 text-[10px] uppercase tracking-[0.18em] text-white/35">
                  Imani Vale · Founder, Lithos
                </p>
              </div>
              <div className="relative min-h-[320px] overflow-hidden">
                <img src={IMAGES.lava} alt="" className="absolute inset-0 h-full w-full object-cover opacity-75" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b0a] via-transparent to-transparent" />
                <div className="absolute bottom-5 right-5 text-[9px] uppercase tracking-[0.18em] text-white/55">
                  Field still / 04
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
