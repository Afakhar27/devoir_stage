import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/tableau-de-bord");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-center sm:text-left">
          Bienvenue sur le Dashboard
        </h1>
        <p className="text-lg text-center sm:text-left">
          Veuillez vous connecter pour accéder aux données.
        </p>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            href="/sign-in"
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            Se connecter
          </Link>
        </div>
      </main>
    </div>
  );
}
