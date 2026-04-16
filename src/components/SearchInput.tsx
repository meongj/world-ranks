import {Search} from "lucide-react";
import {InputGroup, InputGroupAddon, InputGroupInput} from "./ui/input-group";
import {useMemo, useState} from "react";
import {debounce} from "es-toolkit";

interface SearchInputProps {
  onSearch: (value: string) => void;
}

export function SearchInput({onSearch}: SearchInputProps) {
  const [value, setValue] = useState("");

  const debouncedSearch = useMemo(() => debounce(onSearch, 300), [onSearch]);

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
