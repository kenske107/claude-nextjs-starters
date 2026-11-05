import Link from "next/link";
import {
  ArrowRight,
  Layers,
  Palette,
  Shapes,
  Sparkles,
  Type,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { siteConfig } from "@/config/site";

// 기술스택 카드 데이터
const stacks = [
  { icon: Layers, title: "Next.js 16", desc: "App Router 기반 풀스택 React 프레임워크" },
  { icon: Type, title: "TypeScript", desc: "타입 안정성을 갖춘 개발 경험" },
  { icon: Palette, title: "Tailwind CSS v4", desc: "유틸리티 우선 스타일링" },
  { icon: Shapes, title: "shadcn/ui", desc: "복사해서 쓰는 접근성 좋은 UI 컴포넌트" },
  { icon: Sparkles, title: "Lucide", desc: "일관된 스타일의 아이콘 라이브러리" },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <section className="flex flex-col items-center gap-6 text-center">
        <Badge variant="secondary">Starter Kit</Badge>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {siteConfig.name}
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          {siteConfig.description}
        </p>
        <div className="flex gap-3">
          <Link href="/about" className={buttonVariants({ size: "lg" })}>
            시작하기
            <ArrowRight data-icon="inline-end" />
          </Link>
          <a
            href="https://ui.shadcn.com"
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ size: "lg", variant: "outline" })}
          >
            shadcn/ui 문서
          </a>
        </div>
      </section>

      <section className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stacks.map(({ icon: Icon, title, desc }) => (
          <Card key={title}>
            <CardHeader>
              <Icon className="mb-2 size-6" />
              <CardTitle>{title}</CardTitle>
              <CardDescription>{desc}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>
    </div>
  );
}
