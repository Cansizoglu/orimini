import type { Metadata } from "next";
import { LegalPage, legalMetadata } from "@/components/LegalPage";

export function generateMetadata(): Promise<Metadata> {
  return legalMetadata("on-bilgilendirme-formu");
}

export default function Page() {
  return <LegalPage slug="on-bilgilendirme-formu" />;
}
