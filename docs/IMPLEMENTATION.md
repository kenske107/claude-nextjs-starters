# 구현 현황 문서

Next.js 스타터킷의 현재 구현 내용을 정리한 문서입니다. (작성일: 2026-11-05)

## 1. 개요

| 항목 | 내용 |
| --- | --- |
| 프레임워크 | Next.js 16.4.5 (App Router), React 19.3.0 |
| 언어 | TypeScript 5 |
| 스타일 | Tailwind CSS v4 (`@tailwindcss/postcss`), `tw-animate-css` |
| UI | shadcn/ui (`base-nova` 스타일, `@base-ui/react` 기반), Lucide 아이콘 |
| 폼 | react-hook-form + zod + `@hookform/resolvers` |
| 기타 | sonner(토스트), next-themes(다크모드), date-fns, @tanstack/react-table |
| 폰트 | Geist Sans / Geist Mono (`next/font/google`) |
| 언어 설정 | `<html lang="ko">`, UI 문구는 한국어 |

## 2. 프로젝트 설정

### 2.1 `next.config.ts`
- `cacheComponents: true` — Cache Components 활성화. 렌더 중 `new Date()` 같은 불안정한 값은 사용할 수 없습니다.
- `partialPrefetching: true`
- `allowedDevOrigins: ["192.168.0.54"]` — 로컬 네트워크 IP에서 dev 서버 접근 허용
- `experimental.agentFeedback: true`

### 2.2 `components.json` (shadcn)
- 스타일 `base-nova`, baseColor `neutral`, CSS 변수 사용, RSC 사용
- 아이콘: lucide
- 별칭: `@/components`, `@/components/ui`, `@/lib`, `@/lib/utils`, `@/hooks`

### 2.3 스타일 (`app/globals.css`)
- `tailwindcss`, `tw-animate-css`, `shadcn/tailwind.css`를 import
- `@custom-variant dark`로 클래스 기반 다크모드 정의
- `@theme inline`으로 색상 토큰(background, primary, sidebar, chart 등)과 폰트 변수 매핑

### 2.4 PostCSS (`postcss.config.mjs`)
- `@tailwindcss/postcss` 플러그인만 사용 (Tailwind v4 방식)

## 3. 라우팅 구조 (route group)

```
app/
  layout.tsx            루트 레이아웃 (html/body, ThemeProvider, Toaster)
  error.tsx             전역 에러 화면 ("다시 시도" 버튼)
  loading.tsx           전역 로딩 스피너 (Loader2)
  not-found.tsx         404 화면 (홈으로 버튼)
  (marketing)/          헤더 + 푸터
    layout.tsx
    page.tsx            /          홈 (히어로 + 기술스택 카드 5개)
    about/page.tsx      /about     소개 (라우팅 예시)
    contact/page.tsx    /contact   문의 (ContactForm)
  (auth)/               화면 중앙 카드 + 우상단 테마 토글
    layout.tsx
    login/page.tsx      /login     AuthForm mode="login"
    signup/page.tsx     /signup    AuthForm mode="signup"
  (dashboard)/          사이드바 + 상단바 + 브레드크럼
    layout.tsx
    dashboard/page.tsx  /dashboard 통계 카드, 탭(사용자 테이블/FAQ 아코디언)
    dashboard/settings/page.tsx  /dashboard/settings 설정 예제(Switch)
```

### 3.1 루트 레이아웃
- `metadata.title`: 기본값 `siteConfig.name`, 템플릿 `%s | {사이트명}`
- `ThemeProvider`(`attribute="class"`, `defaultTheme="system"`, `enableSystem`)와 `Toaster(richColors)`만 담당
- `suppressHydrationWarning` 적용 (next-themes 대응)

### 3.2 페이지별 설명
- **홈**: Badge, 제목, 설명, 버튼 2개(시작하기 → `/about`, shadcn/ui 문서 외부 링크), 기술스택 카드 그리드
- **로그인/회원가입**: `AuthForm` 하나로 두 모드를 처리하고, 서로 링크로 이동합니다.
- **대시보드**: 예제 통계(방문자, 가입자, 전환율), 사용자 테이블(상태 Badge), FAQ 아코디언. 모두 하드코딩된 샘플 데이터입니다.

## 4. 컴포넌트 계층

```
components/
  ui/         shadcn 원본 (Atoms) — 수정 최소화
  common/     공용 조합 (Molecules)
  forms/      폼 (Molecules)
  layout/     큰 구조 (Organisms)
  providers/  전역 Provider
```

### 4.1 `common/`
`container`, `logo`, `page-header`, `empty-state`, `theme-toggle`

