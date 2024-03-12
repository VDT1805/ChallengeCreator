import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
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
import { Textarea } from '@/shadcn/ui/textarea';
import { Checkbox } from '@/shadcn/ui/checkbox';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/shadcn/ui/dialog"



import React, { FormEventHandler, useState } from 'react';
import { Menu } from '../Menu';
import { QB } from '../QuestionBank/QuestionBankType';
import QBLayout from '@/Layouts/QBLayout';

interface UploadProp {
    csv: File | undefined;
}
export default function ImportPage({ auth, QBank, rows, violators }: PageProps<{ QBank: QB, rows: any, violators:any }>) {
    console.log(rows);
    console.log(violators);
    const [position, setPosition] = React.useState("bottom")
    const { data, setData, post, progress } = useForm<UploadProp>({
        csv: undefined,
      })

      const submit: FormEventHandler = (e) => {
        e.preventDefault()
        post(route("questions.import", QBank.id))
      }

      const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files) {
            setData("csv", e.currentTarget.files[0]);
        }
    };

    return (
        <QBLayout user={auth.user} QBank={QBank} CanEdit={true}>
            <form onSubmit={submit}>
                <input type="file" accept='.csv, .xls, .xlsx'
                onChange={handleFile}/>
                {progress && (
                <progress value={progress.percentage} max="100">
                    {progress.percentage}%
                </progress>
                )}
                <button type="submit">Submit</button>
            </form>
        </QBLayout>

    );
    // return (
    //     <AuthenticatedLayout
    //         user={auth.user}
    //         header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Import Question from File</h2>}>
    //         <Head title="Import Question" />
    //         <div className="mt-10 mb-10 max-w-7xl mx-auto sm:px-6 lg:px-8">
    //         {/* <Menu QBank={QBank}></Menu> */}
    //             <Card>
    //                 <CardHeader>
    //                     <CardTitle className="text-3xl font-bold">Import Question from File</CardTitle>
    //                 </CardHeader>
    //                 <CardContent>
    //                     <div className="grid w-full items-center gap-4">
    //                         <div className="flex flex-col space-y-1.5">
    //                             <Label htmlFor="name" className="text-xl font-bold">Question name</Label>
    //                             <Input id="name" placeholder="Name of your question" />
    //                         </div>
    //                         <div className="flex flex-col space-y-1.5 mb-5">
    //                             <Label htmlFor="name" className="text-xl font-bold">Import your question</Label>
    //                             <div className="grid w-full max-w-sm items-center gap-1.5">
    //                                 <Input type="file" accept='.csv, .xls, .xlsx' />
    //                             </div>
    //                         </div>
    //                     </div>


    //                     <div className="mt-5">
    //                         <div className="text-xl font-bold"><p>Category settings</p></div>
    //                         <div className="mt-3 mb-3">
    //                             <div className="text-xl font-bold"><p>Score settings</p></div>
    //                             <Input id="score" placeholder="Question score" className='w-1/6' />
    //                         </div>
    //                     </div>

    //                     <div className="flex gap-4">
    //                         <Link href={route('importinstruction')}>
    //                             <Button className='mt-5' variant={'ghost'}>
    //                                 Previous step
    //                             </Button>
    //                         </Link>
    //                         <Link href={route('testdetail')}>
    //                             <Button className='mt-5'>
    //                                 Add question
    //                             </Button>
    //                         </Link>
    //                     </div>
    //                 </CardContent>
    //             </Card>
    //         </div>
    //     </AuthenticatedLayout>
    // );
}
