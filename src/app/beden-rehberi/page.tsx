import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SIZES } from "@/data/products";

export const metadata: Metadata = {
  title: "Beden Rehberi - Bebek ve Çocuk Yaş Beden Tablosu",
  description:
    "0-3 aydan 10 yaşa kadar bebek ve çocuk beden tablosu: boy ve kilo aralıklarına göre doğru yaş / beden seçimi.",
  alternates: { canonical: "/beden-rehberi" },
};

// Yaklaşık değerlerdir; kalıba göre küçük farklar olabilir.
const measurements: Record<string, [string, string]> = {
  "0-3-ay": ["56 - 62 cm", "3 - 5,5 kg"],
  "3-6-ay": ["62 - 68 cm", "5,5 - 7,5 kg"],
  "6-9-ay": ["68 - 74 cm", "7,5 - 9 kg"],
  "9-12-ay": ["74 - 80 cm", "9 - 10,5 kg"],
  "12-18-ay": ["80 - 86 cm", "10,5 - 12 kg"],
  "2-yas": ["86 - 92 cm", "12 - 14 kg"],
  "3-yas": ["92 - 98 cm", "14 - 16 kg"],
  "4-yas": ["98 - 104 cm", "16 - 18 kg"],
  "5-yas": ["104 - 110 cm", "18 - 20 kg"],
  "6-yas": ["110 - 116 cm", "20 - 22 kg"],
  "7-yas": ["116 - 122 cm", "22 - 25 kg"],
  "8-yas": ["122 - 128 cm", "25 - 28 kg"],
  "9-yas": ["128 - 134 cm", "28 - 31 kg"],
  "10-yas": ["134 - 140 cm", "31 - 35 kg"],
};

export default function SizeGuidePage() {
  return (
    <div className="container prose">
      <Breadcrumbs items={[{ name: "Beden Rehberi", href: "/beden-rehberi" }]} />
      <h1>Beden Rehberi</h1>
      <p className="lead">
        Doğru bedeni seçmek için çocuğunuzun yaşından çok boy ve kilosuna bakmanızı öneririz. İki beden arasında
        kaldıysanız büyük olanı seçin.
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Yaş / Beden</th>
              <th scope="col">Boy</th>
              <th scope="col">Kilo</th>
            </tr>
          </thead>
          <tbody>
            {SIZES.map((s) => (
              <tr key={s.id}>
                <th scope="row">{s.label}</th>
                <td>{measurements[s.id]?.[0]}</td>
                <td>{measurements[s.id]?.[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2>Nasıl ölçülür?</h2>
      <ul>
        <li>
          <strong>Boy:</strong> Çocuğunuzu çıplak ayakla duvara yaslayın, başının üstünden topuğuna kadar ölçün.
        </li>
        <li>
          <strong>Göğüs:</strong> Kolların altından, göğsün en geniş yerinden mezurayı sıkmadan geçirin.
        </li>
        <li>
          <strong>Özel dikim:</strong> Ölçüleriniz tabloya uymuyorsa WhatsApp&apos;tan yazın, ölçüye göre dikelim.
        </li>
      </ul>
    </div>
  );
}
