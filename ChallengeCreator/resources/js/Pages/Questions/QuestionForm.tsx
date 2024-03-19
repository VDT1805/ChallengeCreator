import { Head, router, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shadcn/ui/card"
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
import React, { FormEventHandler, useEffect } from 'react';
import { QB } from '../QuestionBank/QuestionBankType';
import QBLayout from '@/Layouts/QBLayout';
import { LabelType } from '../Label/LabelTable/LabelType';
import { Question } from './QuestionType';

export default function QuestionForm({ auth, QBank, labels, sublabels, currLabel, currSublabel, question }: PageProps<{ QBank: QB, labels: LabelType[], sublabels: LabelType[], currLabel: LabelType, currSublabel: LabelType, question: Question }>) {
  console.log(question.correct);
  const [position, setPosition] = React.useState("bottom")
  const [checked, setChecked] = React.useState(question.correct);
  const { data, setData, setDefaults, post, processing, errors, reset, put } = useForm({
    question: "",
    ans1: "",
    ans2: "",
    ans3: "",
    ans4: "",
    ans5: "",
    ans6: "",
    correct: 1,
    label_id: ""
  });

  useEffect(() => {
    setData({
      question: question.question,
      ans1: question.ans1,
      ans2: question.ans2,
      ans3: question.ans3,
      ans4: question.ans4,
      ans5: question.ans5,
      ans6: question.ans6,
      correct: 1,
      label_id: currLabel.id.toString()
    })
  }, []);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    put(route('questions.update', [QBank.id, question.id]));
  };

  const labelValueChange = (e: string) => {
    router.reload({ only: ['sublabels'], data: { parent: e } })
  }
  return (
    <QBLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Question</h2>} QBank={QBank} CanEdit={true}>
      <Head title="Edit Question" />
      <div className="mt-10 mb-10 max-w-7xl mx-auto sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Edit Question</CardTitle>
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
                    id="question"
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
                  <Checkbox checked={checked == 1} onClick={() => {
                    setChecked(1)
                    setData("correct", 1);
                  }} />
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
                  <Checkbox checked={checked == 2} onClick={() => {
                    setChecked(2)
                    setData("correct", 2);
                  }} />
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
                  <Checkbox checked={checked == 3} onClick={() => {
                    setChecked(3)
                    setData("correct", 3);
                  }} />
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
                  <Checkbox checked={checked == 4} onClick={() => {
                    setChecked(4)
                    setData("correct", 4);
                  }} />
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
                  <Checkbox checked={checked == 5} onClick={() => {
                    setChecked(5)
                    setData("correct", 5);
                  }} />
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
                  <Checkbox checked={checked == 6} onClick={() => {
                    setChecked(6)
                    setData("correct", 6);
                  }} />
                  <Label
                    htmlFor="ans6"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  ></Label> This answer is correct.
                </div>
                <Textarea id="ans6" name="ans6" value={data.ans6} onChange={(e) => setData('ans6', e.target.value)} placeholder="Content of your answer" />
              </div>

              <div className="mt-5">
                <div className="text-xl font-bold"><p>Label settings</p></div>
                <Select onValueChange={(e) => labelValueChange(e)}>
                  <SelectTrigger className="w-[180px]" >
                    <SelectValue placeholder={currLabel.name} />
                  </SelectTrigger >
                  <SelectContent>
                    {labels && labels.map((label) => (
                      <SelectItem
                        aria-selected={label.id === currLabel.id}
                        key={label.id}
                        value={label.id.toString()}
                      >
                        {label.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <br></br>
                {
                  sublabels && (
                    <Select onValueChange={(e) => setData("label_id", e)}>
                      <SelectTrigger className="w-[180px]" >
                        <SelectValue placeholder={currSublabel.name} />
                      </SelectTrigger >
                      <SelectContent>
                        {sublabels.map((sublabel) => (
                          <SelectItem
                            aria-selected={sublabel.id === currLabel.id}
                            key={sublabel.id} value={sublabel.id.toString()}>
                            {sublabel.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )
                }
                <br></br>
              </div>
              <Button type='submit'>
                Save edited question
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </QBLayout>
  );
}
