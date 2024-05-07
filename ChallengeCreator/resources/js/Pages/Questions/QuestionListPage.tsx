import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Button } from "@/shadcn/ui/button";
import { QB } from "../QuestionBank/QuestionBankType";
import { QPage, Question, QuestionEvent } from "./QuestionType";
import { CheckCircledIcon, FileIcon, FilePlusIcon, PlusIcon, ShuffleIcon, UpdateIcon } from "@radix-ui/react-icons";
// import { PlusIcon } from "lucide-react";
import QBLayout from "@/Layouts/QBLayout";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/ui/select"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/shadcn/ui/pagination";
import { Separator } from "@/shadcn/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shadcn/ui/accordion"
import { Input } from "@/shadcn/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shadcn/ui/dropdown-menu';
import { router } from '@inertiajs/react'
import { FormEventHandler, SetStateAction, useEffect, useState } from 'react';
import { LabelProps } from '@radix-ui/react-label';
import { LabelType } from '../Label/LabelTable/LabelType';
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
import { Label } from "@/shadcn/ui/label"
import { Badge } from "@/shadcn/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shadcn/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/ui/table"
import { PaginationProp } from '../pagination';

function EventTable({changeLog}: {changeLog: QuestionEvent[]}) {
    return (
        <Card>
            {/* <CardHeader className="px-7">
                <CardTitle>Orders</CardTitle>
                <CardDescription>Recent orders from your store.</CardDescription>
            </CardHeader> */}
            <CardContent>
                <div className="overflow-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableCell >Question Target</TableCell>
                                <TableHead className="hidden sm:table-cell">Type</TableHead>
                                <TableHead className="hidden md:table-cell">Date</TableHead>
                                <TableHead className="text-right">Author</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {changeLog.length > 0 && changeLog.map((event: QuestionEvent) => {
                                    return (
                            <TableRow className="bg-accent">
                                    <TableCell className="font-medium">{event.question.question}</TableCell>
                                    <TableCell className="hidden sm:table-cell">{event.type}</TableCell>
                                    <TableCell className="hidden md:table-cell">{formatTime(event.question.created_at)}</TableCell>
                                    <TableCell className="text-right">{event.author}</TableCell>
                            </TableRow>)
                            })}

                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    )
}
function formatTime(time: string): string {
    const date = new Date(time);
    return date.toLocaleString();
}
function UpdateDialog(changeLog: QuestionEvent[]) {
    return (
      <Dialog>
        <DialogTrigger asChild>
            <p className="text-start">
                Updated at: {changeLog[changeLog.length-1].question.created_at}
            </p>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Update Log</DialogTitle>
            <DialogDescription>
              Logs of every update made to the question bank by users.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
                <EventTable changeLog = {changeLog}/>
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

export default function QuestionList({ auth, QBank, questions, labels, sublabels }: PageProps<{ QBank: QB, questions: QPage, labels: LabelType[], sublabels: LabelType[] }>) {
  console.log(questions)
  const [query, setQuery] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(questions.current_page);
  const [itemsPerPage, setItemsPerPage] = useState(questions.per_page);
  const lastItemIndex =  currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const filter: FormEventHandler = (e) => {
    e.preventDefault();
    router.get(route('questions.index', QBank.id), query, { preserveState: true, preserveScroll: true });
  };
  const [selectedValue, setSelectedValue] = useState(Array<LabelType>);

  const labelValueChange = (e: string) => {
    setQuery(prevQuery => ({
      ...prevQuery,
      ["labels"]: e
    }));
    router.reload({ only: ['sublabels'], data: { labels: e } })
  }

const [changeLog, setChangeLog] = useState<QuestionEvent[]>([]);
var currentdate = new Date();

useEffect(() => {
    const name = `qb.${QBank.id}.question`;
    const privateChannel = window.Echo.private(name);
    privateChannel.listen('QuestionEvent', (e:QuestionEvent) => {
            console.log(e);
            setChangeLog(prevState => [...prevState, e]);
    });

},[]);

return (
    <QBLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">All Questions</h2>} QBank={QBank} CanEdit={true}>
        <Head title="Questions" />
        <div className="py-12 container mx-auto">
            <Card className="mb-5 md:col-start-10 col-span-1 pt-5">
                <CardContent>
                    <div className="flex justify-end">
                        {
                            changeLog.length > 0 &&
                            UpdateDialog(changeLog)
                        }
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button><PlusIcon className="mr-3" />Add question</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>
                                    <PlusIcon className="mr-2" />
                                    <Link href={route('questions.create', [QBank.id])}>
                                        Add a new question
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <FilePlusIcon className="mr-2" />
                                    <Link href={route('questions.importForm', [QBank.id])}>
                                        Import file
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <PlusIcon className="mr-2" />
                                    <Link href={route('questions.aicreate', [QBank.id])}>
                                        Add questions using AI!
                                    </Link>
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
                            placeholder="Search for a question..."
                            className="border-2 border-blue-500 border-solid" />
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Oldest">Alphabetical</SelectItem>
                                <SelectItem value="Newest">Last Updated</SelectItem>
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

                        {
                            sublabels && (
                                <Select onValueChange={(e) => setQuery(prevQuery => ({
                                    ...prevQuery,
                                    ["sublabels"]: e
                                }))}>
                                    <SelectTrigger className="w-[180px]" >
                                        <SelectValue placeholder="Sublabels" />
                                    </SelectTrigger >
                                    <SelectContent>
                                        {sublabels.map((sublabels) => (
                                            <SelectItem key={sublabels.id} value={sublabels.id.toString()}>
                                                {sublabels.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )
                        }
                        <Button onClick={filter}>
                            Filter
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <Accordion type="single" collapsible className="w-full shadow-2xl bg-white">
                {questions.data &&
                    questions.data.map((question: Question) => {
                        const answers = [
                            question.ans1,
                            question.ans2,
                            question.ans3,
                            question.ans4,
                            question.ans5,
                            question.ans6
                        ];
                        return (
                            <MathJaxContext>
                                <AccordionItem value={question.id as unknown as string}>
                                    <AccordionTrigger className="hover:bg-blue-100 bg-white px-3">
                                        <div className="flex gap-2 items-center">
                                            <FileIcon /><MathJax>{question.question as string}</MathJax>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="bg-white px-3">
                                        <p>Created at: {question.created_at}</p>
                                        <p>Updated at: {question.updated_at}</p>
                                        <Separator className="mb-2 mt-2" />
                                        {
                                            answers && answers.map((ans, idx) => {
                                                var correct = question.correct;
                                                if (idx + 1 == correct) {
                                                    return <MathJax><p key={idx} className="flex gap-2 font-bold items-center text-green-500">Answer {idx + 1}: {ans}<CheckCircledIcon /> </p></MathJax>
                                                    // return <p key={correct} className="flex gap-2 font-bold items-center text-green-500">Answer {idx + 1}: {ans}<CheckCircledIcon /> </p>
                                                }
                                                else {
                                                    return <MathJax><p key={idx} className="flex gap-2">Answer {idx + 1}: {ans}</p></MathJax>
                                                }
                                            })
                                        }
                                        <Separator className="mb-2 mt-2" />
                                        <div className="flex gap-4">
                                            <Link href={route('questions.edit', [question.question_bank_id, question.id])} method="get" as="button">
                                                <Button className='bg-bluegreen text-white font-bold rounded-t px-4 py-2'>
                                                    Edit question
                                                </Button>
                                            </Link>
                                            <Link href={route('questions.destroy', [question.question_bank_id])} method='delete' data={{qID: question.id }} as="button">
                                                <Button className='bg-red-500 text-white font-bold rounded-t px-4 py-2'>
                                                    Delete question
                                                </Button>
                                            </Link>
                                            {/* <Link href={route('questions.destroy', [question.question_bank_id,question.id])} method='delete' as="button">
                                                <Button className='bg-red-500 text-white font-bold rounded-t px-4 py-2'>
                                                    Delete question
                                                </Button>
                                            </Link> */}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </MathJaxContext>
                        );
                    }
                    )}
                {/* <Pagination className="bg-white mt-2">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href={questions.prev_page_url} />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href={questions.first_page_url}>1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href={questions.next_page_url} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination> */}
                <PaginationProp
                totalPosts={questions.total}
                postsPerPage={itemsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                next_url={questions.next_page_url}
                prev_url={questions.prev_page_url}
                links={questions.links.slice(1,-1)}/>
            </Accordion>
        </div>
    </QBLayout>
);
}
