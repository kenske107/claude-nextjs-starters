import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-24 text-center">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="text-muted-foreground">페이지를 찾을 수 없습니다.</p>
      <Link href="/" className={buttonVariants()}>
        홈으로
      </Link>
    </div>
  );
}
