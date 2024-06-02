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
import { FileIcon, FilePlusIcon, PlusIcon, ShuffleIcon } from "@radix-ui/react-icons";
import React, { FormEventHandler, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shadcn/ui/select"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/shadcn/ui/pagination";
import { LabelType } from "../Label/LabelTable/LabelType";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shadcn/ui/dropdown-menu';
import { PaginationProp } from "../pagination";
import { formatTime } from "../Questions/formatTime";

export default function TestListPage({ auth, QBank, tests, labels }: PageProps<{ QBank: QB, tests: any, labels: LabelType[] }>) {
    // console.log(tests.links.slice(1,-1));
    // const [sortState, setSortState] = React.useState("Alphabetical")
    const [query, setQuery] = useState<Record<string, string>>({});
    const [currentPage, setCurrentPage] = useState(tests.current_page);
    const [itemsPerPage, setItemsPerPage] = useState(tests.per_page);
    const lastItemIndex =  currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const [isFiltered, setIsFiltered] = useState(false);
    const labelValueChange = (e: string) => {
        setQuery(prevQuery => ({
            ...prevQuery,
            ["labels"]: e
        }));
        router.reload({ only: ['sublabels'], data: { labels: e } })
    }

    const setSortState = (tagsort: string) => {
        var tag: string = tagsort.split(":")[0];
        var sort: string = tagsort.split(":")[1];
        setQuery(prevQuery => ({
            ...prevQuery,
            [tag]: sort
        }));
    }


    const filter: FormEventHandler = (e) => {
        e.preventDefault();
        router.get(route('tests.index', QBank.id), query, { preserveState: true, preserveScroll: true });
        setIsFiltered(true);
    };
    return (
        <QBLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">All Tests</h2>} QBank={QBank} CanEdit={true}>
            <Head title="Tests" />
            <div className="py-12 container mx-auto">
                <Card className="mb-5 md:col-start-10 col-span-1 pt-5">
                    <CardContent>
                        <div className="flex justify-end">
                            <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button><PlusIcon className="mr-3" />Create Test</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>
                                    <PlusIcon className="mr-2" />
                                    <Link href={route('tests.create', QBank.id)}>
                                        Create a new test
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                        <ShuffleIcon className="mr-2" />
                                            <Link href={route('tests.randcreate', [QBank.id])}>Create test from random questions</Link>
                                        </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        </div>
                        <Separator className="mb-3 mt-2" />
                        <div className="flex items-center gap-2">
                        <Input
                                onChange={(e) => setQuery(prevQuery => ({
                                    ...prevQuery,
                                    ["keyword"]: e.target.value
                                }))}
                                placeholder="Search for a test..."
                                className="border-2 border-blue-500 border-solid" />
                            <Select onValueChange={(e) => {setSortState(e); }}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="alphab:asc">Alphabetical A-Z</SelectItem>
                                    <SelectItem value="alphab:desc">Alphabetical Z-A</SelectItem>
                                    {/* <SelectItem onClick={() => { setSortState("Last Updated") }} value="Last Updated">Last Updated</SelectItem> */}
                                </SelectContent>
                            </Select>
                            {/* <Select onValueChange={(e) => labelValueChange(e)}>
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
                            </Select> */}
                            <Button onClick={filter}>Filter</Button>
                            {
                                isFiltered &&
                                <Button variant={"destructive"} onClick={
                                    ()=>{
                                router.get(route('tests.index', QBank.id))
                                setIsFiltered(false)}
                                }>Clear filters</Button>
                            }
                            
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
                                <p>Created at: {formatTime(test.created_at)}</p>
                                <p>Updated at: {formatTime(test.created_at)}</p>
                                <Separator className="mb-2 mt-2" />
                                <div className="flex gap-4">
                                    <Link className='bg-bluegreen text-white font-bold rounded-t px-4 py-2' href={route('tests.show', [test.question_bank_id, test.id])} as="button">
                                            Show test
                                    </Link>
                                    <Link className='bg-red-500 text-white font-bold rounded-t px-4 py-2' method = "delete" href={route('tests.destroy', [test.question_bank_id, test.id])} as="button">
                                            Delete test
                                    </Link>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    )
                    )}
                    <PaginationProp
                        totalPosts={tests.total}
                        postsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        next_url={tests.next_page_url}
                        prev_url={tests.prev_page_url}
                        links={tests.links.slice(1,-1)}>
                    </PaginationProp>
                </Accordion>
            </div>
        </QBLayout>
    );
}
