import Navbar from "@/components/Navbar";
import Search from "@/components/Search";
import { getContacts } from "@/lib/data";
import { auth } from "@clerk/nextjs/server";
import { MAX_DAILY_CONTACTS } from "@/lib/limit";
import { Users, Mail, Phone, AlertCircle, Lock } from "lucide-react";
import Link from "next/link";

type Contact = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  title: string;
  email_type: string;
  contact_form_url: string;
  created_at: string;
  updated_at: string;
  agency_id: string;
  firm_id: string;
  department: string;
};

export default async function ContactsPage({
  searchParams,
}: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
  const { userId } = await auth();
  if (!userId) return null;

  const params = await searchParams;
  const query = params?.query || '';

  const allContacts = await getContacts();
  
  // Filter contacts based on search query
  const filteredContacts = allContacts.filter((contact: Contact) => {
    const searchContent = `${contact.first_name} ${contact.last_name} ${contact.email} ${contact.title}`.toLowerCase();
    return searchContent.includes(query.toLowerCase());
  });

  const MAX_DISPLAY = MAX_DAILY_CONTACTS;
  const displayedContacts: Contact[] = filteredContacts.slice(0, MAX_DISPLAY);
  const showUpgrade = filteredContacts.length > MAX_DISPLAY;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <Users className="text-emerald-600" size={32} />
              Contacts
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Liste des contacts ({displayedContacts.length} affichés sur {filteredContacts.length} trouvés)
            </p>
          </div>
          <div className="w-full sm:w-72">
            <Search placeholder="Rechercher un contact..." />
          </div>
        </div>

        {showUpgrade && (
          <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg flex items-start gap-3">
            <AlertCircle className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" size={20} />
            <div className="flex-1">
              <h3 className="font-medium text-amber-900 dark:text-amber-200">Affichage limité</h3>
              <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                Vous consultez une version gratuite qui limite l&apos;affichage aux {MAX_DISPLAY} premiers résultats de votre recherche. 
                Passez à la version premium pour voir l&apos;intégralité des {filteredContacts.length} contacts correspondants.
              </p>
            </div>
            <Link 
              href="/upgrade"
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              <Lock size={16} />
              Débloquer
            </Link>
          </div>
        )}

        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs uppercase font-semibold text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-4">Nom Complet</th>
                  <th className="px-6 py-4">Titre / Département</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Téléphone</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {displayedContacts.map((contact, index) => (
                  <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                      {contact.first_name} {contact.last_name}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-700 dark:text-slate-300">{contact.title}</span>
                        <span className="text-xs text-slate-500">{contact.department}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-slate-400" />
                        <a href={`mailto:${contact.email}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                          {contact.email}
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Phone size={14} className="text-slate-400" />
                        {contact.phone}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {displayedContacts.length === 0 && (
            <div className="p-12 text-center text-slate-500">
              Aucun contact trouvé pour &quot;{query}&quot;.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
