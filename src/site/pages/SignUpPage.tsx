import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Eye,
  EyeOff,
  LockKeyhole,
} from 'lucide-react';
import {
  BrandMark,
  PageTitle,
  TopoLines,
} from '../components';
import { IMAGES, PLANS, TOURS } from '../data';
import { useAuth } from '../AuthProvider';
import '../site.css';

function formatPlanParam(value: string | null) {
  if (!value) return 'Prospector';
  const normalised = value.replace(/[-_]+/g, ' ').trim().toLowerCase();
  const match = PLANS.find((plan) => plan.name.toLowerCase() === normalised);
  return match?.name ?? 'Prospector';
}

export default function SignUpPage() {
  const { createAccount } = useAuth();
  const [searchParams] = useSearchParams();
  const selectedTour = TOURS.find((tour) => tour.id === searchParams.get('tour'));
  const initialPlan = formatPlanParam(searchParams.get('plan'));
  const initialBilling = searchParams.get('billing') === 'annual' ? 'annual' : 'monthly';

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [plan, setPlan] = useState(initialPlan);
  const [billing, setBilling] = useState<'monthly' | 'annual'>(
    initialBilling === 'annual' ? 'annual' : 'monthly',
  );
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const selectedPlan = PLANS.find((item) => item.name === plan) ?? PLANS[1];
  const price =
    selectedPlan.monthly === 0
      ? 'Free'
      : `$${billing === 'annual' ? selectedPlan.annual : selectedPlan.monthly}/mo`;

  return (
    <div className="site-shell min-h-screen bg-[#f1ede4] text-[#18150f]">
      <PageTitle title="Sign Up — Lithos" />
      <div className="lg:grid lg:min-h-screen lg:grid-cols-[0.47fr_0.53fr]">
        <aside className="site-grain relative flex min-h-[260px] flex-col justify-between overflow-hidden bg-[#080808] p-6 text-white sm:p-9 lg:sticky lg:top-0 lg:h-screen lg:min-h-0 lg:p-10 xl:p-14">
          <img
            src={IMAGES.moss}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/45 via-[#080808]/55 to-[#080808]/95" />
          <TopoLines className="absolute -bottom-20 -left-24 h-[700px] w-[900px] text-white opacity-[0.1]" />

          <div className="relative z-10">
            <BrandMark />
            <div className="mt-10 hidden items-center gap-3 text-[9px] uppercase tracking-[0.22em] text-white/35 sm:flex">
              <span className="h-px w-7 bg-white/30" />
              Field school / member access
            </div>
          </div>

          <div className="relative z-10 hidden lg:block">
            <p className="text-[9px] uppercase tracking-[0.22em] text-white/35">A place in the field</p>
            <h2 className="mt-5 max-w-md text-[clamp(3.2rem,5.2vw,5.6rem)] font-normal leading-[0.9] tracking-[-0.06em]">
              Read the ground.
              <span className="block font-playfair italic text-[#d4e1c6]">Keep what you find.</span>
            </h2>
            <p className="mt-7 max-w-sm text-sm leading-[1.8] text-white/50">
              One account, every layer. Your guides, course notes, and live
              fieldcasts in a single quiet place.
            </p>
          </div>

          <div className="relative z-10 mt-auto max-w-[250px] pb-7 lg:hidden">
            <p className="font-playfair text-[2rem] italic leading-[1.08] text-white/85">
              A place in the field.
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
              <LockKeyhole size={11} /> Secure sign-up
            </span>
          </div>

          {submitted ? (
            <div className="site-page-in my-auto max-w-lg py-16">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#b9c7aa] bg-[#e4eadb] text-[#5b754b]">
                <Check size={24} strokeWidth={1.8} />
              </span>
              <p className="mt-8 text-[9px] uppercase tracking-[0.2em] text-[#b25b2c]">
                Registration received
              </p>
              <h1 className="mt-4 text-[clamp(2.7rem,4.8vw,4.5rem)] font-normal leading-[0.94] tracking-[-0.055em]">
                Your field record
                <span className="block font-playfair italic">is open.</span>
              </h1>
              <p className="mt-6 max-w-md text-sm leading-[1.8] text-[#655d50]">
                Welcome, {firstName || 'field traveller'}. Your record is saved
                on this device under{' '}
                <span className="font-medium text-[#2b261e]">{email || 'your email'}</span>.
                {selectedTour
                  ? ` Your seat request for ${selectedTour.title} is noted.`
                  : ' Your first field letter will follow shortly.'}
              </p>

              <div className="mt-8 border-y border-[#d0c6b7] py-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.16em] text-[#948878]">Membership</p>
                    <p className="mt-1 text-base text-[#2a251d]">{selectedPlan.name}</p>
                  </div>
                  <p className="text-sm text-[#655d50]">{price}</p>
                </div>
                {selectedTour ? (
                  <div className="mt-4 flex items-center justify-between gap-4 border-t border-[#d0c6b7] pt-4">
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.16em] text-[#948878]">Live fieldcast</p>
                      <p className="mt-1 text-sm text-[#2a251d]">{selectedTour.title}</p>
                    </div>
                    <p className="text-xs text-[#655d50]">{selectedTour.time}</p>
                  </div>
                ) : null}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/account"
                  className="group inline-flex items-center gap-2 rounded-full bg-[#e8702a] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#d2611f]"
                >
                  Open my field record
                  <ArrowUpRight
                    size={15}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
                <Link to="/course" className="text-sm text-[#7d7364] transition-colors hover:text-[#18150f]">
                  Begin the course
                </Link>
              </div>
            </div>
          ) : (
            <div className="my-auto w-full max-w-lg py-14 sm:py-16">
              {selectedTour ? (
                <div className="mb-8 flex items-start gap-3 border border-[#cabfae] bg-[#e8e0d3] p-4">
                  <span className="site-live-dot mt-1.5" />
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.16em] text-[#9a6b48]">
                      Seat request in progress
                    </p>
                    <p className="mt-1 text-sm text-[#3f382e]">
                      {selectedTour.title} · {selectedTour.place} · {selectedTour.time}
                    </p>
                  </div>
                </div>
              ) : null}

              <p className="text-[9px] uppercase tracking-[0.2em] text-[#b25b2c]">
                Member access / no. 04
              </p>
              <h1 className="mt-4 text-[clamp(2.8rem,5vw,4.6rem)] font-normal leading-[0.92] tracking-[-0.06em]">
                Begin your
                <span className="block font-playfair italic">field record.</span>
              </h1>
              <p className="mt-5 max-w-md text-sm leading-[1.8] text-[#6c6254]">
                Create your account to keep field notes, follow the course, and
                join the next live reading.
              </p>

              <form
                className="mt-9"
                onSubmit={async (event) => {
                  event.preventDefault();
                  setError('');
                  if (!agreed) {
                    setError('Please agree to the field terms before continuing.');
                    return;
                  }
                  if (password.length < 8) {
                    setError('Your password needs at least 8 characters.');
                    return;
                  }

                  setSubmitting(true);
                  try {
                    await createAccount({
                      firstName,
                      lastName,
                      email,
                      password,
                      plan,
                      billing,
                    });
                    setSubmitted(true);
                  } catch (submitError) {
                    setError(
                      submitError instanceof Error
                        ? submitError.message
                        : 'The field record could not be saved. Please try again.',
                    );
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-[#867b6b]">
                      First name
                    </span>
                    <input
                      type="text"
                      required
                      autoComplete="given-name"
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
                      placeholder="Imani"
                      className="mt-2 w-full border-b border-[#c9bfb0] bg-transparent pb-2.5 text-sm text-[#18150f] outline-none transition-colors placeholder:text-[#b3a899] focus:border-[#e8702a]"
                    />
                  </label>
                  <label className="block">
                    <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-[#867b6b]">
                      Last name
                    </span>
                    <input
                      type="text"
                      required
                      autoComplete="family-name"
                      value={lastName}
                      onChange={(event) => setLastName(event.target.value)}
                      placeholder="Vale"
                      className="mt-2 w-full border-b border-[#c9bfb0] bg-transparent pb-2.5 text-sm text-[#18150f] outline-none transition-colors placeholder:text-[#b3a899] focus:border-[#e8702a]"
                    />
                  </label>
                </div>

                <label className="mt-6 block">
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
                      minLength={8}
                      autoComplete="new-password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="At least 8 characters"
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

                <div className="mt-7 grid gap-5 sm:grid-cols-[1fr_0.7fr]">
                  <label className="relative block">
                    <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-[#867b6b]">
                      Plan
                    </span>
                    <span className="mt-2 flex items-center border-b border-[#c9bfb0] pb-2.5 transition-colors focus-within:border-[#e8702a]">
                      <select
                        value={plan}
                        onChange={(event) => setPlan(event.target.value)}
                        className="w-full appearance-none bg-transparent pr-5 text-sm text-[#18150f] outline-none"
                      >
                        {PLANS.map((item) => (
                          <option key={item.name} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={14} className="pointer-events-none -ml-4 shrink-0 text-[#958978]" />
                    </span>
                  </label>

                  <label className="relative block">
                    <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-[#867b6b]">
                      Billing
                    </span>
                    <span className="mt-2 flex items-center border-b border-[#c9bfb0] pb-2.5">
                      <select
                        value={billing}
                        onChange={(event) => setBilling(event.target.value as 'monthly' | 'annual')}
                        className="w-full appearance-none bg-transparent pr-5 text-sm text-[#18150f] outline-none"
                      >
                        <option value="monthly">Monthly</option>
                        <option value="annual">Annual · save 20%</option>
                      </select>
                      <ChevronDown size={14} className="pointer-events-none -ml-4 shrink-0 text-[#958978]" />
                    </span>
                  </label>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-[#d0c6b7] pt-4">
                  <span className="text-[9px] uppercase tracking-[0.16em] text-[#948878]">
                    Your selection
                  </span>
                  <span className="text-sm text-[#3d372e]">
                    {selectedPlan.name} · <span className="text-[#b25b2c]">{price}</span>
                  </span>
                </div>

                <label className="mt-6 flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(event) => setAgreed(event.target.checked)}
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-[#e8702a]"
                  />
                  <span className="text-[11px] leading-relaxed text-[#817565]">
                    I agree to the field terms and the privacy of the ground. I
                    understand I can leave a plan at any time.
                  </span>
                </label>

                {error ? (
                  <p className="mt-4 text-xs text-[#ad4e27]" role="alert">
                    {error}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={submitting}
                  className="group mt-7 flex w-full items-center justify-center gap-2.5 rounded-full bg-[#e8702a] px-6 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#d2611f] hover:shadow-lg hover:shadow-[#e8702a]/20 active:scale-[0.99] disabled:cursor-wait disabled:opacity-70"
                >
                  {submitting ? 'Opening your field record…' : 'Create my account'}
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                </button>

                <p className="mt-4 text-center text-[10px] leading-relaxed text-[#a09586]">
                  No payment is taken today. You can change or cancel your plan
                  from your field record.
                </p>
              </form>

              <p className="mt-10 border-t border-[#d0c6b7] pt-5 text-[10px] leading-relaxed text-[#9a8e7f]">
                Already hold a field record?{' '}
                <Link
                  to="/sign-in"
                  className="border-b border-[#b3a899] text-[#5e5548] transition-colors hover:border-[#e8702a] hover:text-[#b25b2c]"
                >
                  Sign in
                </Link>
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
