// Mesafeli satış, ön bilgilendirme, KVKK ve çerez metinleri.
// 6502 sayılı Tüketicinin Korunması Hakkında Kanun, Mesafeli Sözleşmeler Yönetmeliği
// ve 6698 sayılı KVKK esas alınarak hazırlanmış şablonlardır. Yayına almadan önce
// satıcı bilgilerini (src/data/site.ts > legal) doldurun ve bir hukukçuya kontrol ettirin.
import Link from "next/link";
import { formatPrice } from "@/data/products";
import { site } from "@/data/site";

const blank = "………………";

function SellerInfo() {
  const l = site.legal;
  return (
    <ul>
      <li>
        <strong>Unvan:</strong> {l.title}
      </li>
      <li>
        <strong>Adres:</strong> {l.address}
      </li>
      <li>
        <strong>Telefon / WhatsApp:</strong> {site.phoneDisplay}
      </li>
      <li>
        <strong>E-posta:</strong> {l.email || blank}
      </li>
      <li>
        <strong>Vergi dairesi / no:</strong> {l.taxInfo || blank}
      </li>
      {l.kep && (
        <li>
          <strong>KEP adresi:</strong> {l.kep}
        </li>
      )}
    </ul>
  );
}

export function DistanceSalesContract() {
  return (
    <>
      <h2>1. Taraflar</h2>
      <p>
        <strong>SATICI</strong>
      </p>
      <SellerInfo />
      <p>
        <strong>ALICI:</strong> Siparişi WhatsApp üzerinden veren ve ad, soyad, adres, telefon bilgilerini paylaşan
        kişidir. Alıcı bilgileri sipariş onayı sırasında alınır.
      </p>

      <h2>2. Konu</h2>
      <p>
        Bu sözleşmenin konusu, alıcının {site.url} internet sitesinde incelediği ve WhatsApp hattı üzerinden sipariş
        verdiği ürünün satışı ve teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve
        Mesafeli Sözleşmeler Yönetmeliği hükümleri gereğince tarafların hak ve yükümlülüklerinin belirlenmesidir.
      </p>

      <h2>3. Sözleşme konusu ürün, fiyat ve ödeme</h2>
      <p>
        Ürünün adı, kodu, yaş/beden seçimi, adedi, kişiye özel nakış bilgisi ve vergiler dahil satış fiyatı, sipariş
        sırasında WhatsApp mesajında yer alan ve satıcı tarafından yazılı olarak onaylanan bilgilerdir. Ödeme, sipariş
        onayından sonra satıcının bildirdiği banka hesabına havale/EFT ile veya taraflarca kararlaştırılan başka bir
        yöntemle yapılır. {formatPrice(site.freeShippingLimit)} ve üzeri siparişlerde kargo ücreti satıcıya aittir;
        altındaki siparişlerde kargo ücreti sipariş onayında alıcıya bildirilir.
      </p>

      <h2>4. Teslimat</h2>
      <p>
        Ürünler sipariş üzerine hazırlanır. Nakış yazımının alıcı tarafından onaylanmasından sonra ürün en geç 30 gün
        içinde, genellikle 3-7 iş günü içinde kargoya verilir ve alıcının bildirdiği adrese teslim edilir. Teslimatın
        gecikeceği durumlarda alıcı bilgilendirilir.
      </p>

      <h2>5. Cayma hakkı</h2>
      <p>
        Alıcı, nakışsız ve standart ürünlerde, ürünü teslim aldığı tarihten itibaren 14 gün içinde herhangi bir
        gerekçe göstermeden ve cezai şart ödemeden sözleşmeden cayma hakkına sahiptir. Cayma bildirimi WhatsApp
        hattına veya e-posta adresine yazılı olarak yapılır. Satıcı, bildirimin ulaşmasından itibaren 14 gün içinde
        ürün bedelini iade eder; ürün, kullanılmamış ve yeniden satılabilir durumda iade edilmelidir.
      </p>
      <p>
        <strong>Cayma hakkının kullanılamayacağı durumlar:</strong> Mesafeli Sözleşmeler Yönetmeliği&apos;nin 15.
        maddesi uyarınca, alıcının istekleri veya kişisel ihtiyaçları doğrultusunda hazırlanan ürünlerde (isim, tarih
        vb. kişiye özel nakış işlenen ürünler) cayma hakkı kullanılamaz. Üretim hatası olan ürünler için alıcının
        yasal hakları saklıdır.
      </p>

      <h2>6. Ayıplı ürün</h2>
      <p>
        Ayıplı olduğu anlaşılan ürünlerde alıcı, 6502 sayılı Kanun&apos;un 11. maddesindeki seçimlik haklarını
        (bedel iadesi, indirim, ücretsiz onarım veya değişim) kullanabilir. Kargo masrafı satıcıya aittir.
      </p>

      <h2>7. Uyuşmazlıkların çözümü</h2>
      <p>
        Bu sözleşmeden doğan uyuşmazlıklarda, Ticaret Bakanlığı&apos;nca her yıl ilan edilen parasal sınırlar
        dahilinde alıcının veya satıcının yerleşim yerindeki Tüketici Hakem Heyetleri, bu sınırları aşan durumlarda
        Tüketici Mahkemeleri yetkilidir.
      </p>

      <h2>8. Yürürlük</h2>
      <p>
        Alıcı, siparişi göndermeden önce bu sözleşmeyi ve{" "}
        <Link href="/on-bilgilendirme-formu">Ön Bilgilendirme Formu</Link>&apos;nu okuduğunu ve kabul ettiğini
        onaylar. Sözleşme, satıcının siparişi WhatsApp üzerinden yazılı olarak onaylaması ile yürürlüğe girer.
      </p>
    </>
  );
}

