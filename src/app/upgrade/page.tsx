import Navbar from "@/components/Navbar";
import { Check, Shield, Zap } from "lucide-react";
import Link from "next/link";

export default function UpgradePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Passez à la vitesse supérieure
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Débloquez laccès illimité à toutes les données et fonctionnalités de DataDash.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Gratuit</h3>
            <div className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
              0€ <span className="text-base font-normal text-slate-500">/ mois</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                <Check className="text-blue-600" size={20} />
                Accès au tableau de bord
              </li>
              <li className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                <Check className="text-blue-600" size={20} />
                Liste des agences
              </li>
              <li className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                <Check className="text-blue-600" size={20} />
                50 contacts par jour
              </li>
            </ul>
            <button disabled className="w-full py-3 px-4 bg-slate-100 dark:bg-slate-800 text-slate-400 font-medium rounded-xl cursor-not-allowed">
              Plan actuel
            </button>
          </div>

          {/* Pro Plan */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border-2 border-blue-600 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              POPULAIRE
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Premium</h3>
            <div className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
              29€ <span className="text-base font-normal text-slate-500">/ mois</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-slate-900 dark:text-white font-medium">
                <div className="p-1 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600">
                  <Check size={14} />
                </div>
                Tout du plan Gratuit
              </li>
              <li className="flex items-center gap-3 text-slate-900 dark:text-white font-medium">
                <div className="p-1 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600">
                  <Zap size={14} />
                </div>
                Contacts illimités
              </li>
              <li className="flex items-center gap-3 text-slate-900 dark:text-white font-medium">
                <div className="p-1 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600">
                  <Shield size={14} />
                </div>
                Export des données
              </li>
            </ul>
            <Link 
              href="#" 
              className="block w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white text-center font-medium rounded-xl transition-colors shadow-lg hover:shadow-blue-500/25"
            >
              Passer au Premium
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
