import {CountryFilters, Region, SortField} from "@/types/country";
import {ButtonFilter} from "./ButtonFilter";
import {SortSelect} from "./SortSelect";
import {StatusFilter} from "./StatusFilter";

interface FiltersSideBarProps {
  filters: CountryFilters;
  setSortBy: (sortBy: SortField) => void;
  toggleRegion: (region: Region) => void;
  toggleUnMember: () => void;
  toggleIndependent: () => void;
}

export function FiltersSideBar({
  filters,
  setSortBy,
  toggleRegion,
  toggleUnMember,
  toggleIndependent,
}: FiltersSideBarProps) {
  return (
    <aside className="w-full xl:w-[240px] shrink-0 flex flex-col gap-10">
      <SortSelect value={filters.sortBy} onChange={setSortBy} />
      <ButtonFilter selected={filters.regions} onToggle={toggleRegion} />
      <StatusFilter
        unMember={filters.unMember}
        independent={filters.independent}
        onToggleUnMember={toggleUnMember}
        onToggleIndependent={toggleIndependent}
      />
    </aside>
  );
}
