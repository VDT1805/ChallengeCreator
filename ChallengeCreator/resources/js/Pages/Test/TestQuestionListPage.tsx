import { Head, Link, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Button } from "@/shadcn/ui/button";
import { QB } from "../QuestionBank/QuestionBankType";
import { QPage, Question } from "../Questions/QuestionType";
// import { PlusIcon } from "lucide-react";
import QBLayout from "@/Layouts/QBLayout";
import {
  Select,
  SelectContent,
  SelectItem,
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
import { CheckCircledIcon, ChevronLeftIcon, FileIcon, PlusIcon } from "@radix-ui/react-icons";
import { Test } from "./TestTable/TestType";
import { FormEventHandler, useState } from 'react';
import { LabelType } from '../Label/LabelTable/LabelType';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { formatTime } from '../Questions/formatTime';

export default function QuestionList({ auth, QBank, questions, test, labels }: PageProps<{ QBank: QB, questions: QPage, test: Test, labels: LabelType[] }>) {
  const [query, setQuery] = useState<Record<string, string>>({});
    const [currentPage, setCurrentPage] = useState(questions.current_page);
    const [itemsPerPage, setItemsPerPage] = useState(questions.per_page);
    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const [isFiltered, setIsFiltered] = useState(false);
    const [sublabels, setSublabels] = useState<LabelType[]>([]);
    const filter: FormEventHandler = (e) => {
        e.preventDefault();
        router.get(route('tests.indexQuestion', [QBank.id,test.id]), query, { preserveState: true, preserveScroll: true });
        setIsFiltered(true);
    };

    const labelValueChange = (e: string) => {
      setQuery(prevQuery => ({
          ...prevQuery,
          ["labels"]: e
      }));
  }
  return (
    <QBLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">All Questions</h2>} QBank={QBank} CanEdit={true}>
      <Head title="Questions" />
      <div className="py-12">
        <div className="container mx-auto">
          <Card className="mb-5 md:col-start-10 col-span-1 pt-2">
            <CardContent>
            <Link href={route('tests.show', [test.question_bank_id, test.id])} className="flex items-center gap-2">
                  <ChevronLeftIcon/> Return to the test {test.name}
              </Link>
              <Link href={route('questions.create', QBank.id)} className="flex justify-end">
                <Button>
                  <PlusIcon className="mr-3" /> Add question
                </Button>
              </Link>
              <Separator className="mb-3 mt-2" />
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Search for a question..."
                  className="border-2 border-blue-500 border-solid" />
                {
                  labels &&
                    <Select onValueChange={(e) => {
                      const labelId = parseInt(e); // Convert e to a number
                      labelValueChange(labelId.toString()); // Convert labelId back to a string
                      setSublabels(labels.find((label) => label.id === labelId)?.sublabels || []);
                    }}>
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
                }
                

                            {
                                sublabels.length > 0 && (
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
            {questions.data.map((question: Question) => 
            {
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
                <AccordionItem  value={question.id as unknown as string}>
                {question.inTest == true ?
                  <AccordionTrigger className="flex hover:bg-blue-100 bg-green-300 px-3">
                    <div className="flex gap-2 items-center"><FileIcon />
                    <MathJax>{question.question as string}</MathJax>
                    </div>
                  </AccordionTrigger>
                  :
                  <AccordionTrigger className="hover:bg-blue-100 bg-white px-3">
                    <div className="flex gap-2 items-center"><FileIcon />{question.question as string}
                    </div>
                  </AccordionTrigger>
                }
                <AccordionContent className="bg-white px-3">
                <p>Created at: {formatTime(question.created_at)}</p>
                                            <p>Updated at: {formatTime(question.updated_at)}</p>
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
                    {question.inTest == true ?
                      <Link href={route('tests.detachQuestion', [QBank.id, test.id])} method="put" data={{qID: question.id}}>
                        <p className="text-lg font-bold underline text-indianred">Delete from test</p>
                        </Link>
                      :
                      <Link href={route('tests.attachQuestion', [QBank.id, test.id])} method="post" data={{qID: question.id}}>
                        <Button>
                          Add question to Test
                        </Button>
                      </Link>
                    }
                  </div>
                </AccordionContent>
              </AccordionItem>
              </MathJaxContext>
              
            )}
            )
          }
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
      </div>
    </QBLayout>
  );
}
