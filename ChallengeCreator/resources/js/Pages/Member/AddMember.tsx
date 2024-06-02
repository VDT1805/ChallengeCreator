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
import { QB } from '../QuestionBank/QuestionBankType';


export default function AddMember({ auth, QBank }: PageProps<{ QBank: QB }>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Invite Member</h2>}>
            <Head title="New Member" />
                <div className="mt-10 mb-10 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <Menu QBank={QBank} CanEdit={true}></Menu>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-3xl font-bold">Invite Member</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form>
                                    <div className="grid w-full items-center gap-4">
                                        <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="name" className="text-xl font-bold">Member ID</Label>
                                            <Input id="name" placeholder="ID of your member" />
                                        </div>
                                        <div className="mt-5 mb-5">
                                            <div className="text-xl font-bold"><p>Role settings</p></div>
                                            <Select>
                                                <SelectTrigger><SelectValue placeholder="Choose a role for the member" /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value='Editor'>Editor</SelectItem>
                                                    <SelectItem value='Viewer'>Viewer</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <Link href={route('member')}>
                                        <Button type='submit'>
                                            Invite member
                                        </Button>
                                    </Link>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
        </AuthenticatedLayout>
    );
}
