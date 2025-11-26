import { SignIn } from "@clerk/nextjs";
import { LayoutDashboard } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex flex-col justify-between bg-slate-900 p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-blue-600/20" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-emerald-400">
            <LayoutDashboard size={32} />
            <span>Dashboard</span>
          </Link>
        </div>

        <div className="relative z-10 max-w-md">
          <h2 className="text-4xl font-bold mb-6">
            Gérez vos contacts et agences en toute simplicité.
          </h2>
          <p className="text-slate-400 text-lg">
            Accédez à une plateforme complète pour visualiser, filtrer et gérer vos données d'entreprise efficacement.
          </p>
        </div>

        <div className="relative z-10 text-sm text-slate-500">
          © {new Date().getFullYear()} Dashboard Inc. Tous droits réservés.
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center p-8 bg-slate-50 dark:bg-slate-950">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white">
              <LayoutDashboard className="text-emerald-600" size={32} />
              <span>Dashboard</span>
            </Link>
          </div>
          <SignIn 
            appearance={{
              elements: {
                rootBox: "mx-auto w-full",
                card: "shadow-xl border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 w-full",
                headerTitle: "text-slate-900 dark:text-white",
                headerSubtitle: "text-slate-500 dark:text-slate-400",
                socialButtonsBlockButton: "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300",
                dividerLine: "bg-slate-200 dark:bg-slate-700",
                dividerText: "text-slate-400 dark:text-slate-500",
                formFieldLabel: "text-slate-700 dark:text-slate-300",
                formFieldInput: "bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-emerald-500 focus:ring-emerald-500",
                footerActionText: "text-slate-500 dark:text-slate-400",
                footerActionLink: "text-emerald-600 hover:text-emerald-700 dark:text-emerald-500",
                formButtonPrimary: "bg-emerald-600 hover:bg-emerald-700 text-white",
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
