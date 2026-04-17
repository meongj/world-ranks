// 기준 : 순수 함수
// 영어로 검색 (default)

import { Country, CountryFilters, Region } from '@/types/country';
import { sortBy as sortByFn, orderBy } from 'es-toolkit';
import Fuse from 'fuse.js';

export function filterBySearch(
  countries: Country[],
  search: string,
): Country[] {
  if (!search) return countries;

  // 관대한 매칭
  const fuse = new Fuse(countries, {
    keys: ['name.common', 'region', 'subregion'],
    threshold: 0.2, // 0=완전일치, 1=전부매칭. 0.4면 적당히 관대
    ignoreLocation: true, // 문자열 위치 무관하게 검색
  });

  return fuse.search(search).map((result) => result.item);
}

export function filterByRegions(countries: Country[], regions: Region[]) {
  if (regions.length === 0) return countries;
  return countries.filter((c) => regions.includes(c.region as Region));
}

// UN국가인지, 독립국가인지 필터링
export function filterByStatus(
  countries: Country[],
  { unMember, independent }: Pick<CountryFilters, 'unMember' | 'independent'>,
): Country[] {
  let result = countries;
  if (unMember) result = result.filter((c) => c.unMember);
  if (independent) result = result.filter((c) => c.independent);
  return result;
}

// 카테고리별  정렬
/**
 * name : 오름차순 (A->Z)
 * Population: 내림차순 (큰 수먼저)
 * Area : 내림차순 (큰 면적 먼저)
 */
export function sortCountries(
  countries: Country[],
  field: CountryFilters['sortBy'],
) {
  switch (field) {
    case 'name':
      return sortByFn(countries, [(c) => c.name.common]);
    case 'population':
      return orderBy(countries, [(c) => c.population], ['desc']);
    case 'area':
      return orderBy(countries, [(c) => c.area], ['desc']);
  }
}

// 모든 필터를 조합한 최종 필터링 함수
export function applyFilters(
  countries: Country[],
  filters: CountryFilters,
): Country[] {
  let result = countries;
  result = filterBySearch(result, filters.search);
  result = filterByRegions(result, filters.regions);
  result = filterByStatus(result, filters);
  result = sortCountries(result, filters.sortBy);
  return result;
}
