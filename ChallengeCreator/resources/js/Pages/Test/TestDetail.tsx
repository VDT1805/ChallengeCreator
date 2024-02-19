import { columns } from "./TestTable/TestColumn"
import { DataTable } from "./TestTable/TestDetailTable"
import { data } from "./TestTable/TestData"
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
import { QB } from "../QuestionBank/QuestionBankTable/QuestionBankType";


// export default function DemoPage() {
//   const data1: Array<Payment> = [
//   {id: "728ed52f",
//   amount: 100,
//   status: "pending",
//   email: "m@example.com",},
//   {id: "728ed52f",
//   amount: 100,
//   status: "pending",
//   email: "m@example.com",},
// ]
// console.log(typeof(data1))
//   return (

//     <div className="container mx-auto py-10">
//       <h3> Test Table </h3>

//       <DataTable columns={columns} data={data1} />
//     </div>
//   )
// }

export default function TestTable({ auth, QBank }: PageProps<{ QBank: QB }>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Test Details</h2>}>
            <Head title="Test Details" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* <Tabs defaultValue="account" className="w-[400px]">
                        <TabsList className='grid w-full grid-cols-6'>
                            <div><TabsTrigger value="tests">All tests</TabsTrigger></div>
                            <div><TabsTrigger value="qb">Question bank</TabsTrigger></div>
                            <div><TabsTrigger value="categories">Categories</TabsTrigger></div>
                            <div><TabsTrigger value="files">Files</TabsTrigger></div>
                            <div><TabsTrigger value="certificates">Certificates</TabsTrigger></div>
                            <div><TabsTrigger value="community">Community</TabsTrigger></div>
                        </TabsList>
                        <TabsContent value="tests">Make changes to your account here.</TabsContent>
                        <TabsContent value="qb">Change your password here.</TabsContent>
                        </Tabs> */}
                    <Menu QBank={QBank}></Menu>
                </div>
                <div className="mt-10 max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-3xl font-bold">Test 1</CardTitle>
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
                    {/* <div className="flex justify-between">
                        <h3> Test questions </h3>
                    </div> */}
                    <DataTable columns={columns} data={data} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
