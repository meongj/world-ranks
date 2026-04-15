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
        const res = await api.get<Country[]>(
          "/all?fields=cca3,name,population,area,borders,flags,independent,unMember,region,subregion",
        );
        return res.data;
      },
      staleTime: DAY,
    }),
  detail: (code: string) =>
    queryOptions({
      queryKey: countryKeys.detail(code),
      queryFn: async () => {
        const res = await api.get<Country[]>(
          `/alpha?codes=${code}&fields=cca3,name,capital,population,area,borders,flags,independent,unMember,languages,currencies,region,subregion`,
        );
        return res.data[0];
      },
      staleTime: DAY,
      enabled: !!code,
    }),
  borders: (codes: string[]) =>
    queryOptions({
      queryKey: countryKeys.borders(codes),
      queryFn: async () => {
        const res = await api.get<Country[]>(`/alpha?codes=${codes.join(",")}&fields=cca3,name,flags`);
        return res.data;
      },
      staleTime: DAY,
      enabled: codes.length > 0,
    }),
};
