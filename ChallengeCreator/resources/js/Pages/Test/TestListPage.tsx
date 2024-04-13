import { Test } from "./TestTable/TestColumn"
import { Head, Link, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Button } from "@/shadcn/ui/button";
import { QB } from "../QuestionBank/QuestionBankType";
import QBLayout from "@/Layouts/QBLayout";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/shadcn/ui/accordion"
import { Separator } from "@/shadcn/ui/separator";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/shadcn/ui/card"
import { Input } from "@/shadcn/ui/input";
import { FileIcon, PlusIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shadcn/ui/select"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/shadcn/ui/pagination";
import { LabelType } from "../Label/LabelTable/LabelType";

export default function TestListPage({ auth, QBank, tests, labels }: PageProps<{ QBank: QB, tests: any, labels: LabelType[] }>) {
    // console.log(JSON.stringify(tests));
    const [sortState, setSortState] = React.useState("Alphabetical")
    const [query, setQuery] = useState<Record<string, string>>({});
    const labelValueChange = (e: string) => {
        setQuery(prevQuery => ({
            ...prevQuery,
            ["labels"]: e
        }));
        router.reload({ only: ['sublabels'], data: { labels: e } })
    }
    return (
        <QBLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">All Tests</h2>} QBank={QBank} CanEdit={true}>
            <Head title="Tests" />
            <div className="py-12 container mx-auto">
                <Card className="mb-5 md:col-start-10 col-span-1 pt-5">
                    {/* <CardHeader>
                        <CardTitle className="text-3xl font-bold">All tests</CardTitle>
                    </CardHeader> */}
                    <CardContent>
                        <div className="flex justify-end">
                            <Link href={route('tests.create', QBank.id)} >
                                <Button>
                                    <PlusIcon className="mr-3" /> Add test
                                </Button>
                            </Link>
                        </div>
                        <Separator className="mb-3 mt-2" />
                        <div className="flex items-center gap-2">
                            <Input
                                placeholder="Search for a test..."
                                className="border-2 border-indianred border-solid focus:border-indianred" />
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem onClick={() => { setSortState("Alphabetical"); }} value="Alphabetical">Alphabetical</SelectItem>
                                    <SelectItem onClick={() => { setSortState("Last Updated") }} value="Last Updated">Last Updated</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select onValueChange={(e) => labelValueChange(e)}>
                                <SelectTrigger className="w-[180px]" >
                                    <SelectValue placeholder="Labels" />
                                </SelectTrigger >
                                <SelectContent>
                                    {labels.map((label) => (
                                        <SelectItem key={label.id} value={label.id.toString()}>
                                            {label.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button>Filter</Button>
                            <Button variant={"destructive"}>Clear filters</Button>
                        </div>
                    </CardContent>
                </Card>
                <Accordion type="single" collapsible className="w-full shadow-2xl bg-white">
                    {tests.data.map((test: Test) => (
                        <AccordionItem value={test.id as unknown as string}>
                            <AccordionTrigger className="hover:bg-blue-100 bg-white px-3">
                                <div className="flex gap-2 items-center"><FileIcon />{test.name as string}
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="bg-white px-3">
                                <p>Created at: {test.created_at}</p>
                                <p>Updated at: {test.created_at}</p>
                                <Separator className="mb-2 mt-2" />
                                <div className="flex gap-4">
                                    <Link href={route('tests.show', [test.question_bank_id, test.id])}>
                                        <Button className='bg-bluegreen text-white font-bold rounded-t px-4 py-2'>
                                            Edit test
                                        </Button>
                                    </Link>
                                    <Link href={route('tests.destroy', [test.question_bank_id, test.id])}>
                                        <Button className='bg-red-500 text-white font-bold rounded-t px-4 py-2'>
                                            Delete test
                                        </Button>
                                    </Link>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    )
                    )}
                    <Pagination className="bg-white mt-2">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious href={tests.prev_page_url} />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href={tests.first_page_url}>1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext href={tests.next_page_url} />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </Accordion>
            </div>
        </QBLayout>
    );
}
