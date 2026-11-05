"use server";

import { z } from "zod";

import {
  contactSchema,
  type ContactValues,
} from "@/lib/validations/contact";

// Server Action 결과 타입: 성공 또는 (필드별/전체) 오류
export type ContactResult =
  | { ok: true }
  | {
      ok: false;
      message: string;
      fieldErrors?: Partial<Record<keyof ContactValues, string[]>>;
    };

// 문의 전송 Server Action
// 클라이언트 검증은 우회될 수 있으므로 서버에서 반드시 다시 검증합니다.
export async function submitContact(input: unknown): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      message: "입력 내용을 확인해주세요.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  try {
    // TODO: 실제 전송 로직으로 교체하세요 (이메일 발송, DB 저장, 외부 API 호출 등)
    console.log("[문의 접수]", parsed.data);
    return { ok: true };
  } catch (error) {
    console.error("[문의 전송 실패]", error);
    return { ok: false, message: "전송 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요." };
  }
}
