import { Head, Link, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Button } from "@/shadcn/ui/button";
import { QB } from "../QuestionBank/QuestionBankType"
import QBLayout from "@/Layouts/QBLayout"
import { Card, CardContent, CardHeader, CardTitle } from '@/shadcn/ui/card';
import { FileIcon, FilePlusIcon, PlusIcon } from '@radix-ui/react-icons';
import { Separator } from '@/shadcn/ui/separator';
import { Input } from '@/shadcn/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shadcn/ui/accordion';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/shadcn/ui/pagination';
import { LabelPage, LabelType } from './LabelTable/LabelType';
import InputError from '@/Components/InputError';

export default function LabelIndex({ auth, QBank, labels }: PageProps<{ QBank: QB, labels: LabelPage }>) {
    return (
        <QBLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">All Labels/Sublabels</h2>} QBank={QBank} CanEdit={true}>
            <Head title="Labels/Sublabels" />
            <div className="py-12 container mx-auto">
                {/* <Card className="mb-5 md:col-start-10 col-span-1 pt-5 shadow-2xl">
                    <CardContent>
                        <div className="flex justify-end">
                            <Link href={route('labels.create', [QBank.id])}>
                                <Button>
                                    <PlusIcon className="mr-2" />
                                    Add label
                                </Button>
                            </Link>
                        </div>
                        <Separator className="mb-3 mt-2" />
                        <div className="flex items-center gap-2">
                            <Input
                                placeholder="Search for a label..."
                                className="border-2 border-indianred border-solid" />
                            <Button>
                                Filter
                            </Button>
                        </div>
                    </CardContent>
                </Card> */}
                <Card className="mb-5 md:col-start-10 col-span-1 pt-5">
                    <CardContent>
                        {/* <div className="flex justify-end">
                            {
                                changeLog.length > 0 &&
                                UpdateDialog(changeLog)
                            }
                        </div> */}
                        <div className="flex justify-end">
                            <Link href={route('labels.create', [QBank.id])}>
                                <Button>
                                    <PlusIcon className="mr-2" />
                                    Add label
                                </Button>
                            </Link>
                        </div>
                        <Separator className="mb-3 mt-2" />
                        {/* <div className="flex items-center gap-2">
                            <Input
                                // onChange={(e) => setQuery(prevQuery => ({
                                //     ...prevQuery,
                                //     ["keyword"]: e.target.value
                                // }))}
                                placeholder="Search for a label..."
                                className="border-2 border-blue-500 border-solid" />
                            <Button>Search</Button>
                            <Button variant={"destructive"}>Clear search</Button>
                        </div> */}
                    </CardContent>
                </Card>
                <Accordion type="single" collapsible className="w-full bg-white rounded">
                    {labels.data.map((label: LabelType) => (
                        <AccordionItem value={label.id as unknown as string}>
                            <AccordionTrigger className="hover:bg-blue-100 bg-white px-3 rounded">
                                <div className="flex gap-2 items-center"><FileIcon />{label.name as string}</div>
                            </AccordionTrigger>
                            <AccordionContent className="bg-white px-3 rounded">
                                <Link className='text-red-500 underline text-center font-bold rounded-t px-4 py-2' method = "delete" href={""} >
                                        Delete label
                                </Link>
                                <Separator className="mb-2 mt-2" />
                                <Accordion type="single" collapsible className="w-full bg-white rounded">
                                    {label.sublabels?.map((sublabel: LabelType) => {
                                        return (
                                            <AccordionItem value={sublabel.id as unknown as string}>
                                                <AccordionTrigger className="hover:bg-blue-100 bg-white px-3 rounded">
                                                    <div className="flex gap-2 items-center"><FileIcon />{sublabel.name as string}</div>
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                    {/* {sublabel.name as string} */}
                                                    <div className="flex gap-4">
                                                        <Link className='text-red-500 underline text-center font-bold rounded-t px-4 py-2' method = "delete" href={""} >
                                                                Delete sublabel
                                                        </Link>
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        )
                                    })}
                                </Accordion>

                                
                            </AccordionContent>
                        </AccordionItem>
                    )
                    )}
                    <Pagination className="bg-white mt-2 rounded shadow-2xl">
                        <PaginationContent className="rounded">
                            <PaginationItem>
                                <PaginationPrevious href={labels.prev_page_url} />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href={labels.first_page_url}>1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext href={labels.next_page_url} />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </Accordion>

                {/* <Card className="mb-5 md:col-start-10 col-span-1 pt-2 shadow-2xl">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold">All sublabels</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-end">
                            <Link href={route('labels.create', [QBank.id])}>
                                <Button>
                                    <PlusIcon className="mr-2" />
                                    Add sublabel
                                </Button>
                            </Link>
                        </div>
                        <Separator className="mb-3 mt-2" />
                        <div className="flex items-center gap-2">
                            <Input
                                placeholder="Search for a sublabel..."
                                className="border-2 border-bluegreen border-solid" />
                            <Button>
                                Filter
                            </Button>
                        </div>
                    </CardContent>
                    <Accordion type="single" collapsible className="w-full bg-white rounded">
                        {labels.data.map((label: LabelType) => (
                            <AccordionItem value={label.id as unknown as string}>
                                <AccordionTrigger className="hover:bg-blue-100 bg-white px-3 rounded">
                                    <div className="flex gap-2 items-center"><FileIcon />{label.name as string}</div>
                                </AccordionTrigger>
                                <AccordionContent className="bg-white px-3 rounded">
                                    <Separator className="mb-2 mt-2" />
                                </AccordionContent>
                            </AccordionItem>
                        )
                        )}
                        <Pagination className="bg-white mt-2 rounded">
                            <PaginationContent className="rounded">
                                <PaginationItem>
                                    <PaginationPrevious href={labels.prev_page_url} />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href={labels.first_page_url}>1</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext href={labels.next_page_url} />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </Accordion> */}
            </div>
        </QBLayout>
    );
}
