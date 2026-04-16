import {Region} from "@/types/country";
import {Button} from "./ui/button";
import {filterActions, FilterDispatch} from "@/hooks/useCountryFilters";

const REGIONS: Region[] = ["Americas", "Antarctic", "Africa", "Asia", "Europe", "Oceania"];

interface ButtonFilterProps {
  selected: Region[];
  dispatch: FilterDispatch;
}

export function ButtonFilter({selected, dispatch}: ButtonFilterProps) {
  return (
    <div>
      <p className="text-xs text-muted-foreground mb-2">Region</p>
      <div className="flex flex-wrap gap-2">
        {REGIONS.map((region) => (
          <Button
            key={region}
            variant="chip"
            size="lg"
            data-active={selected.includes(region)}
            onClick={() => dispatch(filterActions.toggleRegion(region))}>
            {region}
          </Button>
        ))}
      </div>
    </div>
  );
}
