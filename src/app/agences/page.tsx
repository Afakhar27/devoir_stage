import Navbar from "@/components/Navbar";
import { getAgences } from "@/lib/data";

export default async function AgencesPage() {
  const agences = await getAgences();

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4">Agences</h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">ID</th>
                <th scope="col" className="px-6 py-3">Nom</th>
                <th scope="col" className="px-6 py-3">Ville</th>
              </tr>
            </thead>
            <tbody>
              {agences.map((agence: any) => (
                <tr key={agence.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4">{agence.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{agence.name}</td>
                  <td className="px-6 py-4">{agence.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
