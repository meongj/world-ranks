import {SortField} from "@/types/country";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "./ui/select";

interface SortSelectProps {
  value: SortField;
  onChange: (value: SortField) => void;
}

export function SortSelect({value, onChange}: SortSelectProps) {
  return (
    <div>
      <p className="text-xs text-muted-foreground mb-2">Sort by</p>
      <Select value={value} onValueChange={(v) => onChange(v as SortField)}>
        <SelectTrigger className="w-full border-border bg-background text-foreground  [&>span]:text-foreground">
          <SelectValue placeholder="Population" className="text-foreground" />
        </SelectTrigger>
        <SelectContent className="bg-background border-border text-foreground">
          <SelectGroup>
            <SelectItem value="population">Population</SelectItem>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="area">Area (km²)</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
