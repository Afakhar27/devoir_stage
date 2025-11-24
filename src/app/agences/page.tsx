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
                <th scope="col" className="px-6 py-3 whitespace-nowrap">ID</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Name</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">State</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">State Code</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Type</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Population</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Website</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Total Schools</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Total Students</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Mailing Address</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Grade Span</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Locale</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">CSA/CBSA</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Domain Name</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Physical Address</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Phone</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Status</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Student/Teacher Ratio</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Supervisory Union</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">County</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Created At</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Updated At</th>
              </tr>
            </thead>
            <tbody>
              {agences.map((agence: any) => (
                <tr key={agence.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4 whitespace-nowrap">{agence.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{agence.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{agence.state}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{agence.state_code}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{agence.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{agence.population}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {agence.website && <a href={agence.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Link</a>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{agence.total_schools}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{agence.total_students}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{agence.mailing_address}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{agence.grade_span}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{agence.locale}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{agence.csa_cbsa}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{agence.domain_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{agence.physical_address}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{agence.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{agence.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{agence.student_teacher_ratio}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{agence.supervisory_union}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{agence.county}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{agence.created_at}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{agence.updated_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
