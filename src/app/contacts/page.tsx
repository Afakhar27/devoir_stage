import Navbar from "@/components/Navbar";
import { getContacts } from "@/lib/data";
import { auth } from "@clerk/nextjs/server";
import { checkLimit, incrementLimit, MAX_DAILY_CONTACTS } from "@/lib/limit";

type Contact = {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  poste: string;
  agenceId: string;
};

export default async function ContactsPage() {
  const { userId } = await auth();
  if (!userId) return null;

  const allContacts = await getContacts();
  const { allowed, remaining } = checkLimit(userId);

  let displayedContacts: Contact[] = [];
  let showUpgrade = false;

  if (allowed) {
    const countToShow = Math.min(remaining, allContacts.length);
    displayedContacts = allContacts.slice(0, countToShow);
    
    // Note: In development (Strict Mode), this might run twice.
    incrementLimit(userId, countToShow);

    if (allContacts.length > countToShow || remaining < allContacts.length) {
        showUpgrade = true;
    }
  } else {
    showUpgrade = true;
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4">Contacts</h1>
        
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-8">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">ID</th>
                <th scope="col" className="px-6 py-3">Nom</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Téléphone</th>
                <th scope="col" className="px-6 py-3">Poste</th>
                <th scope="col" className="px-6 py-3">Agence ID</th>
              </tr>
            </thead>
            <tbody>
              {displayedContacts.map((contact) => (
                <tr key={contact.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4">{contact.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{contact.prenom} {contact.nom}</td>
                  <td className="px-6 py-4">{contact.email}</td>
                  <td className="px-6 py-4">{contact.telephone}</td>
                  <td className="px-6 py-4">{contact.poste}</td>
                  <td className="px-6 py-4">{contact.agenceId}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {displayedContacts.length === 0 && !showUpgrade && (
             <div className="p-4 text-center">Aucun contact à afficher.</div>
          )}
        </div>

        {showUpgrade && (
          <div className="p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
            <p className="font-bold">Limite quotidienne atteinte</p>
            <p>Vous avez atteint votre limite de {MAX_DAILY_CONTACTS} contacts par jour. Veuillez mettre à niveau votre compte pour en voir plus.</p>
            <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Mettre à niveau
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
