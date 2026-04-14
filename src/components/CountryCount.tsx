import {countryQueries} from "@/queries/countries";
import {CountryFilters} from "@/types/country";
import {applyFilters} from "@/utils/countryFilters";
import {useSuspenseQuery} from "@tanstack/react-query";
import {useMemo} from "react";

interface CountryCountProps {
  filters: CountryFilters;
}

export function CountryCount({filters}: CountryCountProps) {
  const {data: countries} = useSuspenseQuery(countryQueries.list());
  const count = useMemo(() => applyFilters(countries ?? [], filters).length, [countries, filters]);

  return <p className="text-[#6C727F] font-semibold">Found {count} countries</p>;
}
