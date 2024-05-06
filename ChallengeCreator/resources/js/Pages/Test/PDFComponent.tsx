import { Button } from '@/shadcn/ui/button';
import React, { useRef } from 'react';

export function PDFContainer(props: any) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const createPdf = () => props.createPdf(bodyRef.current);
  const test = () => props.test();

  // console.log(document.getElementById('mathjax-loader').innerHTML);
  return (
    <section className="pdf-container">
      <section className="pdf-toolbar">
        <center>
          <Button
            style={{
              margin: '0.9em 1.5em',
              background: 'blue',
              color: 'white',
              padding: '0.2em 0.5em',
              fontSize: '1em',
            }}
            onClick={createPdf}
          >
            Download PDF
          </Button>
          <Button
            style={{
              margin: '0.9em 1.5em',
              background: 'blue',
              color: 'white',
              padding: '0.2em 0.5em',
              fontSize: '1em',
            }}
            onClick={test}
          >
            View PDF
          </Button>
        </center>
      </section>
      <section className="pdf-body" ref={bodyRef}>
        {props.children}
      </section>
    </section>
  );
};
