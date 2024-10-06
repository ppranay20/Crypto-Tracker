import Hero from "@/components/Hero"
import { auth } from "../auth"
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth();

  if(!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="h-full overflow-y-auto bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <Hero />
    </div>
  )
}
