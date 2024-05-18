"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { MemberType } from "./MemberType"
import { Button } from "@/shadcn/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu"
import { router } from "@inertiajs/react"
import { QB } from "@/Pages/QuestionBank/QuestionBankType"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// type MemberProps = {
//     members: MemberType[];
//     extraId: string; // Additional ID prop
// };
export const MemberColumns = (QBank:QB): ColumnDef<MemberType>[] => [
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
    accessorKey: "name",
    header: () => (
      <div
        style={{
          textAlign: "center"
        }}
      >Name</div>)
  },
  {
    accessorKey: "email",
    header: () => (
      <div
        style={{
          textAlign: "center"
        }}
      >Email</div>)
  },
  {
    accessorKey: "role_name",
    header: () => (
      <div
        style={{
          textAlign: "center"
        }}
      >Role</div>)
  },
    {
    id: "actions",
    cell: ({ row }) => {
      const member = row.original
    console.log(window.location.href)
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
            <DropdownMenuSeparator />
            <DropdownMenuItem
            onClick={() => router.visit(route("members.destroy",QBank.id),{
                method: "delete",
                data: {
                    user: member.id,
                    role: member.role_name,
                    team: QBank.id
                }
            })}
            >Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
