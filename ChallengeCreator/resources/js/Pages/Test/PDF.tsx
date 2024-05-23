// // import { Link, Head } from '@inertiajs/react';
// // import { Button, buttonVariants } from "@/shadcn/ui/button"
// // import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from '@/shadcn/ui/menubar';
// import { PageProps } from '@/types';
// // import jsPDF from 'jspdf';
// // import autoTable from 'jspdf-autotable';
// // import { Textarea } from '@/shadcn/ui/textarea';
// // import { FormEvent, FormEventHandler, createRef, useState } from 'react';
// import { MathJax, MathJaxContext } from 'better-react-mathjax';
// // import { convertHtmlToReact } from '@hedgedoc/html-to-react';
// import { savePDF } from '@progress/kendo-react-pdf';
// // import { PDFViewer } from "@progress/kendo-react-pdf-viewer";
// import { data } from './data';
// import { PDFContainer } from './PDFComponent';
// import { Card, CardContent, CardHeader, CardTitle } from '@/shadcn/ui/card';
// import 'katex/dist/katex.min.css';
// import Latex from 'react-latex-next';
// import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

// export default function PDF({ auth }: PageProps) {
//   // const [value, setValue] = useState("");

//   // const doc = new jsPDF({
//   //   orientation: "portrait",
//   //   unit: "pt",
//   // });

//   // autoTable(doc, {
//   //   body: [
//   //     [
//   //       {
//   //         content: "ChallengeCreator",
//   //         styles: {
//   //           halign: 'left',
//   //           fontSize: 20,
//   //           textColor: '#ffffff'
//   //         }
//   //       },
//   //       {
//   //         content: "ChallengeCreator",
//   //         styles: {
//   //           halign: 'left',
//   //           fontSize: 20,
//   //           textColor: '#ffffff'
//   //         }
//   //       }
//   //     ],
//   //   ],
//   //   theme: 'plain',
//   //   styles: {
//   //     fillColor: '#3366ff'
//   //   }
//   // })

//   // var field = "<MathJaxContext><MathJax>" + value + "</MathJax></MathJaxContext>"

//   // const render = () => {
//   //   return <><MathJaxContext><MathJax>{convertHtmlToReact(field)}</MathJax></MathJaxContext></>;
//   // }

//   // render()

//   // const htmlToPDF = () => {
//   //   doc.setFontSize(13)
//   //   var xOffset = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(value) * doc.getFontSize() / 2);
//   //   // doc.text(value, xOffset + 10, 250);
//   //   doc.html(field, {
//   //     callback: function (doc) {
//   //       // doc.output('dataurlnewwindow');
//   //     },
//   //     width: 210,
//   //     windowWidth: 210,
//   //     html2canvas: {
//   //       backgroundColor: 'lightyellow',
//   //       width: 210,
//   //       height: 150
//   //     },
//   //     x: 10,
//   //     y: 50,
//   //   })
//   //   var iframe = document.createElement('iframe');
//   //   iframe.setAttribute('style','position:absolute;right:0; top:0; bottom:0; height:100%; width:650px; padding:20px;');
//   //   document.body.appendChild(iframe);
//   //   iframe.src = doc.output('datauristring');
//   //   // doc.html(value, {
//   //   //   callback: function (doc) {
//   //   //     doc.output('dataurlnewwindow')
//   //   //     // doc.save("output.pdf")
//   //   //   },
//   //   //   x: 0,
//   //   //   y: 0,
//   //   //   width: 170, //target width in the PDF document
//   //   //   windowWidth: 1000 //window width in CSS pixels
//   //   // })
//   // };

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
//     },
//     // svg: {
//     //   fontCache: 'global'
//     // },
//     // macros: {
//     //   frac: "\\flatfrac"
//     // },
//   };

//   const createPdf = (html: HTMLElement) => {
//     console.log(html)
//     savePDF(html, {
//       paperSize: 'A4',
//       fileName: 'test.pdf',
//       margin: '1cm',
//       creator: 'ChallengeCreator',
//       scale: 0.6,
//       avoidLinks: false
//     })
//   }

//   // const styles = StyleSheet.create({
//   //   page: {
//   //     flexDirection: 'row',
//   //     backgroundColor: '#E4E4E4',
//   //   },
//   //   section: {
//   //     margin: 10,
//   //     padding: 10,
//   //     flexGrow: 1,
//   //   },
//   // });

//   // const PdfDocument = () => (
//   //   <Document>
//   //     <Page size="A4" style={styles.page}>
//   //       <View style={styles.section}>
//   //         <MathJaxContext version={3} config={mathJaxConfig}>
//   //           {data.map((each) => {
//   //             return each.question_list.map((item, idx) => {
//   //               const html = item.title + item.question_data;
//   //               return (
//   //                 <div key={idx}>
//   //                   <Latex>{html}</Latex>
//   //                   <br />
//   //                   {item.ans_list.map((answer, idx) => (
//   //                     <div key={idx} className='flex gap-2'>
//   //                       Choice {idx + 1}: <MathJax>{answer.answer_data}</MathJax>
//   //                     </div>
//   //                   ))}
//   //                 </div>
//   //               );
//   //             });
//   //           })}
//   //         </MathJaxContext>
//   //       </View>
//   //     </Page>
//   //   </Document>
//   // );

//   // const ClientDetails = () => {
//   //   return (
//   //     <PDFViewer>
//   //       <PdfDocument />
//   //     </PDFViewer>
//   //   );
//   // }

//   //   return (
//   //     <MathJaxContext version={3} config={mathJaxConfig}>
//   //       <div className="bg-auto w-screen h-screen bg-center">
//   //         <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
//   //           <Head title="Homepage" />
//   //           <Textarea className="txt" name="txt" onChange={(e) => setValue(e.target.value)} />
//   //           <Button onClick={createPDF(bodyRef.current)}>Submit</Button>
//   //           Preview: <MathJax>{value}</MathJax>
//   //         </section>
//   //       </div>
//   //     </MathJaxContext>
//   //   )
//   // }

//   const createPdfexam = (html: any) => createPdf(html);

// //   return (
// //     <div className="mt-10 mb-10 max-w-7xl mx-auto sm:px-6 lg:px-8">
// //       <ClientDetails></ClientDetails>
// //     </div>
// //   );
// // }

//   return (
//     <div className="mt-10 mb-10 max-w-7xl mx-auto sm:px-6 lg:px-8">
//       <PDFContainer createPdf={createPdfexam}>
//         {/* <Card>
//             <CardHeader>
//               <MathJax><CardTitle className="text-3xl font-bold">Questions</CardTitle></MathJax>
//             </CardHeader>
//             <CardContent> */}

//         {data.map((each) => {
//           return each.question_list.map((item, idx) => {
//             return (
//               <div key={idx}>
//                 <Latex>{item.title + " " + item.question_data}</Latex>
//                 {item.ans_list.map((answer, idx) => (
//                   <div key={idx} className='flex gap-2'>
//                     Choice {idx + 1}: <Latex>{answer.answer_data}</Latex>
//                   </div>
//                 ))}
//               </div>
//             );
//           });
//         })}
//         {/* </CardContent>
//           </Card> */}
//       </PDFContainer>
//     </div>
//   );
// }
