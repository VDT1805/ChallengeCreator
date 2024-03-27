import { Head, Link, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/shadcn/ui/card"
import { Input } from "@/shadcn/ui/input"
import { Label } from "@/shadcn/ui/label"
import { Button } from '@/shadcn/ui/button';
import { Textarea } from '@/shadcn/ui/textarea';
import React, { FormEventHandler } from 'react';
import { QB } from './QuestionBank/QuestionBankType';
import QBLayout from '@/Layouts/QBLayout';
import { MemberPage } from './Member/MemberTable/MemberType';

export default function Settings({ auth, QBank, CanEdit, members }: PageProps<{ QBank: QB, CanEdit: Boolean, members: MemberPage }>) {
    const [position, setPosition] = React.useState("bottom")

    const { data, setData, post, processing, errors, reset, put } = useForm({
        name: QBank.name,
        description: QBank.description
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('questionbanks.update', QBank.id));
    };

    console.log(members)
    return (
        <QBLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Settings</h2>} QBank={QBank} CanEdit={CanEdit}>
            <Head title="Settings" />
            <div className="mt-10 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold">Owner</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-5">
                            <p>John Doe</p>
                            <p>johndoe@gmail.com</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="mt-10 mb-10 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold">Question Bank Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit}>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name" className="text-xl font-bold">Question Bank name</Label>
                                    <Input id="name" placeholder={QBank.name ? QBank.name : "Name of your Question Bank"} onChange={(e) => setData('name', e.target.value)} />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name" className="text-xl font-bold">Description of Question Bank</Label>
                                    <Textarea placeholder={QBank.description ? QBank.description : "Description of your Question Bank"} onChange={(e) => setData('description', e.target.value)} />
                                </div>
                            </div>
                            {/* <Link href={route('questionbanks.update', QBank.id)} method='put'> */}
                            <Button className='mt-5' type='submit'>
                                Save
                            </Button>
                            {/* </Link> */}
                        </form>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-10 mb-10 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold">Danger Zone</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between justify-center items-center content-center space-y-1.5 mb-5">
                            <div className="">
                                <Label className="text-xl font-bold">Delete this Question Bank</Label><br></br>
                                <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Once you delete a Question Bank, there's no going back.</Label>
                            </div>
                            <Link href={route('questionbanks.destroy', QBank.id)} method='delete'>
                                <Button className='bg-red-500 text-white font-bold rounded-t px-4 py-2'>
                                    Delete Question Bank
                                </Button>
                            </Link>
                        </div>
                        <div className="flex justify-between justify-center items-center content-center space-y-1.5 mb-5">
                            <div className="">
                                <Label className="text-xl font-bold">Transfer ownership</Label><br></br>
                                <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"> Transfer this Question Bank to another user who has the ability to edit Question Banks.</Label>
                            </div>
                            <Link href={route('questionbanks.index')}>
                                <Button className='bg-red-500 text-white font-bold rounded-t px-4 py-2'>
                                    Transfer
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </QBLayout>
    );
}
