import { columns } from "./MemberTable/MemberColumn"
import { DataTable } from "./MemberTable/MemberTable"
import { data } from "./MemberTable/MemberData"
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Menubar } from '@radix-ui/react-menubar';
import { Button } from "@/shadcn/ui/button";
import { Menu } from "../Menu";
import { QB } from "../QuestionBank/QuestionBankType";
import QBLayout from "@/Layouts/QBLayout";
import { MemberPage } from "./MemberType";




export default function MemberTable({ auth, QBank, members }: PageProps<{ QBank: QB, members: MemberPage }>) {
    // console.log(JSON.stringify(members));
    return (
        <QBLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">All members</h2>} QBank={QBank} CanEdit={true}>
            <Head title="Members" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                </div>
                <div className="container mx-auto">
                    {/* <div className="flex justify-between">
                        <h3>All members</h3>
                    </div> */}
                    <DataTable columns={columns} data={data} />
                </div>
            </div>
        </QBLayout>
    );
}
