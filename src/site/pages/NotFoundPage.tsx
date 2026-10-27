import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { SiteLayout } from '../SiteLayout';
import { Eyebrow, PageTitle, Reveal, TopoLines } from '../components';
import { IMAGES } from '../data';

export default function NotFoundPage() {
  return (
    <SiteLayout>
      <PageTitle title="Page not found — Lithos" />
      <section className="site-grain relative flex min-h-[100svh] items-center overflow-hidden bg-[#080808] pt-28 text-white">
        <img
          src={IMAGES.lava}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/90 to-[#080808]/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/30" />
        <TopoLines className="absolute -right-20 -top-24 h-[900px] w-[1200px] text-white opacity-[0.07]" />

        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12">
          <Reveal>
            <Eyebrow index="404">An unconformity</Eyebrow>
            <h1 className="mt-7 max-w-3xl text-[clamp(3.6rem,8vw,8.2rem)] font-normal leading-[0.86] tracking-[-0.07em]">
              The page
              <span className="block font-playfair italic text-[#d0ddc2]">wasn’t deposited.</span>
            </h1>
            <p className="mt-7 max-w-md text-sm leading-[1.8] text-white/50">
              A gap in the archive — though not, geologically speaking, an
              unusual one. Return to solid ground and try another path.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full bg-[#e8702a] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#d2611f]"
              >
                <ArrowLeft size={15} /> Back to the beginning
              </Link>
              <Link
                to="/field-guides"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm text-white/70 transition-colors hover:border-white/40 hover:text-white"
              >
                Browse the field guides <ArrowUpRight size={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
