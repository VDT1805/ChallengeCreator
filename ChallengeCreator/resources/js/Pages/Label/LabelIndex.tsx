import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Menubar } from '@radix-ui/react-menubar';
import { Button } from "@/shadcn/ui/button";
import { Menu } from "../Menu";
import { QB } from "../QuestionBank/QuestionBankType"
import QBLayout from "@/Layouts/QBLayout"
import { Card, CardContent } from '@/shadcn/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shadcn/ui/dropdown-menu';
import { FileIcon, FilePlusIcon, PlusIcon } from '@radix-ui/react-icons';
import { Separator } from '@/shadcn/ui/separator';
import { Input } from '@/shadcn/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shadcn/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shadcn/ui/accordion';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/shadcn/ui/pagination';
import { Label, LabelPage } from './LabelTable/LabelType';






export default function LabelIndex({ auth, QBank, labels }: PageProps<{ QBank: QB, labels: LabelPage }>) {
    return (
        <QBLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">All categories</h2>} QBank={QBank} CanEdit={true}>
            <Head title="Categories/Subcategories" />
            <div className="py-12 container mx-auto">
                <Card className="mb-5 md:col-start-10 col-span-1 pt-2">
                <CardContent>
                    <div className="flex justify-end">
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button><PlusIcon className="mr-3" />Add question</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                        <PlusIcon className="mr-2" />
                        <Link href={route('labels.create', [QBank.id])}>
                            Add a new label
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                    </div>
                    <Separator className="mb-3 mt-2" />
                    <div className="flex items-center gap-2">
                    <Input
                        placeholder="Search for a question..."
                        className="border-2 border-blue-500 border-solid" />
                    <Button>
                        Filter
                    </Button>
                    </div>
                </CardContent>
                </Card>
                <Accordion type="single" collapsible className="w-full shadow-2xl bg-white">
                {labels.data.map((label: Label) => (
                    <AccordionItem value={label.id as unknown as string}>
                    <AccordionTrigger className="hover:bg-blue-100 bg-white px-3">
                        <div className="flex gap-2 items-center"><FileIcon />{label.name as string}
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="bg-white px-3">

                        <Separator className="mb-2 mt-2" />
                        <div className="flex gap-4">
                        {/* <Link href={route('labels.edit', [question.question_bank_id, question.id])} method="get">
                            <p className="text-lg font-bold underline text-bluegreen">Edit question</p>
                        </Link>
                        <Link href={""}>
                            <p className="text-lg font-bold underline text-indianred">Delete question</p>
                        </Link> */}
                        </div>
                    </AccordionContent>
                    </AccordionItem>
                )
                )}
                <Pagination className="bg-white mt-2">
                    <PaginationContent>
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
            </div>
        </QBLayout>
    );
}
