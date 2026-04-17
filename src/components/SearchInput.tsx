import {memo, useMemo, useState} from "react";
import {debounce} from "es-toolkit";
import {filterActions, FilterDispatch} from "@/hooks/useCountryFilters";
import {InputGroup, InputGroupAddon, InputGroupInput} from "./ui/input-group";
import {Search} from "lucide-react";

interface SearchInputProps {
  dispatch: FilterDispatch;
}

export const SearchInput = memo(function SearchInput({dispatch}: SearchInputProps) {
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
});
