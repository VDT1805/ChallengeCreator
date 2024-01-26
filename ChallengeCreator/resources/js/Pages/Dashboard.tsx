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
import { Button } from '@/shadcn/ui/button';

export default function Dashboard({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}>
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Button>
                        <Link href={route('addquestionbank')}>
                            Add question bank
                        </Link>
                    </Button>
                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-4 gap-4 mt-5">
                        <Link href={route('questionbank')}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Question Bank 1</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>Principles of Programming Languages</p>
                                </CardContent>
                            </Card>
                        </Link>

                        <Card>
                            <CardHeader>
                                <CardTitle>Question Bank 2</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Calculus 2</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Question Bank 3</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Principles of Marketing</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Question Bank 4</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Physical Education 2</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
