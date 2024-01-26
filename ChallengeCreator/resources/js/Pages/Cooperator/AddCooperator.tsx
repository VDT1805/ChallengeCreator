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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">INVITE COOPERATORS</h2>}>
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Menu></Menu>
                    <div className="grid grid-cols-4 gap-4 mt-5">
                        <Card>
                            <CardHeader>
                                <CardTitle>Invite Cooperator</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form>
                                    <div className="grid w-full items-center gap-4">
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="name">Cooperator ID</Label>
                                            <Input id="name" placeholder="ID of your cooperator" />
                                        </div>
                                        <div className="mt-5 mb-5">
                                            <div className="text-xl font-bold"><p>Label settings</p></div>
                                            <Select>
                                                <SelectTrigger><SelectValue placeholder="Choose your label" /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value='Editor' >Editor</SelectItem>
                                                    <SelectItem value='Viewer' >Viewer</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <Button type='submit'>
                                        <Link href={route('cooperator')}>
                                            Invite cooperator
                                        </Link>
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
