# WorldRanks

REST Countries API 기반의 국가 순위 조회 애플리케이션입니다.
단순한 데이터 나열이 아닌, **관심사 분리와 렌더링 최적화에 초점**을 맞춰 설계했습니다.


## 스크린샷
> 🇰🇷 [배포 사이트](https://world-ranks-ashy.vercel.app/)


## 애플리케이션 개발 의도

- **상태 관리**: 조회 필터링의 `useState` + 개별 setter 대신 `useReducer` + action creator 패턴을 선택했습니다. `dispatch`가 안정 참조이므로 자식 컴포넌트에 `useCallback` 없이 전달할 수 있고, 필터 로직이 reducer 안에 응집됩니다.
- **데이터 페칭과 필터링 분리**: React Query(`useSuspenseQuery`)로 데이터를 가져오고, 순수 함수(`applyFilters`)로 필터링합니다. 페칭 로직과 UI 로직이 섞이지 않아 테스트와 유지보수가 쉽습니다.
- **Suspense 기반 로딩**: `Suspense` + `ErrorBoundary`를 컴포넌트 단위로 배치해서 데이터 로딩, 에러 처리, 스켈레톤 UI를 선언적으로 관리합니다. 스켈레톤은 실제 레이아웃과 1:1로 대응시켜 레이아웃 시프트를 방지했습니다.
- **렌더링 최적화**: `React.memo`로 필터 변경 시 관련 없는 컴포넌트의 리렌더링을 방지합니다. 예를 들어 region을 토글해도 `SearchInput`이나 `SortSelect`는 리렌더되지 않습니다.

## 기능

- 인구수, 면적, 이름 기준 정렬
- 지역별 필터링 (Americas, Africa, Asia, Europe, Oceania, Antarctic)
- UN 회원국 / 독립국 상태 필터
- Fuse.js 기반 퍼지 검색 (이름, 지역, 하위 지역)
- 국가 상세 정보 조회 (인구, 면적, 수도, 언어, 화폐, 인근 국가)
- 반응형 레이아웃 및 반응형 테이블 지원 (모바일에서 Region 컬럼 자동 숨김)
- 다크 모드 지원
- 로딩시 스켈레톤 지원

## 기술 스택

| 영역          | 기술                       | 선택 이유                                     |
| ------------- | -------------------------- | --------------------------------------------- |
| UI            | React 19 + TypeScript      | Suspense 기반 데이터 페칭 활용                |
| 라우팅        | TanStack Router            | 파일 기반 라우팅, 타입 안전한 params          |
| 서버 상태     | TanStack Query             | queryOptions 팩토리 패턴으로 쿼리 중앙 관리   |
| 테이블        | TanStack Table             | headless UI로 columnVisibility 등 세밀한 제어 |
| 검색          | Fuse.js                    | 오타 허용하는 관대한 퍼지 매칭                |
| 스타일        | Tailwind CSS 4 + shadcn/ui | 디자인 시스템 기반 일관된 UI                  |
| UI 프리미티브 | Radix UI                   | 접근성 내장된 unstyled 컴포넌트               |
| 유틸리티      | es-toolkit                 | debounce 등 경량 유틸리티                     |
| 빌드          | Vite                       | 빠른 HMR, 자동 코드 스플리팅                  |

## 프로젝트 구조

```
src/
├── routes/                  # TanStack Router 파일 기반 라우팅
│   ├── __root.tsx           # QueryClientProvider, devtools
│   ├── _app.tsx             # 공통 레이아웃 (PageLayout)
│   └── _app/
│       ├── index.tsx        # 홈 (국가 목록 + 필터)
│       └── country/$countryCode.tsx  # 상세 페이지
├── components/              # UI 컴포넌트
│   ├── CountryTable.tsx     # TanStack Table + 반응형 컬럼
│   ├── FiltersSideBar.tsx   # 필터 컨트롤 컨테이너
│   ├── SearchInput.tsx      # debounce 검색
│   └── ui/                  # shadcn/Radix 기반 디자인 시스템
├── hooks/
│   ├── useCountryFilters.ts     # useReducer + action creator
│   ├── useFilteredCountries.ts  # 쿼리 + 필터 조합
│   └── useMediaQuery.ts        # 반응형 감지
├── queries/                 # queryOptions 팩토리
├── utils/                   # 순수 필터/정렬 함수
├── types/                   # TypeScript 인터페이스
├── constants/               # 브레이크포인트 등 상수
└── lib/                     # axios, queryClient, cn 유틸
```

## 아키텍처 특징

### 필터 파이프라인

```
dispatch(action) → filterReducer → filters 상태 변경
                                       ↓
                              useFilteredCountries
                                       ↓
                    useSuspenseQuery → 캐시된 전체 데이터
                                       ↓
                    applyFilters (순수 함수 파이프라인)
                    ├── filterBySearch (Fuse.js)
                    ├── filterByRegions
                    ├── filterByStatus
                    └── sortCountries
                              ↓
                    필터링된 데이터 → 테이블 렌더링
```

### 렌더링 최적화

```
HomePage (useReducer → dispatch 안정 참조)
├── SearchInput (memo) ← dispatch만 받으므로 리렌더 안 됨
├── SortSelect (memo) ← sortBy 변경 시에만 리렌더
├── ButtonFilter (memo) ← regions 변경 시에만 리렌더
├── StatusFilter (memo) ← unMember/independent 변경 시에만 리렌더
├── CountryCount ← filters 변경 시 리렌더 (의도된 동작)
└── CountryTable ← filters 변경 시 리렌더 (의도된 동작)
```

## 시작하기

```bash
# 설치
pnpm install

# 개발 서버
pnpm dev

# 빌드
pnpm build

# 린트
pnpm lint
```

## API

[REST Countries API v3.1](https://restcountries.com/v3.1) 사용. 필요한 필드만 선택적으로 요청하여 응답 크기를 최소화합니다.
