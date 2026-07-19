"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/shared/logo";
import { navigation, secondaryNavigation } from "@/config/navigation";
import { cn } from "@/lib/utils";

/** Drawer navigation for small screens; mirrors the desktop sidebar. */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open navigation">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <SheetHeader className="border-b px-4 py-3">
          <SheetTitle asChild>
            <Logo />
          </SheetTitle>
        </SheetHeader>
        <nav className="space-y-5 overflow-y-auto px-2 py-3" aria-label="Main">
          {[...navigation, { label: "General", items: secondaryNavigation }].map((section) => (
            <div key={section.label}>
              <p className="text-muted-foreground/70 mb-1 px-2.5 text-[11px] font-medium tracking-wide uppercase">
                {section.label}
              </p>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex h-9 items-center gap-2.5 rounded-md px-2.5 text-sm",
                        active
                          ? "bg-accent font-medium"
                          : "text-muted-foreground hover:bg-accent/60"
                      )}
                    >
                      <item.icon className="size-4" />
                      {item.title}
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto h-5 px-1.5 text-[11px]">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
