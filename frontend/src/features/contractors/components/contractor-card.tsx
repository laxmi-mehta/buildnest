"use client";

import { toast } from "sonner";
import { FileText, Mail, MessageSquare, Phone, Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Contractor, ContractorStatus } from "@/features/contractors/types";
import { cn, formatCurrency, getInitials } from "@/lib/utils";

const statusConfig: Record<ContractorStatus, { label: string; className: string }> = {
  "on-site": {
    label: "On site this week",
    className: "bg-success/10 text-success border-transparent",
  },
  scheduled: {
    label: "Scheduled",
    className: "bg-secondary text-secondary-foreground border-transparent",
  },
  completed: {
    label: "Completed",
    className: "bg-muted text-muted-foreground border-transparent",
  },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5" aria-label={`Rated ${rating} out of 5`}>
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={cn(
              "size-3.5",
              i < Math.round(rating) ? "fill-warning text-warning" : "text-muted-foreground/40"
            )}
          />
        ))}
      </div>
      <span className="text-muted-foreground text-xs font-medium tabular-nums">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

export function ContractorCard({ contractor }: { contractor: Contractor }) {
  const status = statusConfig[contractor.status];

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
              {contractor.trade} · {contractor.company}
            </p>
          </div>
        </div>
        <Badge className={status.className}>{status.label}</Badge>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        <StarRating rating={contractor.rating} />

        <div className="space-y-1.5 text-sm">
          <div className="text-muted-foreground flex items-center gap-2">
            <Phone className="size-3.5 shrink-0" />
            <span className="tabular-nums">{contractor.phone}</span>
          </div>
          <div className="text-muted-foreground flex items-center gap-2">
            <Mail className="size-3.5 shrink-0" />
            <span className="truncate">{contractor.email}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {contractor.specialties.map((specialty) => (
            <Badge key={specialty} variant="outline">
              {specialty}
            </Badge>
          ))}
        </div>

        <Separator />

        <div className="flex items-baseline justify-between">
          <span className="text-muted-foreground text-sm">Total paid</span>
          <span className="text-sm font-semibold tabular-nums">
            {formatCurrency(contractor.totalPaid)}
          </span>
        </div>
      </CardContent>

      <CardFooter className="gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => toast.success(`Message sent to ${contractor.name}`)}
        >
          <MessageSquare className="size-3.5" /> Message
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => toast.success(`Opening contract for ${contractor.company}`)}
        >
          <FileText className="size-3.5" /> View contract
        </Button>
      </CardFooter>
    </Card>
  );
}
