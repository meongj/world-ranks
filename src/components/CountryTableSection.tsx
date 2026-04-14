import {CountryFilters} from "@/types/country";
import {CountryTable} from "./CountryTable";
import {useMemo} from "react";
import {applyFilters} from "@/utils/countryFilters";
import {useSuspenseQuery} from "@tanstack/react-query";
import {countryQueries} from "@/queries/countries";

interface CountryTableSectionProps {
  filters: CountryFilters;
}

export function CountryTableSection({filters}: CountryTableSectionProps) {
  const {data: countries} = useSuspenseQuery(countryQueries.list());
  const filteredCountries = useMemo(() => applyFilters(countries ?? [], filters), [countries, filters]);
  return <CountryTable countries={filteredCountries} />;
}
