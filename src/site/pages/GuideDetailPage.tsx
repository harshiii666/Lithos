import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react';
import { SiteLayout } from '../SiteLayout';
import {
  Eyebrow,
  GuideArtwork,
  PageTitle,
  PrimaryLink,
  QuietLink,
  Reveal,
} from '../components';
import { GUIDES } from '../data';

export default function GuideDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const guide = GUIDES.find((item) => item.slug === slug);

  if (!guide) {
    return (
      <SiteLayout>
        <div className="flex min-h-[80vh] flex-col items-center justify-center px-5 pt-28 text-center">
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#e8702a]">Archive / missing page</p>
          <h1 className="mt-5 max-w-xl font-playfair text-5xl italic leading-[1.05] text-white sm:text-7xl">
            This layer has not been found.
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/50">
            The guide you are looking for may have moved deeper into the archive.
          </p>
          <Link
            to="/field-guides"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm text-white/80 transition-colors hover:border-white/40 hover:text-white"
          >
            <ArrowLeft size={15} /> Back to the field guides
          </Link>
        </div>
      </SiteLayout>
    );
  }

  const related = GUIDES.filter((item) => item.slug !== guide.slug).slice(0, 3);

  return (
    <SiteLayout>
      <PageTitle title={`${guide.title} — Lithos Field Guides`} />
      <div className="site-page-in">
        <section className="relative overflow-hidden bg-[#080808] pb-16 pt-32 text-white sm:pb-20 sm:pt-40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_38%,rgba(232,112,42,0.12),transparent_35%)]" />
          <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
              <Link
                to="/field-guides"
                className="group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/45 transition-colors hover:text-white"
              >
                <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-1" />
                Field guides
              </Link>
              <span className="text-[9px] uppercase tracking-[0.2em] text-white/35">
                Field atlas / {guide.index} · {guide.category}
              </span>
            </div>

            <div className="mt-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20">
              <div>
                <Reveal>
                  <Eyebrow index="Reading room">{guide.readTime} field reading</Eyebrow>
                  <h1 className="mt-6 max-w-3xl text-[clamp(3.4rem,6.7vw,7rem)] font-normal leading-[0.9] tracking-[-0.06em]">
                    {guide.title}
                  </h1>
                  <p className="mt-7 max-w-xl text-base leading-[1.8] text-white/60 sm:text-lg">
                    {guide.lede}
                  </p>
                </Reveal>

                <Reveal delay={120} className="mt-10 flex flex-wrap gap-x-10 gap-y-5 border-t border-white/10 pt-7">
                  {[
                    ['Category', guide.category],
                    ['Difficulty', guide.difficulty],
                    ['Ground', guide.coordinates],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <p className="text-[9px] uppercase tracking-[0.17em] text-white/30">{label}</p>
                      <p className="mt-1.5 text-xs text-white/65">{value}</p>
                    </div>
                  ))}
                </Reveal>
              </div>

              <Reveal
                delay={180}
                className="w-full max-w-[390px] justify-self-center lg:justify-self-end"
              >
                <div className="relative w-full">
                  <div className="absolute -inset-6 rounded-full bg-white/[0.025] blur-xl" />
                  <GuideArtwork
                    guide={guide}
                    className="relative aspect-[4/5] w-full border border-white/15 shadow-2xl shadow-black/40"
                  />
                  <div className="absolute -bottom-4 -left-4 hidden bg-[#0b0b0a] px-4 py-3 text-[9px] uppercase tracking-[0.16em] text-white/45 sm:block">
                    Lithos field atlas · Vol. 03
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="relative bg-[#f1ede4] py-20 text-[#18150f] sm:py-28">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <div className="grid gap-14 lg:grid-cols-[0.32fr_0.68fr] lg:gap-20">
              <aside className="lg:sticky lg:top-32 lg:self-start">
                <div className="border-t border-[#cfc5b7] pt-5">
                  <Eyebrow index="In this guide" light>
                    The reading
                  </Eyebrow>
                  <div className="mt-6 flex flex-col gap-3.5">
                    {guide.sections.map((section, index) => (
                      <a
                        key={section.title}
                        href={`#section-${index}`}
                        className="flex items-start gap-3 text-sm text-[#5c5447] transition-colors hover:text-[#c25e27]"
                      >
                        <span className="mt-0.5 text-[9px] tracking-[0.12em] text-[#a19685]">
                          0{index + 1}
                        </span>
                        {section.title}
                      </a>
                    ))}
                    <a
                      href="#field-note"
                      className="flex items-start gap-3 text-sm text-[#5c5447] transition-colors hover:text-[#c25e27]"
                    >
                      <span className="mt-0.5 text-[9px] tracking-[0.12em] text-[#a19685]">03</span>
                      Field note
                    </a>
                  </div>
                </div>

                <div className="mt-12 border-t border-[#cfc5b7] pt-5">
                  <p className="text-[9px] uppercase tracking-[0.17em] text-[#8a7f6e]">Best read with</p>
                  <p className="mt-3 text-sm leading-relaxed text-[#5c5447]">
                    A hand lens, a notebook, and enough time to look twice.
                  </p>
                </div>

                <div className="mt-10">
                  <PrimaryLink to="/plans" className="w-full">
                    Open the full atlas
                  </PrimaryLink>
                </div>
              </aside>

              <article className="max-w-2xl">
                <p className="border-l border-[#e8702a] pl-5 font-playfair text-2xl italic leading-[1.45] tracking-[-0.02em] text-[#3d362c] sm:text-3xl">
                  {guide.summary}
                </p>

                <div className="mt-12 space-y-14">
                  {guide.sections.map((section, index) => (
                    <Reveal key={section.title} id={`section-${index}`} className="scroll-mt-32">
                      <section className="scroll-mt-32">
                        <div className="flex items-baseline gap-4 border-b border-[#cfc5b7] pb-4">
                          <span className="text-[9px] tracking-[0.16em] text-[#a19685]">
                            0{index + 1}
                          </span>
                          <h2 className="text-xl font-medium tracking-[-0.035em] sm:text-2xl">
                            {section.title}
                          </h2>
                        </div>
                        <div className="mt-6 space-y-5">
                          {section.paragraphs.map((paragraph) => (
                            <p
                              key={paragraph.slice(0, 30)}
                              className="text-[15px] leading-[1.9] text-[#5f574a]"
                            >
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </section>
                    </Reveal>
                  ))}
                </div>

                <Reveal id="field-note" className="mt-16 scroll-mt-32">
                  <div className="relative overflow-hidden border border-[#d1c4b3] bg-[#e9e0d2] p-7 sm:p-9">
                    <div className="absolute right-6 top-5 font-playfair text-7xl italic text-[#d1c0a9]">
                      ”
                    </div>
                    <p className="text-[9px] uppercase tracking-[0.18em] text-[#c25e27]">
                      A note from the field
                    </p>
                    <p className="relative mt-4 max-w-xl font-playfair text-xl italic leading-[1.55] text-[#3a3227] sm:text-2xl">
                      {guide.fieldNote}
                    </p>
                  </div>
                </Reveal>

                <Reveal className="mt-14">
                  <h2 className="text-[9px] uppercase tracking-[0.18em] text-[#8a7f6e]">
                    Carry these with you
                  </h2>
                  <ul className="mt-5 space-y-3">
                    {guide.takeaways.map((takeaway) => (
                      <li key={takeaway} className="flex items-start gap-3 text-sm leading-relaxed text-[#5f574a]">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#cbbfaf] text-[#c25e27]">
                          <Check size={11} />
                        </span>
                        {takeaway}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </article>
            </div>
          </div>
        </section>

        <section className="relative bg-[#0a0a09] py-20 text-white sm:py-28">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <div className="flex items-end justify-between border-b border-white/10 pb-7">
              <div>
                <Eyebrow index="Continue">Nearby pages</Eyebrow>
                <h2 className="mt-4 text-3xl font-normal tracking-[-0.045em] sm:text-4xl">
                  Keep reading the ground.
                </h2>
              </div>
              <QuietLink to="/field-guides">All guides</QuietLink>
            </div>
            <div className="mt-9 grid gap-6 md:grid-cols-3">
              {related.map((item) => (
                <Link key={item.slug} to={`/field-guides/${item.slug}`} className="group">
                  <div className="overflow-hidden border border-white/10">
                    <GuideArtwork
                      guide={item}
                      className="aspect-[5/3] w-full transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex items-start justify-between gap-4 border-b border-white/10 py-4">
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.16em] text-white/35">
                        {item.category} / {item.readTime}
                      </p>
                      <h3 className="mt-2 text-lg font-normal tracking-[-0.03em]">{item.title}</h3>
                    </div>
                    <ArrowUpRight
                      size={15}
                      className="mt-1 shrink-0 text-white/35 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#e8702a]"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
