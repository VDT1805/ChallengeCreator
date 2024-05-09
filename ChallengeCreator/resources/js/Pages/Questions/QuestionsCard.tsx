import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/shadcn/ui/card"
  import { Input } from "@/shadcn/ui/input"
  import { Label } from "@/shadcn/ui/label"
  import { Textarea } from "@/shadcn/ui/textarea"
  import {Question} from './QuestionType'
import { useForm } from "@inertiajs/react"
import { PageProps } from "@/types"
import { FormEventHandler, useEffect, useState } from "react"
import { Checkbox } from "@/shadcn/ui/checkbox"
import { Button } from "@/shadcn/ui/button"
import { QB } from "../QuestionBank/QuestionBankType"
  export default function QuestionCard({QBank, MCQs }: {QBank:QB, MCQs:Array<Question>}) {
    const fields = ["ans1", "ans2", "ans3", "ans4", "ans5", "ans6"];
    const [inclusion, setInclusion] = useState(MCQs.map(() => true));
    function handleCheckboxClick(index: number) {
        // setInclusion(inclusion.map((value, i) => i === index ? !value : value));
        let nextInclusion = [...inclusion];
        nextInclusion[index] = !nextInclusion[index];
        console.log(nextInclusion,"Dsk")
        setInclusion(nextInclusion);
        console.log(inclusion,"LFDS")
    }

    function handleChangeData(index: number, changedField: { key: string; value: string }) {
        const nextMCQs = [...data.questions];
        const MCQ: Question = nextMCQs[index];
        const newval = changedField.key === "correct" ? parseInt(changedField.value) : changedField.value;
        (MCQ as any)[changedField.key as keyof Question] = newval;
        nextMCQs[index] = MCQ; // Update the MCQ in the array
        setData('questions',nextMCQs);
        console.log(data.questions, index)
      }
    const { data, setData, post, setDefaults , processing, reset, transform } = useForm<{questions:Array<Question>}>({
        questions: MCQs
      });

      useEffect(() => {
        setData("questions",MCQs);
        setInclusion(inclusion);
      }, [MCQs,inclusion]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        inclusion.map((value, index) => {
            if (!value) {
                transform((data: { questions: Question[]; } ) => {
                        inclusion.forEach((value, index) => {
                            if (!value) {
                                data.questions.splice(index, 1);
                                // console.log(data.questions)
                            }
                        });
                        return data;
                });
            }
        });
        post(route('questions.aistore', QBank.id));
    };
    return (
    <div>
        <form onSubmit={submit}>
        {MCQs.map((MCQ: Question, index) => (
            <Card>
                <CardHeader>
                <CardTitle>Question {index}</CardTitle>
                <CardDescription>
                    {/* {MCQ.question} */}
                    <Input
                            id="question"
                            type="text"
                            className="flex-grow"
                            value={MCQ.question}
                            onChange={(e) => {
                                    handleChangeData(index, {key: "question", value: e.target.value})
                            }}
                    />
                </CardDescription>
                </CardHeader>
                <CardContent>
                <div className="grid gap-6">
                    <div>
                    {fields.map((field, findex) => (
                        <div key={findex} className="grid gap-3 mb-4">
                            <div className="flex items-center gap-3">
                            <Label htmlFor={findex+field} className="mr-3 flex-shrink-0">Answer {findex + 1}</Label>
                            <Input
                                id={findex+field}
                                type="text"
                                className="flex-grow"
                                value={MCQs[index][field as keyof typeof MCQ]}
                                onChange={(e) => {
                                    handleChangeData(index, {key: field, value: e.target.value})
                                }}
                                />
                            <Input
                                id={`${field}Checkbox`}
                                type="checkbox"
                                className="w-5 h-5"
                                checked={MCQ.correct === findex + 1}
                                onChange={() => handleChangeData(index, {key: "correct", value: (findex+1).toString()})}
                            />
                            </div>
                        </div>
                        ))}
                        <div className="flex items-center space-x-2">
                            <Checkbox id ="included" checked = {inclusion[index]} onClick={()=> handleCheckboxClick(index)}></Checkbox>
                            <label htmlFor="included"  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Include this question</label>
                        </div>

                    </div>
                </div>
                </CardContent>
            </Card>
            ))}
            {inclusion.every(value => value === false) ?
            <p>Please choose at least one question to process</p> :
            <Button type='submit'>
              Add questions
            </Button>}

        </form>
    </div>
    )
  }

