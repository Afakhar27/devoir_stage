import Navbar from "@/components/Navbar";
import { getContacts } from "@/lib/data";
import { auth } from "@clerk/nextjs/server";
import { checkLimit, incrementLimit, MAX_DAILY_CONTACTS } from "@/lib/limit";

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
                <th scope="col" className="px-6 py-3 whitespace-nowrap">ID</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">First Name</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Last Name</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Email</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Phone</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Title</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Email Type</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Contact Form URL</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Created At</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Updated At</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Agency ID</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Firm ID</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Department</th>
              </tr>
            </thead>
            <tbody>
              {displayedContacts.map((contact) => (
                <tr key={contact.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4 whitespace-nowrap">{contact.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{contact.first_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{contact.last_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{contact.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{contact.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{contact.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{contact.email_type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {contact.contact_form_url && <a href={contact.contact_form_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Link</a>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{contact.created_at}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{contact.updated_at}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{contact.agency_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{contact.firm_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{contact.department}</td>
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
