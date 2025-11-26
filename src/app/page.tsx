import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowRight, LayoutDashboard, ShieldCheck, Zap } from "lucide-react";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/tableau-de-bord");
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      {/* Header */}
      <header className="w-full py-6 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <LayoutDashboard className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white">DataDash</span>
          </div>
          <div className="flex gap-4">
            <Link
              href="/sign-in"
              className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Se connecter
            </Link>
            <Link
              href="/sign-up"
              className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm hover:shadow-md"
            >
              S&apos;inscrire
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto text-center max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
              Gérez vos données avec <span className="text-blue-600">simplicité</span> et <span className="text-emerald-500">efficacité</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
              Une plateforme centralisée pour accéder à vos contacts et agences. 
              Visualisez, analysez et exportez vos données en quelques clics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all shadow-lg hover:shadow-blue-500/25 hover:-translate-y-1"
              >
                Commencer gratuitement
                <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link
                href="/sign-in"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
              >
                Déjà un compte ?
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
                  <Zap size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Rapide & Performant</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Accédez à des milliers de données instantanément grâce à notre architecture optimisée.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Sécurisé</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Vos données sont protégées avec les meilleurs standards de sécurité et d&apos;authentification.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400">
                  <LayoutDashboard size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Interface Intuitive</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Un tableau de bord moderne et épuré pour une expérience utilisateur optimale.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 bg-slate-50 dark:bg-slate-950">
          <div className="container mx-auto px-4 text-center text-slate-500 dark:text-slate-400">
            <p>&copy; {new Date().getFullYear()} DataDash. Tous droits réservés.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
