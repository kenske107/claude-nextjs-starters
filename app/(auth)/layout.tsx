import { Logo } from "@/components/common/logo";
import { ThemeToggle } from "@/components/common/theme-toggle";

// 인증 레이아웃: 화면 중앙 카드
export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <main className="relative flex flex-1 flex-col items-center justify-center gap-6 p-4">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <Logo />
      <div className="w-full max-w-sm">{children}</div>
    </main>
  );
}
