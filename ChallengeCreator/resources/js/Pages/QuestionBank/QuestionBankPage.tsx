import { columns } from "../Questions/QuestionTable/QuestionColumn"
import { DataTable } from "../Questions/QuestionTable/QuestionTable"
import { data } from "../Questions/QuestionTable/QuestionData"
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Menubar } from '@radix-ui/react-menubar';
import { Button } from "@/shadcn/ui/button";
import { Menu } from "../Menu";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/shadcn/ui/dropdown-menu";
import { UpdateIcon, PlusIcon, ShuffleIcon, FilePlusIcon } from "@radix-ui/react-icons";
import { Separator } from "@/shadcn/ui/separator";
import { QB } from "./QuestionBankType";

export default function QuestionBankPage({ auth, QBank, CanEdit }: PageProps<{ QBank: QB, CanEdit: Boolean }>) {
    // console.log(QBank)
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Question bank</h2>}>
            <Head title="Question Bank" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Menu QBank={QBank} CanEdit={CanEdit}></Menu>
                    <h1
                        className="inline-block text-5xl uppercase font-black !bg-clip-text text-transparent !bg-cover !bg-center"
                        style={{ background: "linear-gradient(to top right,#24C6DC,#514A9D)" }}
                    >
                        Welcome to your question bank
                    </h1>
                    <Separator className="mt-5 mb-5"/>
                    <p className="text-xl font-bold mb-2">Tests</p> - see all your tests from this Bank
                    <p className="text-xl font-bold mt-2 mb-2">Questions</p> - see all your questions in this Bank
                    <p className="text-xl font-bold mt-2 mb-2">Categories</p> - see all the categories & subcategories for this Bank
                    <p className="text-xl font-bold mt-2 mb-2">Members</p> - see who are collaborating with you in this Bank
                    <p className="text-xl font-bold mt-2 mb-2">Settings</p> - change information about this Bank
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
