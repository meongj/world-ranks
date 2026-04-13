import {Skeleton} from "./ui/skeleton";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "./ui/table";

const SKELETON_COLUMNS = [
  {id: "flag", header: "Flag", size: 100, cell: <Skeleton className="w-12 h-8 rounded" />},
  {id: "name", header: "Name", size: 200, cell: <Skeleton className="h-4 w-40" />},
  {
    id: "population",
    header: "Population",
    size: 150,
    cell: (
      <Skeleton
        className="h-4
  w-24"
      />
    ),
  },
  {id: "area", header: "Area (km²)", size: 150, cell: <Skeleton className="h-4 w-24" />},
  {id: "region", header: "Region", size: 150, cell: <Skeleton className="h-4 w-20" />},
];

export function CountryTableSkeleton() {
  return (
    <Table className="table-fixed w-fill">
      <TableHeader>
        <TableRow>
          {SKELETON_COLUMNS.map((c) => (
            <TableHead key={c.id} style={{width: c.size}}>
              {c.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({length: 10}).map((_, i) => (
          <TableRow key={i}>
            {SKELETON_COLUMNS.map((c) => (
              <TableCell key={c.id}>{c.cell}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
