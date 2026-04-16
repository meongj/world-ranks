import {CountryFilters} from "@/types/country";
import {ButtonFilter} from "./ButtonFilter";
import {SortSelect} from "./SortSelect";
import {StatusFilter} from "./StatusFilter";
import {FilterDispatch} from "@/hooks/useCountryFilters";

interface FiltersSideBarProps {
  filters: CountryFilters;
  dispatch: FilterDispatch;
}

export function FiltersSideBar({filters, dispatch}: FiltersSideBarProps) {
  return (
    <aside className="w-full xl:w-[240px] shrink-0 flex flex-col gap-10">
      <SortSelect value={filters.sortBy} dispatch={dispatch} />
      <ButtonFilter selected={filters.regions} dispatch={dispatch} />
      <StatusFilter unMember={filters.unMember} independent={filters.independent} dispatch={dispatch} />
    </aside>
  );
}
