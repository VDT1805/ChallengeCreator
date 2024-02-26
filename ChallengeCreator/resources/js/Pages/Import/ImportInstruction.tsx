import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/shadcn/ui/card"
import { Input } from "@/shadcn/ui/input"
import { Label } from "@/shadcn/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shadcn/ui/select"
import { Button } from '@/shadcn/ui/button';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/shadcn/ui/collapsible"
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { Menu } from '../Menu';
import { columns } from "./ImportInstructionTable/ImportInstructionColumn"
import { DataTable } from './ImportInstructionTable/ImportInstructionTable';
import { data } from './ImportInstructionTable/ImportInstructionData';
import { QB } from '../QuestionBank/QuestionBankType';


export default function ImportInstruction({ auth, QBank }: PageProps<{ QBank: QB }>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">How to import questions</h2>}>
            <Head title="How to import questions" />
            <div className="mt-10 mb-10 max-w-7xl mx-auto sm:px-6 lg:px-8">
            {/* <Menu QBank={QBank}></Menu> */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold">Download .CSV Question Template</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name" className="text-xl font-bold">Instructions</Label>
                                <div className="flex justify-start gap-5 content-center space-y-1.5 mb-5">
                                    How to upload new questions?
                                    <Collapsible>
                                        <CollapsibleTrigger className="text-orange-600 flex content-center justify-center">Show <ChevronDownIcon></ChevronDownIcon></CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <ol className='list-decimal'>
                                                <li>Export to .CSV format, your existing Question/s you want to override (from your Question Bank or Edit Test page) (Important: Check the option to 'Include Question ID')</li>
                                                <li>Remove extra Questions that may exist in the template</li>
                                                <li>Edit your Questions in the .CSV export file as required</li>
                                                <li>Do not change the Question Type</li>
                                                <li>Do not change the Question ID</li>
                                                <li>Upload your Question template in Step 2: Upload Questions</li>
                                                <li>Maximum of 50 Questions updated 'at a time'.</li>
                                            </ol>
                                        </CollapsibleContent>
                                    </Collapsible>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <br></br>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold">Download Question Import Templates</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DataTable columns={columns} data={data} />
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
