import { Test, columns } from "./TestTable/TestColumn"
import { TestDetailTable } from "./TestTable/TestDetailTable"
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Button } from "@/shadcn/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu";
import { FilePlusIcon, PlusIcon, UpdateIcon, ShuffleIcon, CopyIcon, TrashIcon } from '@radix-ui/react-icons';
import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/ui/card";
import { PrinterIcon, Trash2Icon } from "lucide-react";
import { Separator } from "@/shadcn/ui/separator"
import { QB } from "../QuestionBank/QuestionBankType";
import { Question } from "../Questions/QuestionType";
import QBLayout from "@/Layouts/QBLayout";
import { Input } from "@/shadcn/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shadcn/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/shadcn/ui/dialog";
import { useState } from "react";
import axios from "axios";
import { Label } from "@/shadcn/ui/label";
import { Checkbox } from "@/shadcn/ui/checkbox";

export default function TestTable({ auth, QBank, test, questions }: PageProps<{ QBank: QB, test: Test, questions: Array<Question> }>) {
    // console.log(JSON.stringify(questions));
    const [loading, setLoading] = useState(false);
    const [numCopies, setNumCopies] = useState(1);
    const [isQuesOrdMixed, setIsQuesOrdMixed] = useState(false);
    const [isChoiceOrdMixed, setIsChoiceOrdMixed] = useState(false);

    const handleNumCopiesChange = (event: any) => {
        setNumCopies(event.target.value);
    };

    const handleQuesOrdChange = (event: any) => {
        setIsQuesOrdMixed(!isQuesOrdMixed);
    };

    const handleChoiceOrdChange = (event: any) => {
        setIsChoiceOrdMixed(!isChoiceOrdMixed);
    };
    console.log(questions)
    const handleDownloadPDF = async () => {
        setLoading(true);
        try {
            const response = await axios.get(route("tests.pdfGen",{qbID: QBank.id, testID: test.id}));
            console.log(response);
                // Extract the file name from the response headers
        const contentDisposition = response.headers['content-disposition'];
        const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
        const fileName = fileNameMatch ? fileNameMatch[1] : 'sample.pdf';

        // Handle the PDF download
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
        } catch (error) {
            // Handle error
            console.log(error);
        }
        setLoading(false);
    };

    //     const invoice = async() => {
    //         axios({
    //             method: 'post',
    //         url: '/api/download',
    //         data: { qbID: QBank.id, testID: test.id },
    //         responseType: 'arraybuffer',
    //         onDownloadProgress: (progressEvent) => {
    //             let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    //             setPercentage(percentCompleted);
    //             if (percentCompleted === 100) {
    //             setPercentage(0);
    //             setIsDownloading(false);
    //             }
    //         },
    //     })
    //   .then((response) => {
    //     const blob = new Blob([response.data], { type: 'application/octet-stream' });
    //     const url = window.URL.createObjectURL(blob);
    //     const a = document.createElement('a');
    //     a.href = url;
    //     a.download = 'video.mp4';
    //     a.click();
    //   });

    //     }
    const dl = () => {
        setLoading(true);
        axios({
            url: route("tests.pdfGen", { qbID: QBank.id, testID: test.id }),
            params: {quesmix: isQuesOrdMixed, choicemix: isChoiceOrdMixed, numcopies: numCopies},
            method: 'GET',
            responseType: 'blob', // important
        }).then((response) => {
            console.log("kfsd")
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${test.name}.pdf`);
            document.body.appendChild(link);
            link.click();
        }).catch((err) => {
            console.log(err);
        });
        setLoading(false);
    }

    const view = () => {
        axios({
            url: route("tests.pdfStream", { qbID: QBank.id, testID: test.id }),
            method: 'GET',
            responseType: 'blob', // important
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data], {type: 'application/pdf'}));
            const link = document.createElement('a');
            link.href = url;
            document.body.appendChild(link);
            link.click();
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <QBLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Test Details - {test.name}</h2>} QBank={QBank} CanEdit={true}>
            <Head title="Test Details" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-3xl font-bold">{test.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between">
                                <div className="flex flex-row">
                                    <Button variant="ghost" className="flex gap-3">
                                        <CopyIcon className="ml-2 h-4 w-4 mt-1" />
                                        Duplicate
                                    </Button>
                                    <Separator orientation="vertical" className="border-2 border-bluegreen" />
                                    {/* <Button variant="ghost" className="flex gap-3">
                                        <PrinterIcon className="ml-2 h-4 w-4 mt-1" />
                                        Print
                                    </Button>
                                    <Separator orientation="vertical" className="border-2 border-bluegreen" /> */}
                                    <Link method="delete" href={route('tests.destroy', [test.question_bank_id, test.id])}>
                                        <Button variant="ghost" className="flex gap-3">
                                            <Trash2Icon className="ml-2 h-4 w-4 mt-1" />
                                            Delete
                                        </Button>
                                    </Link>
                                </div>
                                <div className="flex gap-2">
                                    {/* <Button className="bg-bluegreen flex gap-3 hover:bg-bluegreen-dark">
                                        <Link href={route('tests.pdfGen', [QBank.id, test.id,{quesmix: isQuesOrdMixed, choicemix: isChoiceOrdMixed, numcopies: numCopies}]) } method = "get">Preview</Link>
                                    </Button> */}

                                    {/* <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button>
                                            <PlusIcon className="mr-3" />Export PDF
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem onClick={dl}>
                                            <PlusIcon className="mr-2" />
                                                Export one
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <UpdateIcon className="mr-2" />
                                            <Link href={route('tests.pdfSettings', [QBank.id, test.id])}>
                                                Export multiple
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu> */}
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline">Export PDF</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                        <DialogTitle>Export Settings</DialogTitle>
                                        <DialogDescription>
                                            Choose settings to export your PDF.
                                        </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="numcopies" className="text-right">
                                                Number of copies
                                                </Label>
                                                <Input id="numcopies" type="number" min="1" className="col-span-3" value={numCopies} onChange={handleNumCopiesChange} />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="quesord" className="text-right">
                                                Mixing question order
                                                </Label>
                                                <Checkbox id="quesord" className="col-span-3" checked={isQuesOrdMixed} onClick={handleQuesOrdChange} />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="choiceord" className="text-right">
                                                Mixing choices order
                                                </Label>
                                                <Checkbox id="choiceord" className="col-span-3" checked={isChoiceOrdMixed} onClick={handleChoiceOrdChange} />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                        <Button onClick={dl}>Export</Button>
                                        </DialogFooter>
                                    </DialogContent>`
                                </Dialog>
                                    <Button className="bg-indianred flex gap-3 hover:bg-indianred-dark" onClick={view} disabled={loading}>
                                        {loading ? 'Generating PDF...' : 'View PDF'}
                                    </Button>
                                    <Button className="bg-bluegreen flex gap-3 hover:bg-bluegreen-dark" onClick={dl} disabled={loading}>
                                        {loading ? 'Generating PDF...' : 'Download PDF'}
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="container">
                    <Card className="mb-5 mt-5 py-2 md:col-start-10 col-span-1">
                        <CardContent>
                            <div className="flex justify-end">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button>
                                            <PlusIcon className="mr-3" />Add question
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem>
                                            <PlusIcon className="mr-2" />
                                            <Link href={route('questions.create', [QBank.id])} data={{"testid": test.id}} >Add a new question</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <UpdateIcon className="mr-2" />
                                            <Link href={route('tests.indexQuestion', [QBank.id, test.id])}>Reuse from this question bank</Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <Separator className="mb-3 mt-2" />
                            <div className="flex items-center gap-2">
                                <Input
                                    placeholder="Search for a question..."
                                    className="border-2 border-blue-500 border-solid" />
                                <Select>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Alphabetical">Alphabetical</SelectItem>
                                        <SelectItem value="Last Updated">Last Updated</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Labels" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All</SelectItem>
                                        <SelectItem value="l01">L.0.1</SelectItem>
                                        <SelectItem value="l02">L.0.2</SelectItem>
                                        <SelectItem value="l03">L.0.3</SelectItem>
                                        <SelectItem value="l04">L.0.4</SelectItem>
                                        <SelectItem value="l05">L.0.5</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button>
                                    Filter
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                    {/* <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button>Add question</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                    <DropdownMenuItem>
                        <PlusIcon className="mr-2" />
                        <Link href={route('tests.createQuestion',[QBank.id,test.id])}>Add a new question</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <UpdateIcon className="mr-2" />
                        <Link href={route('tests.indexQuestion',[QBank.id,test.id])}>Reuse from question banks</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <ShuffleIcon className="mr-2" />
                        Add random question</DropdownMenuItem>
                    <DropdownMenuItem>
                        <FilePlusIcon className="mr-2" />
                        <Link href={route('importinstruction')}>Import file</Link>
                    </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu> */}
                    <TestDetailTable columns={columns} data={questions} />
                </div>
            </div>
        </QBLayout>
    );
}
