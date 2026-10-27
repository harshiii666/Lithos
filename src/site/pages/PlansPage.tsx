import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, ChevronDown, Minus } from 'lucide-react';
import { SiteLayout } from '../SiteLayout';
import {
  Eyebrow,
  PageTitle,
  ProfileAvatar,
  Reveal,
  TopoLines,
  cn,
} from '../components';
import {
  COMPARISON_ROWS,
  IMAGES,
  PLAN_FAQS,
  PLANS,
  type Plan,
} from '../data';
import { useAuth } from '../AuthProvider';
import type { BillingPeriod } from '../auth';

function PlanCard({
  plan,
  annual,
  index,
  signedIn,
  activePlan,
  activeBilling,
  changingPlan,
  onSelect,
}: {
  plan: Plan;
  annual: boolean;
  index: number;
  signedIn: boolean;
  activePlan: string | null;
  activeBilling: BillingPeriod | null;
  changingPlan: string | null;
  onSelect: (plan: Plan, billing: BillingPeriod) => void;
}) {
  const featured = plan.featured;
  const price = annual ? plan.annual : plan.monthly;
  const planSlug = plan.name.toLowerCase().replace(/\s+/g, '-');
  const billingHref = `/sign-up?plan=${planSlug}&billing=${
    plan.monthly === 0 ? 'free' : annual ? 'annual' : 'monthly'
  }`;
  const billing: BillingPeriod = annual ? 'annual' : 'monthly';
  const isActive = signedIn && activePlan === plan.name;
  const isCurrentSelection =
    isActive && (plan.monthly === 0 || activeBilling === billing);
  const isChanging = changingPlan === plan.name;
  const actionLabel = isActive
    ? billing === 'annual'
      ? 'Switch to annual billing'
      : 'Switch to monthly billing'
    : `Switch to ${plan.name}`;

  return (
    <Reveal delay={index * 100} className="h-full">
      <article
        className={cn(
          'relative flex h-full flex-col border p-7 transition-colors duration-500 sm:p-8',
          featured
            ? 'border-[#1c1710] bg-[#17140f] text-[#f4efe6] shadow-2xl shadow-[#3f2a1a]/20'
            : 'border-[#d0c6b8] bg-[#f6f2ea] text-[#18150f] hover:border-[#a99c8a]',
          isActive &&
            'border-[#8fa37c] ring-1 ring-[#8fa37c] ring-offset-2 ring-offset-[#f1ede4] hover:border-[#8fa37c]',
        )}
      >
        {isActive ? (
          <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-[#d9e4cd] px-3 py-1.5 text-[8px] font-medium uppercase tracking-[0.14em] text-[#3d5130]">
            <Check size={10} strokeWidth={2.4} />
            Current plan
          </span>
        ) : featured ? (
          <span className="absolute right-5 top-5 rounded-full bg-[#e8702a] px-3 py-1.5 text-[8px] font-medium uppercase tracking-[0.14em] text-white">
            Most chosen
          </span>
        ) : null}

        <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.17em]">
          <span className={featured ? 'text-[#b7c7a6]' : 'text-[#8d806f]'}>{plan.label}</span>
          <span className={featured ? 'text-white/20' : 'text-[#c4b9aa]'}>/ 0{index + 1}</span>
        </div>

        <h2 className={cn('mt-5 font-playfair text-4xl italic tracking-[-0.03em]', featured && 'text-white')}>
          {plan.name}
        </h2>
        <p className={cn('mt-4 text-sm leading-[1.7]', featured ? 'text-white/50' : 'text-[#6b6154]')}>
          {plan.description}
        </p>

        <div className={cn('mt-8 border-y py-6', featured ? 'border-white/10' : 'border-[#ded5c8]')}>
          {plan.monthly === 0 ? (
            <div className="flex items-end gap-2">
              <span className="text-4xl font-light tracking-[-0.05em]">Free</span>
              <span className={cn('pb-1 text-[9px] uppercase tracking-[0.14em]', featured ? 'text-white/35' : 'text-[#918575]')}>
                forever
              </span>
            </div>
          ) : (
            <>
              <div className="flex items-end gap-2">
                <span className="text-5xl font-light tracking-[-0.06em]">${price}</span>
                <span className={cn('pb-1.5 text-[9px] uppercase tracking-[0.14em]', featured ? 'text-white/35' : 'text-[#918575]')}>
                  per month
                </span>
              </div>
              <p className={cn('mt-2 text-[9px] uppercase tracking-[0.13em]', featured ? 'text-white/30' : 'text-[#a09586]')}>
                {annual ? `Billed annually at $${price * 12}` : 'Billed monthly · cancel anytime'}
              </p>
            </>
          )}
        </div>

        <div className="mt-7 flex-1">
          <p className={cn('text-[9px] uppercase tracking-[0.16em]', featured ? 'text-white/30' : 'text-[#938777]')}>
            Included
          </p>
          <ul className="mt-5 space-y-3.5">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <span
                  className={cn(
                    'mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border',
                    featured
                      ? 'border-[#e8702a]/40 bg-[#e8702a]/15 text-[#f1a06d]'
                      : 'border-[#c9bfb0] text-[#b25c2b]',
                  )}
                >
                  <Check size={10} strokeWidth={2.3} />
                </span>
                <span className={cn('text-sm leading-relaxed', featured ? 'text-white/65' : 'text-[#5c5346]')}>
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {signedIn ? (
          isCurrentSelection ? (
            <span
              className={cn(
                'mt-8 flex w-full items-center justify-center gap-2 rounded-full border px-6 py-3.5 text-sm font-medium',
                featured
                  ? 'border-white/15 text-white/70'
                  : 'border-[#d6ccbe] text-[#6b6154]',
              )}
            >
              <Check size={14} />
              Current plan
            </span>
          ) : (
            <button
              type="button"
              onClick={() => onSelect(plan, plan.monthly === 0 ? 'monthly' : billing)}
              disabled={changingPlan !== null}
              className={cn(
                'group mt-8 flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-all duration-300 disabled:cursor-wait disabled:opacity-60',
                featured
                  ? 'bg-[#e8702a] text-white hover:bg-[#d2611f] hover:shadow-lg hover:shadow-[#e8702a]/20'
                  : 'border border-[#c8bdae] text-[#2d281f] hover:border-[#17140f] hover:bg-[#17140f] hover:text-white',
              )}
            >
              {isChanging ? 'Updating…' : actionLabel}
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </button>
          )
        ) : (
          <Link
            to={billingHref}
            className={cn(
              'group mt-8 flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-all duration-300',
              featured
                ? 'bg-[#e8702a] text-white hover:bg-[#d2611f] hover:shadow-lg hover:shadow-[#e8702a]/20'
                : 'border border-[#c8bdae] text-[#2d281f] hover:border-[#17140f] hover:bg-[#17140f] hover:text-white',
            )}
          >
            {plan.cta}
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        )}
      </article>
    </Reveal>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative overflow-hidden bg-[#0b0b0a] py-24 text-white sm:py-32">
      <TopoLines className="absolute -left-48 top-20 h-[700px] w-[1000px] text-white opacity-[0.05]" />
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[0.38fr_0.62fr] lg:gap-20">
          <Reveal>
            <Eyebrow index="04">Practical matters</Eyebrow>
            <h2 className="mt-6 max-w-md text-[clamp(2.5rem,4.2vw,4.2rem)] font-normal leading-[0.95] tracking-[-0.055em]">
              Before you
              <span className="font-playfair italic text-[#c9d8bb]"> begin.</span>
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/45">
              Still deciding? Write to us at{' '}
              <a className="text-white/70 underline decoration-white/20 underline-offset-4 hover:text-white" href="mailto:hello@lithos.school">
                hello@lithos.school
              </a>
              . A real person will answer.
            </p>
          </Reveal>

          <div className="border-t border-white/10">
            {PLAN_FAQS.map((faq, index) => {
              const isOpen = open === index;
              return (
                <div key={faq.question} className="border-b border-white/10">
                  <button
                    type="button"
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${index}`}
                    onClick={() => setOpen(isOpen ? -1 : index)}
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="text-[9px] tracking-[0.15em] text-white/30">0{index + 1}</span>
                      <span className="text-base font-normal tracking-[-0.02em] text-white/80 transition-colors group-hover:text-white sm:text-lg">
                        {faq.question}
                      </span>
                    </span>
                    <span
                      className={cn(
                        'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300',
                        isOpen
                          ? 'rotate-180 border-[#e8702a] bg-[#e8702a] text-white'
                          : 'border-white/20 text-white/55 group-hover:border-white/35',
                      )}
                    >
                      <ChevronDown size={14} />
                    </span>
                  </button>
                  <div
                    id={`faq-${index}`}
                    className={cn(
                      'grid transition-all duration-500',
                      isOpen ? 'grid-rows-[1fr] pb-6 opacity-100' : 'grid-rows-[0fr] opacity-0',
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-xl pl-7 text-sm leading-[1.8] text-white/45">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PlansPage() {
  const { account, changePlan } = useAuth();
  const [annual, setAnnual] = useState(account ? account.billing === 'annual' : true);
  const [changingPlan, setChangingPlan] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (account) setAnnual(account.billing === 'annual');
  }, [account?.billing]);

  const displayName = account?.nickname?.trim() || account?.firstName || '';
  const activePlan = PLANS.find((plan) => plan.name === account?.plan);
  const activeBillingLabel =
    activePlan?.monthly === 0
      ? 'Free forever'
      : account?.billing === 'annual'
        ? 'Billed annually'
        : 'Billed monthly';

  const handlePlanChange = async (plan: Plan, billing: BillingPeriod) => {
    const nextBilling = plan.monthly === 0 ? 'monthly' : billing;
    const billingLabel = nextBilling === 'annual' ? 'annually' : 'monthly';
    const wasActive = account?.plan === plan.name;
    setChangingPlan(plan.name);
    setError('');
    setFeedback('');

    try {
      await changePlan(plan.name, nextBilling);
      setFeedback(
        wasActive
          ? `Billing updated. ${plan.name} remains your active plan, billed ${billingLabel}.`
          : `${plan.name} is now your active plan${
              plan.monthly === 0 ? '' : `, billed ${billingLabel}`
            }.`,
      );
    } catch (changeError) {
      setError(
        changeError instanceof Error
          ? changeError.message
          : 'Your plan could not be changed. Please try again.',
      );
    } finally {
      setChangingPlan(null);
    }
  };

  return (
    <SiteLayout>
      <PageTitle title="Plans — Lithos" />
      <div className="site-page-in">
        <section className="site-grain relative overflow-hidden bg-[#080808] pt-32 text-white sm:pt-40">
          <div className="absolute inset-0">
            <img src={IMAGES.lava} alt="" className="h-full w-full object-cover opacity-25" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/30 via-[#080808]/85 to-[#080808]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(232,112,42,0.12),transparent_42%)]" />
          </div>
          <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-6">
              <Eyebrow index="Membership">Plans</Eyebrow>
              <p className="hidden text-[9px] uppercase tracking-[0.2em] text-white/35 sm:block">
                Field access / all depths
              </p>
            </div>
            <div className="py-16 text-center sm:py-20">
              <Reveal>
                <h1 className="mx-auto max-w-4xl text-[clamp(3.4rem,7.5vw,7.4rem)] font-normal leading-[0.86] tracking-[-0.065em]">
                  Choose your
                  <span className="block font-playfair italic text-[#d4e0c6]">depth.</span>
                </h1>
                <p className="mx-auto mt-7 max-w-lg text-sm leading-[1.8] text-white/50 sm:text-base">
                  Whether you are here for a single walk or a long study of the
                  Earth, there is a place in the field for you.
                </p>
              </Reveal>

              <Reveal delay={150} className="mt-10 flex justify-center">
                <div className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.06] p-1 backdrop-blur-sm">
                  <button
                    type="button"
                    onClick={() => {
                      setAnnual(false);
                      setFeedback('');
                      setError('');
                    }}
                    aria-pressed={!annual}
                    className={cn(
                      'rounded-full px-5 py-2 text-xs font-medium transition-all',
                      !annual ? 'bg-white text-[#16130e]' : 'text-white/50 hover:text-white',
                    )}
                  >
                    Monthly
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAnnual(true);
                      setFeedback('');
                      setError('');
                    }}
                    aria-pressed={annual}
                    className={cn(
                      'flex items-center gap-2 rounded-full px-5 py-2 text-xs font-medium transition-all',
                      annual ? 'bg-white text-[#16130e]' : 'text-white/50 hover:text-white',
                    )}
                  >
                    Annual
                    <span className="rounded-full bg-[#e8702a]/15 px-2 py-0.5 text-[8px] uppercase tracking-[0.1em] text-[#e8702a]">
                      save 20%
                    </span>
                  </button>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="relative bg-[#f1ede4] py-20 text-[#171510] sm:py-24">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            {account ? (
              <Reveal>
                <div className="mb-7 flex flex-col gap-5 border border-[#c9bfb0] bg-[#f6f2ea] p-5 sm:mb-8 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                  <div className="flex items-center gap-4">
                    <ProfileAvatar
                      src={account.avatar}
                      name={displayName}
                      className="h-12 w-12 border border-[#c9bfb0] text-xs"
                    />
                    <div className="min-w-0">
                      <p className="text-[8px] uppercase tracking-[0.18em] text-[#8d806f]">
                        Signed in · active membership
                      </p>
                      <p className="mt-1.5 truncate text-sm text-[#2d281f]">
                        <span className="font-medium">{displayName}</span>
                        <span className="text-[#8d8272]"> — {account.plan}</span>
                        <span className="text-[#8d8272]"> · {activeBillingLabel}</span>
                      </p>
                    </div>
                  </div>
                  <p className="max-w-xs text-[10px] leading-relaxed text-[#8d8272] sm:text-right">
                    Choose any plan below and it updates in place. You stay signed
                    in.
                  </p>
                </div>
              </Reveal>
            ) : null}

            {feedback ? (
              <div
                role="status"
                className="mb-5 flex items-start gap-2.5 border border-[#afbf9b] bg-[#e5eddc] px-4 py-3 text-xs leading-relaxed text-[#40532f]"
              >
                <Check size={14} strokeWidth={2.2} className="mt-0.5 shrink-0" />
                {feedback}
              </div>
            ) : null}

            {error ? (
              <div
                role="alert"
                className="mb-5 border border-[#d6a385] bg-[#f4e3d7] px-4 py-3 text-xs leading-relaxed text-[#8a3f1d]"
              >
                {error}
              </div>
            ) : null}

            <div className="grid items-stretch gap-5 lg:grid-cols-3">
              {PLANS.map((plan, index) => (
                <PlanCard
                  key={plan.name}
                  plan={plan}
                  annual={annual}
                  index={index}
                  signedIn={Boolean(account)}
                  activePlan={account?.plan ?? null}
                  activeBilling={account?.billing ?? null}
                  changingPlan={changingPlan}
                  onSelect={handlePlanChange}
                />
              ))}
            </div>

            <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[#d2c8ba] pt-7 text-center sm:flex-row sm:text-left">
              <p className="max-w-md text-xs leading-relaxed text-[#766c5d]">
                Every paid plan includes a 14-day return window, lifetime access
                to completed notes, and no surprise renewals.
              </p>
              <span className="text-[9px] uppercase tracking-[0.17em] text-[#998d7d]">
                Prices in USD · taxes calculated at checkout
              </span>
            </div>
          </div>
        </section>

        <section className="bg-[#f1ede4] pb-24 text-[#171510] sm:pb-32">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <div className="border-t border-[#d2c8ba] pt-14">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div>
                  <Eyebrow index="03" light>
                    Compare the field
                  </Eyebrow>
                  <h2 className="mt-4 text-3xl font-normal tracking-[-0.045em] sm:text-4xl">
                    What comes with each.
                  </h2>
                </div>
                <p className="max-w-xs text-xs leading-relaxed text-[#7e7364]">
                  All memberships include the field letter and access to the
                  public reading room.
                </p>
              </div>

              <div className="site-scrollbar mt-4 flex items-center justify-between text-[9px] uppercase tracking-[0.16em] text-[#998d7d] sm:hidden">
                <span>Swipe to compare</span>
                <span>→</span>
              </div>
              <div className="site-scrollbar mt-5 overflow-x-auto sm:mt-9">
                <table className="w-full min-w-[700px] border-collapse text-left">
                  <thead>
                    <tr className="border-y border-[#cfc5b7]">
                      <th className="w-[35%] py-4 pr-5 text-[9px] font-normal uppercase tracking-[0.17em] text-[#8c8171]">
                        Feature
                      </th>
                      {PLANS.map((plan) => (
                        <th
                          key={plan.name}
                          className={cn(
                            'w-[21.6%] px-4 py-4 text-[10px] font-medium uppercase tracking-[0.13em]',
                            plan.featured && 'bg-[#e7dfd2]',
                          )}
                        >
                          {plan.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON_ROWS.map((row) => (
                      <tr key={row.feature} className="border-b border-[#d8cfc2]">
                        <td className="py-4 pr-5 text-sm text-[#4f473b]">{row.feature}</td>
                        {[row.field, row.prospector, row.expedition].map((value, index) => (
                          <td
                            key={index}
                            className={cn(
                              'px-4 py-4 text-xs text-[#5d5548]',
                              PLANS[index].featured && 'bg-[#e7dfd2]/55',
                            )}
                          >
                            {typeof value === 'boolean' ? (
                              value ? (
                                <Check size={15} strokeWidth={2} className="text-[#b85b2a]" />
                              ) : (
                                <Minus size={15} strokeWidth={1.5} className="text-[#b2a797]" />
                              )
                            ) : (
                              value
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <FAQ />
      </div>
    </SiteLayout>
  );
}
