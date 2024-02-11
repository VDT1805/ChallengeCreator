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
import { Button } from '@/shadcn/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shadcn/ui/select"
import { Menu } from '../Menu';


export default function Dashboard({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Reuse from Question Bank</h2>}>
            <Head title="Reuse from Question Bank" />
                <div className="mt-10 mb-10 max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Menu></Menu>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-3xl font-bold">Reuse from Question Bank</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form>
                                    <div className="grid w-full items-center gap-4">
                                        <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="name" className="text-xl font-bold">Question name</Label>
                                            <Input id="name" className='focus:border-blue-500' placeholder="Name of your question" />
                                        </div>
                                        <div className="mt-5 mb-5">
                                            <div className="text-xl font-bold"><p>Question Bank source</p></div>
                                            <Select>
                                                <SelectTrigger><SelectValue className='focus:border-red-500' placeholder="Choose the question bank that contains the question" /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value='Question Bank 1'>Question Bank 1</SelectItem>
                                                    <SelectItem value='Question Bank 2'>Question Bank 2</SelectItem>
                                                    <SelectItem value='Question Bank 3'>Question Bank 3</SelectItem>
                                                    <SelectItem value='Question Bank 4'>Question Bank 4</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <Link href={route('questionbanks.show')}>
                                        <Button type='submit'>
                                            Add question
                                        </Button>
                                    </Link>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
        </AuthenticatedLayout>
    );
}
