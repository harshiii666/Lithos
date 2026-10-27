import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
} from 'lucide-react';
import { BrandMark, PageTitle, TopoLines } from '../components';
import { IMAGES } from '../data';
import { useAuth } from '../AuthProvider';
import '../site.css';

export default function SignInPage() {
  const { account, signIn } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const nextParam = searchParams.get('next');
  const destination =
    nextParam && nextParam.startsWith('/') && !nextParam.startsWith('//')
      ? nextParam
      : '/account';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (account) navigate(destination, { replace: true });
  }, [account, destination, navigate]);

  return (
    <div className="site-shell min-h-screen bg-[#f1ede4] text-[#18150f]">
      <PageTitle title="Sign In — Lithos" />
      <div className="lg:grid lg:min-h-screen lg:grid-cols-[0.47fr_0.53fr]">
        <aside className="site-grain relative flex min-h-[240px] flex-col justify-between overflow-hidden bg-[#080808] p-6 text-white sm:p-9 lg:sticky lg:top-0 lg:h-screen lg:min-h-0 lg:p-10 xl:p-14">
          <img
            src={IMAGES.lava}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/45 via-[#080808]/60 to-[#080808]/95" />
          <TopoLines className="absolute -bottom-20 -left-24 h-[700px] w-[900px] text-white opacity-[0.1]" />

          <div className="relative z-10">
            <BrandMark />
            <div className="mt-10 hidden items-center gap-3 text-[9px] uppercase tracking-[0.22em] text-white/35 sm:flex">
              <span className="h-px w-7 bg-white/30" />
              Field school / member access
            </div>
          </div>

          <div className="relative z-10 hidden lg:block">
            <p className="text-[9px] uppercase tracking-[0.22em] text-white/35">
              Every layer remembers
            </p>
            <h2 className="mt-5 max-w-md text-[clamp(3.2rem,5.2vw,5.6rem)] font-normal leading-[0.9] tracking-[-0.06em]">
              Return to
              <span className="block font-playfair italic text-[#d4e1c6]">the ground.</span>
            </h2>
            <p className="mt-7 max-w-sm text-sm leading-[1.8] text-white/50">
              Your guides, course notes, and live fieldcasts are waiting where
              you left them.
            </p>
          </div>

          <div className="relative z-10 mt-auto max-w-[250px] pb-7 lg:hidden">
            <p className="font-playfair text-[2rem] italic leading-[1.08] text-white/85">
              Return to the ground.
            </p>
          </div>

          <div className="relative z-10 flex items-end justify-between gap-4 border-t border-white/10 pt-5">
            <div>
              <p className="text-[9px] uppercase tracking-[0.17em] text-white/30">Now enrolling</p>
              <p className="mt-1.5 text-xs text-white/60">Cohort 04 · Winter 2027</p>
            </div>
            <p className="text-[9px] uppercase tracking-[0.17em] text-white/30">Est. 2024</p>
          </div>
        </aside>

        <main className="relative flex min-h-screen flex-col px-5 py-8 sm:px-9 sm:py-10 lg:px-14 xl:px-24">
          <div className="flex items-center justify-between gap-4">
            <Link
              to="/"
              className="group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.17em] text-[#7d7364] transition-colors hover:text-[#18150f]"
            >
              <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-1" />
              Back to the field
            </Link>
            <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.15em] text-[#918574]">
              <LockKeyhole size={11} /> Secure sign-in
            </span>
          </div>

          <div className="my-auto w-full max-w-md py-14 sm:py-16">
            <p className="text-[9px] uppercase tracking-[0.2em] text-[#b25b2c]">
              Member access / no. 05
            </p>
            <h1 className="mt-4 text-[clamp(2.8rem,5vw,4.6rem)] font-normal leading-[0.92] tracking-[-0.06em]">
              Open your
              <span className="block font-playfair italic">field record.</span>
            </h1>
            <p className="mt-5 max-w-md text-sm leading-[1.8] text-[#6c6254]">
              Sign in with the email and password you used when you joined. Your
              record stays open on this device until you sign out.
            </p>

            <form
              className="mt-9"
              onSubmit={async (event) => {
                event.preventDefault();
                setError('');
                setSubmitting(true);
                try {
                  await signIn(email, password);
                  navigate(destination, { replace: true });
                } catch (signInError) {
                  setError(
                    signInError instanceof Error
                      ? signInError.message
                      : 'That record could not be opened. Please try again.',
                  );
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              <label className="block">
                <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-[#867b6b]">
                  Email address
                </span>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@somewhere.earth"
                  className="mt-2 w-full border-b border-[#c9bfb0] bg-transparent pb-2.5 text-sm text-[#18150f] outline-none transition-colors placeholder:text-[#b3a899] focus:border-[#e8702a]"
                />
              </label>

              <label className="mt-6 block">
                <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-[#867b6b]">
                  Password
                </span>
                <span className="relative mt-2 flex items-center border-b border-[#c9bfb0] pb-2.5 transition-colors focus-within:border-[#e8702a]">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Your password"
                    className="w-full bg-transparent text-sm text-[#18150f] outline-none placeholder:text-[#b3a899]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="ml-3 shrink-0 text-[#958978] transition-colors hover:text-[#18150f]"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </span>
              </label>

              {error ? (
                <p className="mt-5 text-xs leading-relaxed text-[#ad4e27]" role="alert">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={submitting}
                className="group mt-7 flex w-full items-center justify-center gap-2.5 rounded-full bg-[#e8702a] px-6 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#d2611f] hover:shadow-lg hover:shadow-[#e8702a]/20 active:scale-[0.99] disabled:cursor-wait disabled:opacity-70"
              >
                {submitting ? 'Opening your record…' : 'Sign in'}
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>

            <p className="mt-8 border-t border-[#d0c6b7] pt-5 text-[10px] leading-relaxed text-[#9a8e7f]">
              New to Lithos?{' '}
              <Link
                to="/sign-up"
                className="border-b border-[#b3a899] text-[#5e5548] transition-colors hover:border-[#e8702a] hover:text-[#b25b2c]"
              >
                Create a field record
              </Link>
            </p>

            <p className="mt-4 text-[10px] leading-relaxed text-[#a09586]">
              Accounts are stored in this browser. Signing in on another device
              will not find the same record.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
