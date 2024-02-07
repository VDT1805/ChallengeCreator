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
import { Input } from '@/shadcn/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/shadcn/ui/dropdown-menu"
import { ArrowUpDown } from "lucide-react"
import React from 'react';

export default function Dashboard({ auth }: PageProps) {
    const [sortState, setSortState] = React.useState("Alphabetical")
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}>
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="flex justify-between max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Input
                        placeholder="Search for a question bank..."
                        className="max-w-sm col-span-2 border-2 border-blue-500 border-solid" />
                    <div className="flex items-center">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex gap-2">
                                <ArrowUpDown className="ml-2 h-4 w-4 mt-1" />
                                Sort By: {
                                    sortState
                                }
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => { setSortState("Alphabetical") }}>Alphabetical</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => { setSortState("Last Updated") }}>Last Updated</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <Link href={route('addquestionbank')}>
                        <Button>
                            Add question bank
                        </Button>
                    </Link>
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

                        <Link href={route('questionbank')}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Question Bank 2</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>Calculus 2</p>
                                </CardContent>
                            </Card>
                        </Link>

                        <Link href={route('questionbank')}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Question Bank 3</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>Principles of Marketing</p>
                                </CardContent>
                            </Card>
                        </Link>

                        <Link href={route('questionbank')}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Question Bank 4</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>Physical Education 2</p>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
