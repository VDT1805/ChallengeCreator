"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/ui/table"
import { Button } from "@/shadcn/ui/button"
import React from "react"
import { Input } from "@/shadcn/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/shadcn/ui/dropdown-menu"
import { ArrowUpDown } from "lucide-react"
import { Link } from "@inertiajs/react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shadcn/ui/collapsible"
import { FilePlusIcon, PlusIcon, ShuffleIcon, UpdateIcon } from "@radix-ui/react-icons"



interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sortState, setSortState] = React.useState("Alphabetical")
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    }
  })

  return (
    <div>
      <div className="flex items-center justify-between gap-4 py-4">
        <div className="grid grid-cols-3 gap-4">
          <Input
            placeholder="Search question type..."
            value={(table.getColumn("questiontype")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("questiontype")?.setFilterValue(event.target.value)
            }
            className="max-w-sm col-span-2 border-2 border-blue-500 border-solid"
          />
          {/* <div className="flex items-center"><DropdownMenu>
            <DropdownMenuTrigger className="flex gap-2">
              <ArrowUpDown className="ml-2 h-4 w-4 mt-1" />
              Sort By: {
                sortState
              }
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => { table.getColumn("questiontype")?.toggleSorting(table.getColumn("questiontype")?.getIsSorted() === "asc"); setSortState("Alphabetical") }}>Alphabetical</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </div> */}
        </div>

        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>Add question</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <PlusIcon className="mr-2" />
              <Link href={route('addquestion')}>Add a new question</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <UpdateIcon className="mr-2" />
              <Link href={route('reusequestion')}>Reuse from question banks</Link>
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
      </div>
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="text-center">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>


      <div className="flex items-center justify-end space-x-2 py-4">
        {/* <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button> */}
      </div>

    </div>
  )
}
