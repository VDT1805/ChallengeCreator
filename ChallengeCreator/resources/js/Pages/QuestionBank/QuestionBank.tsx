import { Payment, columns } from "./QuestionBankColumn"
import { DataTable } from "./QuestionBankTable"
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Menubar } from '@radix-ui/react-menubar';
import { Button } from "@/shadcn/ui/button";
import { Menu } from "../Menu";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/shadcn/ui/dropdown-menu";
import { UpdateIcon, PlusIcon, ShuffleIcon, FilePlusIcon } from "@radix-ui/react-icons";



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




export default function TestTable({ auth }: PageProps) {
    const data: Payment[] = [{
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
    },
    {
        id: "728erd52f",
        amount: 110,
        status: "pending",
        email: "k@example.com",
    },
    {
        id: "72r8ed52f",
        amount: 120,
        status: "pending",
        email: "t@example.com",
    }
    ]
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">ALL QUESTIONS</h2>}>
            <Head title="Dashboard" />
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
                    {/* <Menubar className="flex justify-evenly w-full mb-4">
                                <Link href={route('testlist')} className="text-white-1 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm">
                                    All Tests
                                </Link>
                                <Link href={route('register')} className="text-white-1 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">
                                    Question Bank
                                </Link>
                                <Link href={route('register')} className="text-white-1 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">
                                    Categories
                                </Link> */}
                    {/* <Link href={route('register')} className="text-white-1 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">
                                    Files
                                </Link>
                                <Link href={route('register')} className="text-white-1 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">
                                    Certificates
                                </Link> */}
                    {/* <Link href={route('register')} className="text-white-1 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">
                                    Community
                                </Link>
                    </Menubar> */}
                    <Menu></Menu>
                </div>
                <div className="container mx-auto py-10 ">
                    <div className="flex justify-between">
                        <h3>All questions</h3>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button>Add question</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>
                                    <PlusIcon className="mr-2"/>
                                    <Link href={route('addquestion')}>Add a new question</Link>
                                    </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <UpdateIcon className="mr-2"/>
                                    Reuse from question banks
                                    </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <ShuffleIcon className="mr-2" />
                                    Add random question</DropdownMenuItem>
                                <DropdownMenuItem>
                                <FilePlusIcon className="mr-2" />
                                <Link href={route('import')}>Import file</Link>
                                    </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <DataTable columns={columns} data={data} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}