"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, MailOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { verifyEmail } from "@/lib/api/endpoints/auth";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [verifying, setVerifying] = useState(false);

  // In production this page reads the token from the emailed link and
  // verifies automatically; the button simulates that flow for now.
  const handleVerify = async () => {
    setVerifying(true);
    await verifyEmail("mock-token");
    toast.success("Email verified — welcome to BuildNest!");
    router.push("/dashboard");
  };

  return (
    <div className="space-y-6 text-center">
      <div className="bg-brand/10 mx-auto flex size-12 items-center justify-center rounded-xl">
        <MailOpen className="text-brand size-6" />
      </div>
      <div className="space-y-1">
        <h1 className="text-xl font-semibold tracking-tight">Verify your email</h1>
        <p className="text-muted-foreground text-sm">
          We sent a verification link to your inbox. Click it to activate your account.
        </p>
      </div>
      <div className="space-y-2">
        <Button className="w-full" onClick={handleVerify} disabled={verifying}>
          {verifying && <Loader2 className="size-4 animate-spin" />}
          I&apos;ve verified my email
        </Button>
        <Button
          variant="ghost"
          className="text-muted-foreground w-full"
          onClick={() => toast.info("Verification email re-sent.")}
        >
          Resend email
        </Button>
      </div>
    </div>
  );
}
