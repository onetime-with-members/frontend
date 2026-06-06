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
│  ├─ articles.ts             # guideArticles(정렬)·guideSlugs·조회 함수 (고정 로직)
│  └─ toc.ts                  # slugifyHeading·getNodeText·extractHeadings (목차/앵커 공용)
├─ constants/index.ts         # GUIDE_SECTION_ORDER, GUIDE_SECTION_MESSAGE_KEY
├─ styles/guide-article.css   # .guide-markdown 스코프 본문 스타일 (markdown-body 오버라이드)
├─ types/
│  ├─ index.ts                # GuideArticle, GuideSection, GuideTocItem, ParsedMarkdown 등
│  └─ markdown.d.ts           # declare module '*.md'
├─ components/                # GuideNavList, GuideSidebar, GuideMobileNav, GuideSectionList, GuidePrevNext, GuideToc, GuideArticleContent
│  ├─ GuideNavList/           # 섹션·글 목록 (사이드바·모바일 시트가 공유하는 프레젠테이션 컴포넌트)
│  ├─ GuideSidebar/           # 좌측 가이드 목차 (server, hidden md:block — 모바일 숨김), GuideNavList 사용
│  ├─ GuideMobileNav/         # 모바일 전용('use client', md:hidden): NavBar 아래 fixed 바 + 바텀시트(GuideNavList)
│  ├─ GuideToc/               # 우측 "이 글의 목차" ('use client', IntersectionObserver scroll-spy, hidden md:block — 모바일 제거)
│  └─ GuideArticleContent/    # react-markdown 래퍼 + 마크다운 렌더러 하위 컴포넌트
│     ├─ GuideArticleContent.tsx   # components 매핑 + <ReactMarkdown> 만
│     ├─ MarkdownAnchor/      # a: 내부 링크는 ProgressLink, 외부는 새 탭 <a>
│     ├─ MarkdownHeading/     # h2: 앵커 id 부여(slugifyHeading) — 목차 링크와 슬러그 공유
│     ├─ MarkdownBlockquote/  # blockquote: 팁/주의 콜아웃 감지·라벨 분리, 그 외엔 기본
│     ├─ MarkdownImage/       # img: <figure> + 캡션, 사이즈(#sm 힌트)/테두리 스타일
│     └─ MarkdownParagraph/   # p: 이미지 단독 단락은 <p> 언랩, 다중 이미지는 가로 행
└─ pages/                     # GuideIndexPage, GuideArticlePage (server components)
```

본문 이미지는 **글(slug)별 하위 폴더**로 정리합니다: `public/images/guide/<slug>/<name>-{ko,en}.png`
(예: `public/images/guide/creating-an-event/title-ko.png`). 폴더명이 페이지를 나타내므로
파일명에 slug를 반복하지 않습니다.
(스케줄 등록 안내 팝업 이미지는 가이드와 무관하므로 `public/images/schedule-guide/`에
분리되어 있습니다 — 헷갈리지 말 것.)

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
  `react-markdown`의 `components`로 `a`/`h2`/`blockquote`/`img`/`p`를 각각 `MarkdownAnchor`/
  `MarkdownHeading`/`MarkdownBlockquote`/`MarkdownImage`/`MarkdownParagraph`에 매핑합니다.
  메타데이터/사이드바/카드는 server component에서 frontmatter 값으로 생성. **`<h1>`과 설명
  (`description`) 리드 문단은 `markdown-body` 밖**에서 직접 스타일링합니다(본문 `[&_p]` 오버라이드와
  충돌 방지). 본문 `<h1>`은 frontmatter에 두지 않습니다(제목은 `title`에서 옴).
- **글 페이지 레이아웃(`GuideArticlePage`)**: 컨테이너 `max-w-screen-xl`.
  - **데스크톱(md↑)**: 3단 — 좌측 `GuideSidebar` · 중앙 `<article>`(본문) · 우측 `GuideToc`(이 글의 목차).
  - **모바일(md 미만)**: 좌측 `GuideSidebar`와 우측 `GuideToc`는 모두 `hidden`. 대신 `NavBar`
    바로 아래에 `GuideMobileNav`가 **`fixed` 바**(`top-14`, `h-12` — 같은 높이 스페이서로 본문
    자리 확보)로 `섹션 · 글 제목`을 보여주고, "목차" 버튼으로 **바텀시트**를 열어 전체 목록을 노출합니다.
    이 페이지의 `NavBar`는 `shadow={false}`(고정 바와 한 덩어리로 보이게).
- **가이드 목차의 데이터 흐름**: 섹션·글 목록 렌더링은 `GuideNavList`에 단일화되어 `GuideSidebar`
  (데스크톱)와 `GuideMobileNav`(모바일 시트)가 공유합니다 — 활성 표시·링크 스타일이 한 곳에서 관리됩니다.
  상단에 별도 "사용법" 헤더는 두지 않고(제거됨), 섹션 제목 자체를 최상위 헤딩(`text-md-300 text-gray-90`)으로
  강조합니다. `nav.title`("사용법")는 모바일 시트의 `aria-label`로만 쓰이고, 버튼 라벨은 `nav.menu`("목차").
- **시트 닫힘 처리**: `GuideMobileNav` 바텀시트는 링크 자체가 아니라 **상위 `<nav>`의 onClick 버블링**으로
  닫습니다(`ProgressLink`에 `onClick`을 주면 자체 nprogress 네비게이션이 꺼지므로). 시트 열림 동안
  `body` 스크롤을 잠그고 Esc/오버레이로도 닫힙니다.

### 본문 스타일 (`styles/guide-article.css`)

- 가이드 본문(`<article class="markdown-body guide-markdown">`) 전용 스타일은 **이 CSS 파일 한 곳**에
  모읍니다. `GuideArticlePage`에서 import하며, 컴포넌트/페이지에 `[&_...]:!...` 인라인 오버라이드를
  쓰지 않습니다.
- **스코프 + 우선순위**: 모든 규칙을 `.markdown-body.guide-markdown ...` **복합 선택자**로 작성합니다.
  ① `guide-markdown`이 없는 다른 `markdown-body` 사용처(예: `PolicyDetailScreen` 약관/정책)에는 영향이
  없고, ② 두 클래스를 모두 명시해 `github-markdown.css`의 `.markdown-body` 기본 규칙보다 specificity가
  높아 **`!important` 없이** 덮입니다. (이미지의 `!`와 대비 — 아래 참고)
- 페이지 청크(`page.css`)로 번들되어 전역 `github-markdown.css`(layout.css) **뒤에** 로드되는 것도
  우선순위에 유리합니다. `@apply`로 Tailwind 토큰(색/굵기)을 그대로 사용합니다.
- 현재 덮는 항목: 제목(h2/h3) 밑줄 제거, 본문 색(`gray-70`), 링크 primary 색, 불릿(ul) primary 점,
  숫자(ol) **점 없는** primary 카운터, 팁/주의 콜아웃.

### 목차 (`GuideToc` + `utils/toc`)

- `extractHeadings(body)`가 본문 **H2**만 뽑아 `{ id, text }[]`를 만들고, `GuideArticlePage`가 우측
  `GuideToc`에 넘깁니다. `GuideToc`은 `'use client'`로 `IntersectionObserver` scroll-spy를 합니다.
- **앵커 일치 규칙**: 본문 H2의 `id`(`MarkdownHeading`)와 목차 링크(`#id`)는 **같은 `slugifyHeading`**
  으로 만들어 일치시킵니다. 헤딩 텍스트가 곧 슬러그이며, H2에 `scroll-mt-*`로 상단 고정 NavBar 가림을
  방지합니다.

