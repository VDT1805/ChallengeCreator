import { Menubar } from "@/shadcn/ui/menubar";
import { Link } from "@inertiajs/react";

export function Menu() {
    return (
        <Menubar className="flex justify-evenly w-full mb-4">
            <Link href={route('testlist')} className="text-white-1 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm">
                Tests
            </Link>
            <Link href={route('questionbank')} className="text-white-1 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">
                Questions
            </Link>
            <Link href={route('label')} className="text-white-1 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">
                Labels & question groups
            </Link>
            <Link href={route('cooperator')} className="text-white-1 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">
                Cooperators
            </Link>
        </Menubar>
    )
}