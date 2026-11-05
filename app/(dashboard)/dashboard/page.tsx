import type { Metadata } from "next";

import { PageHeader } from "@/components/common/page-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = { title: "대시보드" };

// 예제 데이터
const stats = [
  { label: "방문자", value: "1,284" },
  { label: "가입자", value: "342" },
  { label: "전환율", value: "4.2%" },
];

const users = [
  { name: "김민수", email: "minsu@example.com", status: "활성" },
  { name: "이지은", email: "jieun@example.com", status: "활성" },
  { name: "박서준", email: "seojun@example.com", status: "대기" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="대시보드" description="레이아웃과 컴포넌트 사용 예제입니다." />

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader>
              <CardDescription>{s.label}</CardDescription>
              <CardTitle className="text-2xl">{s.value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">사용자</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>이름</TableHead>
                <TableHead>이메일</TableHead>
                <TableHead>상태</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.email}>
                  <TableCell>{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>
                    <Badge variant={u.status === "활성" ? "default" : "secondary"}>
                      {u.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="faq">
          <Accordion>
            <AccordionItem value="a">
              <AccordionTrigger>컴포넌트는 어떻게 추가하나요?</AccordionTrigger>
              <AccordionContent>
                npx shadcn@latest add 컴포넌트이름 으로 추가합니다.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="b">
              <AccordionTrigger>메뉴는 어디서 바꾸나요?</AccordionTrigger>
              <AccordionContent>config/site.ts 에서 수정합니다.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
      </Tabs>
    </div>
  );
}
