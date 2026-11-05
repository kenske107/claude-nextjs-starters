"use client"; // 에러 바운더리는 클라이언트 컴포넌트여야 합니다

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  useEffect(() => {
    // 필요 시 에러 리포팅 서비스로 전송
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-24 text-center">
      <h1 className="text-2xl font-bold">문제가 발생했습니다</h1>
      <Button onClick={() => retry()}>다시 시도</Button>
    </div>
  );
}
