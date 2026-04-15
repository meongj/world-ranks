import {NeighbouringCountries} from "@/components/NeighbouringCountries";
import {InfoList} from "@/components/ui/info-list";
import {Separator} from "@/components/ui/separator";
import {SkeletonCard} from "@/components/ui/skeletonCard";
import {countryQueries} from "@/queries/countries";
import {Suspense} from "@suspensive/react";
import {useSuspenseQuery} from "@tanstack/react-query";
import {createFileRoute} from "@tanstack/react-router";

export const Route = createFileRoute("/_app/country/$countryCode")({
  component: CountryDetailPage,
});

function CountryDetailPage() {
  const {countryCode} = Route.useParams();
  const {data: country} = useSuspenseQuery(countryQueries.detail(countryCode));

  const language = Object.values(country.languages ?? {}).join(", ");
  const currencies = Object.values(country.currencies ?? {})
    .map((c) => c.name)
    .join(", ");

  return (
    <article>
      <img src={country.flags.svg} alt={country.flags.alt} className="mx-auto h-40 w-64 rounded-md object-cover" />
      <h1 className="mt-4 text-center text-2xl font-semibold">{country.name.common}</h1>
      <p className="text-center text-sm text-muted-foreground">{country.name.official}</p>

      <div className="my-10 flex gap-3 justify-center">
        <Stat label="Population" value={country.population.toLocaleString()} />
        <Stat label="Area(km²)" value={country.area.toLocaleString()} />
      </div>

      <InfoList>
        <InfoList.Row label="Capital" value={country.capital} />
        <InfoList.Row label="Subregion" value={country.subregion} />
        <InfoList.Row label="Language" value={language} />
        <InfoList.Row label="Currencies" value={currencies} />
        <InfoList.Row label="Region" value={country.region} />
      </InfoList>

      {/* 인근 국가 */}
      {country.borders && country.borders.length > 0 && (
        <Suspense fallback={<SkeletonCard count={country.borders.length} title="Neighbouring Countries" />}>
          <NeighbouringCountries borders={country.borders} />
        </Suspense>
      )}
    </article>
  );
}

function Stat({label, value}: {label: string; value: string}) {
  return (
    <div className="border rounded-md bg-chart-5 flex px-4 py-3 text-center items-center gap-1">
      <div className="text-xs text-muted-foreground">{label}</div>
      <Separator className="mx-1" orientation="vertical" />
      <div className="text-sm font-medium">{value}</div>
    </div>
  );
}
