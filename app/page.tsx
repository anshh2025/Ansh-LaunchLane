"use client";

import { useState, useRef, useEffect, memo } from "react";
import { useRouter } from "next/navigation";
import { useAuth, SignInButton } from "@clerk/nextjs";
import { CheckoutButton } from "@clerk/nextjs/experimental";
import { ArrowRight, Zap, ChevronRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { HoleBackground } from "@/components/animate-ui/components/backgrounds/hole";
import { FEATURES, PLACEHOLDERS, STEPS, SUGGESTIONS } from "@/lib/data";
import { PRICING_PLANS } from "@/lib/constants";
import {
  BlueTitle,
  GrayTitle,
  SectionHeading,
  SectionLabel,
} from "@/components/reusables";

// Memoized so it NEVER re-renders when parent state changes (typing, focus etc.)
const HeroBackground = memo(function HeroBackground() {
  return (
    <>
      <HoleBackground
        strokeColor="rgba(20,184,166,0.18)"
        numberOfLines={60}
        numberOfDiscs={60}
        particleRGBColor={[52, 211, 153]}
        className="absolute inset-0 h-full w-full [&_canvas]:!opacity-55"
        style={{
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 60%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 60%, transparent 100%)",
        }}
      />
      {/* Teal glows matching the screenshot */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -bottom-20 -left-40 h-[600px] w-[600px] rounded-full bg-teal-500/25 blur-[120px]" />
        <div className="absolute top-10 -right-20 h-[300px] w-[300px] rounded-full bg-teal-400/15 blur-[100px]" />
      </div>
    </>
  );
});

export default function LandingPage() {
  const { isSignedIn, has } = useAuth();
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [prompt, setPrompt] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (isFocused || prompt) return;
    const t = setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % PLACEHOLDERS.length);
    }, 3000);
    return () => clearInterval(t);
  }, [isFocused, prompt]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 200) + "px";
  }, [prompt]);

  const handleSubmit = () => {
    if (!prompt.trim() || !isSignedIn) return;
    router.push(`/workspace?prompt=${encodeURIComponent(prompt.trim())}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSuggestion = (s: string) => {
    setPrompt(s);
    textareaRef.current?.focus();
  };

  return (
    <main className="min-h-screen premium-bg selection:bg-emerald-500/20 text-white">
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center overflow-hidden px-4 pb-24 pt-40 text-center">
        <HeroBackground />

        {/* Badge */}
        <div className="z-10 mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/60 backdrop-blur-sm">
          <Zap className="h-3 w-3 text-emerald-400" />
          Powered by Agentic AI
        </div>

        {/* Headline */}
        <h1 className="z-10 mx-auto max-w-3xl text-balance font-serif text-5xl leading-[1.15] tracking-tight sm:text-6xl lg:text-7xl">
          <span className="text-white">From idea to</span>
          <br />
          <BlueTitle className="italic">extraordinary.</BlueTitle>
        </h1>

        {/* Subtext */}
        <p className="z-10 mx-auto mt-6 max-w-lg text-balance text-base leading-relaxed text-white/45">
          Describe your idea in simple words and watch LaunchLane
          design, code and deliver a complete website for you.
        </p>

        {/* Input box */}
        <div className="z-10 relative mx-auto mt-10 w-full max-w-2xl">
          <div
            className={cn(
              "rounded-2xl border bg-[#0d1f18]/80 backdrop-blur-sm transition-all duration-200",
              isFocused
                ? "border-emerald-500/40 shadow-[0_0_40px_rgba(16,185,129,0.12)]"
                : "border-white/10"
            )}
          >
            {/* Text input */}
            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Describe the website you want to build..."
              rows={1}
              className="w-full resize-none bg-transparent px-5 pt-5 pb-3 text-sm text-white/90 placeholder:text-white/25 focus:outline-none sm:text-base"
              style={{ minHeight: 56, maxHeight: 200 }}
            />

            {/* Bottom row — tags + button */}
            <div className="flex items-center justify-between px-4 pb-4 pt-1 gap-3 flex-wrap">
              {/* Feature tags */}
              <div className="flex items-center gap-3 flex-wrap">
                {[
                  { icon: Zap, label: "Smart build" },
                  { icon: null, label: "Full stack" },
                  { icon: null, label: "Responsive" },
                  { icon: null, label: "SEO ready" },
                ].map(({ icon: Icon, label }) => (
                  <span key={label} className="flex items-center gap-1 text-[11px] text-white/35">
                    {Icon && <Icon className="h-3 w-3" />}
                    {!Icon && <span className="h-3 w-3 text-white/20">□</span>}
                    {label}
                  </span>
                ))}
              </div>

              {/* Generate button */}
              {isSignedIn ? (
                <Button
                  onClick={handleSubmit}
                  disabled={!prompt.trim()}
                  className="h-9 rounded-xl px-5 font-semibold bg-emerald-500 hover:bg-emerald-400 text-white disabled:opacity-40 transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] text-sm"
                >
                  Generate
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              ) : (
                <SignInButton mode="modal">
                  <Button className="h-9 rounded-xl px-5 font-semibold bg-emerald-500 hover:bg-emerald-400 text-white transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] text-sm">
                    Generate
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </SignInButton>
              )}
            </div>
          </div>
        </div>

        {/* Suggestion chips */}
        <div className="z-10 mt-8 flex flex-col items-center gap-3">
          <p className="text-xs font-medium text-emerald-400/70 tracking-wide">Try something amazing</p>
          <div className="flex flex-wrap justify-center gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => handleSuggestion(s)}
                className="rounded-full border border-white/8 bg-white/4 px-4 py-1.5 text-xs text-white/45 hover:border-emerald-500/30 hover:bg-emerald-500/8 hover:text-white/80 transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* BROWSER MOCKUP */}
      <section className="px-4 pb-32">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-emerald-900/40 bg-[#050e0a] shadow-2xl shadow-black/60 shadow-emerald-900/20">
          <div className="flex items-center gap-2 border-b border-emerald-900/30 px-4 py-3">
            <div className="flex gap-1.5">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-3 w-3 rounded-full bg-emerald-900/60" />
              ))}
            </div>

            <div className="mx-auto flex h-6 w-64 items-center justify-center rounded-md bg-emerald-500/5 px-3 border border-emerald-900/30">
              <span className="text-xs text-emerald-500/40">launchlane.app/workspace</span>
            </div>
          </div>

          <div className="flex h-105">
            {/* Chat panel */}
            <div className="flex w-80 flex-col border-r border-emerald-900/30 bg-[#030b07]">
              <div className="border-b border-emerald-900/30 px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-emerald-500/40">
                  Chat
                </p>
              </div>

              <div className="flex-1 space-y-4 px-4 py-4">
                <div className="flex justify-end">
                  <div className="max-w-55 rounded-2xl rounded-br-sm bg-emerald-500/10 border border-emerald-500/10 px-3.5 py-2.5">
                    <p className="text-xs text-white/80">
                      Build a kanban board with 3 columns and drag-and-drop
                    </p>
                  </div>
                </div>

                <div className="flex gap-2.5">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-emerald-500">
                    <Zap className="h-3 w-3 fill-white text-white" />
                  </div>

                  <div className="rounded-2xl rounded-tl-sm bg-emerald-900/20 border border-emerald-900/30 px-3.5 py-2.5">
                    <p className="text-xs text-white/60">
                      I&apos;ll build a Kanban board with Todo, In Progress, and
                      Done columns. I&apos;ll use{" "}
                      <code className="text-emerald-400/80">@dnd-kit/core</code>{" "}
                      for smooth drag-and-drop…
                    </p>
                  </div>
                </div>

                <div className="flex gap-2.5">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-emerald-500">
                    <Zap className="h-3 w-3 fill-white text-white" />
                  </div>
                  <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-emerald-900/20 border border-emerald-900/30 px-3.5 py-3">
                    {[0, 0.15, 0.3].map((delay) => (
                      <span
                        key={delay}
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-400/50"
                        style={{ animationDelay: `${delay}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-emerald-900/30 px-3 py-3">
                <div className="flex items-center gap-2 rounded-xl bg-emerald-500/5 border border-emerald-900/30 px-3 py-2">
                  <span className="flex-1 text-xs text-white/20">
                    Ask AI to modify…
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-emerald-500/30" />
                </div>
              </div>
            </div>

            <div className="flex flex-1 flex-col">
              <div className="flex items-center gap-1 border-b border-emerald-900/30 px-4">
                <button className="border-b-2 border-emerald-400 px-3 py-2.5 text-xs text-emerald-300">
                  Preview
                </button>
                <button className="px-3 py-2.5 text-xs text-white/30">
                  Code
                </button>
              </div>

              <div className="flex flex-1 gap-3 overflow-hidden bg-[#040d09] p-5">
                {["Todo", "In Progress", "Done"].map((col, ci) => (
                  <div key={col} className="flex w-1/3 flex-col gap-2">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider text-emerald-500/40">
                        {col}
                      </span>
                      <span className="rounded-full bg-emerald-900/40 px-1.5 py-0.5 text-xs text-emerald-500/50">
                        {[3, 2, 1][ci]}
                      </span>
                    </div>

                    {Array.from({ length: [3, 2, 1][ci] }).map((_, i) => (
                      <div
                        key={i}
                        className="rounded-lg border border-emerald-900/30 bg-[#071209] p-2.5"
                      >
                        <div
                          className="mb-1.5 h-2 rounded-full bg-emerald-900/50"
                          style={{ width: `${60 + i * 15}%` }}
                        />
                        <div className="h-1.5 w-3/4 rounded-full bg-emerald-900/30" />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────────────────── */}
      <section className="px-4 pb-32">
        <div className="mx-auto mb-14 max-w-5xl text-center">
          <SectionLabel>Everything you need</SectionLabel>
          <SectionHeading gray="From prompt" blue="to production." />
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-emerald-900/40 bg-emerald-900/20 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="group bg-[#020908] p-7 hover:bg-[#050e0a] transition-colors"
            >
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-900/50 bg-emerald-500/5 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 transition-all">
                <Icon className="h-4 w-4 text-emerald-500/50 group-hover:text-emerald-400 transition-colors" />
              </div>
              <p className="mb-2 text-sm font-semibold text-white/90">{label}</p>
              <p className="text-sm leading-relaxed text-white/35">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-4 pb-32">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <SectionLabel>How it works</SectionLabel>
          <SectionHeading gray="Four steps" blue="to a working app." />
        </div>

        <div className="mx-auto max-w-3xl">
          {STEPS.map((step, i) => (
            <div key={step.number} className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-900/50 bg-emerald-500/5">
                  <span className="font-mono text-xs font-semibold text-emerald-400/60">
                    {step.number}
                  </span>
                </div>

                {i < STEPS.length - 1 && (
                  <div className="mt-2 h-full w-px bg-emerald-900/40" />
                )}
              </div>

              <div className="pb-10 pt-1.5">
                <p className="mb-1.5 text-sm font-semibold sm:text-base">
                  {step.label}
                </p>

                <p className="text-sm leading-relaxed text-white/40">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="px-4 pb-32">
        <div className="mx-auto mb-14 max-w-5xl text-center">
          <SectionLabel>Simple pricing</SectionLabel>
          <SectionHeading gray="Start free," blue="scale when ready." />

          <p className="mx-auto mt-4 max-w-sm text-sm text-white/35">
            No credit card required. Upgrade or downgrade anytime.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-3">
          {PRICING_PLANS.map((plan) => {
            const planOrder: Record<string, number> = {
              free: 0,
              starter: 1,
              pro: 2,
            };
            const activePlanKey = isSignedIn
              ? has?.({ plan: "pro" })
                ? "pro"
                : has?.({ plan: "starter" })
                ? "starter"
                : "free"
              : null;

            const isActive = isSignedIn && activePlanKey === plan.key;
            const isDowngrade =
              isSignedIn &&
              activePlanKey !== null &&
              !isActive &&
              planOrder[plan.key] < planOrder[activePlanKey];

            return (
              <div
                key={plan.key}
                className={cn(
                  "relative flex flex-col rounded-2xl border p-7 transition-colors",
                  plan.featured
                    ? "border-emerald-500/30 bg-emerald-500/5 shadow-[0_0_40px_rgba(16,185,129,0.08)]"
                    : "border-emerald-900/40 bg-[#050e0a]"
                )}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full border border-emerald-500/25 bg-[#020908] px-3 py-1 text-[11px] font-medium text-emerald-400">
                      Most popular
                    </span>
                  </div>
                )}

                <div className="mb-1 flex items-center gap-2">
                  <p className="text-sm font-semibold text-white/90">
                    {plan.label}
                  </p>
                  {isActive && (
                    <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                      Active
                    </span>
                  )}
                </div>

                <p className="mb-6 text-xs leading-relaxed text-white/35">
                  {plan.description}
                </p>

                <div className="mb-1 flex items-baseline gap-1">
                  <span className="font-serif text-4xl">
                    {plan.price === 0 ? (
                      <GrayTitle>$0</GrayTitle>
                    ) : (
                      <BlueTitle>${plan.price}</BlueTitle>
                    )}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-sm text-white/30">/mo</span>
                  )}
                </div>
                <p className="mb-6 text-xs text-white/25">
                  {plan.price === 0 ? "Always free" : "Only billed monthly"}
                </p>

                <div className="mb-8 space-y-3 border-t border-emerald-900/30 pt-6">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-center gap-2.5">
                      <div
                        className={cn(
                          "flex h-4 w-4 shrink-0 items-center justify-center rounded-full",
                          plan.featured ? "bg-emerald-500/15" : "bg-emerald-900/40"
                        )}
                      >
                        <Check
                          className={cn(
                            "h-2.5 w-2.5",
                            plan.featured ? "text-emerald-400" : "text-emerald-600"
                          )}
                        />
                      </div>
                      <span className="text-xs text-white/55">{f}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto">
                  {isActive ? (
                    <Button
                      disabled
                      className="w-full rounded-full text-sm font-semibold opacity-50 cursor-not-allowed border border-emerald-900/40 bg-transparent text-white/50"
                      variant="ghost"
                    >
                      ✓ Current plan
                    </Button>
                  ) : plan.price === 0 ? (
                    isSignedIn ? (
                      <Button
                        onClick={() => router.push("/projects")}
                        className="w-full rounded-full text-sm font-semibold border border-emerald-900/40 bg-transparent text-white/50 hover:bg-emerald-500/8 hover:text-emerald-300 transition-all"
                        variant="ghost"
                      >
                        Go to dashboard
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    ) : (
                      <SignInButton mode="modal">
                        <Button
                          className="w-full rounded-full text-sm font-semibold border border-emerald-900/40 bg-transparent text-white/50 hover:bg-emerald-500/8 hover:text-emerald-300 transition-all"
                          variant="ghost"
                        >
                          Get started free
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                      </SignInButton>
                    )
                  ) : isSignedIn ? (
                    <CheckoutButton
                      planId={plan.planId}
                      planPeriod="month"
                      checkoutProps={{
                        appearance: {
                          elements: { drawerRoot: { zIndex: 2000 } },
                        },
                      }}
                    >
                      <Button
                        className={cn(
                          "w-full rounded-full text-sm font-semibold transition-all",
                          plan.featured
                            ? "bg-emerald-500 text-white hover:bg-emerald-400 active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                            : "border border-emerald-900/40 bg-transparent text-white/50 hover:bg-emerald-500/8 hover:text-emerald-300"
                        )}
                        variant="ghost"
                      >
                        {isDowngrade ? "Downgrade" : "Get started"}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </CheckoutButton>
                  ) : (
                    <SignInButton mode="modal">
                      <Button
                        className={cn(
                          "w-full rounded-full text-sm font-semibold transition-all",
                          plan.featured
                            ? "bg-emerald-500 text-white hover:bg-emerald-400 active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                            : "border border-emerald-900/40 bg-transparent text-white/50 hover:bg-emerald-500/8 hover:text-emerald-300"
                        )}
                        variant="ghost"
                      >
                        Get started
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </SignInButton>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="relative mx-auto mb-32 max-w-5xl overflow-hidden rounded-2xl border border-emerald-900/40 px-10 py-24 text-center bg-[#030c08]">
        {/* Static glow instead of animation */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 h-[300px] w-[600px] rounded-full bg-teal-500/15 blur-[80px]" />
        </div>

        <SectionHeading gray="Start building," blue="for free." />

        <p className="mb-8 text-sm leading-relaxed text-white/40">
          Get 10 free generations on sign up. No credit card required.
          <br />
          Upgrade when you&apos;re ready.
        </p>

        {isSignedIn ? (
          <Button
            size="lg"
            onClick={() => router.push("/projects")}
            className="relative h-11 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white px-8 font-semibold shadow-[0_0_30px_rgba(16,185,129,0.35)] transition-all active:scale-95"
          >
            Go to dashboard
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <SignInButton mode="modal">
            <Button
              size="lg"
              className="relative h-11 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white px-8 font-semibold shadow-[0_0_30px_rgba(16,185,129,0.35)] transition-all active:scale-95"
            >
              Get started free
              <ChevronRight className="h-4 w-4" />
            </Button>
          </SignInButton>
        )}
      </section>

      <footer className="relative z-10 border-t border-emerald-900/30 py-12 mx-auto px-6 flex flex-wrap items-center justify-center text-emerald-700/60">
        Made with ❤️ by Ansh
      </footer>
    </main>
  );
}
