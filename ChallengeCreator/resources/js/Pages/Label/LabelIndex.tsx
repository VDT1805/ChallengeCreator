import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Menubar } from '@radix-ui/react-menubar';
import { Button } from "@/shadcn/ui/button";
import { Menu } from "../Menu";
import { QB } from "../QuestionBank/QuestionBankType"
import QBLayout from "@/Layouts/QBLayout"
import { Card, CardContent, CardHeader, CardTitle } from '@/shadcn/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shadcn/ui/dropdown-menu';
import { FileIcon, FilePlusIcon, PlusIcon } from '@radix-ui/react-icons';
import { Separator } from '@/shadcn/ui/separator';
import { Input } from '@/shadcn/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shadcn/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shadcn/ui/accordion';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/shadcn/ui/pagination';
import { LabelPage, LabelType } from './LabelTable/LabelType';

export default function LabelIndex({ auth, QBank, labels }: PageProps<{ QBank: QB, labels: LabelPage }>) {
    return (
        <QBLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">All Labels/Sublabels</h2>} QBank={QBank} CanEdit={true}>
            <Head title="Labels/Sublabels" />
            <div className="py-12 container mx-auto">
                <Card className="mb-5 md:col-start-10 col-span-1 pt-2 shadow-2xl">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold">All labels</CardTitle>
                    </CardHeader>
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
                    </Accordion>
                </Card>

                <Card className="mb-5 md:col-start-10 col-span-1 pt-2 shadow-2xl">
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
                    </Accordion>
                </Card>
            </div>
        </QBLayout>
    );
}
