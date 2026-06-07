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
│  ├─ articles.ts             # 'server-only': guideArticles(GUIDE_SECTIONS 순서로 정렬)·guideSlugs·글 조회 (본문 .md 의존)
│  ├─ sections.ts             # 섹션 조회 getGuideSection·getGuideSectionTitle (GUIDE_SECTIONS만 의존 → server-only 아님, client/server 공용)
│  └─ toc.ts                  # slugifyHeading·getNodeText·extractHeadings (목차/앵커 공용)
├─ constants/index.ts         # GUIDE_SECTIONS (섹션 id+제목 LocalizedText, 순수 데이터). GuideSectionId·정렬 순서가 여기서 파생
├─ generated/image-sizes.json # 본문 이미지 width/height manifest (scripts/gen-guide-image-sizes.mjs 생성 — CLS 방지)
├─ styles/guide-article.css   # .guide-markdown 스코프 본문 스타일 (markdown-body 오버라이드)
├─ types/
│  ├─ index.ts                # GuideArticle(Meta), GuideSection(Meta), GuideSectionId(GUIDE_SECTIONS 파생), LocalizedText, GuideTocItem
│  └─ markdown.d.ts           # declare module '*.md'
├─ components/                # index/(GuideIndexHeader·GuideSectionList) + article/(GuideNavList·GuideSidebar·GuideMobileNav·GuidePrevNext·GuideToc·GuideArticleContent)
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
- **데이터 ↔ 로직 분리**: 커지는 글 데이터는 `article-registry.ts`, 고정 글 조회 로직은
  `articles.ts`(`'server-only'` — 본문 `.md` 전체를 들고 있어 client 번들 유출 방지). 소비처
  (`pages/*`, `src/app/sitemap.ts`)는 `utils/articles`에서 import.
- **섹션은 `GUIDE_SECTIONS` 단일 소스**: 섹션 id·제목(`LocalizedText`)은 `constants/index.ts`의
  `GUIDE_SECTIONS`(순수 데이터, import 0)에 두고, `GuideSectionId`는 `(typeof GUIDE_SECTIONS)[number]['id']`로
  **파생**합니다(수동 유니온 동기화 X). 글 정렬도 `GUIDE_SECTIONS.flatMap`으로 그 순서를 직접 씁니다(별도
  순서 상수 없음). 섹션 조회(`getGuideSection`/`getGuideSectionTitle`)는 `utils/sections.ts`에 두는데,
  `articles.ts`(server-only)와 달리 **`GUIDE_SECTIONS`만 의존하므로 server-only가 아니라 client
  (`GuideMobileNavBar` 등)·server 양쪽에서 사용**합니다. 섹션 제목은 **i18n 메시지가 아니라 데이터**
  (article 제목과 동일하게 `LocalizedText`로 `[locale]` 접근)입니다.
- **타입 위치**: 도메인 타입은 `types/index.ts`에 모으되, `LocalizedText`만은 `constants`에 두면
  `constants → types → constants` 순환이 생기므로 `types`가 `GUIDE_SECTIONS`(값)를 import해
  `GuideSectionId`를 파생하는 단방향(`types → constants`)을 유지합니다. 단일 함수 전용 ad-hoc 타입
  (반환/인자 shape)은 named로 빼지 않고 그 자리에 inline합니다.
- **i18n 메시지 구조**: guide 메시지는 다른 도메인과 동일하게 `guide.pages.<PageName>` /
  `guide.components.<ComponentName>` 패턴으로 둡니다(예: `guide.pages.GuideIndexPage.{title, description}`,
  `guide.components.{GuideMobileNav, GuideToc, GuidePrevNext}`). 소비처는 그 네임스페이스로
  `useTranslations`/`getTranslations`를 좁혀 평평한 키로 씁니다. **콘텐츠성 텍스트(섹션·글 제목)는
  메시지가 아니라 데이터**(`GUIDE_SECTIONS`·frontmatter)에 있고, 메시지에는 UI 텍스트만 둡니다.
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
  강조합니다. 섹션 제목은 `GUIDE_SECTIONS` 데이터에서 옵니다(i18n 아님). 모바일 시트의 `aria-label`("사용법")과
  "목차" 버튼 라벨은 i18n 메시지 `guide.components.GuideMobileNav.{title, menu}`에서 옵니다.
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

### 본문 이미지 (`MarkdownImage` + 크기 manifest)

- **삽입**: 본문에 `![alt](/images/guide/<slug>/<name>-{ko,en}.<ext> "캡션")` 형태로 작성합니다.
  `alt`는 접근성용 설명(화면 비노출), 큰따옴표 안의 **`title`이 캡션**으로 `<figcaption>`에
  노출됩니다. 둘은 의도적으로 분리합니다.
