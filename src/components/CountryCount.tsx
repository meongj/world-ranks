import {useFilteredCountries} from "@/hooks/useFilteredCountries";
import {CountryFilters} from "@/types/country";

interface CountryCountProps {
  filters: CountryFilters;
}

export function CountryCount({filters}: CountryCountProps) {
  const filtered = useFilteredCountries(filters);
  return <p className="text-[#6C727F] font-semibold">Found {filtered.length} countries</p>;
}
