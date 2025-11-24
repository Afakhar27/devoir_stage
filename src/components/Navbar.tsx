import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex gap-4">
          <Link href="/tableau-de-bord" className="font-bold text-xl">
            Dashboard
          </Link>
          <Link href="/agences" className="hover:text-gray-300">
            Agences
          </Link>
          <Link href="/contacts" className="hover:text-gray-300">
            Contacts
          </Link>
        </div>
        <div>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </nav>
  );
}
