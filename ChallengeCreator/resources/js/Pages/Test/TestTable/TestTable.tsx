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
      {/* <div className="flex items-center justify-between gap-4 py-4">
        <div className="grid grid-cols-3 gap-4">
          <Input
            placeholder="Search test name..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm col-span-2 border-2 border-blue-500 border-solid"
          />
          <div className="flex items-center"><DropdownMenu>
            <DropdownMenuTrigger className="flex gap-2">
              <ArrowUpDown className="ml-2 h-4 w-4 mt-1" />
              Sort By: {
                sortState
              }
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => { table.getColumn("name")?.toggleSorting(table.getColumn("name")?.getIsSorted() === "asc"); setSortState("Alphabetical") }}>Alphabetical</DropdownMenuItem>
              <DropdownMenuItem onClick={() => { table.getColumn("lastUpdated")?.toggleSorting(table.getColumn("lastUpdated")?.getIsSorted() === "asc"); setSortState("Last Updated") }}>Last Updated</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
        </div>

        <div>
          <Link href={route('addtest')}>
            <Button>
              Add test
            </Button>
          </Link>
        </div>
      </div> */}
      <div className="grid md:grid-cols-5 md:grid-rows-none py-4 mx-auto max-w-7xl grid-rows-3 grid-flow-col">
        <Input
          placeholder="Search for a test..."
          className="border-2 border-blue-500 border-solid row-span-1 md:col-span-2" />
        <div className="flex items-center row-span-1 md:col-span-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex gap-2">
              <ArrowUpDown className="ml-2 h-4 w-4 mt-1" />
              Sort By: {
                sortState
              }
            </DropdownMenuTrigger>
            <DropdownMenuContent>
            <DropdownMenuItem onClick={() => { table.getColumn("name")?.toggleSorting(table.getColumn("name")?.getIsSorted() === "asc"); setSortState("Alphabetical") }}>Alphabetical</DropdownMenuItem>
              <DropdownMenuItem onClick={() => { table.getColumn("lastUpdated")?.toggleSorting(table.getColumn("lastUpdated")?.getIsSorted() === "asc"); setSortState("Last Updated") }}>Last Updated</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

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
                  {/* {
                    row.getVisibleCells().map((cell) => (
                      <DropdownMenu key={row.id}>
                        <CollapsibleTrigger key={row.id} className="container">
                          <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            <CollapsibleContent>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </CollapsibleContent>
                          </TableCell>
                        </CollapsibleTrigger>
                      </Collapsible>
                    ))
                  } */}
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
        <Button
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
        </Button>
      </div>

    </div >
  )
}
