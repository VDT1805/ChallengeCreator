import { columns } from "./MemberTable/MemberColumn"
import { DataTable } from "./MemberTable/MemberTable"
import { data } from "./MemberTable/MemberData"
import { Head, Link } from '@inertiajs/react';
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
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shadcn/ui/dialog"
import { Label } from "@/shadcn/ui/label";
import { Copy } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shadcn/ui/select";

export default function MemberIndex({ auth, QBank, members, inviteURL }: PageProps<{ QBank: QB, members: MemberPage, inviteURL: any }>) {
    // console.log(inviteURL);
    // console.log(JSON.stringify(members));
    return (
        <QBLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">All Members</h2>} QBank={QBank} CanEdit={true}>
            <Head title="Members" />
            <div className="py-12 container mx-auto">
                <Card className="mb-5 md:col-start-10 col-span-1 pt-2 shadow-2xl">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold">All members</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-end">
                            {/* <Button onClick={() => { navigator.clipboard.writeText(inviteURL); alert("Link has been copied to clipboard") }}>
                                <PlusIcon className="mr-2" />
                                Share
                            </Button> */}
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button> <Share1Icon className="mr-2" /> Share </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md">
                                    <DialogHeader>
                                        <DialogTitle>Share link</DialogTitle>
                                        <DialogDescription>
                                            Anyone who has this link will be able to view this.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="flex items-center space-x-2">
                                        <div className="grid flex-1 gap-2">
                                            <Label htmlFor="link" className="sr-only">
                                                Link
                                            </Label>
                                            <Input defaultValue={inviteURL} readOnly />
                                        </div>
                                        <Button type="submit" size="sm" className="px-3" onClick={() => { navigator.clipboard.writeText(inviteURL); alert("Link has been copied to clipboard!") }}>
                                            <span className="sr-only">Copy</span>
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <DialogFooter className="sm:justify-start">
                                        <DialogClose asChild>
                                            <Button>
                                                Close
                                            </Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <Separator className="mb-3 mt-2" />
                        <div className="flex items-center gap-2">
                            <Input
                                placeholder="Search for a member..."
                                className="border-2 border-indianred border-solid" />
                            <Select>
                                <SelectTrigger className="w-[180px]" >
                                    <SelectValue placeholder="Role" />
                                </SelectTrigger >
                                <SelectContent>
                                    {members.data.map((member) => (
                                        <SelectItem key={member.role_name} value={member.role_name.toString()}>
                                            {member.role_name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button>
                                Filter
                            </Button>
                        </div>
                    </CardContent>
                    <Accordion type="single" collapsible className="w-full bg-white rounded">
                        {members.data.map((member: MemberType) => (
                            <AccordionItem value={member.id as unknown as string}>
                                <AccordionTrigger className="hover:bg-blue-100 bg-white px-3 rounded">
                                    <div className="flex gap-2 items-center"><PersonIcon />{member.name as string}</div>
                                </AccordionTrigger>
                                <AccordionContent className="bg-white px-3 rounded">
                                    {/* <Separator className="mb-2 mt-2" /> */}
                                    Email: {member.email as string} <br></br>
                                    Role: {member.role_name as string}
                                </AccordionContent>
                            </AccordionItem>
                        )
                        )}
                        <Pagination className="bg-white mt-2 rounded">
                            <PaginationContent className="rounded">
                                <PaginationItem>
                                    <PaginationPrevious href={members.prev_page_url} />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href={members.first_page_url}>1</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext href={members.next_page_url} />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </Accordion>
                </Card>
            </div>
        </QBLayout>
    );
}
