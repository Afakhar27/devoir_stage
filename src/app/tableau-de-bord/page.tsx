import Navbar from "@/components/Navbar";

export default function Dashboard() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4">Tableau de Bord</h1>
        <p className="mb-4">Bienvenue sur votre espace personnel.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="/agences" className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Agences</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">Voir la liste des agences.</p>
          </a>
          <a href="/contacts" className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Contacts</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">Voir la liste des contacts (limité à 50/jour).</p>
          </a>
        </div>
      </div>
    </div>
  );
}
