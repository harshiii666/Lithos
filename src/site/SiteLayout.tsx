import { useEffect, useState, type ReactNode } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import { BrandMark, cn, NewsletterForm, ProfileAvatar } from './components';
import { NAV_ITEMS } from './data';
import { useAuth } from './AuthProvider';
import './site.css';

function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { account } = useAuth();

  const displayName = account ? account.nickname?.trim() || account.firstName : '';

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-[100] transition-all duration-500',
        scrolled || open
          ? 'border-b border-white/10 bg-[#090909]/90 backdrop-blur-xl'
          : 'border-b border-transparent bg-gradient-to-b from-black/40 to-transparent',
      )}
    >
      <nav className="relative mx-auto flex h-[78px] max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:h-[88px]">
        <BrandMark />

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 rounded-full border border-white/15 bg-white/[0.07] p-1.5 backdrop-blur-md lg:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'whitespace-nowrap rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors duration-300',
                  isActive
                    ? 'bg-white/15 text-white'
                    : 'text-white/60 hover:bg-white/10 hover:text-white',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {account ? (
            <Link
              to="/account"
              className="hidden items-center gap-2.5 rounded-full border border-white/15 bg-white/10 py-1.5 pl-1.5 pr-4 text-white backdrop-blur-md transition-colors hover:bg-white/15 md:inline-flex"
            >
              <ProfileAvatar
                src={account.avatar}
                name={displayName}
                className="h-7 w-7 text-[10px]"
              />
              <span className="text-[10px] uppercase tracking-[0.15em]">Field record</span>
            </Link>
          ) : (
            <>
              <Link
                to="/sign-in"
                className="hidden whitespace-nowrap text-sm font-medium text-white/70 transition-colors hover:text-white md:inline-flex"
              >
                Sign In
              </Link>
              <Link
                to="/sign-up"
                className="hidden whitespace-nowrap rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:bg-[#f2eee7] md:inline-flex"
              >
                Sign Up
              </Link>
            </>
          )}

          <button
            type="button"
            className="-mr-2 p-2 text-white lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="site-mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <div
        id="site-mobile-menu"
        className={cn(
          'overflow-y-auto border-white/10 bg-[#090909]/95 backdrop-blur-xl transition-all duration-500 lg:hidden',
          open
            ? 'h-[calc(100svh-78px)] border-t opacity-100'
            : 'h-0 opacity-0',
        )}
      >
        <div className="px-5 pb-7 pt-4">
          <div className="flex flex-col">
            {NAV_ITEMS.map((item, index) => (
              <NavLink
                key={item.to}
                to={item.to}
                tabIndex={open ? 0 : -1}
                className={({ isActive }) =>
                  cn(
                    'flex items-center justify-between border-b border-white/10 py-4 text-xl font-light tracking-[-0.03em] transition-colors',
                    isActive ? 'text-[#e8702a]' : 'text-white/80 hover:text-white',
                  )
                }
              >
                <span>
                  <span className="mr-3 align-middle text-[9px] tracking-[0.18em] text-white/30">
                    0{index + 1}
                  </span>
                  {item.label}
                </span>
                <ArrowUpRight size={17} strokeWidth={1.5} className="text-white/30" />
              </NavLink>
            ))}
          </div>
          <Link
            to={account ? '/account' : '/sign-up'}
            tabIndex={open ? 0 : -1}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#e8702a] px-6 py-3.5 text-sm font-medium text-white"
          >
            {account ? (
              <ProfileAvatar
                src={account.avatar}
                name={displayName}
                className="h-5 w-5 text-[8px]"
              />
            ) : null}
            {account ? 'Open my field record' : 'Sign Up'} <ArrowRight size={15} />
          </Link>
          {!account ? (
            <Link
              to="/sign-in"
              tabIndex={open ? 0 : -1}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-medium text-white/75"
            >
              Sign In
            </Link>
          ) : (
            <p className="mt-3 text-center text-[10px] uppercase tracking-[0.16em] text-white/35">
              Signed in as {displayName}
            </p>
          )}
        </div>
      </div>
    </header>
  );
}

function SiteFooter() {
  const { account } = useAuth();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#070707] text-[#f5f1e8]">
      <div
        className="pointer-events-none absolute -right-24 -top-40 h-[620px] w-[620px] rounded-full opacity-[0.16]"
        style={{
          background:
            'radial-gradient(circle at center, rgba(232,112,42,0.65), transparent 67%)',
        }}
      />
      <div className="relative mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-24">
          <div>
            <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#e8702a]">
              The field letter / monthly
            </span>
            <h2 className="mt-5 max-w-xl text-[clamp(2.4rem,5vw,4.7rem)] font-normal leading-[0.96] tracking-[-0.055em]">
              Stay close to
              <span className="font-playfair italic text-[#c8d6b8]"> the ground.</span>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/50">
              A slow dispatch from the field: one landscape, one mineral, one idea
              for reading the Earth. Delivered on the first Sunday of each month.
            </p>
            <div className="mt-8">
              <NewsletterForm compact />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-2">
            <div>
              <h3 className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/35">
                Explore
              </h3>
              <div className="mt-5 flex flex-col items-start gap-3.5">
                <Link className="site-underline text-sm text-white/65 transition-colors hover:text-white" to="/course">
                  The course
                </Link>
                <Link className="site-underline text-sm text-white/65 transition-colors hover:text-white" to="/field-guides">
                  Field guides
                </Link>
                <Link className="site-underline text-sm text-white/65 transition-colors hover:text-white" to="/live-tour">
                  Live tour
                </Link>
                <Link className="site-underline text-sm text-white/65 transition-colors hover:text-white" to="/about">
                  About
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/35">
                The archive
              </h3>
              <div className="mt-5 flex flex-col items-start gap-3.5">
                <Link className="site-underline text-sm text-white/65 transition-colors hover:text-white" to="/geology">
                  Geology
                </Link>
                <Link className="site-underline text-sm text-white/65 transition-colors hover:text-white" to="/plans">
                  Plans
                </Link>
                {account ? (
                  <Link className="site-underline text-sm text-white/65 transition-colors hover:text-white" to="/account">
                    Field record
                  </Link>
                ) : (
                  <>
                    <Link className="site-underline text-sm text-white/65 transition-colors hover:text-white" to="/sign-in">
                      Sign in
                    </Link>
                    <Link className="site-underline text-sm text-white/65 transition-colors hover:text-white" to="/sign-up">
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="col-span-2 sm:col-span-1 lg:col-span-2">
              <h3 className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/35">
                Field office
              </h3>
              <p className="mt-5 text-sm leading-relaxed text-white/55">
                Reykjavík, Iceland
                <br />
                Portland, Oregon
              </p>
              <a
                href="mailto:hello@lithos.school"
                className="site-underline mt-4 inline-block text-sm text-white/65 transition-colors hover:text-white"
              >
                hello@lithos.school
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <BrandMark />
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] uppercase leading-relaxed tracking-[0.17em] text-white/30">
            <span>A field school for deep time · © {new Date().getFullYear()} Lithos</span>
            <span aria-hidden="true" className="text-white/15">/</span>
            <Link
              to="/license"
              className="site-underline transition-colors hover:text-white/60"
            >
              Site license
            </Link>
          </p>
          <p className="text-[10px] uppercase tracking-[0.17em] text-white/30">
            45°28′N&nbsp;&nbsp;122°42′W
          </p>
        </div>
      </div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell min-h-screen overflow-x-clip bg-[#090909] text-[#f5f1e8]">
      <SiteNav />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}
