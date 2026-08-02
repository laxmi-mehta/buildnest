"use client";

import { useRouter } from "next/navigation";
import { MailOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VerifyEmailPage() {
  const router = useRouter();

  return (
    <div className="space-y-6 text-center">
      <div className="bg-brand/10 mx-auto flex size-12 items-center justify-center rounded-xl">
        <MailOpen className="text-brand size-6" />
      </div>
      <div className="space-y-1">
        <h1 className="text-xl font-semibold tracking-tight">Check your email</h1>
        <p className="text-muted-foreground text-sm">
          We sent a verification link to your inbox. Click it to activate your account.
        </p>
      </div>
      <div className="space-y-2">
        <Button className="w-full" onClick={() => router.push("/login")}>
          Go to sign in
        </Button>
      </div>
    </div>
  );
}
