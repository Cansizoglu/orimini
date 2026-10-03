import type { Metadata } from "next";
import { LegalPage, legalMetadata } from "@/components/LegalPage";

export function generateMetadata(): Promise<Metadata> {
  return legalMetadata("kvkk-aydinlatma-metni");
}

export default function Page() {
  return <LegalPage slug="kvkk-aydinlatma-metni" />;
}
