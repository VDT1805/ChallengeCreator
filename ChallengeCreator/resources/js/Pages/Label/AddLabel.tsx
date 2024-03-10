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
import { LabelType } from './LabelTable/LabelType';
import { QB } from '../QuestionBank/QuestionBankType';
import QBLayout from '@/Layouts/QBLayout';


export default function Dashboard({ auth, QBank, labels }: PageProps<{ QBank: QB, labels: LabelType[] }>) {
  const [position, setPosition] = React.useState("bottom")
  const { data, setData, setDefaults, post, processing, errors, reset } = useForm({
    name: "",
    description: "",
    label_id: ""
  });
  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('labels.store', QBank.id));
  };
  return (
    <QBLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">New Category/Subcategory</h2>} QBank={QBank} CanEdit={true}>
      <Head title="New Category/Subcategory" />
      <div className="mt-10 mb-10 max-w-7xl mx-auto sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">New Category</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name" className="text-xl font-bold">Category name</Label>
                  <Input id = "name"
                  name="name"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  placeholder="Name of your category" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name" className="text-xl font-bold">Description of category</Label>
                  <Textarea id = "description"
                  name="description"
                  value={data.description}
                  onChange={(e) => setData('description', e.target.value)}
                  placeholder="Description of your category" />
                </div>
              </div>
              <Button className='mt-5'>
                Add category
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10 mb-10 max-w-7xl mx-auto sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">New Subcategory</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit}>
              <div className="grid w-full items-center gap-4">
                <Select onValueChange={(e) => setData("label_id", e)}>
                    <SelectTrigger className="w-[180px]" >
                    <SelectValue placeholder="Categories" />
                    </SelectTrigger >
                    <SelectContent>
                        {labels.map((label) => (
                            <SelectItem key={label.id} value={label.id.toString()}>
                            {label.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name" className="text-xl font-bold">Subcategory name</Label>
                  <Input id="name"
                  name="name"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  placeholder="Name of your subcategory" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name" className="text-xl font-bold">Description of subcategory</Label>
                  <Textarea
                  name="description"
                  value={data.description}
                  onChange={(e) => setData('description', e.target.value)}
                  placeholder="Description of your subcategory" />
                </div>
              </div>
              <Button className='mt-5'>
                Add subcategory
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </QBLayout>
  );
}
