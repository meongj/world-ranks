import {CountryFilters} from "@/types/country";
import {CountryTable} from "./CountryTable";
import {useFilteredCountries} from "@/hooks/useFilteredCountries";

interface CountryTableSectionProps {
  filters: CountryFilters;
}

export function CountryTableSection({filters}: CountryTableSectionProps) {
  const filtered = useFilteredCountries(filters);
  return <CountryTable countries={filtered} />;
}
