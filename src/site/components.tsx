import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check, Send } from 'lucide-react';
import type { Guide } from './data';

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function PageTitle({ title }: { title: string }) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return null;
}

export function BrandMark({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      aria-label="Lithos home"
      className={cn('group flex items-center gap-2.5 text-white', className)}
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 256 256"
        fill="currentColor"
        aria-hidden="true"
        className="transition-transform duration-500 group-hover:rotate-6"
      >
        <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
      </svg>
      <span className="font-playfair text-2xl italic leading-none">Lithos</span>
    </Link>
  );
}

export function ProfileAvatar({
  src,
  name,
  className,
}: {
  src?: string;
  name: string;
  className?: string;
}) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => Array.from(part)[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <span
      className={cn(
        'relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#e8702a] text-white',
        className,
      )}
    >
      {src ? (
        <img
          src={src}
          alt={`${name || 'Member'} profile`}
          className="h-full w-full object-cover"
        />
      ) : (
        <span role="img" aria-label={`${name || 'Member'} profile`} className="font-medium">
          {initials || 'L'}
        </span>
      )}
    </span>
  );
}

export function Eyebrow({
  children,
  index,
  light = false,
  className,
}: {
  children: ReactNode;
  index?: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.24em]',
        light ? 'text-[#544d42]' : 'text-[#e8702a]',
        className,
      )}
    >
      {index ? <span className="opacity-70">{index}</span> : null}
      <span className={cn('h-px w-7', light ? 'bg-[#544d42]/40' : 'bg-[#e8702a]/40')} />
      <span>{children}</span>
    </div>
  );
}

export function PrimaryLink({
  to,
  children,
  className,
  onClick,
}: {
  to: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(
        'group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#e8702a] px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:scale-[1.02] hover:bg-[#d2611f] hover:shadow-lg hover:shadow-[#e8702a]/25 active:scale-[0.98]',
        className,
      )}
    >
      {children}
      <ArrowUpRight
        size={15}
        strokeWidth={1.8}
        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </Link>
  );
}

export function QuietLink({
  to,
  children,
  dark = false,
  className,
}: {
  to: string;
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={cn(
        'group inline-flex items-center gap-2 text-sm font-medium transition-colors',
        dark
          ? 'text-[#3e392f] hover:text-[#e8702a]'
          : 'text-white/75 hover:text-white',
        className,
      )}
    >
      <span className="site-underline">{children}</span>
      <ArrowUpRight
        size={14}
        strokeWidth={1.8}
        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </Link>
  );
}

