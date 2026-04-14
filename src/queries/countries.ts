import {api} from "@/lib/axios";
import {Country} from "@/types/country";
import {queryOptions} from "@tanstack/react-query";

// 국가 데이터
export const countryKeys = {
  all: ["countries"] as const,
};

export const countryQueries = {
  list: () =>
    queryOptions({
      queryKey: countryKeys.all,
      queryFn: async () => {
        return await api
          .get<
            Country[]
          >("/all?fields=name,population,area,borders,flags,independent,unMember,continents,region,subregion")
          .then((res) => res.data);
      },
      staleTime: 1000 * 60 * 60 * 24, // 24시간
    }),
};
