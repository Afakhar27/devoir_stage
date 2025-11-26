import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { LayoutDashboard, Building2, Users } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/tableau-de-bord" className="flex items-center gap-2 font-bold text-xl text-slate-900 dark:text-white">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                D
              </div>
              <span>Dashboard</span>
            </Link>
            <div className="hidden md:flex items-center gap-1">
              <Link 
                href="/tableau-de-bord" 
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:text-blue-400 dark:hover:bg-slate-800 transition-colors"
              >
                <LayoutDashboard size={18} />
                Vue d'ensemble
              </Link>
              <Link 
                href="/agences" 
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:text-blue-400 dark:hover:bg-slate-800 transition-colors"
              >
                <Building2 size={18} />
                Agences
              </Link>
              <Link 
                href="/contacts" 
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:text-blue-400 dark:hover:bg-slate-800 transition-colors"
              >
                <Users size={18} />
                Contacts
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <UserButton afterSignOutUrl="/" appearance={{
              elements: {
                avatarBox: "w-9 h-9"
              }
            }}/>
          </div>
        </div>
      </div>
    </nav>
  );
}
