import { Head, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import {
  Card,
  CardContent,
} from "@/shadcn/ui/card"
import { Input } from "@/shadcn/ui/input"
import { Label } from "@/shadcn/ui/label"
import { Button } from '@/shadcn/ui/button';
import { Textarea } from '@/shadcn/ui/textarea';
import { Checkbox } from '@/shadcn/ui/checkbox';
import React, { FormEventHandler, useState } from 'react';
import { QB } from '../QuestionBank/QuestionBankType';
import QBLayout from '@/Layouts/QBLayout';
import { TextAnnotate } from "react-text-annotate-blend";
import { Question } from './QuestionType';
import QuestionCard from './QuestionsCard';

export default function AddAIQuestion({ auth, QBank, questions }: PageProps<{ QBank: QB, questions: Array<Question> }>) {
  const [position, setPosition] = useState("bottom")
  const params = new URLSearchParams(window.location.search)
  // console.log(questions)

  const { data, setData, post, setDefaults, processing, reset, transform } = useForm<{ context: string, answers: Array<{} | null>, numberofquestions: number }>({
    context: "",
    answers: [],
    numberofquestions: 1,
  });


  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event: any) => {
    if (!isChecked) {
      //Don't use AC
      setData("answers", [{ start: 0, end: 0, tag: "AnswerCandidate", text: "[MASK]" }]);
      setData(data => ({ ...data, numberofquestions: data.answers.length }));
    }
    else {
      setData(data => ({ ...data, answers: [] }));
      setData(data => ({ ...data, numberofquestions: 1 }));
    }

    setIsChecked(!isChecked);
  };


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

  const TEXT =
    "When Sebastian Thrun started working on self-driving cars at Google in 2007, few people outside of the company took him seriously. “I can tell you very senior CEOs of major American car companies would shake my hand and turn away because I wasn't worth talking to,” said Thrun, now the co-founder and CEO of online higher education startup Udacity, in an interview with Recode earlier this week. A little less than a decade later, dozens of self-driving startups have cropped up while automakers around the world clamor, wallet in hand, to secure their place in the fast-moving world of fully automated transportation.";

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    if (params.has("testid")) {
      transform((data) => ({
        ...data,
        testid: params.get("testid")
      }))
    }
    post(route('questions.aigen', QBank.id));
  };

  const [tag, setTag] = React.useState("AnswerCandidate");
  const COLORS = {
    AnswerCandidate: "rgb(179, 245, 66)",
  };

  return (
    <QBLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Question Generation (Powered by AI)</h2>} QBank={QBank} CanEdit={true}>
      <Head title="Create question with AI!" />
      <div className="mt-10 mb-10 max-w-7xl mx-auto sm:px-6 lg:px-8">
        <Card>
          <CardContent className='mt-10'>
            <form onSubmit={submit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5 mb-5">
                  <Label htmlFor="question" className="text-xl font-bold">Input your context here</Label>
                  <Textarea
                    placeholder="Context"
                    className='w-full h-52'
                    value={data.context}
                    onChange={(e) => { setData("context", e.target.value) }} />
                </div>

                <div className="flex flex-col space-y-1.5 mb-5 mb-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox onClick={handleCheckboxChange} />
                    <Label
                      htmlFor="ans6"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Only generate questions
                    </Label>
                  </div>
                </div>

                {
                  isChecked ?
                    <Input type="number" max="5" min="1" placeholder='Number of questions (maximum 5)' onChange={(e) => {
                      setData("numberofquestions", parseInt(e.target.value))
                    }} /> :
                    <div>
                      <h4> Preview: (Drag to highlight the answer candidates in the context, click on the highlighed areas to cancel)</h4>
                      <br></br>
                      <TextAnnotate
                        style={{
                          fontSize: "1.2rem",
                        }}
                        content={data.context}
                        onChange={
                          (value: { start: number; end: number; tag: string; text: string }[] | React.FormEvent<HTMLDivElement>) => {
                            if (Array.isArray(value)) {
                              setData("answers", value);
                            }
                          }
                        }
                        value={data.answers as { start: number; end: number; tag: string; text: string; }[]}
                        getSpan={(span) => ({
                          ...span,
                          tag: "Answer Candidate",
                          color: COLORS[tag as keyof typeof COLORS],
                        })}
                      />
                    </div>
                }

                <Button type='submit'>
                  Generate question
                </Button>

              </div>
            </form>

            {
              questions && <QuestionCard QBank={QBank} MCQs={questions}></QuestionCard>
            }

          </CardContent>
        </Card>
      </div >
    </QBLayout >
  );
}
