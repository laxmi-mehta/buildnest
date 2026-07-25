"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Camera } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useProfile, useUpdateProfile } from "@/features/settings/hooks";
import { getInitials } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
});

type FormValues = z.infer<typeof schema>;

export function ProfileForm() {
  const { data, isLoading } = useProfile();
  const { mutate, isPending } = useUpdateProfile();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "" },
  });

  useEffect(() => {
    if (data) {
      form.reset({ name: data.full_name ?? "" });
    }
  }, [data, form]);

  const onSubmit = (values: FormValues) => {
    mutate({ full_name: values.name }, { onSuccess: () => toast.success("Profile updated") });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>
          How you appear to contractors and family members on this project.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <Avatar className="size-16">
            <AvatarFallback className="text-lg">
              {isLoading ? "…" : getInitials(data?.full_name ?? "")}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.success("Profile photo updated")}
            >
              <Camera className="size-4" /> Change photo
            </Button>
            <p className="text-muted-foreground text-xs">JPG or PNG, up to 2MB.</p>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
          </div>
        ) : (
          <Form {...form}>
            <form id="profile-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full name</FormLabel>
                    <FormControl>
                      <Input autoComplete="name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" value={data?.email ?? ""} readOnly disabled />
                </FormControl>
              </FormItem>
            </form>
          </Form>
        )}
      </CardContent>
      <CardFooter className="justify-end">
        <Button type="submit" form="profile-form" size="sm" disabled={isLoading || isPending}>
          {isPending ? "Saving…" : "Save changes"}
        </Button>
      </CardFooter>
    </Card>
  );
}
