# Next.js 스타터킷

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + shadcn/ui + Lucide 기반 스타터킷입니다.

## 시작하기

```bash
npm install
npm run dev   # http://localhost:3000
```

| 명령어 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 |
| `npm run lint` | ESLint 검사 |

## 레이아웃 (route group)

| 그룹 | 레이아웃 | 페이지 |
| --- | --- | --- |
| `app/(marketing)` | 헤더 + 푸터 | `/`, `/about`, `/contact` |
| `app/(auth)` | 중앙 카드 | `/login`, `/signup` |
| `app/(dashboard)` | 사이드바 + 상단바 + 브레드크럼 | `/dashboard`, `/dashboard/settings` |

루트 `app/layout.tsx`는 html/body, 테마, 토스트 Provider만 담당합니다.

## 컴포넌트 계층

```
components/
  ui/         shadcn 원본 (Atoms) — 수정 최소화
  common/     공용 조합 (Molecules): container, logo, page-header, empty-state, theme-toggle
  forms/      폼 (Molecules): form-field(react-hook-form + zod 래퍼), contact-form, auth-form
  layout/     큰 구조 (Organisms): site-header, site-footer, app-sidebar, breadcrumbs
  providers/  전역 Provider: theme-provider, toaster
config/site.ts  사이트 이름/설명/내비게이션/브레드크럼 라벨
hooks/          공용 훅 (use-mobile)
lib/utils.ts    cn() 유틸
```

## 설치된 shadcn 컴포넌트

- P0: button, card, input, label, badge, separator, sheet, dropdown-menu
- P1: textarea, select, checkbox, switch, radio-group, field, sonner, alert, dialog, skeleton
- P2: sidebar, breadcrumb, tabs, avatar, navigation-menu, scroll-area, collapsible
- P3: table, accordion, popover, tooltip, pagination

추가: `npx shadcn@latest add 이름`

## 사용 라이브러리

| 용도 | 라이브러리 |
| --- | --- |
| 폼 / 검증 | react-hook-form, @hookform/resolvers, zod |
| 토스트 | sonner |
| 날짜 | date-fns |
| 테이블(데이터 테이블 필요 시) | @tanstack/react-table |
| 다크모드 | next-themes |
| 클래스 병합 | clsx, tailwind-merge |

## 주의사항

- shadcn 스타일은 `base-nova`(Base UI 기반)입니다. 링크 버튼은 `asChild` 대신
  `<Button nativeButton={false} render={<Link href="/" />} />`를 사용합니다.
- shadcn CLI가 `import { cn } from "cn"`으로 생성하면 `@/lib/utils`로 고쳐주세요.
- Cache Components가 켜져 있어 렌더 중 `new Date()` 같은 불안정한 값은 사용할 수 없습니다.
- 이 프로젝트의 Next.js 문서는 `node_modules/next/dist/docs/`를 참고하세요.