export function PreInformationForm() {
  return (
    <>
      <h2>Satıcı bilgileri</h2>
      <SellerInfo />
      <h2>Ürünün temel nitelikleri ve fiyatı</h2>
      <p>
        Ürünün adı, kodu, rengi, kumaşı, set içeriği ve vergiler dahil fiyatı ürün sayfasında yer alır. Seçilen yaş /
        beden, adet ve kişiye özel nakış bilgisi sipariş mesajında belirtilir.
      </p>
      <h2>Ödeme ve teslimat</h2>
      <p>
        Ödeme, sipariş onayı sonrası havale/EFT ile yapılır. Ürün, nakış onayından sonra genellikle 3-7 iş günü
        içinde kargoya verilir. {formatPrice(site.freeShippingLimit)} ve üzeri siparişlerde kargo ücretsizdir.
      </p>
      <h2>Cayma hakkı</h2>
      <p>
        Nakışsız ürünlerde teslimden itibaren 14 gün içinde cayma hakkı vardır. Kişiye özel nakış işlenen ürünlerde,
        Mesafeli Sözleşmeler Yönetmeliği md. 15/1-ç uyarınca cayma hakkı bulunmaz. Ayrıntılar{" "}
        <Link href="/mesafeli-satis-sozlesmesi">Mesafeli Satış Sözleşmesi</Link>&apos;nde yer alır.
      </p>
      <h2>Şikâyet ve başvuru</h2>
      <p>
        Talep ve şikâyetlerinizi {site.phoneDisplay} numaralı WhatsApp hattına iletebilirsiniz. Tüketici Hakem
        Heyetleri ve Tüketici Mahkemeleri&apos;ne başvuru hakkınız saklıdır.
      </p>
    </>
  );
}

