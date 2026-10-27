import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { ProfileAvatar } from './site/components';
import { useAuth } from './site/AuthProvider';

const BG_IMAGE_1 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_195923_b0ba8ace-1d1d-4f2c-9a28-1ab84b330680.png&w=1280&q=85';

const BG_IMAGE_2 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=1280&q=85';

const SPOTLIGHT_R = 260;

const NAV_LINKS = [
  { label: 'Course', to: '/course' },
  { label: 'Field Guides', to: '/field-guides' },
  { label: 'Geology', to: '/geology' },
  { label: 'Plans', to: '/plans' },
  { label: 'Live Tour', to: '/live-tour' },
  { label: 'About', to: '/about' },
];

interface CursorPosition {
  x: number;
  y: number;
}

interface RevealLayerProps {
  image: string;
  cursorX: number;
  cursorY: number;
}

function RevealLayer({ image, cursorX, cursorY }: RevealLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const sizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    sizeCanvas();
    window.addEventListener('resize', sizeCanvas);

    return () => window.removeEventListener('resize', sizeCanvas);
  }, []);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const reveal = revealRef.current;
    const context = canvas?.getContext('2d');

    if (!canvas || !reveal || !context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);

    const gradient = context.createRadialGradient(
      cursorX,
      cursorY,
      0,
      cursorX,
      cursorY,
      SPOTLIGHT_R,
    );

    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.4, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.6, 'rgba(255,255,255,0.75)');
    gradient.addColorStop(0.75, 'rgba(255,255,255,0.4)');
    gradient.addColorStop(0.88, 'rgba(255,255,255,0.12)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');

    context.fillStyle = gradient;
    context.beginPath();
    context.arc(cursorX, cursorY, SPOTLIGHT_R, 0, Math.PI * 2);
    context.fill();

    const mask = `url("${canvas.toDataURL()}")`;
    reveal.style.setProperty('mask-image', mask);
    reveal.style.setProperty('-webkit-mask-image', mask);
  });

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ display: 'none' }}
      />
      <div
        ref={revealRef}
        aria-hidden="true"
        className="absolute inset-0 bg-center bg-cover bg-no-repeat z-30 pointer-events-none"
        style={{
          backgroundImage: `url(${image})`,
          maskSize: '100% 100%',
          WebkitMaskSize: '100% 100%',
        }}
      />
    </>
  );
}

