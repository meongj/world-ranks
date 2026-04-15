import {countryQueries} from "@/queries/countries";
import {CountryFilters} from "@/types/country";
import {applyFilters} from "@/utils/countryFilters";
import {useSuspenseQuery} from "@tanstack/react-query";
import {useMemo} from "react";

export function useFilteredCountries(filters: CountryFilters) {
  const {data: countries} = useSuspenseQuery(countryQueries.list());
  return useMemo(() => applyFilters(countries, filters), [countries, filters]);
}
