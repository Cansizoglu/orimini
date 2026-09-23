import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container section">
      <div className="cta-box">
        <p className="eyebrow">404</p>
        <h1>Aradığınız sayfa bulunamadı</h1>
        <p>Sayfa taşınmış ya da kaldırılmış olabilir. Koleksiyonumuza göz atabilirsiniz.</p>
        <Link href="/urunler" className="btn btn-primary">
          Ürünlere git
        </Link>
      </div>
    </div>
  );
}
