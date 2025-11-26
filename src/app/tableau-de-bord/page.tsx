import Navbar from "@/components/Navbar";
import { getAgences, getContacts } from "@/lib/data";
import { Building2, Users, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default async function Dashboard() {
  const agences = await getAgences();
  const contacts = await getContacts();

  const stats = [
    {
      name: "Total Agences",
      value: agences.length,
      icon: Building2,
      href: "/agences",
      color: "bg-blue-500",
    },
    {
      name: "Total Contacts",
      value: contacts.length,
      icon: Users,
      href: "/contacts",
      color: "bg-emerald-500",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Tableau de Bord</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Bienvenue sur votre espace de gestion. Voici un aperçu de vos données.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 transition-all hover:shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.name}</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{stat.value.toLocaleString()}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10 text-${stat.color.split('-')[1]}-600 dark:text-${stat.color.split('-')[1]}-400`}>
                  <stat.icon size={24} className={`text-${stat.color.split('-')[1]}-600`} />
                </div>
              </div>
              <div className="mt-4">
                <Link 
                  href={stat.href}
                  className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Voir les détails
                  <ArrowUpRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions or Recent Activity could go here */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Accès Rapide</h2>
            <div className="space-y-4">
              <Link href="/agences" className="block p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-md text-blue-600 dark:text-blue-400">
                      <Building2 size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900 dark:text-white">Consulter les Agences</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Accéder à la liste complète des agences</p>
                    </div>
                  </div>
                  <ArrowUpRight size={18} className="text-slate-400" />
                </div>
              </Link>
              <Link href="/contacts" className="block p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-md text-emerald-600 dark:text-emerald-400">
                      <Users size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900 dark:text-white">Consulter les Contacts</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Accéder à la liste des contacts (limité)</p>
                    </div>
                  </div>
                  <ArrowUpRight size={18} className="text-slate-400" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
