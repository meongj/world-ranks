import {Country} from "@/types/country";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "./ui/table";
import {flexRender, createColumnHelper, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {useMemo} from "react";

const columnHelper = createColumnHelper<Country>();

const columns = [
  columnHelper.accessor("flags", {
    id: "flag",
    header: "Flag",
    cell: (info) => (
      <img src={info.getValue().png} alt={info.getValue().alt ?? ""} className="w-12 h-8 rounded object-cover" />
    ),
  }),
  columnHelper.accessor("name.common", {
    id: "name",
    header: "Name",
  }),
  columnHelper.accessor("population", {
    header: "Population",
    cell: (info) => info.getValue().toLocaleString(),
  }),
  columnHelper.accessor("area", {
    header: "Area (km²)",
    cell: (info) => info.getValue().toLocaleString(),
  }),
  columnHelper.accessor("region", {
    header: "Region",
  }),
];

interface CountryTableProps {
  countries: Country[];
}

export function CountryTable({countries}: CountryTableProps) {
  const table = useReactTable({
    data: countries,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnVisibility: {
        flag: true,
        name: true,
        population: true,
        area: true, // TODO: 모바일고려
        region: true, // TODO: 모바일고려
      },
    },
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
