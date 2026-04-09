import {Country} from "@/types/country";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "./ui/table";
import {flexRender, createColumnHelper, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {useMemo} from "react";

const dummyCountries = [
  {
    name: {common: "South Korea", official: "Republic of Korea"},
    cca2: "KR",
    cca3: "KOR",
    capital: ["Seoul"],
    region: "Asia",
    subregion: "Eastern Asia",
    population: 51780579,
    area: 100210,
    borders: ["PRK"],
    flags: {png: "https://flagcdn.com/w320/kr.png", svg: "https://flagcdn.com/kr.svg"},
    independent: true,
    unMember: true,
    languages: {kor: "Korean"},
    currencies: {KRW: {name: "South Korean won", symbol: "₩"}},
    continents: ["Asia"],
  },
  {
    name: {common: "Japan", official: "Japan"},
    cca2: "JP",
    cca3: "JPN",
    capital: ["Tokyo"],
    region: "Asia",
    subregion: "Eastern Asia",
    population: 125836021,
    area: 377930,
    borders: [],
    flags: {png: "https://flagcdn.com/w320/jp.png", svg: "https://flagcdn.com/jp.svg"},
    independent: true,
    unMember: true,
    languages: {jpn: "Japanese"},
    currencies: {JPY: {name: "Japanese yen", symbol: "¥"}},
    continents: ["Asia"],
  },
  {
    name: {common: "United States", official: "United States of America"},
    cca2: "US",
    cca3: "USA",
    capital: ["Washington, D.C."],
    region: "Americas",
    subregion: "North America",
    population: 329484123,
    area: 9372610,
    borders: ["CAN", "MEX"],
    flags: {png: "https://flagcdn.com/w320/us.png", svg: "https://flagcdn.com/us.svg"},
    independent: true,
    unMember: true,
    languages: {eng: "English"},
    currencies: {USD: {name: "United States dollar", symbol: "$"}},
    continents: ["North America"],
  },
];

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

export function CountryTable() {
  const columnVisibility = () => ({
    flag: true,
    name: true,
    population: true,
    area: true, // TODO: 모바일고려
    region: true, // TODO: 모바일고려
  });

  const table = useReactTable({
    data: dummyCountries,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: columnVisibility,
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
          <TableRow key={row.original.cca3}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