export function KvkkText() {
  return (
    <>
      <p>
        {site.legal.title} (&quot;Veri Sorumlusu&quot;) olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu
        (&quot;KVKK&quot;) kapsamında kişisel verilerinizi aşağıda açıklanan şekilde işliyoruz.
      </p>
      <h2>İşlenen kişisel veriler</h2>
      <ul>
        <li>Kimlik ve iletişim: ad, soyad, telefon numarası, teslimat adresi, e-posta</li>
        <li>Sipariş bilgileri: ürün, beden, nakış yapılacak isim ve tarih, ödeme bilgisi (dekont)</li>
        <li>Yorum bilgileri: ad, şehir, puan ve yorum metni</li>
        <li>Teknik veriler: sepet ve favoriler (yalnızca tarayıcınızda tutulur), zorunlu çerezler</li>
      </ul>
      <h2>İşleme amaçları ve hukuki sebepler</h2>
      <ul>
        <li>
          Siparişin alınması, hazırlanması, teslimi ve faturalandırılması (KVKK md. 5/2-c: sözleşmenin ifası)
        </li>
        <li>Yasal saklama ve bildirim yükümlülükleri (md. 5/2-ç: hukuki yükümlülük)</li>
        <li>Talep ve şikâyetlerin yanıtlanması (md. 5/2-f: meşru menfaat)</li>
        <li>Onayınızla ürün yorumlarının yayınlanması (md. 5/1: açık rıza)</li>
      </ul>
      <h2>Aktarım</h2>
      <p>
        Kişisel verileriniz yalnızca siparişin teslimi için kargo şirketlerine, ödeme için bankalara ve yasal
        zorunluluk halinde yetkili kamu kurumlarına aktarılır. Sipariş yazışmaları WhatsApp (Meta Platforms) üzerinden
        yürütüldüğünden, mesajlarınız bu hizmetin sunucularında işlenir.
      </p>
      <h2>Toplama yöntemi</h2>
      <p>Verileriniz, internet sitesi ve WhatsApp üzerinden sizin tarafınızdan iletilmesi yoluyla toplanır.</p>
      <h2>Haklarınız</h2>
      <p>
        KVKK md. 11 uyarınca; verilerinizin işlenip işlenmediğini öğrenme, bilgi talep etme, düzeltilmesini veya
        silinmesini isteme, aktarıldığı üçüncü kişileri öğrenme, itiraz etme ve zararın giderilmesini talep etme
        haklarına sahipsiniz. Başvurularınızı {site.legal.email || `${site.phoneDisplay} numaralı WhatsApp hattı`}{" "}
        üzerinden iletebilirsiniz; talepler en geç 30 gün içinde yanıtlanır.
      </p>
      <p>
        <strong>Veri sorumlusu:</strong> {site.legal.title}, {site.legal.address}
      </p>
    </>
  );
}

export function CookiePolicy() {
  return (
    <>
      <p>
        {site.url} yalnızca sitenin çalışması için gerekli olan tarayıcı depolamasını kullanır. Reklam veya takip
        çerezi kullanılmaz.
      </p>
      <h2>Kullanılan depolama alanları</h2>
      <ul>
        <li>
          <strong>orimini-sepet:</strong> Sepete eklediğiniz ürünleri hatırlar.
        </li>
        <li>
          <strong>orimini-favoriler:</strong> Beğendiğiniz ürünleri hatırlar.
        </li>
        <li>
          <strong>orimini-onay:</strong> Bu bilgilendirmeyi gördüğünüzü hatırlar.
        </li>
      </ul>
      <p>
        Bu bilgiler yalnızca sizin tarayıcınızda tutulur, sunucumuza gönderilmez. Tarayıcı ayarlarınızdan dilediğiniz
        zaman silebilirsiniz. İleride analiz aracı eklenirse bu metin güncellenecek ve onayınız alınacaktır.
      </p>
    </>
  );
}

export const legalDocs = {
  "mesafeli-satis-sozlesmesi": {
    title: "Mesafeli Satış Sözleşmesi",
    description: `${site.name} mesafeli satış sözleşmesi: sipariş, ödeme, teslimat, cayma hakkı ve iade koşulları.`,
    Body: DistanceSalesContract,
  },
  "on-bilgilendirme-formu": {
    title: "Ön Bilgilendirme Formu",
    description: `${site.name} ön bilgilendirme formu: satıcı bilgileri, ödeme, teslimat ve cayma hakkı.`,
    Body: PreInformationForm,
  },
  "kvkk-aydinlatma-metni": {
    title: "KVKK Aydınlatma Metni",
    description: `${site.name} kişisel verilerin korunması aydınlatma metni.`,
    Body: KvkkText,
  },
  "cerez-politikasi": {
    title: "Çerez Politikası",
    description: `${site.name} çerez ve tarayıcı depolama politikası.`,
    Body: CookiePolicy,
  },
} as const;

export type LegalSlug = keyof typeof legalDocs;
