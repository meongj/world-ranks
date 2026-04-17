import {Country} from "@/types/country";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "./ui/table";
import {flexRender, createColumnHelper, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {useNavigate} from "@tanstack/react-router";
import {useMediaQuery} from "@/hooks/useMediaQuery";
import {BREAKPOINTS} from "@/constants/breakpoints";

const columnHelper = createColumnHelper<Country>();

const columns = [
  columnHelper.accessor("flags", {
    id: "flag",
    header: "Flag",
    size: 100,
    cell: (info) => (
      <img src={info.getValue().png} alt={info.getValue().alt ?? ""} className="w-12 h-8 rounded object-cover" />
    ),
  }),
  columnHelper.accessor("name.common", {
    id: "name",
    header: "Name",
    size: 200,
  }),
  columnHelper.accessor("population", {
    header: "Population",
    size: 150,
    cell: (info) => info.getValue().toLocaleString(),
  }),
  columnHelper.accessor("area", {
    header: "Area (km²)",
    size: 150,
    cell: (info) => info.getValue().toLocaleString(),
  }),
  columnHelper.accessor("region", {
    header: "Region",
    size: 150,
  }),
];

interface CountryTableProps {
  countries: Country[];
}

export function CountryTable({countries}: CountryTableProps) {
  const navigate = useNavigate();
  // 반응형 레이아웃 지원
  const isDesktop = useMediaQuery(BREAKPOINTS.lg);

  const table = useReactTable({
    data: countries,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnVisibility: {
        region: isDesktop,
      },
    },
  });

  return (
    <Table className="w-fill">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id} style={{width: header.getSize()}}>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            role="link"
            className="cursor-pointer "
            onClick={() => navigate({to: "/country/$countryCode", params: {countryCode: row.original.cca3}})}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
