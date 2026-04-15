import {Country, CountryFilters, Region, SortField} from "@/types/country";
import {useState} from "react";

const DEFAULT_FILTERS: CountryFilters = {
  search: "",
  sortBy: "population",
  regions: [],
  // 기본이 체크 안함
  unMember: false,
  independent: false,
};

export function useCountryFilters() {
  const [filters, setFilters] = useState<CountryFilters>(DEFAULT_FILTERS);

  const setSearch = (search: string) => {
    setFilters((prev) => ({...prev, search}));
  };
  const setSortBy = (sortBy: SortField) => {
    setFilters((prev) => ({...prev, sortBy}));
  };

  const toggleRegion = (region: Region) => {
    setFilters((prev) => ({
      ...prev,
      regions: prev.regions.includes(region) ? prev.regions.filter((r) => r != region) : [...prev.regions, region],
    }));
  };

  const toggleUnMember = () => {
    setFilters((prev) => ({
      ...prev,
      unMember: !prev.unMember,
    }));
  };

  const toggleIndependent = () => {
    setFilters((prev) => ({...prev, independent: !prev.independent}));
  };

  return {
    filters,
    setSearch,
    setSortBy,
    toggleRegion,
    toggleUnMember,
    toggleIndependent,
  };
}
