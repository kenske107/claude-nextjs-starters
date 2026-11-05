import { z } from "zod";

// 문의 폼 검증 스키마 (클라이언트 폼과 Server Action이 함께 사용)
export const contactSchema = z.object({
  name: z.string().trim().min(2, "이름은 2자 이상 입력해주세요."),
  email: z.email("올바른 이메일을 입력해주세요."),
  message: z.string().trim().min(10, "내용은 10자 이상 입력해주세요."),
});

export type ContactValues = z.infer<typeof contactSchema>;