### 4.2 `forms/`
| 파일 | 역할 |
| --- | --- |
| `form-field.tsx` | react-hook-form `Controller`와 shadcn `Field`를 연결하는 래퍼. `render` prop으로 입력 컴포넌트를 받고, 라벨/설명/에러 표시와 `data-invalid`를 처리합니다. |
| `contact-form.tsx` | 이름(2자 이상), 이메일, 내용(10자 이상)을 클라이언트에서 검증한 뒤 Server Action(`submitContact`)으로 전송합니다. 서버 검증 오류는 각 필드에 표시합니다. |
| `auth-form.tsx` | 이메일, 비밀번호(8자 이상) 검증. 제출 시 안내 토스트만 표시하는 **모의 동작**(백엔드 없음)입니다. |

### 4.3 `layout/`
| 파일 | 역할 |
| --- | --- |
| `site-header.tsx`, `site-footer.tsx` | 마케팅 영역 헤더와 푸터 |
| `app-sidebar.tsx` | `siteConfig.dashboardNav` 기반 사이드바. `usePathname`으로 활성 상태를 표시하고, 모바일에서는 Sheet로 전환됩니다. |
| `breadcrumbs.tsx` | 현재 경로를 분할해 브레드크럼을 생성하고, `siteConfig.breadcrumbLabels`로 한글 라벨을 매핑합니다. |

### 4.4 `providers/`
- `theme-provider.tsx`: next-themes 래퍼
- `toaster.tsx`: `ui/sonner`의 Toaster를 재export

### 4.5 설치된 shadcn 컴포넌트 (30개)
- P0: button, card, input, label, badge, separator, sheet, dropdown-menu
- P1: textarea, select, checkbox, switch, radio-group, field, sonner, alert, dialog, skeleton
- P2: sidebar, breadcrumb, tabs, avatar, navigation-menu, scroll-area, collapsible
- P3: table, accordion, popover, tooltip, pagination

## 5. 설정과 유틸

- `config/site.ts`: 사이트 이름, 설명, 마케팅 메뉴(`nav`), 대시보드 메뉴(`dashboardNav`, 아이콘 포함), 브레드크럼 라벨(`breadcrumbLabels`). 브랜딩과 메뉴는 이 파일에서 바꿉니다.
- `hooks/use-mobile.ts`: 모바일 뷰포트 판별 훅 (사이드바에서 사용)
- `lib/utils.ts`: `cn()` (clsx + tailwind-merge)
- `lib/validations/contact.ts`: 문의 폼 zod 스키마 (클라이언트와 서버 공유)
- `lib/actions/contact.ts`: `submitContact` Server Action. 서버에서 스키마로 재검증하고 `{ ok, message, fieldErrors }`를 반환합니다. 실제 전달(이메일/DB)은 TODO입니다.

## 6. 개발 시 주의사항

- 링크 버튼은 `<Button render={<Link />} />`가 아니라 `<Link className={buttonVariants()}>` 형태를 씁니다. 전자는 접근성 트리에서 `button`으로 읽힙니다.
- shadcn CLI가 `import { cn } from "cn"`으로 생성하면 `@/lib/utils`로 고쳐야 합니다.
- Next.js 16에는 기존과 다른 변경점이 있으므로 `node_modules/next/dist/docs/`를 참고합니다.
- 명령어: `npm run dev`, `npm run build`, `npm run lint`

## 7. 미구현 및 개선 후보

1. **인증 없음**: 로그인과 회원가입은 UI와 검증만 있고, 실제 인증과 세션은 없습니다. 대시보드도 보호되지 않습니다.
2. **문의 전달 수단 없음**: `submitContact`는 서버 콘솔에 로그만 남깁니다. 이메일 발송이나 DB 저장을 연결해야 합니다. 스팸 방지(rate limit, honeypot, CAPTCHA)도 없습니다.
3. **데이터 계층 없음**: 대시보드 데이터는 모두 하드코딩입니다. `@tanstack/react-table`은 설치만 되어 있고 사용하지 않습니다(필요 시 사용).
4. **설정 페이지 저장 없음**: `/dashboard/settings`의 Switch는 상태를 저장하지 않는 예제입니다.
5. **SEO 메타**: title과 description만 있습니다. `metadataBase`, OpenGraph, `robots.ts`, `sitemap.ts`는 없습니다.
6. **테스트 없음**: 테스트 설정이 없습니다.

## 8. 변경 이력

- 2026-11-05: 사이드바 "설정" 메뉴를 `/dashboard/settings` 페이지로 연결, 브레드크럼 한글 라벨 매핑 추가, 미사용 `cn` 패키지 제거. `tsc`, `lint`, `build` 통과 확인.
- 2026-11-05: 링크 버튼을 `buttonVariants` 방식으로 교체(접근성), 폼에 `noValidate`와 `autoComplete` 적용. Playwright로 `/contact`, `/login`, `/dashboard`, 404, 모바일 사이드바 동작 확인.
- 2026-11-05: 문의 폼 전송을 Server Action으로 구현(`lib/actions/contact.ts`, `lib/validations/contact.ts`). 대시보드 상단바 구분선 정렬 수정.
