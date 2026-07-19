import { redirect } from "next/navigation";

/** The dashboard is the app's home. A public marketing site will land here later. */
export default function Home() {
  redirect("/dashboard");
}
