import { SettingsNav } from "@/features/settings/components/settings-nav";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-muted-foreground text-sm">
          Manage your workspace, profile, and preferences.
        </p>
      </div>
      <SettingsNav />
      <div className="max-w-2xl">{children}</div>
    </div>
  );
}
