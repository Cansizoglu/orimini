import type { Metadata } from "next";
import { LegalPage, legalMetadata } from "@/components/LegalPage";

export function generateMetadata(): Promise<Metadata> {
  return legalMetadata("mesafeli-satis-sozlesmesi");
}

export default function Page() {
  return <LegalPage slug="mesafeli-satis-sozlesmesi" />;
}
