// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// import { Head, Link, useForm } from '@inertiajs/react';
// import { PageProps } from '@/types';
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,
// } from "@/shadcn/ui/card"
// import { Input } from "@/shadcn/ui/input"
// import { Label } from "@/shadcn/ui/label"
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/shadcn/ui/select"
// import { Button } from '@/shadcn/ui/button';
// import { Textarea } from '@/shadcn/ui/textarea';
// import { Checkbox } from '@/shadcn/ui/checkbox';
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogDescription,
// //   DialogHeader,
// //   DialogTitle,
// //   DialogTrigger,
// // } from "@/shadcn/ui/dialog"

// import React, { FormEventHandler, useState } from 'react';
// import { Menu } from '../Menu';
// import { QB } from '../QuestionBank/QuestionBankType';
// import QBLayout from '@/Layouts/QBLayout';

// interface UploadProp {
//     csv: File | undefined;
// }
// export default function ImportPage({ auth, QBank }: PageProps<{ QBank: QB }>) {
//     const [position, setPosition] = React.useState("bottom")
//     const { data, setData, post, progress } = useForm<UploadProp>({
//         csv: undefined,
//       })

//       const submit: FormEventHandler = (e) => {
//         e.preventDefault()
//         post(route("questions.import", QBank.id))
//       }

//       const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e.currentTarget.files) {
//             setData("csv", e.currentTarget.files[0]);
//         }
//     };

//     return (
//         <QBLayout user={auth.user} QBank={QBank} CanEdit={true}>
//             <form onSubmit={submit}>
//                 <input type="file" accept='.csv, .xls, .xlsx'
//                 onChange={handleFile}/>
//                 {progress && (
//                 <progress value={progress.percentage} max="100">
//                     {progress.percentage}%
//                 </progress>
//                 )}
//                 <button type="submit">Submit</button>
//             </form>
//         </QBLayout>

//     );
//     // return (
//     //     <AuthenticatedLayout
//     //         user={auth.user}
//     //         header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Import Question from File</h2>}>
//     //         <Head title="Import Question" />
//     //         <div className="mt-10 mb-10 max-w-7xl mx-auto sm:px-6 lg:px-8">
//     //         {/* <Menu QBank={QBank}></Menu> */}
//     //             <Card>
//     //                 <CardHeader>
//     //                     <CardTitle className="text-3xl font-bold">Import Question from File</CardTitle>
//     //                 </CardHeader>
//     //                 <CardContent>
//     //                     <div className="grid w-full items-center gap-4">
//     //                         <div className="flex flex-col space-y-1.5">
//     //                             <Label htmlFor="name" className="text-xl font-bold">Question name</Label>
//     //                             <Input id="name" placeholder="Name of your question" />
//     //                         </div>
//     //                         <div className="flex flex-col space-y-1.5 mb-5">
//     //                             <Label htmlFor="name" className="text-xl font-bold">Import your question</Label>
//     //                             <div className="grid w-full max-w-sm items-center gap-1.5">
//     //                                 <Input type="file" accept='.csv, .xls, .xlsx' />
//     //                             </div>
//     //                         </div>
//     //                     </div>


//     //                     <div className="mt-5">
//     //                         <div className="text-xl font-bold"><p>Category settings</p></div>
//     //                         <div className="mt-3 mb-3">
//     //                             <div className="text-xl font-bold"><p>Score settings</p></div>
//     //                             <Input id="score" placeholder="Question score" className='w-1/6' />
//     //                         </div>
//     //                     </div>

//     //                     <div className="flex gap-4">
//     //                         <Link href={route('importinstruction')}>
//     //                             <Button className='mt-5' variant={'ghost'}>
//     //                                 Previous step
//     //                             </Button>
//     //                         </Link>
//     //                         <Link href={route('testdetail')}>
//     //                             <Button className='mt-5'>
//     //                                 Add question
//     //                             </Button>
//     //                         </Link>
//     //                     </div>
//     //                 </CardContent>
//     //             </Card>
//     //         </div>
//     //     </AuthenticatedLayout>
//     // );
// }

