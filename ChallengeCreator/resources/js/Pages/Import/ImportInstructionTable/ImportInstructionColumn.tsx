"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/shadcn/ui/button"
import { ImportInstruction } from "./ImportInstructionType"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export const columns: ColumnDef<ImportInstruction>[] = [
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
    accessorKey: "questiontype",
    header: () => (
      <div
        style={{
          textAlign: "center"
        }}
      >Question Type</div>)
  },
  {
    accessorKey: "importtemplate",
    header: () => (
      <div
        style={{
          textAlign: "center"
        }}
      >Import Template</div>)
  },
  {
    accessorKey: "instructions",
    header: () => (
      <div
        style={{
          textAlign: "center"
        }}
      >Instructions</div>)
  },
]
export type { ImportInstruction }