export function Reveal({
  children,
  delay = 0,
  className,
  id,
  as: Tag = 'div',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  id?: string;
  as?: 'div' | 'section' | 'article' | 'li';
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -32px 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      id={id}
      className={cn('site-reveal', visible && 'is-visible', className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

export function Stat({
  value,
  label,
  light = false,
}: {
  value: string;
  label: string;
  light?: boolean;
}) {
  return (
    <div className="min-w-0">
      <div
        className={cn(
          'text-2xl font-light tracking-[-0.05em] sm:text-3xl',
          light ? 'text-[#1c1a15]' : 'text-white',
        )}
      >
        {value}
      </div>
      <div
        className={cn(
          'mt-1 text-[10px] uppercase leading-relaxed tracking-[0.16em]',
          light ? 'text-[#6e6457]' : 'text-white/45',
        )}
      >
        {label}
      </div>
    </div>
  );
}

export function TopoLines({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 1200 900"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      style={style}
    >
      <g stroke="currentColor" strokeWidth="1">
        <path d="M-40 744C98 637 174 539 320 548c174 11 198 151 362 141 144-8 223-103 356-118 90-10 172 12 244 46" />
        <path d="M-46 788c153-94 239-198 393-196 188 2 214 151 387 138 150-11 231-112 367-130 92-12 178 7 251 42" />
        <path d="M-56 834c161-86 258-193 420-194 204-2 236 150 415 133 154-15 246-123 389-143 87-12 174 2 242 31" />
        <path d="M-40 700c133-96 206-196 360-197 180-2 208 153 382 146 154-7 240-99 374-113 99-10 186 10 259 47" />
        <path d="M-30 655c134-90 210-187 364-187 175 0 208 145 380 137 153-7 240-92 367-102 104-8 190 13 263 49" />
        <path d="M-31 608c132-82 211-169 361-169 168 0 208 132 374 124 149-7 237-84 358-91 105-6 191 17 269 58" />
        <ellipse cx="940" cy="252" rx="344" ry="250" transform="rotate(-18 940 252)" />
        <ellipse cx="936" cy="249" rx="294" ry="209" transform="rotate(-18 936 249)" />
        <ellipse cx="933" cy="246" rx="244" ry="171" transform="rotate(-18 933 246)" />
        <ellipse cx="930" cy="243" rx="195" ry="136" transform="rotate(-18 930 243)" />
        <ellipse cx="926" cy="240" rx="147" ry="101" transform="rotate(-18 926 240)" />
        <ellipse cx="922" cy="237" rx="99" ry="67" transform="rotate(-18 922 237)" />
        <ellipse cx="918" cy="233" rx="51" ry="35" transform="rotate(-18 918 233)" />
      </g>
    </svg>
  );
}

export function Marquee() {
  const words = ['Deep time', 'Fieldwork', 'Stone', 'Sediment', 'Fire', 'Drift', 'Fossils', 'Ground truth'];
  return (
    <div
      className="site-marquee border-y border-white/10 bg-[#0b0b0a] py-4 text-[10px] uppercase tracking-[0.3em] text-white/35"
      aria-hidden="true"
    >
      {[0, 1].map((copy) => (
        <div className="site-marquee-track" key={copy}>
          {words.map((word) => (
            <span key={word} className="flex items-center gap-12 whitespace-nowrap">
              {word}
              <span className="inline-block h-1 w-1 rotate-45 bg-[#e8702a]" />
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export function GuideArtwork({
  guide,
  className,
}: {
  guide: Guide;
  className?: string;
}) {
  const { background, foreground, accent, secondary } = guide.palette;

  return (
    <div
      className={cn('site-grain relative overflow-hidden', className)}
      style={{ backgroundColor: background, color: foreground }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 720 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        className="absolute inset-0 h-full w-full"
      >
        {guide.art === 'strata' && (
          <>
            <path
              d="M-40 260C118 221 223 283 356 252c153-36 228-97 404-53v150c-183-20-267 58-405 80-151 25-231-48-395-2Z"
              fill={accent}
              fillOpacity=".17"
            />
            {[350, 395, 442, 488, 535, 580, 630, 690].map((y, index) => (
              <path
                key={y}
                d={`M-40 ${y}C120 ${y - 26 - index * 3} 207 ${y + 18} 349 ${y - 8}c154-29 236-71 411-31`}
                stroke={foreground}
                strokeOpacity={index % 3 === 0 ? '.58' : '.26'}
                strokeWidth={index % 3 === 0 ? '1.4' : '1'}
              />
            ))}
            <path
              d="M122 278c29 38 71 37 106 7 29-24 63-20 88 7"
              stroke={accent}
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx="565" cy="326" r="5" fill={accent} />
            <circle cx="590" cy="342" r="3" fill={foreground} fillOpacity=".5" />
            <circle cx="612" cy="315" r="2.5" fill={foreground} fillOpacity=".4" />
          </>
        )}

        {guide.art === 'glass' && (
          <>
            <path d="M88 92 546 33l100 562-447 170Z" stroke={secondary} strokeOpacity=".55" />
            <path d="m199 760 52-638 348-25-77 625Z" fill={secondary} fillOpacity=".28" stroke={foreground} strokeOpacity=".48" />
            <path d="m251 122 125 405 168-412-52 575-198 60Z" stroke={accent} strokeOpacity=".8" strokeWidth="1.5" />
            <path d="M251 122c52 90 106 163 125 405" stroke={foreground} strokeOpacity=".22" />
            <path d="M376 527c104-19 168-255 168-412" stroke={foreground} strokeOpacity=".18" />
            <path d="m140 188 489 426M113 269l410 379M482 145 202 724" stroke={foreground} strokeOpacity=".12" />
            <circle cx="455" cy="213" r="72" fill={accent} fillOpacity=".08" stroke={accent} strokeOpacity=".35" />
            <circle cx="488" cy="186" r="27" fill={accent} fillOpacity=".16" />
          </>
        )}

        {guide.art === 'fossil' && (
          <>
            <circle cx="355" cy="447" r="264" stroke={secondary} strokeOpacity=".45" />
            <circle cx="355" cy="447" r="212" stroke={foreground} strokeOpacity=".18" />
            <path
              d="M355 669c-143 0-244-91-244-209 0-125 115-211 253-191 110 16 177 105 160 190-15 74-92 127-177 116-61-8-103-63-87-115 13-42 64-68 111-52 33 11 48 45 35 73-10 22-37 32-58 20"
              stroke={accent}
              strokeWidth="3"
              strokeLinecap="round"
            />
            {Array.from({ length: 16 }).map((_, index) => {
              const angle = (index / 16) * Math.PI * 2;
              const x = 355 + Math.cos(angle) * 227;
              const y = 447 + Math.sin(angle) * 227;
              return <line key={index} x1="355" y1="447" x2={x} y2={y} stroke={foreground} strokeOpacity=".07" />;
            })}
            <path d="M100 700c112-30 178-14 284 12M77 742c151-31 216-7 311 19" stroke={secondary} strokeWidth="1.5" strokeOpacity=".45" />
          </>
        )}

        {guide.art === 'fault' && (
          <>
            {[95, 160, 225, 290, 355, 420, 485, 550, 615, 680, 745, 810].map((y, index) => (
              <path
                key={y}
                d={`M-30 ${y} 162 ${y - 40} 340 ${y + 48} 470 ${y + 9}`}
                stroke={foreground}
                strokeOpacity={index % 2 === 0 ? '.26' : '.12'}
              />
            ))}
            {[95, 160, 225, 290, 355, 420, 485, 550, 615, 680, 745, 810].map((y) => (
              <path key={`right-${y}`} d={`M 500 ${y + 66} 730 ${y + 116}`} stroke={foreground} strokeOpacity=".2" />
            ))}
            <path d="m383 0 86 218-75 136 70 197-76 196 88 153" stroke={accent} strokeWidth="4" strokeLinecap="round" />
            <path d="m438 0 78 221-68 132 64 198-71 196 81 153" stroke={foreground} strokeOpacity=".18" />
            <path d="M144 683c71-65 121-44 187-77" stroke={accent} strokeOpacity=".45" />
            <circle cx="386" cy="352" r="7" fill={accent} />
          </>
        )}

        {guide.art === 'river' && (
          <>
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <path
                key={index}
                d={`M${90 + index * 27} -30c86 139-17 220 81 333 79 91 237 63 239 208 2 145-168 178-110 419`}
                stroke={foreground}
                strokeOpacity={index === 2 ? '.52' : '.2'}
                strokeWidth={index === 2 ? '1.6' : '1'}
              />
            ))}
            <path
              d="M93-20c83 135-10 217 85 326 84 96 238 65 239 209 1 126-108 176-116 319"
              stroke={accent}
              strokeWidth="2.5"
              strokeOpacity=".7"
            />
            <path d="M276 282c96 43 138 122 142 225M438 695c57 32 92 89 110 190" stroke={secondary} strokeOpacity=".45" strokeWidth="2" />
            <path d="M523 100c-24 75 12 130 62 176M148 648c-41 44-47 102-26 169" stroke={foreground} strokeOpacity=".24" strokeWidth="2" />
          </>
        )}

        {guide.art === 'bloom' && (
          <>
            {[185, 238, 292, 348].map((radius, index) => (
              <circle
                key={radius}
                cx="365"
                cy="430"
                r={radius}
                stroke={foreground}
                strokeOpacity={index === 0 ? '.34' : '.12'}
                strokeDasharray={index === 1 ? '3 9' : undefined}
              />
            ))}
            <path d="M365 704V218M196 572l338-284M222 284l286 288" stroke={secondary} strokeOpacity=".28" />
            {[
              [265, 315, 31],
              [343, 268, 18],
              [463, 322, 42],
              [506, 432, 22],
              [419, 510, 35],
              [302, 520, 19],
              [224, 426, 14],
              [582, 252, 11],
              [167, 646, 20],
              [474, 653, 14],
              [568, 567, 30],
            ].map(([cx, cy, radius], index) => (
              <g key={`${cx}-${cy}`}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={radius}
                  fill={index % 3 === 0 ? accent : secondary}
                  fillOpacity={index % 3 === 0 ? '.38' : '.18'}
                  stroke={foreground}
                  strokeOpacity=".24"
                />
                <circle cx={cx - radius / 3} cy={cy + radius / 5} r={radius / 7} fill={foreground} fillOpacity=".22" />
              </g>
            ))}
          </>
        )}

        <path d="M44 103V60h43M676 797v43h-43" stroke={foreground} strokeOpacity=".35" />
        <text
          x="44"
          y="843"
          fill={foreground}
          fillOpacity=".55"
          fontSize="16"
          letterSpacing="4"
          fontFamily="Inter, sans-serif"
        >
          LITHOS / FIELD ATLAS
        </text>
        <text
          x="676"
          y="843"
          fill={accent}
          fontSize="20"
          letterSpacing="3"
          textAnchor="end"
          fontFamily="Inter, sans-serif"
        >
          {guide.index}
        </text>
      </svg>
    </div>
  );
}

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <form
      className="w-full"
      onSubmit={(event) => {
        event.preventDefault();
        if (!email.trim()) return;
        setSent(true);
        setEmail('');
      }}
    >
      {sent ? (
        <div className="flex items-center gap-3 py-3 text-sm text-[#d9e4cf]">
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#a9bf98]/30 bg-[#a9bf98]/10">
            <Check size={14} />
          </span>
          You are on the field list. Watch your inbox.
        </div>
      ) : (
        <div
          className={cn(
            'flex items-center gap-3 border-b border-white/20 pb-3 transition-colors focus-within:border-[#e8702a]',
            compact ? 'max-w-sm' : 'max-w-md',
          )}
        >
          <Send size={15} strokeWidth={1.5} className="shrink-0 text-white/35" />
          <label htmlFor={compact ? 'footer-email' : 'newsletter-email'} className="sr-only">
            Email address
          </label>
          <input
            id={compact ? 'footer-email' : 'newsletter-email'}
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Your email address"
            className="min-w-0 flex-1 bg-transparent py-1 text-sm text-white outline-none placeholder:text-white/35"
          />
          <button
            type="submit"
            className="group flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-[#e8702a] hover:bg-[#e8702a] hover:text-white"
            aria-label="Subscribe to the field letter"
          >
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      )}
      <p className="mt-3 text-[10px] uppercase tracking-[0.16em] text-white/30">
        One field letter each month. No noise.
      </p>
    </form>
  );
}