export default function App() {
  const mouse = useRef<CursorPosition>({ x: -999, y: -999 });
  const smooth = useRef<CursorPosition>({ x: -999, y: -999 });
  const rafRef = useRef<number>(0);
  const [cursorPos, setCursorPos] = useState<CursorPosition>({ x: -999, y: -999 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { account } = useAuth();

  const displayName = account ? account.nickname?.trim() || account.firstName : '';

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = event.clientX;
      mouse.current.y = event.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1;

      setCursorPos({ x: smooth.current.x, y: smooth.current.y });
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <div
      className="min-h-screen bg-white tracking-[-0.02em]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between p-4 sm:p-5">
        <Link
          to="/"
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center gap-2"
          aria-label="Lithos home"
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 256 256"
            fill="#ffffff"
            aria-hidden="true"
          >
            <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
          </svg>
          <span className="text-white text-2xl font-playfair italic">Lithos</span>
        </Link>

        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-2 py-2 items-center gap-1">
          {NAV_LINKS.map((link, index) => (
            <Link
              key={link.to}
              to={link.to}
              className={
                index === 0
                  ? 'whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium text-white'
                  : 'whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium text-white/80 hover:bg-white/20 hover:text-white transition-colors'
              }
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {account ? (
            <Link
              to="/account"
              onClick={() => setMobileMenuOpen(false)}
              className="hidden items-center gap-2 rounded-full border border-white/30 bg-white/20 py-1.5 pl-1.5 pr-4 text-white backdrop-blur-md transition-colors hover:bg-white/30 md:inline-flex"
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
                className="hidden whitespace-nowrap text-sm font-medium text-white/80 transition-colors hover:text-white md:block"
              >
                Sign In
              </Link>
              <Link
                to="/sign-up"
                className="hidden whitespace-nowrap md:block bg-white text-gray-900 text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-gray-100"
              >
                Sign Up
              </Link>
            </>
          )}

          <button
            type="button"
            className="lg:hidden text-white p-2 -mr-2"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden absolute top-full left-4 right-4 rounded-2xl border border-white/20 bg-black/60 backdrop-blur-xl p-2 shadow-2xl"
          >
            <div className="flex flex-col items-stretch">
              {NAV_LINKS.map((link, index) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={
                    index === 0
                      ? 'text-left px-4 py-3 rounded-xl text-sm font-medium text-white hover:bg-white/10 transition-colors'
                      : 'text-left px-4 py-3 rounded-xl text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-colors'
                  }
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to={account ? '/account' : '/sign-up'}
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 bg-white text-center text-gray-900 text-sm font-semibold px-6 py-3 rounded-full hover:bg-gray-100"
              >
                {account ? (
                  <ProfileAvatar
                    src={account.avatar}
                    name={displayName}
                    className="h-5 w-5 text-[8px]"
                  />
                ) : null}
                {account ? 'Open my field record' : 'Sign Up'}
              </Link>
              {!account ? (
                <Link
                  to="/sign-in"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-2 border border-white/25 text-center text-white/80 text-sm font-semibold px-6 py-3 rounded-full hover:bg-white/10"
                >
                  Sign In
                </Link>
              ) : (
                <p className="mt-3 text-center text-[10px] uppercase tracking-[0.16em] text-white/40">
                  Signed in as {displayName}
                </p>
              )}
            </div>
          </div>
        )}
      </nav>

      <section
        className="relative w-full overflow-hidden h-screen bg-black"
        style={{ height: '100dvh' }}
      >
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat z-10 hero-zoom"
          style={{ backgroundImage: `url(${BG_IMAGE_1})` }}
        />

        <RevealLayer
          image={BG_IMAGE_2}
          cursorX={cursorPos.x}
          cursorY={cursorPos.y}
        />

        <div className="absolute top-[14%] left-0 right-0 flex flex-col items-center text-center px-5 pointer-events-none z-50">
          <h1 className="text-white leading-[0.95]">
            <span
              className="block font-playfair italic font-normal text-5xl sm:text-7xl md:text-8xl hero-anim hero-reveal"
              style={{ letterSpacing: '-0.05em', animationDelay: '0.25s' }}
            >
              Layers hold
            </span>
            <span
              className="block font-normal text-5xl sm:text-7xl md:text-8xl -mt-1 hero-anim hero-reveal"
              style={{ letterSpacing: '-0.08em', animationDelay: '0.42s' }}
            >
              tales of time
            </span>
          </h1>
        </div>

        <div className="hidden sm:block absolute bottom-14 left-10 md:left-14 max-w-[260px] z-50 hero-anim hero-fade" style={{ animationDelay: '0.7s' }}>
          <p className="text-sm text-white/80 leading-relaxed">
            Every layer of sediment records a chapter of our planet, from ancient
            seabeds to drifting ash, layered across millions of years beneath us.
          </p>
        </div>

        <div
          className="absolute bottom-10 sm:bottom-24 left-5 right-5 sm:left-auto sm:right-10 md:right-14 max-w-full sm:max-w-[260px] flex flex-col items-start gap-4 sm:gap-5 z-50 hero-anim hero-fade"
          style={{ animationDelay: '0.85s' }}
        >
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            Our interactive maps let you peel back the crust to trace how stones,
            fossils, and deep time combine to shape the ground beneath your feet.
          </p>
          <Link
            to="/geology"
            className="bg-[#e8702a] hover:bg-[#d2611f] text-white text-sm font-medium px-7 py-3 rounded-full transition-all hover:scale-[1.03] active:scale-95 hover:shadow-lg hover:shadow-[#e8702a]/30"
          >
            Start Digging
          </Link>
        </div>
      </section>
    </div>
  );
}
