"use client";

import { toast } from "sonner";
import { FileText, Mail, MessageSquare, Phone } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { ApiContractor } from "@/lib/api/types";
import { cn, formatCurrency, getInitials } from "@/lib/utils";

const TRADE_LABELS: Record<ApiContractor["trade"], string> = {
  architect: "Architect",
  civil_engineer: "Civil Engineer",
  interior_designer: "Interior Designer",
  electrician: "Electrician",
  plumber: "Plumber",
  carpenter: "Carpenter",
  painter: "Painter",
  mason: "Mason",
  general: "General Contractor",
};

export function ContractorCard({ contractor }: { contractor: ApiContractor }) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex-row items-start justify-between space-y-0">
        <div className="flex items-center gap-3">
          <Avatar className="size-10">
            <AvatarFallback className="text-sm font-medium">
              {getInitials(contractor.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold">{contractor.name}</p>
            <p className="text-muted-foreground text-xs">
              {TRADE_LABELS[contractor.trade]}
              {contractor.company && ` · ${contractor.company}`}
            </p>
          </div>
        </div>
        <Badge
          variant="outline"
          className={cn(
            contractor.trade === "general"
              ? "border-brand/30 text-brand"
              : "text-muted-foreground border-border"
          )}
        >
          {TRADE_LABELS[contractor.trade]}
        </Badge>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        <div className="space-y-1.5 text-sm">
          {contractor.phone && (
            <div className="text-muted-foreground flex items-center gap-2">
              <Phone className="size-3.5 shrink-0" />
              <span className="tabular-nums">{contractor.phone}</span>
            </div>
          )}
          {contractor.email && (
            <div className="text-muted-foreground flex items-center gap-2">
              <Mail className="size-3.5 shrink-0" />
              <span className="truncate">{contractor.email}</span>
            </div>
          )}
        </div>

        {contractor.contract_amount && (
          <>
            <Separator />
            <div className="flex items-baseline justify-between">
              <span className="text-muted-foreground text-sm">Contract value</span>
              <span className="text-sm font-semibold tabular-nums">
                {formatCurrency(parseFloat(contractor.contract_amount))}
              </span>
            </div>
          </>
        )}
      </CardContent>

      <CardFooter className="gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() =>
            contractor.phone
              ? toast.success(`Calling ${contractor.name}`)
              : toast.error("No phone number on file")
          }
        >
          <MessageSquare className="size-3.5" /> Contact
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => toast.success(`Opening contract for ${contractor.name}`)}
        >
          <FileText className="size-3.5" /> Contract
        </Button>
      </CardFooter>
    </Card>
  );
}
