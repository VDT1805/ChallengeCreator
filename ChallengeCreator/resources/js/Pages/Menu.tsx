import { Menubar } from "@/shadcn/ui/menubar";
import { PageProps } from "@/types";
import { Link } from "@inertiajs/react";
import { QB } from "./QuestionBank/QuestionBankTable/QuestionBankType";

export function Menu({ QBank, CanEdit }: { QBank: QB, CanEdit: Boolean }) {
    return (
        <Menubar className="flex justify-evenly w-full mb-4">
            <Link href={route('testlist')} className="text-white-1 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">
                Tests
            </Link>
            <Link href={route('questions')} className="text-white-1 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">
                Questions
            </Link>
            <Link href={route('category')} className="text-white-1 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">
                Categories
            </Link>
            <Link href={route('member')} className="text-white-1 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">
                Members
            </Link>
            {CanEdit == true ?
                <Link href={route('questionbanks.edit', QBank.id)} className="text-white-1 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">
                    Settings
                </Link>
                :
                undefined
            }
        </Menubar>
    )
}
