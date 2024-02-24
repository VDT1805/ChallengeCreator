"use client"

import { ColumnDef, expandRows } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/shadcn/ui/button"
import { Test } from "./TestType"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/shadcn/ui/dropdown-menu"
import { Link } from "@inertiajs/react"
import { Question } from "@/Pages/Questions/QuestionType"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
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
    accessorKey: "created_at",
    header: () => (
      <div
        style={{
          textAlign: "center"
        }}
      >Created At</div>)
  },
  // {
  //   accessorKey: "updated_at",
  //   header: () => (
  //     <div
  //       style={{
  //         textAlign: "center"
  //       }}
  //     >Updated At</div>)
  // },
  {
    id: "actions",
    cell: ({ row }) => {
      const test = row.original
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
            <DropdownMenuItem><Link href={route('tests.show',[test.question_bank_id,test.id])}>Edit test</Link></DropdownMenuItem>
            <DropdownMenuItem className="text-red-500 font-bold">Delete test</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
export type { Test }

