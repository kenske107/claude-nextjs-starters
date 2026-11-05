import type { Metadata } from "next";

import { Container } from "@/components/common/container";
import { PageHeader } from "@/components/common/page-header";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = { title: "문의" };

export default function ContactPage() {
  return (
    <Container className="max-w-xl space-y-8 py-16">
      <PageHeader title="문의" description="궁금한 점을 남겨주세요." />
      <ContactForm />
    </Container>
  );
}
