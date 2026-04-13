// 국가 데이터 fetch

import {api} from "@/lib/axios";
import {Country} from "@/types/country";
import {useSuspenseQuery} from "@tanstack/react-query";

export function useCountries() {
  return useSuspenseQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      return api
        .get<
          Country[]
        >("/all?fields=name,population,area,borders,flags,independent,unMember,continents,region,subregion")
        .then((res) => res.data);
    },
    staleTime: 1000 * 60 * 60 * 24, // 24시간
  });
}
