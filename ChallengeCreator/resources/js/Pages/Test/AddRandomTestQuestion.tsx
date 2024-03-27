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

export default function AddRandomTest({ auth, QBank, labels }: PageProps<{ QBank: QB, labels: any }>) {
    // console.log(labels);
  const [position, setPosition] = React.useState("bottom")
  const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        // description: ''
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('tests.store',QBank.id));
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
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name" className="text-xl font-bold">Generic Parent &gt; Parent</Label>
                  <Input id="name"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  placeholder="Name of your test"/>
                </div>
              </div>
              <Button type='submit' className='mt-5'>
                    Add test
                </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </QBLayout>
  );
}
