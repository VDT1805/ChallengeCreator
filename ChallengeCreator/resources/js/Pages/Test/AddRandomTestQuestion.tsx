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
import React, { FormEventHandler } from 'react';
import { Menu } from '../Menu';
import { QB } from '../QuestionBank/QuestionBankType';
import QBLayout from '@/Layouts/QBLayout';
import { LabelType } from '../Label/LabelTable/LabelType';
import InputError from '@/Components/InputError';

export default function AddRandomTestQuestion({ auth, QBank, labels }: PageProps<{ QBank: QB, labels: LabelType[] }>) {
  console.log(labels[0].sublabels);
  const [position, setPosition] = React.useState("bottom")
  const { data, setData, post, processing, errors, reset, transform } = useForm({
    name: ""
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('tests.randstore', QBank.id));
  };

  return (
    <QBLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add Random Questions</h2>} QBank={QBank} CanEdit={true}>
      <Head title="Add Random Questions" />
      <div className="mt-10 mb-10 max-w-7xl mx-auto sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Add random questions</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit}>
            <div className="grid w-full items-center gap-2">
                                    <Label htmlFor="name" className="text-xl font-bold">Test name</Label>
                                    <Input id="name"
                                        type="name"
                                        name="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Name of your test"
                                        className="mb-5" />
                                    {errors.name && <InputError message={errors.name}></InputError>}
               </div>
              <div className="flex flex-col space-y-1.5 mb-5 mb-3">

                {labels.map((label) => (
                        <div>
                        {label.sublabels!.map((sublabel) => (
                            <div className="flex items-center space-x-2">
                            <Label htmlFor="name" className="text-xl font-bold">{label.name} &gt; {sublabel.name}</Label>
                            <Input
                                type='number'
                                max={sublabel.questions_count}
                                min={0}
                                inputMode='numeric'
                                onChange={(e) => {
                                    const value = Number(e.target.value); // Convert value to a number
                                    if (value > Number(sublabel.questions_count)) {
                                        e.target.value = sublabel.questions_count!.toString();
                                    }
                                    if (value != 0) {
                                        transform((data) => ({
                                            ...data,
                                            [sublabel.id]: e.target.value
                                        }))
                                    }
                                }}
                                placeholder="Number of questions"
                            />
                            <Label> {sublabel.questions_count} available </Label>
                        </div>
                        ))}
                    </div>

                ))}

                {/* <Label htmlFor="name" className="text-xl font-bold">Order</Label>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Order of random" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value="random">In random order</SelectItem>
                      <SelectItem value="grouplabel">Grouped by Label</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Put the questions..." />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value="mixed">Randomly in the test</SelectItem>
                      <SelectItem value="teststart">At the start of the test</SelectItem>
                      <SelectItem value="testend">At the end of the test</SelectItem>
                  </SelectContent>
                </Select> */}

              </div>
              <Button type='submit'>
                Add random questions
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </QBLayout>
  );
}
