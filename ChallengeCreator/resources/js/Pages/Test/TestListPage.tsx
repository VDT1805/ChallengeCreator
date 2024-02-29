import { Test } from "./TestTable/TestColumn"
import { Head, Link } from '@inertiajs/react';
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
} from "@/shadcn/ui/card"
import { Input } from "@/shadcn/ui/input";
import { FileIcon, PlusIcon } from "@radix-ui/react-icons";
import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shadcn/ui/select"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/shadcn/ui/pagination";

export default function TestListPage({ auth, QBank, tests }: PageProps<{ QBank: QB, tests: any }>) {
    // console.log(JSON.stringify(tests));
    const [sortState, setSortState] = React.useState("Alphabetical")
    return (
        <QBLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">All tests</h2>} QBank={QBank} CanEdit={true}>
            <Head title="Tests" />
            <div className="py-12 container mx-auto">
                    <Card className="mb-5 md:col-start-10 col-span-1 pt-5">
                        <CardContent>
                            <Link href={route('tests.create', QBank.id)} className="flex justify-end">
                                <Button>
                                    <PlusIcon className="mr-3" /> Add test
                                </Button>
                            </Link>
                            <Separator className="mb-3 mt-2" />
                            <div className="flex items-center gap-2">
                                <Input
                                    placeholder="Search for a test..."
                                    className="border-2 border-blue-500 border-solid" />
                                <Select>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem onClick={() => { setSortState("Alphabetical"); }} value="Alphabetical">Alphabetical</SelectItem>
                                        <SelectItem onClick={() => { setSortState("Last Updated") }} value="Last Updated">Last Updated</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Categories" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All</SelectItem>
                                        <SelectItem value="l01">L.0.1</SelectItem>
                                        <SelectItem value="l02">L.0.2</SelectItem>
                                        <SelectItem value="l03">L.0.3</SelectItem>
                                        <SelectItem value="l04">L.0.4</SelectItem>
                                        <SelectItem value="l05">L.0.5</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button>
                                    Filter
                                </Button>
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
                                            <p className="text-lg font-bold underline text-bluegreen">Edit test</p>
                                        </Link>
                                        <Link href={""}>
                                            <p className="text-lg font-bold underline text-indianred">Delete test</p>
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
