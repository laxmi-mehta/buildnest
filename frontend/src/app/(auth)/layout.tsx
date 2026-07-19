import { Logo } from "@/components/shared/logo";
import { APP_TAGLINE } from "@/lib/constants";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="flex h-14 items-center px-6">
        <Logo />
      </header>
      <main className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-sm">{children}</div>
      </main>
      <footer className="text-muted-foreground flex h-12 items-center justify-center text-xs">
        {APP_TAGLINE} · © 2026 BuildNest
      </footer>
    </div>
  );
}
