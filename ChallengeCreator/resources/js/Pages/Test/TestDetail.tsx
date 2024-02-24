import { Test, columns } from "./TestTable/TestColumn"
import { DataTable } from "./TestTable/TestDetailTable"
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Menubar } from '@radix-ui/react-menubar';
import { Button } from "@/shadcn/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu"
import { FilePlusIcon, PlusIcon, UpdateIcon, ShuffleIcon, CopyIcon, TrashIcon } from '@radix-ui/react-icons'
import { Menu } from "../Menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/ui/card";
import { PrinterIcon, Trash2Icon } from "lucide-react";
import { Separator } from "@/shadcn/ui/separator"
import { QB } from "../QuestionBank/QuestionBankType";
import { TestPage } from "./TestTable/TestType";
import { Question } from "../Questions/QuestionType";
import QBLayout from "@/Layouts/QBLayout";



export default function TestTable({ auth, QBank, test, questions }: PageProps<{ QBank: QB, test: Test, questions: Array<Question> }>) {
    // console.log(JSON.stringify(questions));
    return (
        <QBLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Test Details - {test.name}</h2>} QBank={QBank} CanEdit={true}>
            <Head title="Test Details" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* <Menu QBank={QBank}></Menu> */}
                </div>
                <div className="mt-10 max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-3xl font-bold">{test.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between">
                            <div className="flex flex-row">
                                <Button variant="ghost" className="flex gap-3">
                                    <CopyIcon className="ml-2 h-4 w-4 mt-1" />
                                    Duplicate
                                </Button>
                                <Separator orientation="vertical" className="border-2 border-sky-300" />
                                <Button variant="ghost" className="flex gap-3">
                                    <PrinterIcon className="ml-2 h-4 w-4 mt-1" />
                                    Print
                                </Button>
                                <Separator orientation="vertical" className="border-2 border-sky-300" />
                                <Button variant="ghost" className="flex gap-3">
                                    <Trash2Icon className="ml-2 h-4 w-4 mt-1" />
                                    Print
                                </Button>
                            </div>
                            <div className="flex">
                                <Button className="bg-sky-500 flex gap-3 hover:bg-sky-300">
                                    Preview
                                </Button>
                            </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="container mx-auto">
                <div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button>Add question</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                    <DropdownMenuItem>
                        <PlusIcon className="mr-2" />
                        <Link href={route('tests.createQuestion',[QBank.id,test.id])}>Add a new question</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <UpdateIcon className="mr-2" />
                        <Link href={route('tests.indexQuestion',[QBank.id,test.id])}>Reuse from question banks</Link>
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
                    {/* <div className="flex justify-between">
                        <h3> Test questions </h3>
                    </div> */}
                    <DataTable columns={columns} data={questions} />
                </div>
            </div>
        </QBLayout>
    );
}
