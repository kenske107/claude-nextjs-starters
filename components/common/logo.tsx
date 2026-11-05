import Link from "next/link";
import { Rocket } from "lucide-react";

import { siteConfig } from "@/config/site";

// 사이트 로고 (아이콘 + 이름)
export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-semibold">
      <Rocket className="size-5" />
      {siteConfig.name}
    </Link>
  );
}