'use client'
import { columns } from "./ImportInstructionTable/ImportInstructionColumn"
import { DataTable } from './ImportInstructionTable/ImportInstructionTable';
import { data as data1 } from './ImportInstructionTable/ImportInstructionData';
import React, { FormEventHandler, useState, useCallback, useEffect } from 'react'
import { filterProps, motion, progress } from 'framer-motion'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler, Controller, useFormContext, FormProvider } from 'react-hook-form'
import { Head, Link, router, useForm as uF, usePage } from '@inertiajs/react';
import { QB } from '../QuestionBank/QuestionBankType'
import { PageProps } from '@/types'
import QBLayout from '@/Layouts/QBLayout'
import ImportInstruction from './ImportInstruction'
import { Card, CardHeader, CardTitle, CardContent } from '@/shadcn/ui/card'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@radix-ui/react-collapsible'
import { Label } from '@radix-ui/react-dropdown-menu'
import { ChevronDownIcon } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/shadcn/ui/button'
import axios from 'axios'
import { LoaderIcon } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shadcn/ui/accordion";


export const FormDataSchema = z.object({
    // firstName: z.string().min(1, 'First name is required'),
    // lastName: z.string().min(1, 'Last name is required'),
    // email: z.string().min(1, 'Email is required').email('Invalid email address'),
    // country: z.string().min(1, 'Country is required'),
    // street: z.string().min(1, 'Street is required'),
    // city: z.string().min(1, 'City is required'),
    // state: z.string().min(1, 'State is required'),
    // zip: z.string().min(1, 'Zip is required'),
})
type Inputs = z.infer<typeof FormDataSchema>

const steps = [
    {
        id: 'Step 1',
        name: 'Import Instructions',
    },
    {
        id: 'Step 2',
        name: 'Import CSV file',
        field: ["file"]
    },
    {
        id: 'Step 3',
        name: 'Preview questions',
    },
    {
        id: 'Step 4',
        name: 'Complete'
    }
]

// interface UploadProp {
//     csv: File | undefined;
// }

type FormInputs = {
    file: FileList;
};

