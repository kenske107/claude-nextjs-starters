"use client";

import type { ReactNode } from "react";
import {
  Controller,
  type ControllerRenderProps,
  type FieldPath,
  type FieldValues,
  type UseFormReturn,
} from "react-hook-form";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

// react-hook-form + shadcn Field 연결 래퍼
// render prop으로 입력 컴포넌트(Input, Textarea 등)를 넘겨 사용합니다.
export function FormField<T extends FieldValues>({
  form,
  name,
  label,
  description,
  render,
}: {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  label: string;
  description?: string;
  render: (
    field: ControllerRenderProps<T, FieldPath<T>>,
    invalid: boolean,
  ) => ReactNode;
}) {
  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>
          {render(field, fieldState.invalid)}
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
