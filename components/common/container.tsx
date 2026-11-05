import { cn } from "@/lib/utils";

// 페이지 콘텐츠 폭 제한 + 좌우 여백
export function Container({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-5xl px-4", className)} {...props} />;
}
