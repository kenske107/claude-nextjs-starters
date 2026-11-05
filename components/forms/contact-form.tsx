"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { FormField } from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitContact } from "@/lib/actions/contact";
import { contactSchema, type ContactValues } from "@/lib/validations/contact";

export function ContactForm() {
  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  // Server Action으로 전송 (서버에서도 동일 스키마로 재검증)
  async function onSubmit(values: ContactValues) {
    try {
      const result = await submitContact(values);
      if (result.ok) {
        toast.success("문의가 접수되었습니다.");
        form.reset();
        return;
      }
      // 서버 검증 오류를 각 필드에 표시
      for (const [name, messages] of Object.entries(result.fieldErrors ?? {})) {
        if (messages?.[0]) {
          form.setError(name as keyof ContactValues, { message: messages[0] });
        }
      }
      toast.error(result.message);
    } catch {
      toast.error("전송 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
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
