import type { Metadata } from "next";

import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = { title: "소개" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold tracking-tight">소개</h1>
      <p className="mt-3 text-muted-foreground">
        이 페이지는 App Router 라우팅 예시입니다. app/about/page.tsx 파일을
        수정해 시작하세요.
      </p>
      <Separator className="my-8" />
      <ul className="list-disc space-y-2 pl-5 text-sm">
        <li>페이지 추가: app/경로/page.tsx</li>
        <li>컴포넌트 추가: npx shadcn@latest add 이름</li>
        <li>사이트 정보/내비: config/site.ts</li>
      </ul>
    </div>
  );
}
