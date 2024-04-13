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
import React, { useEffect, useState } from 'react';
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
    // const [hex, setHex] = useState("#ffffff")
    // const randomizedHex = () => {
    //     const randomColor = '#' + (0x1000000 + Math.random() * 0xFFFFFF).toString(16).substr(1,6)
    //     setHex(randomColor)
    //     console.log(hex)
    // }
    // useEffect(() => {
    //     randomizedHex()
    // }, [])
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
            </div>
        </AuthenticatedLayout>
    );
}
