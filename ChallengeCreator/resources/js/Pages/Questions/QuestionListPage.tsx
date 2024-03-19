import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Button } from "@/shadcn/ui/button";
import { QB } from "../QuestionBank/QuestionBankType";
import { QPage, Question } from "./QuestionType";
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
import {
  Card,
  CardContent,
  CardHeader,
} from "@/shadcn/ui/card"
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

// export function getParameterByName(name: string) {
//     const uri = window.location.search
//     const match = RegExp('[?&]' + name + '=([^&]*)').exec(uri)
//     return match && decodeURIComponent(match[1].replace(/\+/g, ' '))
// }


export default function QuestionList({ auth, QBank, questions, labels, sublabels }: PageProps<{ QBank: QB, questions: QPage, labels: LabelType[], sublabels: LabelType[] }>) {
  const [query, setQuery] = useState<Record<string, string>>({});
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

  return (
    <QBLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">All Questions</h2>} QBank={QBank} CanEdit={true}>
      <Head title="Questions" />
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
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Separator className="mb-3 mt-2" />
            <div className="flex items-center gap-2">
              {/* <Input
                onChange={(e) => setQuery(prevQuery => ({
                  ...prevQuery,
                  ["keyword"]: e.target.value
                }))}
                placeholder="Search for a question..."
                className="border-2 border-blue-500 border-solid" /> */}
              <MathJaxContext>
                <h2>Basic MathJax example with Latex</h2>
                <MathJax>{"\\(\\frac{10}{4x} \\approx 2^{12}\\)"}</MathJax>
              </MathJaxContext>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Alphabetical">Alphabetical</SelectItem>
                  <SelectItem value="Last Updated">Last Updated</SelectItem>
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
                <AccordionItem value={question.id as unknown as string}>
                  <AccordionTrigger className="hover:bg-blue-100 bg-white px-3">
                    <div className="flex gap-2 items-center"><FileIcon />{question.question as string}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="bg-white px-3">
                    <p>Created at: {question.created_at}</p>
                    <p>Updated at: {question.updated_at}</p>
                    <Separator className="mb-2 mt-2" />
                    {/* <p>Answer 1: {question.ans1}</p>
                <p>Answer 2: {question.ans2}</p>
                <p>Answer 3: {question.ans3}</p>
                <p className="flex gap-2 font-bold items-center text-green-500">Answer 4: {question.ans4} <CheckCircledIcon /> </p>
                <p>Answer 5: {question.ans5}</p>
                <p>Answer 6: {question.ans6}</p> */}
                    {answers && answers.map((answer, index) => (
                      answer && <p key={index}>Answer {index + 1}: {answer}</p>
                    ))}
                    <Separator className="mb-2 mt-2" />
                    <div className="flex gap-4">
                      <Link href={route('questions.edit', [question.question_bank_id, question.id])} method="get">
                        <Button className='bg-bluegreen text-white font-bold rounded-t px-4 py-2'>
                          Edit question
                        </Button>
                      </Link>
                      <Link href={route('questions.destroy', [question.question_bank_id])} method='delete' data={{ qID: question.id }}>
                        <Button className='bg-red-500 text-white font-bold rounded-t px-4 py-2'>
                          Delete question
                        </Button>
                      </Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            }
            )}
          <Pagination className="bg-white mt-2">
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
          </Pagination>
        </Accordion>
      </div>
    </QBLayout>
  );
}
