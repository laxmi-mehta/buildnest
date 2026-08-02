"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

interface PreferenceRow {
  key: string;
  label: string;
  description: string;
}

const groups: { heading: string; rows: PreferenceRow[] }[] = [
  {
    heading: "Email",
    rows: [
      {
        key: "weeklyReport",
        label: "Weekly report",
        description: "A summary of progress, spend, and upcoming tasks every Monday.",
      },
      {
        key: "budgetAlerts",
        label: "Budget alerts",
        description: "When a category passes 85% of its allocated budget.",
      },
      {
        key: "taskReminders",
        label: "Task reminders",
        description: "A day before tasks assigned to you are due.",
      },
    ],
  },
  {
    heading: "Push",
    rows: [
      {
        key: "contractorMessages",
        label: "Contractor messages",
        description: "New messages and schedule changes from your contractors.",
      },
      {
        key: "milestoneUpdates",
        label: "Milestone updates",
        description: "When a construction phase is completed or delayed.",
      },
      {
        key: "documentApprovals",
        label: "Document approvals",
        description: "Permits approved and contracts awaiting your signature.",
      },
    ],
  },
];

const defaultPrefs: Record<string, boolean> = {
  weeklyReport: true,
  budgetAlerts: true,
  taskReminders: false,
  contractorMessages: true,
  milestoneUpdates: true,
  documentApprovals: false,
};

export function NotificationPreferences() {
  const [prefs, setPrefs] = useState(defaultPrefs);

  const toggle = (key: string, value: boolean) => setPrefs((prev) => ({ ...prev, [key]: value }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Choose how BuildNest keeps you posted on the build.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {groups.map((group, index) => (
          <div key={group.heading} className="space-y-4">
            {index > 0 && <Separator />}
            <h3 className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
              {group.heading}
            </h3>
            <div className="space-y-4">
              {group.rows.map((row) => (
                <div key={row.key} className="flex items-start justify-between gap-4">
                  <div className="space-y-0.5">
                    <Label htmlFor={row.key}>{row.label}</Label>
                    <p className="text-muted-foreground text-sm">{row.description}</p>
                  </div>
                  <Switch
                    id={row.key}
                    checked={prefs[row.key]}
                    onCheckedChange={(checked) => toggle(row.key, checked)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="items-center justify-between gap-2">
        <p className="text-muted-foreground text-xs">Email & push delivery coming soon.</p>
        <Button size="sm" disabled>
          Save changes
        </Button>
      </CardFooter>
    </Card>
  );
}
