import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
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
import React, { FormEventHandler, useEffect, useState } from 'react';
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
import { DotFilledIcon, PlusIcon } from '@radix-ui/react-icons';
import { Separator } from '@radix-ui/react-menubar';

export default function Dashboard({ auth, QBS }: PageProps<{ QBS: QBPage }>) {
    const [query, setQuery] = useState<Record<string, string>>({});
    const [isFiltered, setIsFiltered] = useState(false);
    const filter: FormEventHandler = (e) => {
        e.preventDefault();
        router.get(route('questionbanks.index'), query, { preserveState: true, preserveScroll: true });
        setIsFiltered(true);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}>
            <Head title="Dashboard" />
                <div className='py-12 container mx-auto'>
                    <div className="flex justify-end">
                    
                        <Link href={route('questionbanks.create')}>
                            <Button>
                                <PlusIcon className="mr-2" /> Add question bank
                            </Button>
                        </Link>
                    </div>
                    <Separator className="mb-3 mt-2" />

                <div className="flex space-x-4">
                <Input
                        onChange={(e) => setQuery(prevQuery => ({
                                    ...prevQuery,
                                    ["namequery"]: e.target.value
                        }))}
                        placeholder="Search for a question bank..."
                        className="border-2 border-blue-500 border-solid" />
                    <div className="flex justify-end">
                    <Button onClick={filter}>Filter</Button>
                            {
                                isFiltered &&
                                <Button variant={"destructive"} onClick={() => {
                                    router.get(route('questionbanks.index'))
                                setIsFiltered(false);
                                }}>Clear filters</Button>
                            }
                    </div>
                    </div>
                    
                    
                </div>
                    

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto px-8">
                    {QBS.data.map(item => (
                        <Link href={route('questionbanks.show', item.id)}>
                            <Card>
                                <CardHeader className='flex flex-row gap-2 align-center'>
                                    <CardTitle className="border-2" style={{ borderColor: `${'#' + (0x1000000 + Math.random() * 0xFFFFFF).toString(16).substr(1,6)}` }}><Separator></Separator></CardTitle>
                                    <CardTitle className="text-3xl font-bold">{item.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>ID: {item.id}</p>
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
        </AuthenticatedLayout>
    );
}
