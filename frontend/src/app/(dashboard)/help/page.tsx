import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpen, LifeBuoy, Mail, Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/shared/page-header";
import { docLinks, faqs, supportEmail } from "@/features/help/data";

export const metadata: Metadata = { title: "Help & support" };

export default function HelpPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Help & support"
        description="Answers to common questions about managing your build."
      />

      <div className="relative max-w-md">
        <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
        <Input
          placeholder="Search help articles…"
          className="pl-9"
          aria-label="Search help articles"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Frequently asked questions</CardTitle>
          <CardDescription>The essentials for homeowners running a build.</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LifeBuoy className="text-muted-foreground size-4" /> Contact support
            </CardTitle>
            <CardDescription>
              Our team answers within one business day — usually much faster.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground text-sm">
              Include your project name and screenshots if something looks off. Billing, account,
              and data questions are all welcome.
            </p>
            <Button variant="outline" size="sm" asChild>
              <a href={`mailto:${supportEmail}`}>
                <Mail className="size-4" /> {supportEmail}
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="text-muted-foreground size-4" /> Documentation
            </CardTitle>
            <CardDescription>Guides for getting the most out of BuildNest.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {docLinks.map((doc) => (
              <Link
                key={doc.id}
                href={doc.href}
                className="group hover:bg-accent/50 -mx-2 flex items-start gap-3 rounded-lg px-2 py-2"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{doc.title}</p>
                  <p className="text-muted-foreground text-xs">{doc.description}</p>
                </div>
                <ArrowUpRight className="text-muted-foreground group-hover:text-foreground mt-0.5 size-4 shrink-0 transition-colors" />
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
