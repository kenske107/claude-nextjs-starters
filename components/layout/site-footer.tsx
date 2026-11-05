import { siteConfig } from "@/config/site";

// 하단 푸터
export function SiteFooter() {
  return (
    <footer className="border-t py-6">
      <p className="mx-auto max-w-5xl px-4 text-center text-sm text-muted-foreground">
        © {siteConfig.name}
      </p>
    </footer>
  );
}
