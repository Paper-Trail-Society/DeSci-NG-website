import { redirect } from "next/navigation";

export default function ProgramsRedirectPage() {
  redirect("/programs/dialogues");
  return null;
}
