import {CountryFilters} from "@/types/country";
import {CountryTable} from "./CountryTable";
import {useCountries} from "@/hooks/useCountries";
import {useMemo} from "react";
import {applyFilters} from "@/utils/countryFilters";

interface CountryTableSectionProps {
  filters: CountryFilters;
}

export function CountryTableSection({filters}: CountryTableSectionProps) {
  const {data: countries} = useCountries();
  const filteredCountries = useMemo(() => applyFilters(countries ?? [], filters), [countries, filters]);
  return <CountryTable countries={filteredCountries} />;
}
