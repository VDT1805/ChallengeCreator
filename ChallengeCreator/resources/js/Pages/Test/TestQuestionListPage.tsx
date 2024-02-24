import { columns } from "../Questions/QuestionTable/QuestionColumn"
import { DataTable } from "../Questions/QuestionTable/QuestionTable"
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Button } from "@/shadcn/ui/button";
import { Menu } from "../Menu";
import { QB } from "../QuestionBank/QuestionBankType";
import { QPage } from "../Questions/QuestionType";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { UpdateIcon } from "@radix-ui/react-icons";
import { PlusIcon, ShuffleIcon, FilePlusIcon } from "lucide-react";

export default function QuestionList({ auth, QBank, questions }: PageProps<{ QBank: QB, questions: QPage }>) {
    console.log(JSON.stringify(questions.data[2].inTest));
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">All Questions</h2>}>
            <Head title="Questions" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                {/* <Menu QBank={QBank}></Menu> */}
                <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>Add question</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <PlusIcon className="mr-2" />
              <Link href={route('questions.create',QBank.id)}>Add a new question</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <UpdateIcon className="mr-2" />
              <Link href={route('reusequestion')}>Reuse from question banks</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ShuffleIcon className="mr-2" />
              Add random question</DropdownMenuItem>
            <DropdownMenuItem>
              <FilePlusIcon className="mr-2" />
              <Link href={route('importinstruction')}>Import file</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
                </div>
                <div className="container mx-auto">
                    {/* <div className="flex justify-between">
                        <h3>All Questions</h3>
                    </div> */}
                    <DataTable columns={columns} data={questions.data} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
