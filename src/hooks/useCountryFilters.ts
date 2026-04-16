import {CountryFilters, Region, SortField} from "@/types/country";
import {Dispatch, useReducer} from "react";

const DEFAULT_FILTERS: CountryFilters = {
  search: "",
  sortBy: "population",
  regions: [],
  // 기본이 체크 안함
  unMember: false,
  independent: false,
};

// action creators
export const filterActions = {
  setSearch: (search: string) => ({type: "SET_SEARCH" as const, payload: search}),
  setSortBy: (sortBy: SortField) => ({type: "SET_SORT" as const, payload: sortBy}),
  toggleRegion: (region: Region) => ({type: "TOGGLE_REGION" as const, payload: region}),
  toggleUnMember: () => ({type: "TOGGLE_UN_MEMBER" as const}),
  toggleIndependent: () => ({type: "TOGGLE_INDEPENDENT" as const}),
};

export type FilterAction = ReturnType<(typeof filterActions)[keyof typeof filterActions]>;
export type FilterDispatch = Dispatch<FilterAction>;

function filterReducer(state: CountryFilters, action: FilterAction): CountryFilters {
  switch (action.type) {
    case "SET_SEARCH":
      return {...state, search: action.payload};
    case "SET_SORT":
      return {...state, search: action.payload};
    case "TOGGLE_REGION":
      return {
        ...state,
        regions: state.regions.includes(action.payload)
          ? state.regions.filter((r) => r != action.payload)
          : [...state.regions, action.payload],
      };
    case "TOGGLE_UN_MEMBER":
      return {...state, unMember: !state.unMember};
    case "TOGGLE_INDEPENDENT":
      return {...state, independent: !state.independent};
  }
}

export function useCountryFilters() {
  const [filters, dispatch] = useReducer(filterReducer, DEFAULT_FILTERS);

  return {
    filters,
    dispatch,
  };
}
