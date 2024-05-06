// import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
// import { PageProps } from '@/types';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/shadcn/ui/card"
// import { Input } from "@/shadcn/ui/input"
// import { Label } from "@/shadcn/ui/label"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/shadcn/ui/select"
// import { Button } from '@/shadcn/ui/button';
// import { Textarea } from '@/shadcn/ui/textarea';
// import { Checkbox } from '@/shadcn/ui/checkbox';
// import React, { FormEventHandler, useState } from 'react';
// import { QB } from '../QuestionBank/QuestionBankType';
// import QBLayout from '@/Layouts/QBLayout';
// import { LabelType } from '../Label/LabelTable/LabelType';
// import { MathJax, MathJaxContext } from 'better-react-mathjax';
// import InputError from '@/Components/InputError';
// import { TokenAnnotator, TextAnnotator } from "react-text-annotate";
// import { State } from "react-powerplug";
// import { Check } from 'lucide-react';

// export default function AddAIQuestion({ auth, QBank, labels, sublabels }: PageProps<{ QBank: QB, labels: LabelType[], sublabels: LabelType[] }>) {
//   const [position, setPosition] = useState("bottom")
//   const params = new URLSearchParams(window.location.search)

//   const { data, setData, post, setDefaults , processing, reset, transform } = useForm({
//     context: "",
//     answers: [{ start: 0, end: 0, tag: "Answer Candidate", text: "[MASK]" }],
//   });

//   const [isChecked, setIsChecked] = useState(false);

//   const handleCheckboxChange = (event: any) => {
//     if(!isChecked) {
//         setData("answers", [{ start: 0, end: 0, tag: "Answer Candidate", text: "[MASK]" }]);
//     }
//     else {
//         setData("answers", []);
//     }

//     setIsChecked(!isChecked);
//   };


// const config = {
//   loader: { load: ["[tex]/html"] },
//   tex: {
//     packages: { "[+]": ["html"] },
//     inlineMath: [
//       ["$", "$"],
//       ["\\(", "\\)"]
//     ],
//     displayMath: [
//       ["$$", "$$"],
//       ["\\[", "\\]"]
//     ]
//   }
// };

// const TEXT =
//   "When Sebastian Thrun started working on self-driving cars at Google in 2007, few people outside of the company took him seriously. “I can tell you very senior CEOs of major American car companies would shake my hand and turn away because I wasn’t worth talking to,” said Thrun, now the co-founder and CEO of online higher education startup Udacity, in an interview with Recode earlier this week. A little less than a decade later, dozens of self-driving startups have cropped up while automakers around the world clamor, wallet in hand, to secure their place in the fast-moving world of fully automated transportation.";
// const TAG_COLORS = {
//   ORG: "#00ffa2",
//   PERSON: "#84d2ff"
// };

// const [text, setText] = useState(TEXT); // Assuming TEXT is the initial text for the textarea
// const submit: FormEventHandler = (e) => {
//     e.preventDefault();
//     if (params.has("testid")) {
//       transform((data) => ({
//         ...data,
//         testid: params.get("testid")
//       }))
//     }
//     post(route('questions.aistore', QBank.id));
//   };

// return (
//   <QBLayout
//     user={auth.user}
//     header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Question Generator Powered by AI!!!</h2>} QBank={QBank} CanEdit={true}>
//     <Head title="Create question using AI!" />
//     <State
//         initial={{ value: [{}], tag: 'Answer Candidate' }}
//         >
//         {({ state, setState }) => (
//             <Card>
//             <form onSubmit={submit}>
//             <h4>Input some context here</h4>
//             <Textarea
//                 style={{
//                     width: '100%',
//                     height: '200px',
//                     marginBottom: '10px',
//                     lineHeight: '1.5',
//                 }}
//                 value={data.context}
//                 onChange={(e) => {setData("context",e.target.value)} }
//             />
//             <Checkbox onClick={handleCheckboxChange} />
//             {isChecked ?
//             <Input type="number" placeholder='Number of questions (max 5)' /> :
//             <TextAnnotator
//                 style={{
//                     maxWidth: 500,
//                     lineHeight: 1.5,
//                 }}
//                 content={data.context}
//                 value={state.value}
//                 onChange={(value: { start: number; end: number; tag: string; }[] | React.FormEvent<HTMLDivElement>) => {
//                     if (Array.isArray(value)) {
//                         setState({ value: value as { start: number; end: number; tag: string; }[] });
//                         setData("answers", value);
//                     }
//                 }}
//                 getSpan={(span: any) => ({
//                     ...span,
//                     tag: state.tag,
//                     color: TAG_COLORS[state.tag as keyof typeof TAG_COLORS], // Add 'as keyof typeof TAG_COLORS' to allow indexing with a string
//                 })}
//             />}
//             <Button type='submit'>
//               Add question
//             </Button>
//             </form>
//             <pre style={{ fontSize: 12, lineHeight: 1.2 }}>
//                 {/* {JSON.stringify(state, null, 2)} */}
//                 {JSON.stringify(data, null, 2)}
//             </pre>
//             </Card>

//         )}

//         </State>
//   </QBLayout>
// );
// }
