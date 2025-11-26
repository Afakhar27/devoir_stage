import Navbar from "@/components/Navbar";
import Search from "@/components/Search";
import Pagination from "@/components/Pagination";
import { getAgences } from "@/lib/data";
import { Building2, MapPin, Globe, Users } from "lucide-react";

type Agence = {
  name: string;
  state: string;
  state_code: string;
  type: string;
  population: string;
  website: string;
};

export default async function AgencesPage({
  searchParams,
}: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;
  const query = params?.query || '';
  const currentPage = Number(params?.page) || 1;
  const itemsPerPage = 15;

  const allAgences: Agence[] = await getAgences();

  // Filter agencies
  const filteredAgences = allAgences.filter((agence) => {
    const searchContent = `${agence.name} ${agence.state} ${agence.type}`.toLowerCase();
    return searchContent.includes(query.toLowerCase());
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredAgences.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAgences = filteredAgences.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <Navbar />
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col justify-center">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <Building2 className="text-blue-600" size={32} />
              Agences
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Liste complète des agences enregistrées ({filteredAgences.length})
            </p>
          </div>
          <div className="w-full sm:w-72">
            <Search placeholder="Rechercher une agence..." />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs uppercase font-semibold text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-4">Nom</th>
                  <th className="px-6 py-4">État</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Population</th>
                  <th className="px-6 py-4">Site Web</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {paginatedAgences.map((agence, index) => (
                  <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                      {agence.name}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-slate-400" />
                        {agence.state} <span className="text-xs text-slate-400">({agence.state_code})</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                        {agence.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Users size={14} className="text-slate-400" />
                        {parseInt(agence.population).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {agence.website ? (
                        <a 
                          href={agence.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1"
                        >
                          <Globe size={14} />
                          Visiter
                        </a>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredAgences.length === 0 && (
            <div className="p-12 text-center text-slate-500">
              Aucune agence trouvée pour &quot;{query}&quot;.
            </div>
          )}
        </div>
        
        <div className="mt-4">
          <Pagination totalPages={totalPages} />
        </div>
      </main>
    </div>
  );
}
