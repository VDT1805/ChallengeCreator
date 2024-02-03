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
import { Menu } from '../Menu';


export default function Dashboard({ auth }: PageProps) {
    const [position, setPosition] = React.useState("bottom")
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">NEW QUESTION</h2>}>
            <Head title="Dashboard" />
            <div className="mt-10 mb-10 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <Menu></Menu>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold">Import Question</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name" className="text-xl font-bold">Question name</Label>
                                    <Input id="name" placeholder="Name of your question" />
                                </div>
                                <div className="flex flex-col space-y-1.5 mb-5">
                                    <Label htmlFor="name" className="text-xl font-bold">Import your question</Label>
                                    <div className="grid w-full max-w-sm items-center gap-1.5">
                                        <Input type="file" accept='.csv, .xls, .xlsx' />
                                    </div>
                                </div>
                            </div>


                            <div className="mt-5">
                                <div className="text-xl font-bold"><p>Category settings</p></div>
                                <Select>
                                    <SelectTrigger><SelectValue placeholder="Choose your label" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='L.0.1' >L.0.1</SelectItem>
                                        <SelectItem value='L.0.2' >L.0.2</SelectItem>
                                        <SelectItem value='L.0.3' >L.0.3</SelectItem>
                                        <SelectItem value='L.0.4' >L.0.4</SelectItem>
                                        <SelectItem value='L.0.5' >L.0.5</SelectItem>
                                    </SelectContent>
                                </Select>
                                <div className="mt-3 mb-3">
                                    <div className="text-xl font-bold"><p>Score settings</p></div>
                                    <Input id="score" placeholder="Question score" className='w-1/6' />
                                </div>
                            </div>

                            <Button className='mt-5'>
                                <Link href={route('testdetail')}>
                                    Add question
                                </Link>
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}