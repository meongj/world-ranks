import {api} from "@/lib/axios";
import {Country} from "@/types/country";
import {queryOptions} from "@tanstack/react-query";

const DAY = 1000 * 60 * 60 * 24;

// 국가 데이터
export const countryKeys = {
  all: ["countries"] as const,
  detail: (code: string) => [...countryKeys.all, "detail", code] as const,
  borders: (codes: string[]) => [...countryKeys.all, "borders", [...codes].sort()] as const,
};

export const countryQueries = {
  list: () =>
    queryOptions({
      queryKey: countryKeys.all,
      queryFn: async () => {
        await api
          .get<Country[]>("/all?fields=cc3,name,population,area,borders,flags,independent,unMember,region,subregion")
          .then((res) => res.data);
      },
      staleTime: DAY,
    }),
  detail: (code: string) =>
    queryOptions({
      queryKey: countryKeys.detail(code),
      queryFn: async () => {
        await api.get<Country[]>(
          `/alpha?codes=${code}&fields=cca3,name,capital,population,area,borders,flags,independent,unMember,languages,currencies,region,subregion`,
        );
      },
      staleTime: DAY,
      enabled: !!code,
    }),
  borders: (codes: string[]) =>
    queryOptions({
      queryKey: countryKeys.borders(codes),
      queryFn: async () => await api.get<Country[]>(`/alpha?codes=${codes.join(",")}&fields=cca3,name,flags`).data,
      staleTime: DAY,
      enabled: codes.length > 0,
    }),
};
