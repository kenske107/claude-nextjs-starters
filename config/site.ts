import {
  FileText,
  LayoutDashboard,
  Settings,
  type LucideIcon,
} from "lucide-react";

// 사이트 전역 설정 — 이 파일만 수정하면 브랜딩/메뉴가 바뀝니다.
export type NavItem = { title: string; href: string; icon?: LucideIcon };

export const siteConfig = {
  name: "Next.js 스타터킷",
  description:
    "Next.js, TypeScript, Tailwind CSS, shadcn/ui로 빠르게 시작하는 웹 스타터킷",
  // 마케팅 헤더 메뉴
  nav: [
    { title: "홈", href: "/" },
    { title: "소개", href: "/about" },
    { title: "문의", href: "/contact" },
    { title: "대시보드", href: "/dashboard" },
  ] satisfies NavItem[],
  // 대시보드 사이드바 메뉴
  dashboardNav: [
    { title: "개요", href: "/dashboard", icon: LayoutDashboard },
    { title: "문서", href: "/about", icon: FileText },
    { title: "설정", href: "/dashboard/settings", icon: Settings },
  ] satisfies NavItem[],
  // 브레드크럼 라벨 (URL 세그먼트 → 표시 이름, 없으면 세그먼트 그대로 표시)
  breadcrumbLabels: {
    dashboard: "대시보드",
    settings: "설정",
    about: "소개",
    contact: "문의",
  } as Record<string, string>,
};
