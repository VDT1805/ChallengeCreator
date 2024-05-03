import { Link, Head } from '@inertiajs/react';

import { Button, buttonVariants } from "@/shadcn/ui/button"

import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from '@/shadcn/ui/menubar';
import { PageProps } from '@/types';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Textarea } from '@/shadcn/ui/textarea';
import { FormEvent, FormEventHandler, useState } from 'react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { convertHtmlToReact } from '@hedgedoc/html-to-react';

export default function PDF({ auth }: PageProps) {
  const [value, setValue] = useState("");

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "pt",
  });

  // autoTable(doc, {
  //   body: [
  //     [
  //       {
  //         content: "ChallengeCreator",
  //         styles: {
  //           halign: 'left',
  //           fontSize: 20,
  //           textColor: '#ffffff'
  //         }
  //       },
  //       {
  //         content: "ChallengeCreator",
  //         styles: {
  //           halign: 'left',
  //           fontSize: 20,
  //           textColor: '#ffffff'
  //         }
  //       }
  //     ],
  //   ],
  //   theme: 'plain',
  //   styles: {
  //     fillColor: '#3366ff'
  //   }
  // })

  var field = "<MathJaxContext><MathJax>" + value + "</MathJax></MathJaxContext>"

  // const render = () => {
  //   return <><MathJaxContext><MathJax>{convertHtmlToReact(field)}</MathJax></MathJaxContext></>;
  // }

  // render()

  const htmlToPDF = () => {
    doc.setFontSize(13)
    var xOffset = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(value) * doc.getFontSize() / 2);
    // doc.text(value, xOffset + 10, 250);
    doc.html(field, {
      callback: function (doc) {
        // doc.output('dataurlnewwindow');
      },
      width: 210,
      windowWidth: 210,
      html2canvas: {
        backgroundColor: 'lightyellow',
        width: 210,
        height: 150
      },
      x: 10,
      y: 50,
    })
    var iframe = document.createElement('iframe');
    iframe.setAttribute('style','position:absolute;right:0; top:0; bottom:0; height:100%; width:650px; padding:20px;');
    document.body.appendChild(iframe);
    iframe.src = doc.output('datauristring');
    // doc.html(value, {
    //   callback: function (doc) {
    //     doc.output('dataurlnewwindow')
    //     // doc.save("output.pdf")
    //   },
    //   x: 0,
    //   y: 0,
    //   width: 170, //target width in the PDF document
    //   windowWidth: 1000 //window width in CSS pixels
    // })
  };

  const mathJaxConfig = {
    loader: { load: ["[tex]/html"] },
    tex: {
      packages: { "[+]": ["html"] },
      inlineMath: [
        ["$", "$"],
        ["\\(", "\\)"]
      ],
      displayMath: [
        ["$$", "$$"],
        ["\\[", "\\]"]
      ]
    }
  };


  return (
    <MathJaxContext version={3} config={mathJaxConfig}>
      <div className="bg-auto w-screen h-screen bg-center">
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
          <Head title="Homepage" />
          <Textarea className="txt" name="txt" onChange={(e) => setValue(e.target.value)} />
          <Button onClick={() => { htmlToPDF() }}>Submit</Button>
          Preview: <MathJax>{value}</MathJax>
        </section>
      </div>
    </MathJaxContext>
  )
}
