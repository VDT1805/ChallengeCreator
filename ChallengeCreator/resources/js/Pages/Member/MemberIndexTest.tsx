import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { QB } from "../QuestionBank/QuestionBankType";
import QBLayout from "@/Layouts/QBLayout";
import { MemberPage, MemberType } from "./MemberTable/MemberType";
import { Card, CardContent, CardHeader, CardTitle } from '@/shadcn/ui/card';
import { Button } from "@/shadcn/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shadcn/ui/accordion';
import { PersonIcon, Share1Icon } from '@radix-ui/react-icons';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/shadcn/ui/pagination';
import { Separator } from '@/shadcn/ui/separator';
import { Input } from "@/shadcn/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shadcn/ui/dialog"
import { Copy } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shadcn/ui/select";
import { MemberTable } from './MemberTable/MemberTable';
import { MemberColumns } from './MemberTable/MemberColumn';

export default function MemberIndex({ auth, QBank, members, editorURL, viewerURL }: PageProps<{ QBank: QB, members: MemberPage, editorURL: string, viewerURL: string }>) {
    // console.log(inviteURL);
    // console.log(JSON.stringify(members.data));
    return (
        <QBLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">All Members</h2>} QBank={QBank} CanEdit={true}>
            <Head title="Members" />
            <div className="py-12 container mx-auto">
                <Card className="mb-5 md:col-start-10 col-span-1 pt-2">
                    <CardContent>
                        {/* <div className="flex justify-end">
                            <Button onClick={() => { navigator.clipboard.writeText(inviteURL); alert("Link has been copied to clipboard") }}>
                                <PlusIcon className="mr-2" />
                                Share
                            </Button>
                        </div> */}

                        <Separator className="mb-3 mt-2" />

                        <div className=" items-center gap-2">
                            <div className="flex justify-end">
                                {/* {
                                            changeLog.length > 0 &&
                                            UpdateDialog(changeLog)
                                        } */}
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button> <Share1Icon className="mr-2" /> Share </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogTitle>INVITE COLLABORATORS</DialogTitle>
                                        <DialogHeader className="mt-3">
                                            <DialogDescription>
                                                <b className="text-bluegreen">Anyone with this link will be able to VIEW this Question Bank:</b>
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="flex items-center justify-center space-x-2 -my-2">
                                            <Input className="focus:border-bluegreen border-2" defaultValue={viewerURL} readOnly />
                                            <Button type="submit" size="sm" className="px-3" onClick={() => { navigator.clipboard.writeText(viewerURL); alert("Copied link to clipboard!") }}>
                                                <span className="sr-only">Copy</span>
                                                <Copy className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <DialogHeader>

                                            <DialogDescription>
                                                <b className="text-indianred">Anyone with this link will be able to EDIT this Question Bank:</b>
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="flex items-center space-x-2 -my-2">
                                            <Input className="focus:border-indianred border-2" defaultValue={editorURL} readOnly />
                                            <Button type="submit" size="sm" className="px-3" onClick={() => { navigator.clipboard.writeText(editorURL); alert("Link has been copied to clipboard!") }}>
                                                <span className="sr-only">Copy</span>
                                                <Copy className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>

                            <Separator className="mb-3 mt-2" />

                            <div className="flex items-center gap-2">
                                <Input
                                    // onChange={(e) => setQuery(prevQuery => ({
                                    //     ...prevQuery,
                                    //     ["keyword"]: e.target.value
                                    // }))}
                                    placeholder="Search for a member..."
                                    className="border-2 border-blue-500 border-solid" />
                                {/* <div className="flex items-center"><DropdownMenu>
            <DropdownMenuTrigger className="flex gap-2">
              <ArrowUpDown className="ml-2 h-4 w-4 mt-1" />
              Sort By: {
                sortState
              }
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => { table.getColumn("questiontype")?.toggleSorting(table.getColumn("questiontype")?.getIsSorted() === "asc"); setSortState("Alphabetical") }}>Alphabetical</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </div> */}
                                <Button>Search</Button>
                                <Button variant={"destructive"}>Clear search</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <MemberTable columns={MemberColumns(QBank)} data={members.data}></MemberTable>
            </div>
        </QBLayout>
    );
}
