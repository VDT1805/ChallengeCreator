import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shadcn/ui/card"
import { Input } from "@/shadcn/ui/input"
import { Label } from "@/shadcn/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/ui/select"
import { Button } from '@/shadcn/ui/button';
import { Textarea } from '@/shadcn/ui/textarea';
import { Checkbox } from '@/shadcn/ui/checkbox';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/shadcn/ui/dialog"



import React, { FormEventHandler } from 'react';
import { Menu } from '../Menu';
import { QB } from '../QuestionBank/QuestionBankType';
import QBLayout from '@/Layouts/QBLayout';
import { Question } from './QuestionType';


export default function QuestionEdit({ auth, QBank, question }: PageProps<{ QBank: QB, question: Question }>) {
  const [position, setPosition] = React.useState("bottom")
  const { data, setData, setDefaults, post, processing, errors, reset } = useForm({
        question: question.question,
        ans1: question.ans1,
        ans2: question.ans2,
        ans3: question.ans3,
        ans4: question.ans4,
        ans5: question.ans5,
        ans6: question.ans6,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('questions.store',QBank.id));
    };
  return (
    <QBLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">New Question</h2>} QBank={QBank} CanEdit={true}>
      <Head title="New Question" />
      <div className="mt-10 mb-10 max-w-7xl mx-auto sm:px-6 lg:px-8">
      {/* <Menu QBank={QBank} CanEdit={undefined}></Menu> */}
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Add Question</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit}>
              <div className="grid w-full items-center gap-4">
                {/* <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name" className="text-xl font-bold">Question name</Label>
                  <Input id="name" placeholder="Name of your question" />
                </div> */}
                <div className="flex flex-col space-y-1.5 mb-5">
                  <Label htmlFor="question" className="text-xl font-bold">Enter your question</Label>
                  <Textarea
                  id = "question"
                  name="question"
                  value={data.question}
                  onChange={(e) => setData('question', e.target.value)}
                  placeholder="Content of your question" />
                </div>
              </div>
              {/* {
                ans.map(kv => (
                    <div className="flex flex-col space-y-1.5 mb-5 mb-3">
                        <Label htmlFor="name" className="text-xl font-bold">Add your multiple choice answer options</Label>
                        <div className="flex items-center space-x-2">
                        <Label
                            htmlFor= {kv.key}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        ></Label>
                        <Checkbox />
                        <Label
                            htmlFor={kv.key}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        ></Label> This answer is correct.
                        </div>
                        <Textarea id={kv.value} name={kv.value} value={data[kv.value as keyof typeof data]} onChange={(e) => setData(kv.value, e.target.value)} placeholder="Content of your answer" />
                    </div>
                ))
              } */}
              <div className="flex flex-col space-y-1.5 mb-5 mb-3">
                <Label htmlFor="name" className="text-xl font-bold">Add your multiple choice answer options</Label>
                <div className="flex items-center space-x-2">
                  <Label
                    htmlFor="ans1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  ></Label> A.
                  <Checkbox />
                  <Label
                    htmlFor="ans1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  ></Label> This answer is correct.
                </div>
                <Textarea id="ans1" name="ans1" value={data.ans1} onChange={(e) => setData('ans1', e.target.value)} placeholder="Content of your answer" />
              </div>

              <div className="flex flex-col space-y-1.5 mb-5 mb-3">
                <div className="flex items-center space-x-2">
                  <Label
                    htmlFor="ans2"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  ></Label> B.
                  <Checkbox />
                  <Label
                    htmlFor="ans2"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  ></Label> This answer is correct.
                </div>
                <Textarea id="ans2" name="ans2" value={data.ans2} onChange={(e) => setData('ans2', e.target.value)} placeholder="Content of your answer" />
              </div>

              <div className="flex flex-col space-y-1.5 mb-5 mb-3">
                <div className="flex items-center space-x-2">
                  <Label
                    htmlFor="ans3"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  ></Label> C.
                  <Checkbox />
                  <Label
                    htmlFor="ans3"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  ></Label> This answer is correct.
                </div>
                <Textarea id="ans3" name="ans3" value={data.ans3} onChange={(e) => setData('ans3', e.target.value)} placeholder="Content of your answer" />
              </div>

              <div className="flex flex-col space-y-1.5 mb-5 mb-3">
                <div className="flex items-center space-x-2">
                  <Label
                    htmlFor="ans4"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  ></Label> D.
                  <Checkbox />
                  <Label
                    htmlFor="ans4"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  ></Label> This answer is correct.
                </div>
                <Textarea id="ans4" name="ans4" value={data.ans4} onChange={(e) => setData('ans4', e.target.value)} placeholder="Content of your answer" />
              </div>

              <div className="flex flex-col space-y-1.5 mb-5 mb-3">
                <div className="flex items-center space-x-2">
                  <Label
                    htmlFor="ans5"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  ></Label> E.
                  <Checkbox />
                  <Label
                    htmlFor="ans5"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  ></Label> This answer is correct.
                </div>
                <Textarea id="ans5" name="ans5" value={data.ans5} onChange={(e) => setData('ans5', e.target.value)} placeholder="Content of your answer" />
              </div>

              <div className="flex flex-col space-y-1.5 mb-5 mb-3">
                <div className="flex items-center space-x-2">
                  <Label
                    htmlFor="ans6"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  ></Label> F.
                  <Checkbox />
                  <Label
                    htmlFor="ans6"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  ></Label> This answer is correct.
                </div>
                <Textarea id="ans6" name="ans6" value={data.ans6} onChange={(e) => setData('ans6', e.target.value)} placeholder="Content of your answer" />
              </div>

              <div className="mt-5">
                <div className="text-xl font-bold"><p>Category settings</p></div>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Choose your label" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value='L.0.1' >L.0.1</SelectItem>
                    <SelectItem value='L.0.2' >L.0.2</SelectItem>
                    <SelectItem value='L.0.3' >L.0.3</SelectItem>
                    <SelectItem value='L.0.4' >L.0.4</SelectItem>
                    <SelectItem value='L.0.5' >L.0.5</SelectItem>
                  </SelectContent>
                </Select>
                <div className="mt-3 mb-3">
                  <div className="text-xl font-bold"><p>Score settings</p></div>
                  <Input id="score" placeholder="Question score" className='w-1/6' />
                </div>
              </div>
              <Button type='submit'>
                  Add question
            </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </QBLayout>
  );
}