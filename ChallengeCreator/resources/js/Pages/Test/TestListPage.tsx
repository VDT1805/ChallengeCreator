import { columns } from "./TestTable/TestColumn"
import { DataTable } from "./TestTable/TestTable"
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Button } from "@/shadcn/ui/button";
import { Menu } from "../Menu";
import { QB } from "../QuestionBank/QuestionBankType";

export default function TestListPage({ auth, QBank,tests }: PageProps<{ QBank: QB, tests:any }>) {
    // console.log(JSON.stringify(tests));
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">All tests</h2>}>
            <Head title="Tests" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <Menu QBank={QBank} CanEdit={true}></Menu>
                    <div className="md:col-start-10 col-span-1">
                        <Link href={route('tests.create',QBank.id)}>
                            <Button>
                            Add test
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="container mx-auto">
                    {/* <div className="flex justify-between">
                        <h3>All tests</h3>
                    </div> */}
                    <DataTable columns={columns} data={tests.data} />

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
