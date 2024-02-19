import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
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
import React, { FormEventHandler } from 'react';
import { Menu } from './Menu';
import { QB } from './QuestionBank/QuestionBankTable/QuestionBankType';


export default function Settings({ auth, QBank, CanEdit }: PageProps<{ QBank: QB, CanEdit: Boolean }>) {
    const [position, setPosition] = React.useState("bottom")

    const { data, setData, post, processing, errors, reset, put } = useForm({
        name: QBank.name,
        description: QBank.description
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('questionbanks.update', QBank.id));
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Settings</h2>}>
            <Head title="Settings" />
            <div className="mt-10 max-w-7xl mx-auto sm:px-6 lg:px-8">
            <Menu QBank={QBank} CanEdit={CanEdit}></Menu>
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
                        <CardTitle className="text-3xl font-bold">Question Bank</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit}>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name" className="text-xl font-bold">Question bank name</Label>
                                    <Input id="name" placeholder={QBank.name ? QBank.name : "Name of your question bank"} onChange={(e) => setData('name', e.target.value)} />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name" className="text-xl font-bold">Description of question bank</Label>
                                    <Textarea placeholder={QBank.description ? QBank.description : "Description of your question bank"} onChange={(e) => setData('description', e.target.value)} />
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
                                <Label className="text-xl font-bold">Delete this question bank</Label><br></br>
                                <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Once you delete a question bank, there's no going back.</Label>
                            </div>
                            <div><Link href={route('questionbanks.destroy', QBank.id)} method='delete'>
                                <Button className='bg-red-500 text-white font-bold rounded-t px-4 py-2'>
                                    Delete question bank
                                </Button>
                            </Link>
                            </div>
                        </div>
                        <div className="flex justify-between justify-center items-center content-center space-y-1.5 mb-5">
                            <div className="">
                                <Label className="text-xl font-bold">Transfer ownership</Label><br></br>
                                <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"> Transfer this question bank to another user who has the ability to edit question banks.</Label>
                            </div>
                            <div className=""><Link href={route('questionbanks.index')}>
                                <Button className='bg-red-500 text-white font-bold rounded-t px-4 py-2'>
                                    Transfer
                                </Button>
                            </Link>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}