import { useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { SiteLayout } from '../SiteLayout';
import {
  Eyebrow,
  PageTitle,
  PrimaryLink,
  Reveal,
  TopoLines,
} from '../components';
import { SITE_LICENSE } from '../license';

function LicenseSeal() {
  return (
    <div className="relative aspect-square w-[270px] overflow-hidden rounded-full border border-white/15 sm:w-[360px]">
      <TopoLines className="absolute inset-0 h-full w-full text-white opacity-[0.14]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(232,112,42,0.16),transparent_64%)]" />
      <div className="absolute inset-4 rounded-full border border-dashed border-white/15" />
      <div className="absolute inset-[22%] flex flex-col items-center justify-center rounded-full border border-[#e8702a]/35 bg-[#0b0b0a]/75 px-5 text-center backdrop-blur-sm">
        <svg
          width="26"
          height="26"
          viewBox="0 0 256 256"
          fill="#e8702a"
          aria-hidden="true"
        >
          <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
        </svg>
        <p className="mt-4 text-[7px] uppercase tracking-[0.24em] text-white/35 sm:text-[8px]">
          Named site license
        </p>
        <p className="mt-2 font-playfair text-2xl italic leading-[1.02] text-white sm:text-3xl">
          Nisha
          <br />
          <span className="font-sans not-italic text-[#e8702a]">&</span>{' '}
          Priyanshu
        </p>
        <p className="mt-4 text-[7px] uppercase tracking-[0.2em] text-white/30 sm:text-[8px]">
          Field office · 2026
        </p>
      </div>
      <span className="absolute left-1/2 top-2 -translate-x-1/2 text-[7px] uppercase tracking-[0.24em] text-white/25">
        A record of ownership
      </span>
      <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[7px] uppercase tracking-[0.24em] text-white/25">
        {SITE_LICENSE.id}
      </span>
    </div>
  );
}

function RecordSeal() {
  return (
    <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-[#e8702a]/50">
      <div className="absolute inset-1.5 rounded-full border border-dashed border-[#e8702a]/30" />
      <svg
        width="24"
        height="24"
        viewBox="0 0 256 256"
        fill="#e8702a"
        aria-hidden="true"
      >
        <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
      </svg>
    </div>
  );
}

export default function LicensePage() {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'selected'>('idle');
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const keyRef = useRef<HTMLElement>(null);

  useEffect(() => {
    return () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    };
  }, []);

  const resetCopyState = () => {
    if (copyTimer.current) clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopyState('idle'), 2400);
  };

  const copyKey = async () => {
    let copied = false;

    try {
      await navigator.clipboard.writeText(SITE_LICENSE.key);
      copied = true;
    } catch {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = SITE_LICENSE.key;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        copied = document.execCommand('copy');
        document.body.removeChild(textarea);
      } catch {
        copied = false;
      }
    }

    if (copied) {
      setCopyState('copied');
    } else {
      const key = keyRef.current;
      const selection = window.getSelection();
      if (key && selection) {
        const range = document.createRange();
        range.selectNodeContents(key);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      setCopyState('selected');
    }

    resetCopyState();
  };

  return (
    <SiteLayout>
      <PageTitle title="Site License — Lithos" />
      <div className="site-page-in">
        <section className="site-grain relative overflow-hidden bg-[#080808] pb-16 pt-32 text-white sm:pb-24 sm:pt-40">
          <div className="site-contour-grid absolute inset-0 opacity-70" />
          <TopoLines className="absolute -right-48 top-8 h-[820px] w-[1050px] text-white opacity-[0.08]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />

          <div className="relative z-10 mx-auto grid w-full max-w-[1440px] gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20 lg:px-12">
            <div>
              <Reveal>
                <Eyebrow index="Certificate / 01">Site license</Eyebrow>
              </Reveal>

              <Reveal delay={100}>
                <h1 className="mt-7 max-w-3xl text-[clamp(2.8rem,5.4vw,6.2rem)] font-normal leading-[0.9] tracking-[-0.06em]">
                  This ground
                  <span className="block font-playfair italic font-normal text-[#d8e3ca]">
                    has two names.
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={200}>
                <p className="mt-8 max-w-xl text-sm leading-[1.85] text-white/55 sm:text-base">
                  The complete Lithos field school — its design, words, code, and
                  cartography — is held under a named site license by Nisha and
                  Priyanshu.
                </p>
              </Reveal>

              <Reveal delay={300}>
                <div className="mt-10 grid max-w-xl grid-cols-2 gap-x-6 gap-y-6 border-t border-white/15 pt-6 sm:grid-cols-3">
                  <div>
                    <p className="text-[8px] uppercase tracking-[0.2em] text-white/30">
                      License no.
                    </p>
                    <p className="mt-2 text-xs tracking-[0.06em] text-white/75">
                      {SITE_LICENSE.id}
                    </p>
                  </div>
                  <div>
                    <p className="text-[8px] uppercase tracking-[0.2em] text-white/30">
                      Issued
                    </p>
                    <p className="mt-2 text-xs tracking-[0.06em] text-white/75">
                      {SITE_LICENSE.issued}
                    </p>
                  </div>
                  <div>
                    <p className="text-[8px] uppercase tracking-[0.2em] text-white/30">
                      Status
                    </p>
                    <p className="mt-2 flex items-center gap-2 text-xs tracking-[0.06em] text-white/75">
                      <span className="site-live-dot" />
                      {SITE_LICENSE.status}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={420} className="justify-self-center lg:justify-self-end">
              <LicenseSeal />
            </Reveal>
          </div>
        </section>

        <section
          id="certificate"
          className="relative scroll-mt-24 overflow-hidden bg-[#f1ede4] px-5 py-16 text-[#1b1812] sm:px-8 sm:py-24 lg:px-12"
        >
          <div className="mx-auto max-w-[1180px]">
            <Reveal>
              <article className="site-grain relative overflow-hidden border border-[#c7b9a6] bg-[#f8f4eb] px-5 py-8 shadow-2xl shadow-[#33291d]/10 sm:px-10 sm:py-12 lg:px-16 lg:py-14">
                <div className="pointer-events-none absolute inset-3 border border-[#d8cdbd] sm:inset-4" />
                <TopoLines className="pointer-events-none absolute -bottom-44 -right-36 h-[560px] w-[820px] text-[#716856] opacity-[0.12]" />

                <div className="relative z-10">
                  <div className="flex flex-col gap-3 border-b border-[#d6cbbc] pb-6 text-[8px] uppercase tracking-[0.2em] text-[#766a5b] sm:flex-row sm:items-center sm:justify-between sm:text-[9px]">
                    <span className="flex items-center gap-2.5 text-[#332f27]">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 256 256"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
                      </svg>
                      Lithos field office
                    </span>
                    <span>Certificate of record / {SITE_LICENSE.id}</span>
                  </div>

                  <div className="mx-auto mt-10 max-w-4xl text-center sm:mt-12">
                    <p className="text-[8px] uppercase tracking-[0.24em] text-[#958878] sm:text-[9px]">
                      This certifies that
                    </p>

                    <h2 className="mt-5 font-playfair text-[clamp(2.7rem,7vw,6.4rem)] italic leading-[0.92] tracking-[-0.045em]">
                      <span className="block md:inline">Nisha</span>
                      <span className="mx-2 block font-sans not-italic text-[#e8702a] md:mx-4 md:inline">
                        &
                      </span>
                      <span className="block md:inline">Priyanshu</span>
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-sm leading-[1.8] text-[#665c4f]">
                      are the named licensees of{' '}
                      <span className="font-medium text-[#2b261f]">{SITE_LICENSE.site}</span>,
                      including its complete design, source, written content, and
                      original artwork.
                    </p>
                  </div>

                  <div className="mt-9 border border-[#1c1710]/10 bg-[#171410] px-5 py-5 text-[#f5f1e8] sm:mt-11 sm:px-6">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <div className="flex items-center gap-3 text-[8px] uppercase tracking-[0.2em] text-white/35">
                          <span>License key</span>
                          <span className="h-px w-6 bg-white/15" />
                          <span>Permanent / verified</span>
                        </div>
                        <code
                          id="license-key"
                          ref={keyRef}
                          className="mt-3 block select-all break-all font-mono text-[clamp(1rem,2.2vw,1.3rem)] tracking-[0.045em] text-[#f3ead9]"
                        >
                          {SITE_LICENSE.key}
                        </code>
                      </div>

                      <button
                        type="button"
                        onClick={copyKey}
                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2.5 text-[9px] uppercase tracking-[0.16em] text-white/75 transition-colors hover:border-[#e8702a]/60 hover:text-white"
                        aria-label={`Copy license key ${SITE_LICENSE.key}`}
                      >
                        {copyState === 'copied' ? (
                          <Check size={13} />
                        ) : (
                          <Copy size={13} />
                        )}
                        <span aria-live="polite">
                          {copyState === 'copied'
                            ? 'Key copied'
                            : copyState === 'selected'
                              ? 'Key selected'
                              : 'Copy key'}
                        </span>
                      </button>
                    </div>
                  </div>

                  <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-[#d4c8b8] pt-6 sm:grid-cols-4">
                    <div>
                      <dt className="text-[8px] uppercase tracking-[0.18em] text-[#948776]">
                        Issued
                      </dt>
                      <dd className="mt-2 text-xs leading-relaxed text-[#373128]">
                        {SITE_LICENSE.issued}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[8px] uppercase tracking-[0.18em] text-[#948776]">
                        Scope
                      </dt>
                      <dd className="mt-2 text-xs leading-relaxed text-[#373128]">
                        {SITE_LICENSE.scope}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[8px] uppercase tracking-[0.18em] text-[#948776]">
                        Term
                      </dt>
                      <dd className="mt-2 text-xs leading-relaxed text-[#373128]">
                        {SITE_LICENSE.term}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[8px] uppercase tracking-[0.18em] text-[#948776]">
                        Custody
                      </dt>
                      <dd className="mt-2 text-xs leading-relaxed text-[#373128]">
                        {SITE_LICENSE.licensee}
                      </dd>
                    </div>
                  </dl>

                  <p className="mt-7 max-w-3xl text-[11px] leading-[1.85] text-[#776c5e] sm:text-xs">
                    The licensees may host, modify, adapt, and present the complete
                    website. The license is perpetual, worldwide, and non-transferable.
                    All public pages remain open; this key records provenance rather
                    than gating access. Third-party photography remains subject to its
                    original terms.
                  </p>

                  <div className="mt-9 flex flex-col gap-8 border-t border-[#d6cbbc] pt-7 sm:flex-row sm:items-end sm:justify-between">
                    <div className="min-w-0">
                      <p className="text-[8px] uppercase tracking-[0.2em] text-[#948776]">
                        Provenance fingerprint
                      </p>
                      <p className="mt-2 max-w-[440px] break-all font-mono text-[9px] leading-[1.7] tracking-[0.03em] text-[#776c5e]">
                        {SITE_LICENSE.fingerprint}
                      </p>
                      <p className="mt-3 text-[8px] uppercase tracking-[0.17em] text-[#a19482]">
                        Record version {SITE_LICENSE.version} / single-site license
                      </p>
                    </div>

                    <div className="flex items-center gap-4 self-start sm:self-auto">
                      <RecordSeal />
                      <div>
                        <p className="text-[8px] uppercase tracking-[0.2em] text-[#948776]">
                          Issued by
                        </p>
                        <p className="mt-1.5 font-playfair text-xl italic leading-none text-[#2b261f] sm:text-2xl">
                          The Lithos field office
                        </p>
                        <p className="mt-2 text-[8px] uppercase tracking-[0.17em] text-[#9c8f7e]">
                          {SITE_LICENSE.issuedShort}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>

            <Reveal delay={100}>
              <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-xl text-[10px] uppercase leading-relaxed tracking-[0.16em] text-[#8a7d6d]">
                  A copy of this record is kept with the project. Issued once,
                  held indefinitely.
                </p>
                <PrimaryLink to="/">Return to the field</PrimaryLink>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#0b0b0a] py-16 text-white sm:py-20">
          <TopoLines className="absolute -right-40 -top-24 h-[620px] w-[820px] text-white opacity-[0.07]" />
          <div className="relative mx-auto grid max-w-[1180px] gap-8 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-20 lg:px-12">
            <Reveal>
              <Eyebrow index="A note">Provenance</Eyebrow>
              <h2 className="mt-5 text-[clamp(2.4rem,4.5vw,4.4rem)] font-normal leading-[0.94] tracking-[-0.055em]">
                A key,
                <span className="block font-playfair italic text-[#d8e3ca]">
                  not a gate.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="max-w-xl text-sm leading-[1.85] text-white/50">
                The public field school remains open to everyone. This certificate
                records who the site belongs to, and gives Nisha and Priyanshu a
                permanent key for handover, archive, or keeping.
              </p>
              <p className="mt-6 text-[9px] uppercase tracking-[0.18em] text-white/30">
                Lithos / site license {SITE_LICENSE.id} / {SITE_LICENSE.status}
              </p>
            </Reveal>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
