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
import { QBPage } from './QuestionBank/QuestionBankType';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/shadcn/ui/pagination"
import { PlusIcon } from '@radix-ui/react-icons';

export default function Dashboard({ auth, QBS }: PageProps<{ QBS: QBPage }>) {
    const [sortState, setSortState] = React.useState("Alphabetical")
    // console.log(JSON.stringify(QBS));
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}>
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="grid md:grid-cols-5 md:grid-rows-none px-8 mx-auto max-w-7xl grid-rows-3 grid-flow-col">
                    <Input
                        placeholder="Search for a question bank..."
                        className="border-2 border-blue-500 border-solid row-span-1 md:col-span-2" />
                    <div className="flex items-center row-span-1 md:col-span-2">
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
                    <div className="md:col-start-10 col-span-1">
                        <Link href={route('questionbanks.create')}>
                            <Button>
                                <PlusIcon className="mr-2" /> Add question bank
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5 max-w-7xl mx-auto px-8">
                    {QBS.data.map(item => (
                        <Link href={route('questionbanks.show', item.id)}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Question Bank {item.id}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>{item.name}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href={QBS.prev_page_url} />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href={QBS.first_page_url}>1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href={QBS.next_page_url} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </AuthenticatedLayout>
    );
}
