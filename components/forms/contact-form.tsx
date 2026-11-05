"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { FormField } from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// 문의 폼 검증 스키마
const schema = z.object({
  name: z.string().min(2, "이름은 2자 이상 입력해주세요."),
  email: z.string().email("올바른 이메일을 입력해주세요."),
  message: z.string().min(10, "내용은 10자 이상 입력해주세요."),
});

type ContactValues = z.infer<typeof schema>;

export function ContactForm() {
  const form = useForm<ContactValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", message: "" },
  });

  // 실제 전송 로직(Server Action/API)으로 교체하세요
  async function onSubmit(values: ContactValues) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log(values);
    toast.success("문의가 접수되었습니다.");
    form.reset();
  }

  return (
    <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <FormField
          form={form}
          name="name"
          label="이름"
          render={(field, invalid) => (
            <Input id="name" aria-invalid={invalid} {...field} />
          )}
        />
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
          name="message"
          label="문의 내용"
          render={(field, invalid) => (
            <Textarea id="message" rows={5} aria-invalid={invalid} {...field} />
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "전송 중..." : "보내기"}
        </Button>
      </FieldGroup>
    </form>
  );
}
