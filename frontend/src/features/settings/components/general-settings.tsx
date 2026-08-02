"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, Trash2 } from "lucide-react";
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
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useProject, useUpdateProject, useDeleteProject } from "@/features/projects/hooks";
import { useProjectStore } from "@/lib/store/project-store";

const schema = z.object({
  projectName: z.string().min(2, "Project name must be at least 2 characters"),
  address: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function GeneralSettings() {
  const router = useRouter();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { activeProjectId, setActiveProjectId } = useProjectStore();
  const { data: project } = useProject(activeProjectId ?? 0);
  const { mutate: updateProject, isPending: isSaving } = useUpdateProject();
  const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { projectName: "", address: "" },
  });

  useEffect(() => {
    if (project) {
      form.reset({ projectName: project.name, address: project.address ?? "" });
    }
  }, [project, form]);

  const onSubmit = (values: FormValues) => {
    if (!activeProjectId) return;
    updateProject(
      { id: activeProjectId, input: { name: values.projectName, address: values.address } },
      { onSuccess: () => toast.success("Workspace settings saved") }
    );
  };

  const handleDelete = () => {
    if (!activeProjectId) return;
    deleteProject(activeProjectId, {
      onSuccess: () => {
        setActiveProjectId(null);
        setDeleteOpen(false);
        toast.success("Project deleted");
        router.push("/projects");
      },
    });
  };

  if (!activeProjectId) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <p className="text-muted-foreground text-sm">Select a project to edit its settings.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Workspace</CardTitle>
          <CardDescription>
            Project details used across the dashboard, reports, and exports.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="projectName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. My Home Build" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project address</FormLabel>
                    <FormControl>
                      <Input placeholder="Street, city, state" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="mt-4 justify-end">
              <Button type="submit" size="sm" disabled={isSaving}>
                {isSaving && <Loader2 className="size-4 animate-spin" />}
                Save changes
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <Card className="border-destructive/30 ring-destructive/20">
        <CardHeader>
          <CardTitle>Danger zone</CardTitle>
          <CardDescription>Irreversible actions for this project.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-0.5">
            <p className="text-sm font-medium">Delete project</p>
            <p className="text-muted-foreground text-sm">
              Permanently remove {project?.name ?? "this project"} and all of its data.
            </p>
          </div>
          <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="size-4" /> Delete project
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Delete this project?</DialogTitle>
                <DialogDescription>
                  This permanently deletes {project?.name ?? "this project"} — including expenses,
                  tasks, documents, and photos. This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                  {isDeleting && <Loader2 className="size-4 animate-spin" />}
                  Delete project
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
