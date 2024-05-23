// import { Link, Head } from '@inertiajs/react';
// import { Button, buttonVariants } from "@/shadcn/ui/button"
// import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from '@/shadcn/ui/menubar';
// import { PageProps } from '@/types';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import { Textarea } from '@/shadcn/ui/textarea';
// import { FormEvent, FormEventHandler, useState } from 'react';
// import { MathJax, MathJaxContext } from 'better-react-mathjax';
// import { convertHtmlToReact } from '@hedgedoc/html-to-react';
// import PDFComponent from './PDFComponent';
// import { PDFViewer } from '@react-pdf/renderer';

// export default function PDF({ auth }: PageProps) {
//   const [value, setValue] = useState("");

//   const mathJaxConfig = {
//     loader: { load: ["[tex]/html"] },
//     tex: {
//       packages: { "[+]": ["html"] },
//       inlineMath: [
//         ["$", "$"],
//         ["\\(", "\\)"]
//       ],
//       displayMath: [
//         ["$$", "$$"],
//         ["\\[", "\\]"]
//       ]
//     }
//   };

//   return (
//     <MathJaxContext version={3} config={mathJaxConfig}>
//       <div className="bg-auto w-screen h-screen bg-center">
//         <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
//           <Head title="Homepage" />
//           <Textarea className="txt" name="txt" onChange={(e) => setValue(e.target.value)} />
//           {/* <Button onClick={() => { htmlToPDF() }}>Submit</Button> */}
//           Preview: <MathJax>{value}</MathJax>
//         </section>
//         <PDFComponent value={value} />
//       </div>
//     </MathJaxContext>
//   )
// }