### 팁/주의 콜아웃 (`MarkdownBlockquote`)

- 인용구 첫 줄이 `팁:`/`Tip:` → **팁(primary)**, `주의:`/`Caution:`/`Note:` → **주의(warning)** 박스로
  렌더링됩니다(대소문자·전각 콜론 `：` 허용). 그 외 인용구는 기본 `blockquote` 스타일.
- 접두 라벨(`팁:` 등)은 본문 텍스트에서 **분리 추출**해 헤더(아이콘+라벨) 요소로 올립니다. 본문 첫
  텍스트 노드에서만 제거하되, react-markdown이 `<p>` 앞뒤에 끼우는 공백 노드를 건너뛰고 **첫 요소**를
  찾습니다.
- 박스/색/볼드 강조(`strong`) 스타일은 모두 `guide-article.css`의 `.guide-callout*`에 있습니다
  (팁 `strong`=primary-60, 주의 `strong`=gray-90 — warning 색은 연한 배경에서 가독성이 낮아 회피).

### 본문 이미지 (`MarkdownImage`)

- **삽입**: 본문에 `![alt](/images/guide/<slug>/<name>-{ko,en}.png "캡션")` 형태로 작성합니다.
  `alt`는 접근성용 설명(화면 비노출), 큰따옴표 안의 **`title`이 캡션**으로 `<figcaption>`에
  노출됩니다. 둘은 의도적으로 분리합니다.
