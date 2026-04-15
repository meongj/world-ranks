import {NeighbouringCountries} from "@/components/NeighbouringCountries";
import {InfoList} from "@/components/ui/info-list";
import {Separator} from "@/components/ui/separator";
import {Skeleton} from "@/components/ui/skeleton";
import {SkeletonCard} from "@/components/ui/skeletonCard";
import {countryQueries} from "@/queries/countries";
import {ErrorBoundary, Suspense} from "@suspensive/react";
import {useSuspenseQuery} from "@tanstack/react-query";
import {createFileRoute} from "@tanstack/react-router";

export const Route = createFileRoute("/_app/country/$countryCode")({
  component: CountryDetailPage,
});

function CountryDetailPage() {
  const {countryCode} = Route.useParams();

  return (
    <ErrorBoundary fallback={({error, reset}) => <CountryCoreError message={error.message} onRetry={reset} />}>
      <Suspense fallback={<CountryCoreSkeleton />}>
        <CountryCore countryCode={countryCode} />
      </Suspense>
    </ErrorBoundary>
  );
}

function CountryCore({countryCode}: {countryCode: string}) {
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

function CountryCoreError({message, onRetry}: {message: string; onRetry: () => void}) {
  return (
    <div className="flex flex-col items-center gap-3 py-12">
      <p className="text-sm text-muted-foreground">국가 정보를 불러오지 못했어요</p>
      <p className="text-xs text-muted-foreground/70">{message}</p>
      <button onClick={onRetry} className="rounded-md border bg-muted/30 px-4 py-2 text-sm hover:bg-muted/50">
        다시 시도
      </button>
    </div>
  );
}

/* ──────────────────────────────────────────────
     스켈레톤: 실제 article 구조와 1:1 매칭
     ────────────────────────────────────────────── */
function CountryCoreSkeleton() {
  return (
    <article>
      {/* 플래그 자리 */}
      <Skeleton className="mx-auto h-40 w-64 rounded-md" />
      {/* 국가명 */}
      <Skeleton className="mx-auto mt-4 h-7 w-48" />
      {/* 공식명 */}
      <Skeleton className="mx-auto mt-2 h-4 w-32" />

      {/* 통계 카드 2개 */}
      <div className="my-6 flex justify-center gap-6">
        <Skeleton className="h-20 w-44 rounded-md" />
        <Skeleton className="h-20 w-44 rounded-md" />
      </div>

      {/* InfoList 5행 — 실제 행 높이/padding과 동일하게 */}
      <div className="divide-y divide-border rounded-lg border bg-card">
        {Array.from({length: 5}).map((_, i) => (
          <div key={i} className="flex items-center justify-between gap-4 px-4 py-3">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-32" />
          </div>
        ))}
      </div>
    </article>
  );
}