export default function ImportPage({ auth, QBank, rows, violators, template_url }: PageProps<{ QBank: QB, rows: any, violators: any, template_url: any }>) {
    // console.log("template_url:" + template_url)
    const [previousStep, setPreviousStep] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    // const formData = new FormData();
    const [formData, setFormData] = useState(new FormData());
    const { data, setData, setDefaults, post, processing, transform } = uF({
        questions: [],
      });

    const [loading, setLoading] = useState(false);
    const delta = currentStep - previousStep;
    const {
        register,
        handleSubmit,
        watch,
        reset,
        trigger,
        formState: { errors }
    } = useForm<Inputs>({
        resolver: zodResolver(FormDataSchema)
    })
    const form = useForm<FormInputs>();
    const [errorMessage, setErrorMessage] = useState('');
    const [uploaded, setUploaded] = useState(false);

    const onSubmit = async (data: { file: File }) => {
        formData.append('file', data.file);
        try {
            const response = await fetch(route('questions.import', QBank.id), {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload CSV file');
            }

            // Handle successful upload and response from backend (optional)
            const data = await response.json();
            console.log('Upload successful:', data);

            // Handle filtered data and violators (optional)
            // You can access data.filter and data.violators from the response

        } catch (error) {
            console.error('Error uploading CSV:', error);
            alert('Failed to upload CSV file');
        }
    };
    // const {
    //     acceptedFiles,
    //     fileRejections,
    //     getRootProps,
    //     getInputProps
    // } = useDropzone({
    //     accept: {
    //         'text/csv': []
    //     }
    // });
    // useEffect(() => {
    // // Code to run once
    // console.log("effe")
    // setData("questions", rows)
    // console.log(rows)
    // }, []);


    const processForm: SubmitHandler<Inputs> = data => {
        // console.log(data)
        reset()
    }

    // type FieldName = keyof Inputs

    const prev = () => {
        if (currentStep > 0) {
            setPreviousStep(currentStep)
            setCurrentStep(step => step - 1)
        }
    }

    const next = async () => {
        // const fields = steps[currentStep].fields
        // const output = await trigger(fields as FieldName[], { shouldFocus: true })
        // if (!output) return
        // console.log(currentStep)
        // console.log(currentStep)
        if (currentStep === 1 && formData.keys == null) {
            prev()
        }
        if (currentStep < steps.length - 1) {
            if (currentStep === steps.length - 3) {
                // router.reload({only: ['rows', 'violators'], data: formData, onSuccess: page => {console.log(formData)}})
                // await handleSubmit(processForm)()
                setLoading(true);
                router.post(route("questions.import", QBank.id), formData, {
                    forceFormData: true,
                    preserveState: true,
                    onProgress: () => { },
                    onSuccess: () => {
                        setLoading(false);
                    },
                    onFinish: () => {
                        console.log("effe")
                        setData("questions", rows)
                        console.log(data)
                    }
                });
                // console.log(3)
                // console.log(rows)


                // console.log(rows)
                // console.log(violators)
            }
            if (currentStep === steps.length - 2) {
                setData("questions", rows)
                console.log(data)

                // console.log(rows)
                // console.log(violators)
            }
            setPreviousStep(currentStep)
            setCurrentStep(step => step + 1)
        }
    }

    // const { data, setData, post } = uF<UploadProp>({
    //     csv: undefined,
    // })

    // const submit: FormEventHandler = (e) => {
    //     e.preventDefault()
    //     post(route("questions.import", QBank.id))
    // }

    // const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (e.currentTarget.files) {
    //         setData("csv", e.currentTarget.files[0]);
    //         post(route("questions.import", QBank.id))
    //     }
    // };

    // const [file, setFile] = useState<File>()

    // const submitFile = () => {
    //     post(route("questions.import", QBank.id))
    // }

    const onDrop = useCallback((acceptedFiles: any, fileRejections: any) => {
        setErrorMessage('');
        if (fileRejections.length > 0) {
            setTimeout(() => { setErrorMessage(''); }, 2000);
            return;
        }
        else setErrorMessage('');
        // acceptedFiles.forEach(file => {
        //     formData.append('csv', file);
        // });
        formData.append('csv', acceptedFiles[0]);
        // router.post(route("questions.import", QBank.id), formData, {
        //     forceFormData: true,
        //     preserveState: true,
        //     onSuccess: () => next()
        // });
        // next();
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        maxFiles: 1,
        accept: {
            'text/csv': []
        }
    });

    const dlTemplate = () => {
        axios({
            url: route("questions.downloadTemplate", { qbID: QBank.id }),
            method: 'GET',
            responseType: 'blob', // important
            headers: {
                'Accept': 'text/csv;charset=utf-8;',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'text/csv;charset=utf-8;' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'file.csv');
            document.body.appendChild(link);
            link.click();
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <QBLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Import CSV file</h2>} QBank={QBank} CanEdit={true} user={auth.user}>
            {/* steps */}
            <Head title="Import CSV file" />
            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <nav aria-label='Progress'>
                    <ol role='list' className='space-y-4 md:flex md:space-x-8 md:space-y-0'>
                        {steps.map((step, index) => (
                            <li key={step.name} className='md:flex-1'>
                                {currentStep > index ? (
                                    <div className='group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                                        <span className='text-sm font-medium text-sky-600 transition-colors '>
                                            {step.id}
                                        </span>
                                        <span className='text-sm font-medium'>{step.name}</span>
                                    </div>
                                ) : currentStep === index ? (
                                    <div
                                        className='flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'
                                        aria-current='step'
                                    >
                                        <span className='text-sm font-medium text-sky-600'>
                                            {step.id}
                                        </span>
                                        <span className='text-sm font-medium'>{step.name}</span>
                                    </div>
                                ) : (
                                    <div className='group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                                        <span className='text-sm font-medium text-gray-500 transition-colors'>
                                            {step.id}
                                        </span>
                                        <span className='text-sm font-medium'>{step.name}</span>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ol>
                </nav>

                {/* Form */}
                <form className='mt-12 py-5' onSubmit={handleSubmit(processForm)}>
                    {currentStep === 0 && (
                        <motion.div
                            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-3xl font-bold">Download .CSV Question Template</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Button className="bg-bluegreen flex gap-3 hover:bg-bluegreen-dark mb-5" onClick={dlTemplate}>
                                        Download CSV template
                                    </Button>
                                    <div className="grid w-full items-center gap-4">
                                        <div className="flex flex-col space-y-1.5">
                                            <Label className="text-xl font-bold">Instructions</Label>
                                            <div className="flex justify-start gap-5 content-center space-y-1.5 mb-5">
                                                How to upload new questions?
                                                <Collapsible>
                                                    <CollapsibleTrigger className="text-orange-600 flex content-center justify-center">Show <ChevronDownIcon></ChevronDownIcon></CollapsibleTrigger>
                                                    <CollapsibleContent>
                                                        <ol className='list-decimal'>
                                                            <li>Export to .CSV format, your existing Question/s you want to override (from your Question Bank or Edit Test page) (Important: Check the option to 'Include Question ID')</li>
                                                            <li>Remove extra Questions that may exist in the template</li>
                                                            <li>Edit your Questions in the .CSV export file as required</li>
                                                            <li>Do not change the Question Type</li>
                                                            <li>Do not change the Question ID</li>
                                                            <li>Upload your Question template in Step 2: Upload Questions</li>
                                                            <li>Maximum of 50 Questions updated 'at a time'.</li>
                                                        </ol>
                                                    </CollapsibleContent>
                                                </Collapsible>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <br></br>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-3xl font-bold">Download Question Import Templates</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <DataTable columns={columns} data={data1} />
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {currentStep === 1 && (
                        <motion.div
                            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                            <Controller
                                control={form.control}
                                name="file"
                                // rules={{
                                //     required: { value: true, message: 'This field is required' },
                                // }}
                                render={({ field: { onChange, onBlur, value }, fieldState }) => (
                                    <div {...getRootProps({
                                        className: 'p-6 dropzone',
                                        'data-tooltip-id': errorMessage ? 'errorTooltip' : '',
                                    })}>
                                        <input {...getInputProps()} />
                                        <p className="border-2 border-dashed border-bluegreen rounded-md p-4 text-center text-bluegreen hover:border-bluegreen-dark">
                                            Drag & drop a .csv file here, or click to choose a .csv file to upload
                                        </p>
                                        {errorMessage && (
                                            <p className="text-red-500 text-center mt-2">
                                                {errorMessage}
                                            </p>
                                        )}
                                    </div>
                                )}
                            />
                        </motion.div>
                    )}

                    {currentStep === 2 && (
                        <motion.div
                            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}

                        >
                            {/* {loading ? <div><LoaderIcon /></div> :
                                <div>
                                    <h2>Valid Rows</h2>
                                    {rows &&
                                        rows.map((row: any) => {
                                            return <p>{row.question}</p>
                                        })
                                    }
                                    <h2 className="indianred-500">Invalid</h2>
                                    {violators &&
                                        violators.map((row: any) => {
                                            return <p>{row.question}</p>
                                        })
                                    }
                                </div>
                            } */}
                            {/* <Card className="px-5">
                                <CardTitle className="text-3xl text-green-500 font-bold">Valid questions</CardTitle>
                                <CardContent>
                                    {rows &&
                                        rows.map((row: any) => {
                                            return <p>Question: {row.question} Correct: {row.correct}</p>
                                        })
                                    }
                                </CardContent>
                            </Card>

                            <Card className="mt-5">
                                <CardTitle className="text-3xl text-indianred font-bold">Invalid questions</CardTitle>
                                <CardContent>
                                    {violators &&
                                        violators.map((row: any) => {
                                            return <p>{row.question}</p>
                                        })
                                    }
                                </CardContent>
                            </Card> */}
                            <div className="mx-auto">
                                <Card className="mb-5 md:col-start-10 col-span-1 pt-2 shadow-2xl">
                                    <CardHeader>
                                        <CardTitle className="text-3xl text-green-500 font-bold">Valid questions</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Accordion type="single" collapsible className="w-full bg-white rounded">
                                            {rows && rows.map((row: any) => (
                                                <AccordionItem value={row.id as unknown as string}>
                                                    <AccordionTrigger className="hover:bg-bluegreen bg-white px-3 rounded">
                                                        <div className="flex gap-2 items-center">Question: {row.question}</div>
                                                    </AccordionTrigger>
                                                    <AccordionContent className="bg-white px-3 rounded">
                                                        <div className="flex flex-col gap-2">
                                                            <div>Answer 1: {row.ans1}</div>
                                                            <div>Answer 2: {row.ans2}</div>
                                                            <div>Answer 3: {row.ans3}</div>
                                                            <div>Answer 4: {row.ans4}</div>
                                                            <div>Answer 5: {row.ans5}</div>
                                                            <div>Answer 6: {row.ans6}</div>
                                                            <div className="text-green-500 font-bold">Correct answer: {row.correct}</div>
                                                        </div>
                                                    </AccordionContent>
                                                </AccordionItem>
                                            )
                                            )}
                                        </Accordion>
                                    </CardContent>
                                </Card>

                                <Card className="mb-5 pt-2 shadow-2xl">
                                    <CardHeader>
                                        <CardTitle className="text-3xl text-indianred font-bold">Invalid questions</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                    <Accordion type="single" collapsible className="w-full bg-white rounded">
                                            {violators && violators.map((row: any) => (
                                                <AccordionItem value={row.id as unknown as string}>
                                                    <AccordionTrigger className="hover:bg-bluegreen bg-white px-3 rounded">
                                                        <div className="flex gap-2 items-center">Question: {row.question}</div>
                                                    </AccordionTrigger>
                                                    <AccordionContent className="bg-white px-3 rounded">
                                                        <div className="flex flex-col gap-2">
                                                            <div>Answer 1: {row.ans1}</div>
                                                            <div>Answer 2: {row.ans2}</div>
                                                            <div>Answer 3: {row.ans3}</div>
                                                            <div>Answer 4: {row.ans4}</div>
                                                            <div>Answer 5: {row.ans5}</div>
                                                            <div>Answer 6: {row.ans6}</div>
                                                            <div className="text-green-500 font-bold">Correct answer: {row.correct}</div>
                                                        </div>
                                                    </AccordionContent>
                                                </AccordionItem>
                                            )
                                            )}
                                        </Accordion>
                                    </CardContent>
                                </Card>
                            </div>
                        </motion.div>
                    )}

                    {currentStep === 3 && (
                        <motion.div
                            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                            <h2 className='text-base font-semibold leading-7 text-gray-900'>
                                Complete
                            </h2>
                            <p className='mt-1 text-sm leading-6 text-gray-600'>
                                Thank you for your submission.
                            </p>
                        </motion.div>
                    )}
                </form>

                {/* Navigation */}
                <div className='mt-8 pt-5'>
                    <div className='flex justify-between'>
                        <button
                            type='button'
                            onClick={prev}
                            disabled={currentStep === 0}
                            className='rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth='1.5'
                                stroke='currentColor'
                                className='h-6 w-6'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M15.75 19.5L8.25 12l7.5-7.5'
                                />
                            </svg>
                        </button>
                        <button
                            type='button'
                            onClick={next}
                            disabled={currentStep === steps.length - 1}
                            className='rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth='1.5'
                                stroke='currentColor'
                                className='h-6 w-6'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M8.25 4.5l7.5 7.5-7.5 7.5'
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </QBLayout>
    )
}
