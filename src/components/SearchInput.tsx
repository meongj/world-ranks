import {Search} from "lucide-react";
import {InputGroup, InputGroupAddon, InputGroupInput} from "./ui/input-group";
import {useMemo, useState} from "react";
import {debounce} from "es-toolkit";
import {filterActions, FilterDispatch} from "@/hooks/useCountryFilters";

interface SearchInputProps {
  dispatch: FilterDispatch;
}

export function SearchInput({dispatch}: SearchInputProps) {
  const [value, setValue] = useState("");

  const debouncedSearch = useMemo(
    () => debounce((query: string) => dispatch(filterActions.setSearch(query)), 300),
    [dispatch],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <InputGroup className="w-full">
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search by Name, Region, Subregion" onChange={handleChange} value={value} />
    </InputGroup>
  );
}
