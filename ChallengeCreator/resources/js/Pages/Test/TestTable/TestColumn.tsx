import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/shadcn/ui/button"
import { Test } from "./TestType"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/shadcn/ui/dropdown-menu"
import { Link } from "@inertiajs/react"
import { Question } from "@/Pages/Questions/QuestionType"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcn/ui/dialog"
import { MathJax, MathJaxContext } from "better-react-mathjax"
import { Separator } from "@/shadcn/ui/separator"
import { formatTime } from "@/Pages/Questions/formatTime"
import { CheckCircledIcon } from "@radix-ui/react-icons"

function DetailDialog ({ques}: {ques:Question})  {
  const answers = [
    ques.ans1,
    ques.ans2,
    ques.ans3,
    ques.ans4,
    ques.ans5,
    ques.ans6
];
  return (
      <Dialog>
          <DialogTrigger asChild>
          <h4 className="text-start text-green-500 underline self-end text-left">
            Show Details
          </h4>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
              <DialogHeader>
                  <DialogTitle>Question Detail</DialogTitle>
                  <DialogDescription>
                    <div>
                    <MathJaxContext>
                                    
                                            <MathJax>{ques.question as string}</MathJax>
                                            <p>Created at: {formatTime(ques.created_at)}</p>
                                            <p>Updated at: {formatTime(ques.updated_at)}</p>
                                            <Separator className="mb-2 mt-2" />
                                            {
                                                answers && answers.map((ans, idx) => {
                                                    var correct = ques.correct;
                                                    if (idx + 1 == correct) {
                                                        return <MathJax><p key={idx} className="flex gap-2 font-bold items-center text-green-500">Answer {idx + 1}: {ans}<CheckCircledIcon /> </p></MathJax>
                                                        // return <p key={correct} className="flex gap-2 font-bold items-center text-green-500">Answer {idx + 1}: {ans}<CheckCircledIcon /> </p>
                                                    }
                                                    else {
                                                        return <MathJax><p key={idx} className="flex gap-2">Answer {idx + 1}: {ans}</p></MathJax>
                                                    }
                                                })
                                            }
                                          </MathJaxContext>
                    </div>
                    
                  </DialogDescription>
                  
              </DialogHeader>
              <div className="flex items-center space-x-2">
                  <div className="grid flex-1 gap-2">
                  </div>
              </div>
              <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                      <Button type="button" variant="secondary">
                          Close
                      </Button>
                  </DialogClose>
              </DialogFooter>
          </DialogContent>
      </Dialog>
  )
}

export const columns: ColumnDef<Question>[] = [
  {
    accessorKey: "id",
    header: () => (
      <div
        style={{
          textAlign: "center"
        }}
      >ID</div>)
  },
  {
    accessorKey: "question",
    header: () => (
      <div
        style={{
          textAlign: "center"
        }}
      >Question</div>),
    // cell: ({ row }) => {
    //   return (
    //     <div className="flex">
    //       <Button>
    //         A
    //       </Button>
    //     </div>
    //   )
    // }
      // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
      // to build the toggle for expanding a row
  },
  // {
  //   accessorKey: "author",
  //   header: () => (
  //     <div
  //       style={{
  //         textAlign: "center"
  //       }}
  //     >Author</div>)
  // },
  {
    accessorKey: "correct",
    header: () => (
      <div
        style={{
          textAlign: "center"
        }}
      >Correct answer</div>)
  },
  {
    accessorKey: "created_at",
    header: () => (
      <div
        style={{
          textAlign: "center"
        }}
      >Created At</div>)
  },
  {
    accessorKey: "updated_at",
    header: () => (
      <div
        style={{
          textAlign: "center"
        }}
      >Updated At</div>)
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const question = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <DetailDialog ques = {question}></DetailDialog>
              </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500 font-bold">
              <Link href={route('tests.detachQuestion', [question.question_bank_id, (table.options.meta as any)?.test.id])} method="put" data={{qID: question.id}}>
                        <p className="text-lg font-bold underline text-indianred">Delete from test</p>
                        </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500 font-bold">
              <Link href={route('questions.edit', [question.question_bank_id, question.id])} method="get">
                        <p className="text-lg font-bold underline text-yellow">Edit question</p>
                        </Link>
              </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
export type { Test }

