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



import React from 'react';
import { Menu } from './Menu';


export default function Dashboard({ auth }: PageProps) {
    const [position, setPosition] = React.useState("bottom")
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Settings</h2>}>
            <Head title="Settings" />
            <div className="mt-10 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <Menu></Menu>
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
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name" className="text-xl font-bold">Question bank name</Label>
                                    <Input id="name" placeholder="Name of your question bank" />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name" className="text-xl font-bold">Description of question bank</Label>
                                    <Textarea placeholder="Description of your question bank" />
                                </div>
                            </div>
                            <Link href={route('questionbank')}>
                                <Button className='mt-5'>
                                    Save
                                </Button>
                            </Link>
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
                            <div className=""><Link href={route('questionbank')}>
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
                            <div className=""><Link href={route('questionbank')}>
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
