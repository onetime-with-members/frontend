# CLAUDE.md

이 저장소에서 작업할 때 참고할 가이드입니다.

## 개발 환경 / 빌드

- 패키지 매니저: **pnpm 11.x**. 의존성 빌드 스크립트 승인은 `pnpm-workspace.yaml`의
  **`allowBuilds`** 맵에서 패키지별 `true`/`false`로 관리합니다(이 버전 pnpm의 정식 필드).
  값이 비어 있거나 플레이스홀더 문자열이면 `pnpm install`이 `ERR_PNPM_IGNORED_BUILDS`로
  실패하고, `pnpm dev`도 사전 의존성 검사 단계에서 막힙니다. 네이티브 빌드가 필요한
  패키지(`sharp`, `esbuild`, `@swc/core`, `cypress`, `msw`, `unrs-resolver`, `workerd`)는
  `true`로 둡니다.
- 번들러: **webpack** (dev `next dev`·build `next build` 모두 webpack. dev 로그에
  `(Turbopack)` 표기 없음). 배포는 `opennextjs-cloudflare`(Cloudflare Workers).
- Markdown(`.md`)을 원시 문자열로 import하기 위해 `next.config.ts`에서 webpack
  `asset/source`를 사용합니다. **별도 로더 의존성(raw-loader 등) 불필요.** `*.md` 모듈
  타입은 `src/features/guide/types/markdown.d.ts`의 `declare module '*.md'`로 선언합니다.

## 디렉터리 컨벤션

- feature 기반 구조: `src/features/<domain>/`. feature 내부 헬퍼는 대체로 `utils/`를
  사용합니다(`event`, `schedule`, `my-schedule`, `user` 등). 일부는 `lib/`(`auth`, `home`).
- 글로벌 `src/lib/`는 **도메인 무관 공용 인프라 전용**(`cn`, `dayjs`, `auth`, `api`,
  `query-client`). 특정 feature 타입에 의존하는 코드를 여기에 두지 않습니다.
- 내부 링크는 `@/navigation`의 `ProgressLink`를 사용합니다(locale 접두사 + 상단 진행바 유지).
- i18n 메시지는 `src/messages/{ko,en}.json`. 라우트는 `[locale]` 세그먼트 기반.

## Guide 기능 (`src/features/guide/`)

AdSense 승인용 사용법 가이드(`/guide`, `/guide/[slug]`). 글 본문은 Markdown 파일에 두고
frontmatter에서 메타데이터를 추출하는 방식입니다.

### 구조

```
src/features/guide/
├─ content/                   # .md 파일만 (순수 콘텐츠)
│  ├─ 01-getting-started.{ko,en}.md
│  ├─ 02-creating-an-event.{ko,en}.md
│  ├─ 03-adding-availability.{ko,en}.md
│  ├─ 04-viewing-results.{ko,en}.md
│  └─ 05-sharing-and-confirming.{ko,en}.md
├─ utils/
│  ├─ define.ts               # parseMarkdown(frontmatter 파서) + buildArticle
│  ├─ article-registry.ts     # articles 배열 = .md import + buildArticle (글 추가 시 여기만 증가)
│  └─ articles.ts             # guideArticles(정렬)·guideSlugs·조회 함수 (고정 로직)
├─ constants/index.ts         # GUIDE_SECTION_ORDER, GUIDE_SECTION_MESSAGE_KEY
├─ types/
│  ├─ index.ts                # GuideArticle, GuideSection, ArticleSource, ParsedMarkdown 등
│  └─ markdown.d.ts           # declare module '*.md'
├─ components/                # GuideSidebar, GuideSectionList, GuideArticleContent, GuidePrevNext
└─ pages/                     # GuideIndexPage, GuideArticlePage (server components)
```

### 핵심 규칙

- **Markdown frontmatter**: 각 `.md` 상단 `---` 블록에 `title`, `description`을 둡니다
  (react.dev / Next.js 문서 방식). 본문은 그 아래 Markdown. `utils/define.ts`의
  `parseMarkdown`이 추출합니다.
- **구조 메타(`slug`/`section`/`order`)**: `article-registry.ts`의 `buildArticle({...})`
  호출에 명시합니다(frontmatter가 아님). 한 곳에서 전체 글의 순서·섹션을 볼 수 있습니다.
- **파일명 접두사** `01-`~: `order` 값과 맞춘 정렬용 표기일 뿐, **URL 슬러그와 무관**합니다.
  슬러그는 `buildArticle`의 `slug` 값에서 옵니다.
- **데이터 ↔ 로직 분리**: 커지는 데이터는 `article-registry.ts`, 고정 조회 로직은
  `articles.ts`. 소비처(`pages/*`, `src/app/sitemap.ts`)는 `utils/articles`에서 import.
- **렌더링**: 본문은 `GuideArticleContent`(`'use client'`, `react-markdown`)에서 변환.
  메타데이터/사이드바/카드/`<h1>`은 server component에서 frontmatter 값으로 생성.

### 글 추가 방법

1. `content/`에 `NN-<slug>.ko.md` / `NN-<slug>.en.md` 생성 (frontmatter에 `title`,
   `description` 포함).
2. `utils/article-registry.ts`에 `.md` import 2줄 + `buildArticle({ slug, section, order,
   ko, en })` 블록 하나 추가.
3. 사이드바·인덱스·prev/next·sitemap·정적 경로(`generateStaticParams`)는 자동 반영됩니다.

### 데이터 흐름

```
content/NN-*.md (frontmatter + 본문)
   → [webpack asset/source] 원시 문자열
   → utils/article-registry.ts: buildArticle → articles[]
   → utils/articles.ts: 정렬·조회 (guideArticles, guideSlugs, getGuideArticle 등)
   → pages / sitemap 소비
```
