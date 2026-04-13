import {useCountries} from "@/hooks/useCountries";
import {CountryFilters} from "@/types/country";
import {applyFilters} from "@/utils/countryFilters";
import {useMemo} from "react";

interface CountryCountProps {
  filters: CountryFilters;
}

export function CountryCount({filters}: CountryCountProps) {
  const {data: countries} = useCountries(); // Suspense 트리거
  const count = useMemo(() => applyFilters(countries ?? [], filters).length, [countries, filters]);

  return <p className="text-[#6C727F] font-semibold">Found {count} countries</p>;
}