- **확장자는 원본 그대로**: `.png`가 기본이지만 `.jpg`/`.jpeg` 등 다른 포맷이 들어와도 **확장자를
  바꾸지 말고 그대로** 참조합니다. `MarkdownImage`는 src 확장자를 가정하지 않고(`next/image`가 처리),
  크기 추출 스크립트도 **파일 내용(시그니처)으로 PNG/JPEG를 판별**하므로 포맷 변환이 불필요합니다.
  (확장자가 실제 포맷과 다른 파일만 예외 — 예: 내용은 JPEG인데 `.png` — 헤더 파싱이 깨지므로 그럴 땐
  실제 포맷에 맞게 확장자만 리네임합니다.)
- **렌더링은 `next/image`**: `MarkdownImage`는 `<img>`가 아니라 `next/image`의 `Image`로 렌더합니다.
  각 이미지의 실제 픽셀 `width`/`height`를 줘 브라우저가 **로드 전 종횡비 공간을 예약** → Layout
  Shift(CLS)를 방지합니다. 표시 크기는 `w-full h-auto !max-w-*`(반응형)로 제어하고 `sizes`로 srcset을 고릅니다.
- **크기 manifest**: width/height는 `generated/image-sizes.json`(`{ "<url>": { width, height } }`)에서
  옵니다. `scripts/gen-guide-image-sizes.mjs`가 `public/images/guide/**`의 PNG/JPEG **헤더에서 크기를
  추출**해 생성합니다(npm 의존성 0, 시그니처로 포맷 분기). `predev`/`prebuild`에서 자동 갱신되고, 수동은
  `pnpm gen:guide-image-sizes`. **이미지를 추가·교체하면 manifest를 갱신**해야 합니다(누락 시 fallback
  크기가 적용돼 CLS·왜곡이 생깁니다).
- **사이즈 조정**: 기본 폭은 `MarkdownImage.tsx`의 `!max-w-*`(=xl) 한 곳에서 제어합니다(`w-full`로 작은
  화면 대응, `h-auto`로 비율 유지). **이미지별로** 더 작게 하려면 src 끝에 URL 해시로 크기 힌트를 붙입니다:
  `...time-ko.png#sm`(`#xs`/`#sm`/`#md`/`#lg`/`#xl`). 해시는 실제 파일 요청·manifest 조회에서 무시되고,
  `MarkdownImage`가 `SIZE_HINT`로 `!max-w-*` 클래스와 `sizes`에 매핑합니다.
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
   ko, en })` 블록 하나 추가. `section`은 `GUIDE_SECTIONS`의 id 중 하나입니다 — **새 섹션이 필요하면**
   `constants`의 `GUIDE_SECTIONS`에 `{ id, title: { ko, en } }`를 먼저 추가하면 `GuideSectionId`·정렬
   순서·섹션 헤딩이 자동 반영됩니다(i18n 메시지 추가 불필요).
3. 본문에 이미지를 넣으면 `public/images/guide/<slug>/`에 `<name>-{ko,en}.<ext>`로 두고(확장자는
   **원본 그대로** — png/jpg 등 변환 X), 크기 manifest는 `predev`/`prebuild`(또는 `pnpm
   gen:guide-image-sizes`)로 갱신합니다.
4. 사이드바·모바일 목차(둘 다 `GuideNavList`)·인덱스·prev/next·우측 목차(본문 H2 기준)·sitemap·
   정적 경로(`generateStaticParams`)는 자동 반영됩니다.
5. 본문에 팁/주의를 넣을 땐 인용구로 `> 팁: ...` / `> 주의: ...`(en은 `> Tip:` / `> Caution:`)처럼
   적으면 콜아웃으로 렌더링됩니다.

### 데이터 흐름

```
content/NN-*.md (frontmatter + 본문)
   → [webpack asset/source] 원시 문자열
   → utils/article-registry.ts: buildArticle → articles[]
   → utils/articles.ts ('server-only'): GUIDE_SECTIONS 순서로 정렬·조회 (guideArticles, guideSlugs, getGuideArticleMeta 등)
   → pages / sitemap 소비

constants/GUIDE_SECTIONS (섹션 id+제목 데이터, 순수)
   → types: GuideSectionId 파생 (+ GuideSectionMeta, LocalizedText)
   → utils/sections.ts: getGuideSection·getGuideSectionTitle (client/server 공용)
   → 사이드바·모바일 바·prev/next·인덱스 섹션 헤딩 소비
```
