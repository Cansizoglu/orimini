// İlk kurulum içerikleri: anasayfa bölümleri, sayfalar, SSS, menüler ve beden ölçüleri.
// Site bu içerikleri admin panelinden (Supabase) okur; bu dosya yedek ve seed kaynağıdır.
// Metinlerdeki {site_adi}, {telefon}, {kargo_limit} gibi kısa kodlar ayarlardan doldurulur.

export const sizeMeasurements: Record<string, [string, string]> = {
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

export type HomeSectionSeed = {
  section_key: string;
  admin_label: string;
  eyebrow?: string;
  title?: string;
  content?: string;
  image_url?: string;
  image_alt?: string;
  button_text?: string;
  button_link?: string;
  button2_text?: string;
  button2_link?: string;
  items?: string;
};

export const homeSections: HomeSectionSeed[] = [
  {
    section_key: "hero",
    admin_label: "Hero (en üst karşılama alanı)",
    eyebrow: "Custom-made for little ones",
    title: "Minikler için sevgiyle işlenen, kişiye özel kıyafetler",
    content:
      "İsim ve tarih nakışlı salopet takımlar, pastel tonlarda kız elbiseleri ve yenidoğan setleri. Her parça {sehir}'daki atölyemizde, bebeğinize özel hazırlanır.",
    image_url: "/images/urunler/bej-aslan-salopet.webp",
    image_alt: "İsim ve doğum tarihi nakışlı bej aslan temalı 1 yaş salopet takımı",
    button_text: "Koleksiyonu keşfet",
    button_link: "/urunler",
    button2_text: "WhatsApp'tan sor",
    button2_link: "whatsapp",
    items: "0-3 aydan 10 yaşa\nÜcretsiz isim nakışı\nTürkiye geneli kargo",
  },
  {
    section_key: "trust",
    admin_label: "Güven bandı (4 madde)",
    items:
      "nakis | Ücretsiz isim nakışı | İsim ve tarih nakışı fiyata dahil\nkalp | El emeği, özenli dikim | {sehir} atölyemizde hazırlanır\nkargo | Türkiye'ye kargo | {kargo_limit} üzeri ücretsiz\nwhatsapp | WhatsApp ile sipariş | Hızlı yanıt, kolay teyit",
  },
  {
    section_key: "banners",
    admin_label: "Bannerlar / kampanyalar (Bannerlar menüsünden yönetilir)",
    eyebrow: "Kampanyalar",
    title: "Size özel fırsatlar",
  },
  {
    section_key: "categories",
    admin_label: "Kategoriler",
    eyebrow: "Kategoriler",
    title: "Her özel güne bir takım",
    button_text: "Tüm ürünler",
    button_link: "/urunler",
  },
  {
    section_key: "featured",
    admin_label: "Öne çıkan ürünler",
    eyebrow: "Öne çıkanlar",
    title: "En sevilen modeller",
    button_text: "Hepsini gör",
    button_link: "/urunler",
  },
  {
    section_key: "custom",
    admin_label: "Kişiye özel tanıtım (görsel + yazı)",
    eyebrow: "Kişiye özel",
    title: "Adı üzerinde, anısı bir ömür",
    content:
      "Bebeğinizin adını, doğum tarihini ya da ilk yaşını seçtiğiniz takıma nakışla işliyoruz. Sirk, aslan, ayıcık gibi temalarla doğum günü ve fotoğraf çekimlerine özel tasarımlar hazırlıyoruz.",
    image_url: "/images/urunler/kirmizi-sirk-salopet.webp",
    image_alt: "Kollarına Yağız Ali ismi nakışlanmış kırmızı sirk temalı salopet takım",
    button_text: "Özel tasarım iste",
    button_link: "whatsapp:Merhaba {site_adi}, kişiye özel bir takım yaptırmak istiyorum.",
    items:
      "İsim ve tarih nakışı ücretsiz\nNakış yazımı siparişten önce WhatsApp'tan onaylanır\nRenk ve tema için özel istekleri dinliyoruz",
  },
  {
    section_key: "steps",
    admin_label: "Sipariş adımları",
    eyebrow: "Kolay sipariş",
    title: "WhatsApp ile 4 adımda sipariş",
    button_text: "Sıkça sorulan sorular",
    button_link: "/sikca-sorulan-sorular",
    items:
      "Ürünü seçin | Beğendiğiniz modeli açın, yaş / beden seçin.\nNakışı yazın | İşlenecek isim veya tarihi ekleyin.\nWhatsApp'a gönderin | Sipariş bilgileriniz mesaja otomatik yazılır.\nOnay ve kargo | Ödeme ve teslim bilgilerini netleştirip hazırlamaya başlarız.",
  },
  {
    section_key: "cta",
    admin_label: "Alt çağrı kutusu",
    eyebrow: "{sehir} merkezli atölye",
    title: "Aklınızdaki takımı birlikte tasarlayalım",
    content:
      "Beden, renk ya da nakış konusunda kararsız kaldıysanız bize yazın; size en uygun modeli birlikte seçelim.",
    button_text: "{telefon}",
    button_link: "whatsapp",
  },
];

export type PageSeed = {
  slug: string;
  title: string;
  eyebrow?: string;
  lead?: string;
  content?: string;
  image_url?: string;
  image_alt?: string;
  button_text?: string;
  button_link?: string;
  seo_title?: string;
  seo_description?: string;
  is_system: boolean;
};

const distanceSales = `<h2>1. Taraflar</h2>
<p><strong>SATICI</strong></p>
{satici_bilgileri}
<p><strong>ALICI:</strong> Siparişi WhatsApp üzerinden veren ve ad, soyad, adres, telefon bilgilerini paylaşan kişidir. Alıcı bilgileri sipariş onayı sırasında alınır.</p>
<h2>2. Konu</h2>
<p>Bu sözleşmenin konusu, alıcının {site_url} internet sitesinde incelediği ve WhatsApp hattı üzerinden sipariş verdiği ürünün satışı ve teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri gereğince tarafların hak ve yükümlülüklerinin belirlenmesidir.</p>
<h2>3. Sözleşme konusu ürün, fiyat ve ödeme</h2>
<p>Ürünün adı, kodu, yaş/beden seçimi, adedi, kişiye özel nakış bilgisi ve vergiler dahil satış fiyatı, sipariş sırasında WhatsApp mesajında yer alan ve satıcı tarafından yazılı olarak onaylanan bilgilerdir. Ödeme, sipariş onayından sonra satıcının bildirdiği banka hesabına havale/EFT ile veya taraflarca kararlaştırılan başka bir yöntemle yapılır. {kargo_limit} ve üzeri siparişlerde kargo ücreti satıcıya aittir; altındaki siparişlerde kargo ücreti sipariş onayında alıcıya bildirilir.</p>
<h2>4. Teslimat</h2>
<p>Ürünler sipariş üzerine hazırlanır. Nakış yazımının alıcı tarafından onaylanmasından sonra ürün en geç 30 gün içinde, genellikle 3-7 iş günü içinde kargoya verilir ve alıcının bildirdiği adrese teslim edilir. Teslimatın gecikeceği durumlarda alıcı bilgilendirilir.</p>
<h2>5. Cayma hakkı</h2>
<p>Alıcı, nakışsız ve standart ürünlerde, ürünü teslim aldığı tarihten itibaren 14 gün içinde herhangi bir gerekçe göstermeden ve cezai şart ödemeden sözleşmeden cayma hakkına sahiptir. Cayma bildirimi WhatsApp hattına veya e-posta adresine yazılı olarak yapılır. Satıcı, bildirimin ulaşmasından itibaren 14 gün içinde ürün bedelini iade eder; ürün, kullanılmamış ve yeniden satılabilir durumda iade edilmelidir.</p>
<p><strong>Cayma hakkının kullanılamayacağı durumlar:</strong> Mesafeli Sözleşmeler Yönetmeliği'nin 15. maddesi uyarınca, alıcının istekleri veya kişisel ihtiyaçları doğrultusunda hazırlanan ürünlerde (isim, tarih vb. kişiye özel nakış işlenen ürünler) cayma hakkı kullanılamaz. Üretim hatası olan ürünler için alıcının yasal hakları saklıdır.</p>
<h2>6. Ayıplı ürün</h2>
<p>Ayıplı olduğu anlaşılan ürünlerde alıcı, 6502 sayılı Kanun'un 11. maddesindeki seçimlik haklarını (bedel iadesi, indirim, ücretsiz onarım veya değişim) kullanabilir. Kargo masrafı satıcıya aittir.</p>
<h2>7. Uyuşmazlıkların çözümü</h2>
<p>Bu sözleşmeden doğan uyuşmazlıklarda, Ticaret Bakanlığı'nca her yıl ilan edilen parasal sınırlar dahilinde alıcının veya satıcının yerleşim yerindeki Tüketici Hakem Heyetleri, bu sınırları aşan durumlarda Tüketici Mahkemeleri yetkilidir.</p>
<h2>8. Yürürlük</h2>
<p>Alıcı, siparişi göndermeden önce bu sözleşmeyi ve <a href="/on-bilgilendirme-formu">Ön Bilgilendirme Formu</a>'nu okuduğunu ve kabul ettiğini onaylar. Sözleşme, satıcının siparişi WhatsApp üzerinden yazılı olarak onaylaması ile yürürlüğe girer.</p>`;

const preInformation = `<h2>Satıcı bilgileri</h2>
{satici_bilgileri}
<h2>Ürünün temel nitelikleri ve fiyatı</h2>
<p>Ürünün adı, kodu, rengi, kumaşı, set içeriği ve vergiler dahil fiyatı ürün sayfasında yer alır. Seçilen yaş / beden, adet ve kişiye özel nakış bilgisi sipariş mesajında belirtilir.</p>
<h2>Ödeme ve teslimat</h2>
<p>Ödeme, sipariş onayı sonrası havale/EFT ile yapılır. Ürün, nakış onayından sonra genellikle 3-7 iş günü içinde kargoya verilir. {kargo_limit} ve üzeri siparişlerde kargo ücretsizdir.</p>
<h2>Cayma hakkı</h2>
<p>Nakışsız ürünlerde teslimden itibaren 14 gün içinde cayma hakkı vardır. Kişiye özel nakış işlenen ürünlerde, Mesafeli Sözleşmeler Yönetmeliği md. 15/1-ç uyarınca cayma hakkı bulunmaz. Ayrıntılar <a href="/mesafeli-satis-sozlesmesi">Mesafeli Satış Sözleşmesi</a>'nde yer alır.</p>
<h2>Şikâyet ve başvuru</h2>
<p>Talep ve şikâyetlerinizi {telefon} numaralı WhatsApp hattına iletebilirsiniz. Tüketici Hakem Heyetleri ve Tüketici Mahkemeleri'ne başvuru hakkınız saklıdır.</p>`;

const kvkk = `<p>{satici_unvan} ("Veri Sorumlusu") olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında kişisel verilerinizi aşağıda açıklanan şekilde işliyoruz.</p>
<h2>İşlenen kişisel veriler</h2>
<ul>
<li>Kimlik ve iletişim: ad, soyad, telefon numarası, teslimat adresi, e-posta</li>
<li>Sipariş bilgileri: ürün, beden, nakış yapılacak isim ve tarih, ödeme bilgisi (dekont)</li>
<li>Yorum bilgileri: ad, şehir, puan ve yorum metni</li>
<li>Teknik veriler: sepet ve favoriler (yalnızca tarayıcınızda tutulur), zorunlu çerezler</li>
</ul>
<h2>İşleme amaçları ve hukuki sebepler</h2>
<ul>
<li>Siparişin alınması, hazırlanması, teslimi ve faturalandırılması (KVKK md. 5/2-c: sözleşmenin ifası)</li>
<li>Yasal saklama ve bildirim yükümlülükleri (md. 5/2-ç: hukuki yükümlülük)</li>
<li>Talep ve şikâyetlerin yanıtlanması (md. 5/2-f: meşru menfaat)</li>
<li>Onayınızla ürün yorumlarının yayınlanması (md. 5/1: açık rıza)</li>
</ul>
<h2>Aktarım</h2>
<p>Kişisel verileriniz yalnızca siparişin teslimi için kargo şirketlerine, ödeme için bankalara ve yasal zorunluluk halinde yetkili kamu kurumlarına aktarılır. Sipariş yazışmaları WhatsApp (Meta Platforms) üzerinden yürütüldüğünden, mesajlarınız bu hizmetin sunucularında işlenir.</p>
<h2>Toplama yöntemi</h2>
<p>Verileriniz, internet sitesi ve WhatsApp üzerinden sizin tarafınızdan iletilmesi yoluyla toplanır.</p>
<h2>Haklarınız</h2>
<p>KVKK md. 11 uyarınca; verilerinizin işlenip işlenmediğini öğrenme, bilgi talep etme, düzeltilmesini veya silinmesini isteme, aktarıldığı üçüncü kişileri öğrenme, itiraz etme ve zararın giderilmesini talep etme haklarına sahipsiniz. Başvurularınızı {kvkk_iletisim} üzerinden iletebilirsiniz; talepler en geç 30 gün içinde yanıtlanır.</p>
<p><strong>Veri sorumlusu:</strong> {satici_unvan}, {satici_adres}</p>`;

const cookies = `<p>{site_url} yalnızca sitenin çalışması için gerekli olan tarayıcı depolamasını kullanır. Reklam veya takip çerezi kullanılmaz.</p>
<h2>Kullanılan depolama alanları</h2>
<ul>
<li><strong>orimini-sepet:</strong> Sepete eklediğiniz ürünleri hatırlar.</li>
<li><strong>orimini-favoriler:</strong> Beğendiğiniz ürünleri hatırlar.</li>
<li><strong>orimini-onay:</strong> Bu bilgilendirmeyi gördüğünüzü hatırlar.</li>
</ul>
<p>Bu bilgiler yalnızca sizin tarayıcınızda tutulur, sunucumuza gönderilmez. Tarayıcı ayarlarınızdan dilediğiniz zaman silebilirsiniz. İleride analiz aracı eklenirse bu metin güncellenecek ve onayınız alınacaktır.</p>`;

const shipping = `<h2>Hazırlık süresi</h2>
<p>Ürünlerimiz sipariş üzerine, kişiye özel olarak hazırlanır. Nakış yazımını WhatsApp'tan onayladıktan sonra siparişiniz genellikle 3-7 iş günü içinde kargoya verilir. Yoğun dönemlerde (bayram, yılbaşı) bu süre uzayabilir; sipariş sırasında size net tarih bildiririz.</p>
<h2>Kargo</h2>
<ul>
<li>{sehir} merkezli atölyemizden Türkiye'nin her yerine gönderim yapıyoruz.</li>
<li>{kargo_limit} ve üzeri siparişlerde kargo ücretsizdir.</li>
<li>Kargo takip numaranız WhatsApp üzerinden paylaşılır.</li>
<li>{sehir} içi siparişlerde elden teslim seçeneği için bize yazabilirsiniz.</li>
</ul>
<h2>Ödeme</h2>
<p>Siparişiniz WhatsApp üzerinden onaylandıktan sonra ödeme bilgileri (havale / EFT vb.) tarafınıza iletilir.</p>
<h2>Değişim ve iade</h2>
<ul>
<li>İsim, tarih gibi kişiye özel nakış işlenen ürünler, kişiye özel üretildiği için üretim hatası dışında iade ve değişime kabul edilmez.</li>
<li>Nakışsız ürünlerde, teslimattan itibaren 14 gün içinde, kullanılmamış ve etiketi sökülmemiş olması şartıyla beden değişimi yapılabilir.</li>
<li>Üretim hatası olan ürünlerde kargo ücreti tarafımıza aittir; ürün yenilenir ya da ücret iade edilir.</li>
</ul>
<p>Değişim ve iade talepleriniz için WhatsApp hattımızdan ({telefon}) bize ulaşın.</p>`;

export const pages: PageSeed[] = [
  {
    slug: "anasayfa",
    title: "Anasayfa",
    seo_title: "{site_adi} | Kişiye Özel Nakışlı Bebek ve Çocuk Kıyafetleri",
    seo_description: "",
    is_system: true,
  },
  {
    slug: "urunler",
    title: "Tüm Ürünler",
    lead: "0-3 aydan 10 yaşa kadar, kişiye özel nakışlı takımlar ve elbiseler. Yaş / beden seçerek size uygun modelleri görün.",
    seo_title: "Tüm Ürünler - Kişiye Özel Bebek ve Çocuk Kıyafetleri",
    seo_description:
      "{site_adi}'nin tüm koleksiyonu: isim nakışlı kısa ve uzun salopet takımlar, kız çocuk elbiseleri ve yenidoğan setleri. Yaşa ve bedene göre filtreleyin.",
    is_system: true,
  },
  {
    slug: "hakkimizda",
    title: "Küçükler için, sevgiyle ve özenle",
    eyebrow: "Custom-made for little ones",
    lead: "{site_adi}, {sehir}'da bebek ve çocuklar için kişiye özel kıyafetler hazırlayan butik bir atölyedir.",
    content:
      "<p>Her takımı tek tek kesiyor, dikiyor ve bebeğinizin adıyla, doğum tarihiyle ya da ilk yaşıyla nakışlıyoruz. Salopet takımlardan kız elbiselerine, hastane çıkışı setlerinden doğum günü kıyafetlerine kadar her parçada yumuşak, cilt dostu kumaşlar ve pastel tonlar kullanıyoruz.</p>\n<p>Amacımız, çocuğunuzun özel gününü fotoğraflarda ve anılarda bir ömür yaşatacak kıyafetler hazırlamak. Beden, renk ya da tema konusunda aklınızdakini bize yazmanız yeterli.</p>",
    image_url: "/images/urunler/bej-aslan-salopet.webp",
    image_alt: "Orimini atölyesinde hazırlanan isim nakışlı salopet takım",
    button_text: "Bize yazın",
    button_link: "whatsapp",
    seo_title: "Hakkımızda",
    seo_description:
      "{site_adi}, {sehir}'da kişiye özel nakışlı bebek ve çocuk kıyafetleri hazırlayan bir butik atölyedir.",
    is_system: true,
  },
  {
    slug: "iletisim",
    title: "İletişim",
    lead: "Siparişleriniz, özel tasarım talepleriniz ve beden sorularınız için bize WhatsApp'tan ulaşabilirsiniz. Atölyemiz {sehir}'dadır, tüm Türkiye'ye kargo gönderiyoruz.",
    content:
      "<h2>Konum</h2>\n<p>{adres}. {sehir} içinden siparişlerde elden teslim seçeneği için WhatsApp üzerinden bilgi alabilirsiniz.</p>",
    seo_title: "İletişim",
    seo_description:
      "{site_adi} iletişim bilgileri: WhatsApp ve telefon {telefon}, {sehir}. Sipariş ve özel tasarım talepleriniz için bize yazın.",
    is_system: true,
  },
  {
    slug: "kargo-ve-iade",
    title: "Kargo ve İade",
    content: shipping,
    seo_title: "Kargo ve İade Koşulları",
    seo_description:
      "{site_adi} kargo, teslimat, değişim ve iade koşulları. {kargo_limit} üzeri ücretsiz kargo.",
    is_system: true,
  },
  {
    slug: "beden-rehberi",
    title: "Beden Rehberi",
    lead: "Doğru bedeni seçmek için çocuğunuzun yaşından çok boy ve kilosuna bakmanızı öneririz. İki beden arasında kaldıysanız büyük olanı seçin.",
    content:
      "<h2>Nasıl ölçülür?</h2>\n<ul>\n<li><strong>Boy:</strong> Çocuğunuzu çıplak ayakla duvara yaslayın, başının üstünden topuğuna kadar ölçün.</li>\n<li><strong>Göğüs:</strong> Kolların altından, göğsün en geniş yerinden mezurayı sıkmadan geçirin.</li>\n<li><strong>Özel dikim:</strong> Ölçüleriniz tabloya uymuyorsa WhatsApp'tan yazın, ölçüye göre dikelim.</li>\n</ul>",
    seo_title: "Beden Rehberi - Bebek ve Çocuk Yaş Beden Tablosu",
    seo_description:
      "0-3 aydan 10 yaşa kadar bebek ve çocuk beden tablosu: boy ve kilo aralıklarına göre doğru yaş / beden seçimi.",
    is_system: true,
  },
  {
    slug: "sikca-sorulan-sorular",
    title: "Sıkça Sorulan Sorular",
    lead: "Aradığınız cevabı bulamazsanız WhatsApp'tan ({telefon}) bize yazın.",
    seo_title: "Sıkça Sorulan Sorular - Nasıl Sipariş Verilir?",
    seo_description:
      "{site_adi}'den WhatsApp ile nasıl sipariş verilir, nakış, beden, kargo ve ödeme hakkında sıkça sorulan sorular.",
    is_system: true,
  },
  {
    slug: "sepet",
    title: "Sepetim",
    lead: "Seçtiğiniz ürünleri tek bir WhatsApp mesajıyla bize gönderin, siparişinizi hemen onaylayalım.",
    is_system: true,
  },
  {
    slug: "favoriler",
    title: "Favorilerim",
    lead: "Beğendiğiniz ürünler burada saklanır.",
    is_system: true,
  },
  {
    slug: "mesafeli-satis-sozlesmesi",
    title: "Mesafeli Satış Sözleşmesi",
    content: distanceSales,
    seo_description:
      "{site_adi} mesafeli satış sözleşmesi: sipariş, ödeme, teslimat, cayma hakkı ve iade koşulları.",
    is_system: true,
  },
  {
    slug: "on-bilgilendirme-formu",
    title: "Ön Bilgilendirme Formu",
    content: preInformation,
    seo_description: "{site_adi} ön bilgilendirme formu: satıcı bilgileri, ödeme, teslimat ve cayma hakkı.",
    is_system: true,
  },
  {
    slug: "kvkk-aydinlatma-metni",
    title: "KVKK Aydınlatma Metni",
    content: kvkk,
    seo_description: "{site_adi} kişisel verilerin korunması aydınlatma metni.",
    is_system: true,
  },
  {
    slug: "cerez-politikasi",
    title: "Çerez Politikası",
    content: cookies,
    seo_description: "{site_adi} çerez ve tarayıcı depolama politikası.",
    is_system: true,
  },
];

export const faqs: { question: string; answer: string }[] = [
  {
    question: "Nasıl sipariş verebilirim?",
    answer:
      'Ürün sayfasında yaş / beden seçip nakış bilgisini yazdıktan sonra "WhatsApp ile sipariş ver" butonuna basın. Sipariş bilgileriniz hazır bir mesaj olarak WhatsApp\'ta açılır, göndermeniz yeterli. Birden fazla ürün için ürünleri sepete ekleyip sepetten tek mesajla gönderebilirsiniz.',
  },
  {
    question: "İsim nakışı ücretli mi?",
    answer: "Hayır. İsim ve tarih nakışı ürün fiyatına dahildir. Yazımı siparişten önce WhatsApp üzerinden sizinle teyit ederiz.",
  },
  {
    question: "Hangi yaş ve bedenler var?",
    answer:
      "0-3 ay, 3-6 ay, 6-9 ay, 9-12 ay ve 12-18 ay bebek bedenlerinin yanında 2 yaştan 10 yaşa kadar çocuk bedenleri hazırlıyoruz. Her ürünün mevcut bedenleri ürün sayfasında gösterilir.",
  },
  {
    question: "Sipariş ne kadar sürede elime ulaşır?",
    answer:
      "Nakış onayından sonra siparişler genellikle 3-7 iş günü içinde kargoya verilir. Kargo süresi bulunduğunuz ile göre 1-3 iş günüdür.",
  },
  {
    question: "Kargo ücreti ne kadar?",
    answer:
      "{kargo_limit} ve üzeri siparişlerde kargo ücretsizdir. Altındaki siparişlerde kargo ücreti sipariş sırasında bildirilir.",
  },
  {
    question: "Ödemeyi nasıl yapıyorum?",
    answer: "Siparişiniz WhatsApp'ta onaylandıktan sonra ödeme bilgileri size iletilir.",
  },
  {
    question: "Özel renk ya da tema isteyebilir miyim?",
    answer:
      "Evet. Doğum günü teması, renk ya da nakış deseni için isteklerinizi WhatsApp'tan yazın, size özel bir takım hazırlayalım.",
  },
  {
    question: "İade ve değişim yapabilir miyim?",
    answer:
      "Kişiye özel nakış işlenen ürünlerde üretim hatası dışında iade ve değişim yapılamaz. Nakışsız ürünlerde 14 gün içinde beden değişimi yapılabilir.",
  },
];

export const menuItems: { location: "header" | "footer"; label: string; href: string }[] = [
  { location: "header", href: "/kategori/kisa-salopet-takim", label: "Kısa Salopet Takım" },
  { location: "header", href: "/kategori/uzun-salopet-takim", label: "Uzun Salopet Takım" },
  { location: "header", href: "/kategori/kiz-elbise", label: "Kız Elbise" },
  { location: "header", href: "/kategori/yenidogan-setleri", label: "Yenidoğan Setleri" },
  { location: "header", href: "/urunler", label: "Tüm Ürünler" },
  { location: "footer", href: "/hakkimizda", label: "Hakkımızda" },
  { location: "footer", href: "/beden-rehberi", label: "Beden Rehberi" },
  { location: "footer", href: "/kargo-ve-iade", label: "Kargo ve İade" },
  { location: "footer", href: "/sikca-sorulan-sorular", label: "Sıkça Sorulan Sorular" },
  { location: "footer", href: "/iletisim", label: "İletişim" },
  { location: "footer", href: "/mesafeli-satis-sozlesmesi", label: "Mesafeli Satış Sözleşmesi" },
  { location: "footer", href: "/on-bilgilendirme-formu", label: "Ön Bilgilendirme Formu" },
  { location: "footer", href: "/kvkk-aydinlatma-metni", label: "KVKK Aydınlatma Metni" },
  { location: "footer", href: "/cerez-politikasi", label: "Çerez Politikası" },
];
