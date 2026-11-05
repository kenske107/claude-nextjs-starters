import type { Metadata } from "next";

import { PageHeader } from "@/components/common/page-header";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";

export const metadata: Metadata = { title: "설정" };

// 설정 항목 예제 (저장 로직 없음 — Server Action 등으로 교체)
const options = [
  { id: "notify", label: "이메일 알림", desc: "새 소식을 이메일로 받습니다." },
  { id: "marketing", label: "마케팅 수신", desc: "이벤트와 혜택 소식을 받습니다." },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="설정" description="계정 환경설정 예제입니다." />
      <Card>
        <CardContent>
          <FieldGroup>
            {options.map((o) => (
              <Field key={o.id} orientation="horizontal">
                <FieldContent>
                  <FieldLabel htmlFor={o.id}>{o.label}</FieldLabel>
                  <FieldDescription>{o.desc}</FieldDescription>
                </FieldContent>
                <Switch id={o.id} />
              </Field>
            ))}
          </FieldGroup>
        </CardContent>
      </Card>
    </div>
  );
}
