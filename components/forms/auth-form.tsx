"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { FormField } from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const schema = z.object({
  email: z.string().email("올바른 이메일을 입력해주세요."),
  password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다."),
});

type AuthValues = z.infer<typeof schema>;

// 로그인/회원가입 공용 폼 (백엔드 없음 — onSubmit을 실제 인증으로 교체)
export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const isLogin = mode === "login";
  const form = useForm<AuthValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  function onSubmit() {
    toast.info(`${isLogin ? "로그인" : "회원가입"} 예제입니다. 인증 로직을 연결하세요.`);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isLogin ? "로그인" : "회원가입"}</CardTitle>
        <CardDescription>
          {isLogin ? "계정 정보를 입력하세요." : "새 계정을 만드세요."}
        </CardDescription>
      </CardHeader>
      <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent>
          <FieldGroup>
            <FormField
              form={form}
              name="email"
              label="이메일"
              render={(field, invalid) => (
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={invalid}
                  {...field}
                />
              )}
            />
            <FormField
              form={form}
              name="password"
              label="비밀번호"
              render={(field, invalid) => (
                <Input
                  id="password"
                  type="password"
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  aria-invalid={invalid}
                  {...field}
                />
              )}
            />
          </FieldGroup>
        </CardContent>
        <CardFooter className="mt-4 flex-col gap-3">
          <Button type="submit" className="w-full">
            {isLogin ? "로그인" : "가입하기"}
          </Button>
          <p className="text-sm text-muted-foreground">
            {isLogin ? "계정이 없으신가요? " : "이미 계정이 있으신가요? "}
            <Link
              href={isLogin ? "/signup" : "/login"}
              className="text-foreground underline underline-offset-4"
            >
              {isLogin ? "회원가입" : "로그인"}
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
