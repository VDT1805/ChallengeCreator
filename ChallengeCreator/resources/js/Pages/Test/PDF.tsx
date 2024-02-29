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
import axios from 'axios';

export default function PDFTest(this: any, { auth, QBank, pdf }: PageProps<{ QBank: QB, pdf:any }>) {
  console.log(pdf);
  const [position, setPosition] = React.useState("bottom")
  const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        // description: ''
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('tests.store',QBank.id));
    };
    // axios({
    //     url: route("tests.pdfGen"),
    //     method: 'GET',
    //     responseType: 'blob', // important
    //     }).then((response) => {
    //     const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.setAttribute('download', 'Examen.pdf')
    //     link.target = '_blank'
    //     link.click();})

  return (
    <QBLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">New Test</h2>} QBank={QBank} CanEdit={true}>
      <div className="mt-10 mb-10 max-w-7xl mx-auto sm:px-6 lg:px-8">
      </div>
    </QBLayout>
  );
}
