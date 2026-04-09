import {ButtonFilter} from "@/components/ButtonFilter";
import {CountryTable} from "@/components/CountryTable";
import {HeroSection} from "@/components/HeroSection";
import {SearchInput} from "@/components/SearchInput";
import {SortSelect} from "@/components/SortSelect";
import {StatusFilter} from "@/components/StatusFilter";
import {createFileRoute} from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <div className="bg-[#1C1D1F]">
        <div className="rounded-xl border border-[#282B30] bg-[#1C1D1F] p-6">
          <div className="relative -mt-12 mx-auto max-w-[1100px] px-4 pb-8">
            <div className="rounded-xl border border-[#282B30] bg-[#1C1D1F] p-6">
              {/* CardHeader */}
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
                <p className="text-[#6C727F] font-semibold">Found ... countries</p>
                <div className="w-full md:w-[300px]">
                  <SearchInput />
                </div>
              </div>

              {/* CardBody - 다음 스텝에서 채움 */}
              <div className="flex flex-col xl:flex-row gap-6">
                <aside className="w-full xl:w-[240px] shrink-0 flex flex-col gap-10">
                  <SortSelect />
                  <ButtonFilter />
                  <StatusFilter />
                </aside>
                <div className="flex-1">
                  <CountryTable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
