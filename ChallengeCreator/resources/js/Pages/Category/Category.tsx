import { columns } from "./CategoryTable/CategoryColumn"
import { DataTable } from "./CategoryTable/CategoryTable"
import { data } from "./CategoryTable/CategoryData"

import { subcolumns } from "./CategoryTable/SubCategoryColumn"
import { SubDataTable } from "./CategoryTable/SubCategoryTable"
import { subdata } from "./CategoryTable/SubCategoryData"
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Menubar } from '@radix-ui/react-menubar';
import { Button } from "@/shadcn/ui/button";
import { Menu } from "../Menu";
import { QB } from "../QuestionBank/QuestionBankType"



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




export default function CategoryTable({ auth, QBank }: PageProps<{ QBank: QB }>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">All categories</h2>}>
            <Head title="Categories/Subcategories" />
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
                    <Menu QBank={QBank}></Menu>
                </div>
                <div className="container mx-auto">
                    {/* <div className="flex justify-between">
                        <h3>All categories</h3>
                    </div> */}
                    <DataTable columns={columns} data={data} />
                </div>
                <div className="border-y"></div>
                <div className="container mx-auto py-5">
                    {/* <div className="flex justify-between">
                        <h3>All subcategories</h3>
                    </div> */}
                    <SubDataTable columns={subcolumns} data={subdata} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
