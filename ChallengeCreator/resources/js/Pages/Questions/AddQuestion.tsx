import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
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
import React, { FormEventHandler, useState } from 'react';
import { QB } from '../QuestionBank/QuestionBankType';
import QBLayout from '@/Layouts/QBLayout';
import { LabelType } from '../Label/LabelTable/LabelType';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import InputError from '@/Components/InputError';
import { ToastAction } from "@/shadcn/ui/toast";
import { toast, useToast } from "@/shadcn/ui/use-toast";


export default function AddQuestion({ auth, QBank, labels, sublabels }: PageProps<{ QBank: QB, labels: LabelType[], sublabels: LabelType[] }>) {
  const [position, setPosition] = useState("bottom")
  const [checked, setChecked] = useState(1);
  const params = new URLSearchParams(window.location.search)
  const { data, setData, setDefaults, post, processing, reset, transform } = useForm({
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
const { errors,flash } = usePage().props;
// const { flash } = usePage().props.flash as { flash: {Error: string} };
console.log(flash)

const submit: FormEventHandler = (e) => {
    e.preventDefault();
    if (params.has("testid")) {
        transform((data) => ({
            ...data,
            testid: params.get("testid")
        }))
    }
    post(route('questions.store', QBank.id));
};

  const labelValueChange = (e: string) => {
    router.reload({ only: ['sublabels'], data: { labels: e } })
  }


const config = {
  loader: { load: ["[tex]/html"] },
  tex: {
    packages: { "[+]": ["html"] },
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"]
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"]
    ]
  }
};

return (
  <QBLayout
    user={auth.user}
    header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">New Question</h2>} QBank={QBank} CanEdit={true}>
    <Head title="New Question" />
    <div className="mt-10 mb-10 max-w-7xl mx-auto sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Add Question</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5 mb-5">
                {flash.Error && toast({
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with your request.",
                    })
                }
                <Label htmlFor="question" className="text-xl font-bold">Enter your question</Label>
                <MathJaxContext version={3} config={config}>
                <Textarea
                  id="question"
                  name="question"
                  value={data.question}
                  onChange={(e) => setData('question', e.target.value)}
                  placeholder="Content of your question" />
                  Preview: <MathJax>{data["question"]}</MathJax>
                  <InputError message={errors.question}></InputError>
                  </MathJaxContext>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5 mb-5 mb-3">
              <Label htmlFor="name" className="text-xl font-bold">Add your multiple choice answer options</Label>
              <div className="flex items-center space-x-2">
                <Label
                  htmlFor="ans1"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                ></Label> A.
                <Checkbox checked={checked === 1} onClick={() => {
                  setChecked(1)
                  setData("correct", 1);
                }} />
                <Label
                  htmlFor="ans1"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                ></Label> This answer is correct.
              </div>
              <MathJaxContext version={3} config={config}>
                <Textarea id="ans1" name="ans1" value={data.ans1} onChange={(e) => { setData('ans1', e.target.value) }} placeholder="Content of your answer" />
                Preview: <MathJax>{data["ans1"]}</MathJax>
                {/* "\\(\\frac{10}{4x} \\approx 2^{12}\\)" */}
              </MathJaxContext>
            </div>

            <div className="flex flex-col space-y-1.5 mb-5 mb-3">
              <div className="flex items-center space-x-2">
                <Label
                  htmlFor="ans2"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                ></Label> B.
                <Checkbox checked={checked === 2} onClick={() => {
                  setChecked(2)
                  setData("correct", 2);
                }} />
                <Label
                  htmlFor="ans2"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                ></Label> This answer is correct.
              </div>
              <MathJaxContext>
                <Textarea id="ans2" name="ans2" value={data.ans2} onChange={(e) => { setData('ans2', e.target.value) }} placeholder="Content of your answer" />
                Preview: <MathJax>{data["ans2"]}</MathJax>
              </MathJaxContext>
            </div>

            <div className="flex flex-col space-y-1.5 mb-5 mb-3">
              <div className="flex items-center space-x-2">
                <Label
                  htmlFor="ans3"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                ></Label> C.
                <Checkbox checked={checked === 3} onClick={() => {
                  setChecked(3)
                  setData("correct", 3);
                }} />
                <Label
                  htmlFor="ans3"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                ></Label> This answer is correct.
              </div>
              <MathJaxContext>
                <Textarea id="ans3" name="ans3" value={data.ans3} onChange={(e) => { setData('ans3', e.target.value) }} placeholder="Content of your answer" />
                Preview: <MathJax>{data["ans3"]}</MathJax>
              </MathJaxContext>
            </div>

            <div className="flex flex-col space-y-1.5 mb-5 mb-3">
              <div className="flex items-center space-x-2">
                <Label
                  htmlFor="ans4"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                ></Label> D.
                <Checkbox checked={checked === 4} onClick={() => {
                  setChecked(4)
                  setData("correct", 4);
                }} />
                <Label
                  htmlFor="ans4"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                ></Label> This answer is correct.
              </div>
              <MathJaxContext version={3} config={config}>
                <Textarea id="ans4" name="ans4" value={data.ans4} onChange={(e) => { setData('ans4', e.target.value) }} placeholder="Content of your answer" />
                Preview: <MathJax>{data["ans4"]}</MathJax>
              </MathJaxContext>
            </div>

            <div className="flex flex-col space-y-1.5 mb-5 mb-3">
              <div className="flex items-center space-x-2">
                <Label
                  htmlFor="ans5"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                ></Label> E.
                <Checkbox checked={checked === 5} onClick={() => {
                  setChecked(5)
                  setData("correct", 5);
                }} />
                <Label
                  htmlFor="ans5"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                ></Label> This answer is correct.
              </div>
              <MathJaxContext version={3} config={config}>
                <Textarea id="ans5" name="ans5" value={data.ans5} onChange={(e) => { setData('ans5', e.target.value) }} placeholder="Content of your answer" />
                Preview: <MathJax>{data["ans5"]}</MathJax>
              </MathJaxContext>
            </div>

            <div className="flex flex-col space-y-1.5 mb-5 mb-3">
              <div className="flex items-center space-x-2">
                <Label
                  htmlFor="ans6"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                ></Label> F.
                <Checkbox checked={checked === 6} onClick={() => {
                  setChecked(6)
                  setData("correct", 6);
                }} />
                <Label
                  htmlFor="ans6"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                ></Label> This answer is correct.
              </div>
              <MathJaxContext version={3} config={config}>
                <Textarea id="ans6" name="ans6" value={data.ans6} onChange={(e) => { setData('ans6', e.target.value) }} placeholder="Content of your answer" />
                Preview: <MathJax>{data["ans6"]}</MathJax>
              </MathJaxContext>
            </div>

            <div className="mt-5">
              <div className="text-xl font-bold"><p>Label settings</p></div>
              <Select onValueChange={(e) => labelValueChange(e)}>
                <SelectTrigger className="w-[180px] mb-2" >
                  <SelectValue placeholder="Labels" />
                </SelectTrigger >
                <SelectContent>
                  {labels && labels.map((label) => (
                    <SelectItem key={label.id} value={label.id.toString()}>
                      {label.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {sublabels && (
                <Select onValueChange={(e) => setData("label_id", e)}>
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
              <InputError message={errors.label_id}></InputError>
              <br></br>
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
