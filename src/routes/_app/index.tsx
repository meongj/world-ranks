import {SearchInput} from "@/components/SearchInput";

import {createFileRoute} from "@tanstack/react-router";
import {ErrorBoundary, Suspense} from "@suspensive/react";
import {useCountryFilters} from "@/hooks/useCountryFilters";
import {Skeleton} from "@/components/ui/skeleton";
import {CountryCount} from "@/components/CountryCount";
import {CountryTableSection} from "@/components/CountryTableSection";
import {CountryTableSkeleton} from "@/components/CountryTableSkeleton";
import {FiltersSideBar} from "@/components/FiltersSideBar";

export const Route = createFileRoute("/_app/")({
  component: HomePage,
});

function HomePage() {
  const {filters, dispatch} = useCountryFilters(); // 구조분해할당

  return (
    <>
      {/* CardHeader */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <ErrorBoundary fallback={() => <p className="text-[#6C727F]">-</p>}>
          <Suspense fallback={<Skeleton className="h-5 w-40" />}>
            <CountryCount filters={filters} />
          </Suspense>
        </ErrorBoundary>
        <div className="w-full md:w-[300px]">
          <SearchInput dispatch={dispatch} />
        </div>
      </div>
      {/* CardBody - 다음 스텝에서 채움 */}
      <div className="flex flex-col xl:flex-row gap-6">
        <FiltersSideBar filters={filters} dispatch={dispatch} />
        <div className="flex-1">
          <ErrorBoundary
            fallback={({error, reset}) => (
              <div>
                <p>에러가 발생했습니다 :{error.message}</p>
                <button onClick={reset}>다시 시도해주세요</button>
              </div>
            )}>
            <Suspense fallback={<CountryTableSkeleton />}>
              <CountryTableSection filters={filters} />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
      <div />
    </>
  );
}
