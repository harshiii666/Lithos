import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Camera,
  Check,
  Compass,
  LogOut,
  Map,
  Radio,
  RotateCcw,
  Trash2,
} from 'lucide-react';
import { SiteLayout } from '../SiteLayout';
import {
  Eyebrow,
  PageTitle,
  ProfileAvatar,
  Reveal,
  TopoLines,
} from '../components';
import { PLANS } from '../data';
import { useAuth } from '../AuthProvider';
import { NICKNAME_MAX_LENGTH } from '../auth';

const QUICK_LINKS = [
  {
    label: 'The course',
    detail: 'Six weeks of reading the ground',
    to: '/course',
    icon: BookOpen,
  },
  {
    label: 'Field guides',
    detail: 'The complete field library',
    to: '/field-guides',
    icon: Map,
  },
  {
    label: 'Live fieldcasts',
    detail: 'Join the next reading',
    to: '/live-tour',
    icon: Radio,
  },
] as const;

const AVATAR_SIZE = 512;
const AVATAR_MAX_BYTES = 8 * 1024 * 1024;
const AVATAR_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

function formatJoined(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('That image could not be read.'));
    image.src = src;
  });
}

async function prepareAvatar(file: File) {
  if (!AVATAR_TYPES.has(file.type)) {
    throw new Error('Choose a JPG, PNG, WebP, or GIF image.');
  }

  if (file.size > AVATAR_MAX_BYTES) {
    throw new Error('Choose an image smaller than 8 MB.');
  }

  const objectUrl = URL.createObjectURL(file);

  try {
    const image = await loadImage(objectUrl);
    if (!image.naturalWidth || !image.naturalHeight) {
      throw new Error('That image could not be read.');
    }

    const canvas = document.createElement('canvas');
    canvas.width = AVATAR_SIZE;
    canvas.height = AVATAR_SIZE;

    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Your browser could not prepare that image.');
    }

    context.fillStyle = '#14110d';
    context.fillRect(0, 0, AVATAR_SIZE, AVATAR_SIZE);

    const scale = Math.max(
      AVATAR_SIZE / image.naturalWidth,
      AVATAR_SIZE / image.naturalHeight,
    );
    const width = image.naturalWidth * scale;
    const height = image.naturalHeight * scale;

    context.drawImage(
      image,
      (AVATAR_SIZE - width) / 2,
      (AVATAR_SIZE - height) / 2,
      width,
      height,
    );

    return canvas.toDataURL('image/jpeg', 0.86);
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

export default function AccountPage() {
  const { account, signOut, updateProfile } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [nickname, setNickname] = useState(account?.nickname ?? '');
  const [avatar, setAvatar] = useState<string | undefined>(account?.avatar);
  const [saving, setSaving] = useState(false);
  const [imageBusy, setImageBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setNickname(account?.nickname ?? '');
    setAvatar(account?.avatar);
  }, [account?.id, account?.nickname, account?.avatar]);

  if (!account) {
    return <Navigate to="/sign-in?next=/account" replace />;
  }

  const plan = PLANS.find((item) => item.name === account.plan);
  const included = plan?.features.slice(0, 3) ?? [];
  const price =
    plan === undefined
      ? '—'
      : plan.monthly === 0
        ? 'Free'
        : account.billing === 'annual'
          ? `$${plan.annual}/mo`
          : `$${plan.monthly}/mo`;
  const billingLabel =
    plan?.monthly === 0
      ? 'No payment required'
      : account.billing === 'annual'
        ? 'Billed annually'
        : 'Billed monthly';
  const fullName = `${account.firstName} ${account.lastName}`.trim();
  const displayName = account.nickname?.trim() || account.firstName;
  const cleanNickname = nickname.trim().replace(/\s+/g, ' ');
  const previewName = cleanNickname || account.firstName;
  const isDirty =
    cleanNickname !== (account.nickname ?? '') || (avatar ?? '') !== (account.avatar ?? '');

  const handleAvatarChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    setError('');
    setMessage('');
    setImageBusy(true);

    try {
      const nextAvatar = await prepareAvatar(file);
      setAvatar(nextAvatar);
      setMessage('Photo ready. Save your profile to keep it.');
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : 'That image could not be prepared. Try another one.',
      );
    } finally {
      setImageBusy(false);
    }
  };

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setMessage('');

    if (cleanNickname.length > NICKNAME_MAX_LENGTH) {
      setError(`Keep your nickname to ${NICKNAME_MAX_LENGTH} characters or fewer.`);
      return;
    }

    setSaving(true);
    try {
      await updateProfile({ nickname: cleanNickname, avatar: avatar ?? null });
      setNickname(cleanNickname);
      setMessage('Profile updated.');
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : 'Your profile could not be saved. Please try again.',
      );
    } finally {
      setSaving(false);
    }
  };

  const resetProfile = () => {
    setNickname(account.nickname ?? '');
    setAvatar(account.avatar);
    setError('');
    setMessage('');
  };

  return (
    <SiteLayout>
      <PageTitle title="Field Record — Lithos" />
      <div className="site-page-in">
        <section className="site-grain relative overflow-hidden bg-[#080808] pb-16 pt-32 text-white sm:pb-20 sm:pt-40">
          <div className="site-contour-grid absolute inset-0 opacity-70" />
          <TopoLines className="absolute -right-52 top-4 h-[780px] w-[1080px] text-white opacity-[0.07]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#080808] to-transparent" />

          <div className="relative z-10 mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
            <Reveal>
              <Eyebrow index="Field record / 01">Member access</Eyebrow>
            </Reveal>

            <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end lg:gap-16">
              <div>
                <Reveal delay={100}>
                  <h1 className="max-w-4xl text-[clamp(3rem,6.4vw,6.6rem)] font-normal leading-[0.9] tracking-[-0.065em]">
                    Welcome back,
                    <span className="block font-playfair italic font-normal text-[#d8e3ca]">
                      {displayName}.
                    </span>
                  </h1>
                </Reveal>
                <Reveal delay={220}>
                  <p className="mt-7 max-w-lg text-sm leading-[1.85] text-white/55 sm:text-base">
                    Your field record is open. The course, guides, and live
                    readings below are held against your membership.
                  </p>
                </Reveal>
              </div>

              <Reveal delay={320}>
                <div className="flex items-center gap-4 border-t border-white/15 pt-5">
                  <ProfileAvatar
                    src={account.avatar}
                    name={displayName}
                    className="h-14 w-14 border border-white/15 text-sm tracking-[0.08em]"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm text-white/85">{fullName}</p>
                    <p className="mt-1 text-[9px] uppercase tracking-[0.18em] text-white/35">
                      {account.id}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={420}>
              <dl className="mt-12 grid gap-6 border-t border-white/10 pt-6 text-[9px] uppercase tracking-[0.16em] sm:grid-cols-3">
                <div>
                  <dt className="text-white/30">Member since</dt>
                  <dd className="mt-2 text-xs normal-case tracking-normal text-white/70">
                    {formatJoined(account.createdAt)}
                  </dd>
                </div>
                <div>
                  <dt className="text-white/30">Membership</dt>
                  <dd className="mt-2 text-xs normal-case tracking-normal text-white/70">
                    {account.plan}
                  </dd>
                </div>
                <div>
                  <dt className="text-white/30">Status</dt>
                  <dd className="mt-2 flex items-center gap-2 text-xs normal-case tracking-normal text-[#c3d4b2]">
                    <span className="site-live-dot" /> Active
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </section>

        <section className="bg-[#f1ede4] py-16 text-[#18150f] sm:py-20">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
            <Reveal>
              <form
                onSubmit={handleSave}
                className="mb-12 border border-[#d0c6b8] bg-[#f6f2ea]"
              >
                <div className="grid gap-8 p-7 sm:p-9 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-12">
                  <div className="flex flex-col items-center gap-4 lg:items-start">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="group relative h-28 w-28 overflow-hidden rounded-full text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8702a] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f6f2ea]"
                      aria-label="Change profile picture"
                    >
                      <ProfileAvatar
                        src={avatar}
                        name={previewName}
                        className="h-full w-full border-4 border-[#ece4d7] text-3xl shadow-inner"
                      />
                      <span className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 rounded-full bg-black/60 text-[8px] uppercase tracking-[0.16em] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                        <Camera size={18} />
                        {imageBusy ? 'Preparing…' : 'Change photo'}
                      </span>
                    </button>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      aria-label="Upload profile picture"
                      className="sr-only"
                      onChange={handleAvatarChange}
                    />

                    <div className="flex items-center gap-4 text-[9px] uppercase tracking-[0.14em]">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="border-b border-[#b3a899] pb-1 text-[#5e5548] transition-colors hover:border-[#e8702a] hover:text-[#b25b2c]"
                      >
                        {avatar ? 'Change photo' : 'Add photo'}
                      </button>
                      {avatar ? (
                        <button
                          type="button"
                          onClick={() => {
                            setAvatar(undefined);
                            setError('');
                            setMessage('Photo removed. Save your profile to confirm.');
                          }}
                          className="inline-flex items-center gap-1.5 text-[#8d806f] transition-colors hover:text-[#b25b2c]"
                        >
                          <Trash2 size={12} />
                          Remove
                        </button>
                      ) : null}
                    </div>

                    <p className="max-w-[150px] text-center text-[9px] leading-relaxed text-[#9a8e7f] lg:text-left">
                      JPG, PNG, or WebP. Cropped square and kept in this browser.
                    </p>
                  </div>

                  <div>
                    <Eyebrow light index="Profile / 02">
                      How you appear
                    </Eyebrow>
                    <p className="mt-4 max-w-lg text-xs leading-[1.8] text-[#6d6355]">
                      A nickname and photo make the field record yours. They show
                      beside your name in the navigation and at the top of this
                      page.
                    </p>

                    <label className="mt-7 block">
                      <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-[#867b6b]">
                        Nickname
                      </span>
                      <input
                        type="text"
                        maxLength={NICKNAME_MAX_LENGTH}
                        value={nickname}
                        onChange={(event) => {
                          setNickname(event.target.value);
                          setError('');
                          setMessage('');
                        }}
                        placeholder={account.firstName}
                        aria-describedby="nickname-note"
                        className="mt-2 w-full border-b border-[#c9bfb0] bg-transparent pb-2.5 text-sm text-[#18150f] outline-none transition-colors placeholder:text-[#b3a899] focus:border-[#e8702a]"
                      />
                      <span
                        id="nickname-note"
                        className="mt-2 flex items-center justify-between gap-4 text-[9px] leading-relaxed text-[#9a8e7f]"
                      >
                        <span>Leave blank to use {account.firstName}.</span>
                        <span className="shrink-0 tabular-nums">
                          {nickname.length}/{NICKNAME_MAX_LENGTH}
                        </span>
                      </span>
                    </label>

                    <div className="mt-6 flex flex-wrap items-center gap-4">
                      <button
                        type="submit"
                        disabled={!isDirty || saving || imageBusy}
                        className="group inline-flex items-center gap-2 rounded-full bg-[#e8702a] px-5 py-2.5 text-xs font-medium text-white transition-all duration-300 hover:bg-[#d2611f] hover:shadow-lg hover:shadow-[#e8702a]/20 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-[#c9b6a6] disabled:shadow-none"
                      >
                        <Check size={14} />
                        {saving ? 'Saving…' : 'Save profile'}
                      </button>

                      {isDirty ? (
                        <>
                          <button
                            type="button"
                            onClick={resetProfile}
                            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-[#8d806f] transition-colors hover:text-[#b25b2c]"
                          >
                            <RotateCcw size={12} />
                            Reset
                          </button>
                          <span className="text-[9px] uppercase tracking-[0.14em] text-[#b25b2c]">
                            Unsaved changes
                          </span>
                        </>
                      ) : null}
                    </div>

                    {message ? (
                      <p className="mt-4 flex items-center gap-2 text-[11px] text-[#5b754b]" role="status">
                        <Check size={13} />
                        {message}
                      </p>
                    ) : null}

                    {error ? (
                      <p className="mt-4 text-[11px] leading-relaxed text-[#ad4e27]" role="alert">
                        {error}
                      </p>
                    ) : null}
                  </div>
                </div>
              </form>
            </Reveal>

            <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
              <Reveal>
                <div className="border border-[#d0c6b8] bg-[#f6f2ea] p-7 sm:p-9">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.18em] text-[#8d806f]">
                        Your membership / 03
                      </p>
                      <h2 className="mt-4 font-playfair text-4xl italic tracking-[-0.03em] sm:text-5xl">
                        {account.plan}
                      </h2>
                    </div>
                    <span className="shrink-0 border border-[#c8bcaa] px-3 py-1.5 text-[8px] uppercase tracking-[0.14em] text-[#6b6154]">
                      {plan?.label ?? 'Member'}
                    </span>
                  </div>

                  <div className="mt-8 flex items-end gap-2 border-y border-[#ded5c8] py-6">
                    <span className="text-4xl font-light tracking-[-0.05em] sm:text-5xl">{price}</span>
                    <span className="pb-1.5 text-[9px] uppercase tracking-[0.14em] text-[#918575]">
                      {billingLabel}
                    </span>
                  </div>

                  {included.length > 0 ? (
                    <ul className="mt-6 space-y-3">
                      {included.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm text-[#5f574b]">
                          <span className="mt-2 h-1 w-1 shrink-0 rotate-45 bg-[#e8702a]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  <div className="mt-8 flex flex-wrap items-center gap-5 border-t border-[#ded5c8] pt-5">
                    <Link
                      to="/plans"
                      className="group inline-flex items-center gap-2 text-xs font-medium text-[#3e392f] transition-colors hover:text-[#b25b2c]"
                    >
                      Compare or change plan
                      <ArrowUpRight
                        size={14}
                        className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </Link>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={120}>
                <div>
                  <Eyebrow light index="Account / 04">
                    The details on file
                  </Eyebrow>

                  <dl className="mt-7 divide-y divide-[#d6cbbc] border-y border-[#d6cbbc]">
                    <div className="flex items-baseline justify-between gap-6 py-4">
                      <dt className="text-[9px] uppercase tracking-[0.16em] text-[#8d806f]">
                        Name
                      </dt>
                      <dd className="text-right text-sm text-[#2b261e]">{fullName}</dd>
                    </div>
                    {account.nickname ? (
                      <div className="flex items-baseline justify-between gap-6 py-4">
                        <dt className="text-[9px] uppercase tracking-[0.16em] text-[#8d806f]">
                          Nickname
                        </dt>
                        <dd className="text-right text-sm text-[#2b261e]">
                          {account.nickname}
                        </dd>
                      </div>
                    ) : null}
                    <div className="flex items-baseline justify-between gap-6 py-4">
                      <dt className="text-[9px] uppercase tracking-[0.16em] text-[#8d806f]">
                        Email
                      </dt>
                      <dd className="min-w-0 truncate text-right text-sm text-[#2b261e]">
                        {account.email}
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-6 py-4">
                      <dt className="text-[9px] uppercase tracking-[0.16em] text-[#8d806f]">
                        Record no.
                      </dt>
                      <dd className="text-right text-sm text-[#2b261e]">{account.id}</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-6 py-4">
                      <dt className="text-[9px] uppercase tracking-[0.16em] text-[#8d806f]">
                        Joined
                      </dt>
                      <dd className="text-right text-sm text-[#2b261e]">
                        {formatJoined(account.createdAt)}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-7 flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        signOut();
                        navigate('/');
                      }}
                      className="group inline-flex items-center gap-2 rounded-full border border-[#b9ab98] px-5 py-2.5 text-xs font-medium text-[#3e392f] transition-colors hover:border-[#e8702a] hover:text-[#b25b2c]"
                    >
                      <LogOut size={14} />
                      Sign out
                    </button>
                    <p className="max-w-[240px] text-[10px] leading-relaxed text-[#9a8e7f]">
                      Your record stays on this browser. Signing out closes it on
                      this device.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={180}>
              <div className="mt-16 border-t border-[#d6cbbc] pt-8">
                <div className="flex items-center justify-between gap-6">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#8d806f]">
                    Where to next
                  </p>
                  <Compass size={16} strokeWidth={1.5} className="text-[#b25b2c]" />
                </div>

                <div className="mt-6 grid gap-px overflow-hidden border border-[#d0c6b8] bg-[#d0c6b8] sm:grid-cols-3">
                  {QUICK_LINKS.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.to}
                        to={link.to}
                        className="group flex flex-col justify-between gap-8 bg-[#f6f2ea] p-5 transition-colors hover:bg-[#ece4d7] sm:p-6"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <Icon size={18} strokeWidth={1.4} className="text-[#b25b2c]" />
                          <ArrowRight
                            size={15}
                            className="text-[#a39583] transition-transform group-hover:translate-x-1"
                          />
                        </div>
                        <div>
                          <p className="font-playfair text-xl italic">{link.label}</p>
                          <p className="mt-2 text-[11px] leading-relaxed text-[#7d7364]">
                            {link.detail}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