- **사이즈 조정**: 기본 폭은 `MarkdownImage.tsx`의 `<img>` className에 있는 **`!max-w-*`**
  한 곳에서 제어합니다(`w-full`로 작은 화면 대응, `h-auto`로 비율 유지). **이미지별로** 더
  작게 하려면 src 끝에 URL 해시로 크기 힌트를 붙입니다: `...time-ko.png#sm`(`#sm`/`#md`/
  `#lg`/`#xl`). 해시는 실제 파일 요청에서 무시되므로 로딩에 영향이 없고, `MarkdownImage`가
  `MAX_WIDTH_BY_SIZE`로 `!max-w-*` 클래스에 매핑합니다.
- **나란히 배치**: 한 단락에 이미지를 빈 줄 없이 연속으로 적으면(react-markdown이 같은 `<p>`로
  묶음) `MarkdownParagraph`가 이미지 2개 이상을 감지해 가로 행(`flex`)으로 나란히 보여 줍니다
  (작은 화면에서는 세로로 쌓임). 각 이미지는 자신의 캡션을 그대로 가집니다.
- **`!`(important) 이유**: 본문은 `markdown-body`(github-markdown.css)를 쓰는데
  `.markdown-body img`(`max-width:100%`·`border-style:none`)와 `.markdown-body figure`
  (`display:block`·`margin:1em 40px`) 규칙이 specificity로 더 강합니다. 폭/테두리/`flex`(gap)/
  여백을 덮으려면 해당 유틸리티에 `!`를 붙여야 합니다. (이미지는 컴포넌트 단에서 인라인 `!`로 덮는
  반면, 그 외 본문 스타일은 `guide-article.css`의 복합 선택자로 `!` 없이 덮습니다 — 위 "본문 스타일" 참고.)
- **하이드레이션**: react-markdown은 이미지 한 줄도 `<p>`로 감싸는데, 그 안의 블록
  `<figure>`는 잘못된 중첩이라 하이드레이션 오류가 납니다. `MarkdownParagraph`가 이미지
  단독 단락을 감지해 `<p>` 래퍼 없이 렌더링합니다.

### 글 추가 방법

1. `content/`에 `NN-<slug>.ko.md` / `NN-<slug>.en.md` 생성 (frontmatter에 `title`,
   `description` 포함).
2. `utils/article-registry.ts`에 `.md` import 2줄 + `buildArticle({ slug, section, order,
   ko, en })` 블록 하나 추가.
3. 사이드바·모바일 목차(둘 다 `GuideNavList`)·인덱스·prev/next·우측 목차(본문 H2 기준)·sitemap·
   정적 경로(`generateStaticParams`)는 자동 반영됩니다.
4. 본문에 팁/주의를 넣을 땐 인용구로 `> 팁: ...` / `> 주의: ...`(en은 `> Tip:` / `> Caution:`)처럼
   적으면 콜아웃으로 렌더링됩니다.

### 데이터 흐름

```
content/NN-*.md (frontmatter + 본문)
   → [webpack asset/source] 원시 문자열
   → utils/article-registry.ts: buildArticle → articles[]
   → utils/articles.ts: 정렬·조회 (guideArticles, guideSlugs, getGuideArticle 등)
   → pages / sitemap 소비
```
