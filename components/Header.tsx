import Link from "next/link";
import { UserButton, SignInButton, Show } from "@clerk/nextjs";
import { Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { checkUser } from "@/lib/checkUser";
import { PricingModal } from "@/components/PricingModal";
import { PLANS } from "@/lib/constants";
import type { Plan } from "@/types/plans";

export default async function Header() {
  const user = await checkUser();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-emerald-900/40 bg-[#020908]/85 backdrop-blur-md">
      <nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 select-none">
          <span className="font-serif text-2xl font-black tracking-tight bg-linear-to-br from-emerald-300 via-teal-400 to-emerald-600 bg-clip-text text-transparent drop-shadow-lg">
            LaunchLane
          </span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-5">
          <Show when="signed-in">
            <Link
              href="/projects"
              className="text-[13px] font-medium text-white/40 transition-colors hover:text-emerald-400"
            >
              Projects
            </Link>

            {user && (
              <PricingModal>
                <span className="inline-flex h-8 items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/8 px-3 text-xs text-emerald-300/80 hover:bg-emerald-500/15 transition-colors cursor-pointer">
                  <Zap className="h-3 w-3 fill-emerald-300/80" />
                  {user.credits} credits
                </span>
              </PricingModal>
            )}

            <UserButton />
          </Show>

          <Show when="signed-out">
            <SignInButton mode="modal">
              <Button
                variant="ghost"
                size="sm"
                className="text-[13px] font-medium text-white/50 hover:text-white/90 hover:bg-transparent"
              >
                Sign in
              </Button>
            </SignInButton>

            <SignInButton mode="modal">
              <Button
                size="sm"
                className="inline-flex h-8 items-center gap-1.5 rounded-full bg-emerald-500 px-4 text-[13px] font-semibold text-white hover:bg-emerald-400 active:scale-95 transition-all"
              >
                Get Started
                <ArrowRight className="h-3 w-3 opacity-80" />
              </Button>
            </SignInButton>
          </Show>
        </div>
      </nav>
    </header>
  );
}
