import type { Metadata } from "next";
import Link from "next/link";
import {
  HardHat,
  LayoutDashboard,
  ListTodo,
  CircleDollarSign,
  Users,
  Milestone,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthRedirect } from "./auth-redirect";

export const metadata: Metadata = {
  title: "BuildNest — Home Construction Management App for Indian Homeowners",
  description:
    "Track your home construction budget, tasks, contractors, and materials in one place. Built for Indian homeowners building their dream home. Free to get started.",
  keywords: [
    "home construction management India",
    "house building tracker app",
    "construction budget tracker India",
    "home building app India",
    "manage house construction India",
    "construction project management homeowners",
    "house construction expense tracker",
    "home building milestones tracker",
    "contractor management app India",
    "construction materials tracker India",
  ],
  openGraph: {
    title: "BuildNest — Home Construction Management for Indian Homeowners",
    description:
      "Track budgets, tasks, milestones, contractors and materials — all in one place. No spreadsheets, no chaos.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BuildNest — Home Construction Management for Indian Homeowners",
    description: "Track budgets, tasks, milestones, contractors and materials — all in one place.",
  },
  alternates: {
    canonical: "/",
  },
};

const features = [
  {
    icon: <LayoutDashboard className="size-5" />,
    title: "Dashboard overview",
    description:
      "See your project health at a glance — budget used, tasks done, and upcoming milestones.",
  },
  {
    icon: <CircleDollarSign className="size-5" />,
    title: "Budget tracking",
    description:
      "Log every expense, compare against estimates, and catch overruns before they escalate.",
  },
  {
    icon: <ListTodo className="size-5" />,
    title: "Task management",
    description:
      "Assign tasks to yourself or contractors, set due dates, and track progress in real time.",
  },
  {
    icon: <Milestone className="size-5" />,
    title: "Milestone tracking",
    description:
      "Break the build into phases — foundation, structure, finishing — and mark them complete as you go.",
  },
  {
    icon: <Users className="size-5" />,
    title: "Contractor management",
    description: "Keep all contractor contacts, rates, and notes in one organised directory.",
  },
  {
    icon: <HardHat className="size-5" />,
    title: "Materials tracking",
    description: "Record materials ordered and delivered so nothing slips through the cracks.",
  },
];

const steps = [
  {
    step: "1",
    title: "Create your project",
    description: "Name your project, set your total budget and target completion date.",
  },
  {
    step: "2",
    title: "Add your team & budget",
    description: "Invite contractors, add expense categories, and set milestones for each phase.",
  },
  {
    step: "3",
    title: "Track everything",
    description: "Log daily expenses, tick off tasks, and watch your project come together.",
  },
];

export default function Home() {
  return (
    <main className="bg-background text-foreground min-h-dvh">
      <AuthRedirect />

      {/* Structured data for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "BuildNest",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
            description:
              "Home construction management app for Indian homeowners. Track budgets, tasks, milestones, contractors and materials.",
            audience: { "@type": "Audience", audienceType: "Homeowners" },
            countryOfOrigin: "IN",
          }),
        }}
      />

      {/* Navbar */}
      <header className="bg-background/80 sticky top-0 z-50 border-b backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <HardHat className="text-primary size-6" />
            <span className="text-lg font-bold tracking-tight">BuildNest</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/signup">Get started free</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-24 text-center">
        <Badge variant="secondary" className="mb-6">
          Built for Indian homeowners
        </Badge>
        <h1 className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          Your home construction, <span className="text-primary">organised from day one</span>
        </h1>
        <p className="text-muted-foreground mx-auto mt-6 max-w-xl text-lg">
          Track budgets, tasks, milestones, contractors and materials — all in one place. No
          spreadsheets, no chaos.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" asChild>
            <Link href="/signup">
              Get started free <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/login">Sign in</Link>
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted/30 border-t py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">
            Everything you need to manage your home build
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="rounded-xl border">
                <CardHeader className="pb-2">
                  <div className="bg-primary/10 text-primary mb-3 flex size-10 items-center justify-center rounded-lg">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-base">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">
            Up and running in minutes
          </h2>
          <div className="grid gap-10 sm:grid-cols-3">
            {steps.map((item) => (
              <div key={item.step} className="flex flex-col items-start gap-4">
                <div className="bg-primary text-primary-foreground flex size-10 items-center justify-center rounded-full text-sm font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className="mb-1 font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground border-t py-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <CheckCircle className="mx-auto mb-4 size-10 opacity-80" />
          <h2 className="mb-4 text-3xl font-bold tracking-tight">
            Ready to take control of your build?
          </h2>
          <p className="mb-8 opacity-80">
            Join homeowners who use BuildNest to keep their construction on track and on budget.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/signup">
              Get started free <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 text-center sm:flex-row">
          <p className="text-muted-foreground text-sm">© 2026 BuildNest</p>
          <p className="text-muted-foreground text-sm">Built with ♥ in India</p>
        </div>
      </footer>
    </main>
  );
}
