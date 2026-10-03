-- =============================================
-- ORIMINI - İLK İÇERİK (schema.sql'den sonra çalıştırın)
-- Bu dosya scripts/generate-seed.ts ile src/data altındaki içerikten üretilir.
-- Var olan kayıtlara dokunmaz (on conflict do nothing), tekrar çalıştırmak güvenlidir.
-- =============================================

-- site_settings
insert into site_settings (key, value) values
  ('site_name', 'Orimini'),
  ('slogan', 'Custom-made for little ones'),
  ('tagline', 'Kişiye özel nakışlı bebek ve çocuk kıyafetleri'),
  ('site_description', 'Orimini, Adana''da el emeğiyle hazırlanan kişiye özel nakışlı salopet takımlar, kız çocuk elbiseleri ve yenidoğan setleri sunar. 0-3 aydan 10 yaşa kadar beden seçenekleri, WhatsApp ile kolay sipariş.'),
  ('keywords', 'kişiye özel bebek kıyafeti, isim nakışlı salopet takım, kısa salopet takım, uzun salopet takım, kız çocuk elbise, doğum günü kıyafeti, bebek papyonlu takım, Adana bebek giyim'),
  ('site_url', ''),
  ('theme_color', '#F7F1E8'),
  ('logo_url', '/images/orimini-logo-yazi.webp'),
  ('footer_logo_url', ''),
  ('schema_logo_url', '/images/orimini-monogram.png'),
  ('favicon_url', ''),
  ('og_image', ''),
  ('phone_display', '0506 273 59 29'),
  ('phone_e164', '+905062735929'),
  ('whatsapp_number', '905062735929'),
  ('email', ''),
  ('city', 'Adana'),
  ('region', 'Adana'),
  ('address', 'Adana, Türkiye'),
  ('working_hours', 'Pazartesi - Cumartesi, 09:00 - 19:00'),
  ('instagram', ''),
  ('facebook', ''),
  ('tiktok', ''),
  ('google_maps_embed', ''),
  ('announcement_active', 'true'),
  ('announcement_text', 'Adana''dan tüm Türkiye''ye kargo · İsim nakışı ücretsiz'),
  ('announcement_show_whatsapp', 'true'),
  ('free_shipping_limit', '2500'),
  ('price_note', '{kargo_limit} ve üzeri siparişlerde kargo ücretsiz. Ödeme ve teslimat WhatsApp üzerinden netleştirilir.'),
  ('product_trust_items', 'nakis | Ücretsiz isim nakışı
kalp | El emeği dikim
kargo | Türkiye geneli kargo
kalkan | Nakış onayı sonrası üretim'),
  ('product_shipping_text', '<p>Siparişler nakış onayından sonra hazırlanır ve genellikle 3-7 iş günü içinde kargoya verilir. {sehir} içi elden teslim için bizimle iletişime geçebilirsiniz.</p><p>Kişiye özel nakış işlenen ürünlerde, üretim hatası dışında iade ve değişim yapılamaz. Ayrıntılar için <a href="/kargo-ve-iade">Kargo ve İade</a> sayfasına bakın.</p>'),
  ('personalization_label', 'Nakış yapılacak isim / tarih'),
  ('personalization_placeholder', 'Örn: Muhammed Eren - 28.08.2025'),
  ('personalization_note', 'İsim ve tarih nakışı ücretsizdir. Yazım kontrolü için siparişten sonra WhatsApp üzerinden teyit alınır.'),
  ('order_note_placeholder', 'Örn: Teslim tarihi, renk tercihi, özel istekler'),
  ('cart_whatsapp_hint', 'Mesajınız {telefon} numaralı WhatsApp hattımıza hazır olarak açılır. Ödeme ve teslimat bilgilerini oradan netleştiriyoruz.'),
  ('reviews_note', 'Yorumunuz bize ulaşır, onaylandıktan sonra burada yayınlanır.'),
  ('footer_about_text', 'Kişiye özel nakışlı bebek ve çocuk kıyafetleri. Her parça, küçükler için sevgiyle ve özenle hazırlanır.'),
  ('footer_whatsapp_button', 'WhatsApp''tan yazın'),
  ('footer_bottom_text', '{sehir} · Siparişler WhatsApp üzerinden alınır.'),
  ('consent_active', 'true'),
  ('consent_text', 'Sitemizde yalnızca sepet ve favorilerinizi hatırlamak için tarayıcı depolaması kullanıyoruz. Kişisel verileriniz {kvkk} ve {cerez} kapsamında korunur.'),
  ('legal_title', 'Orimini'),
  ('legal_address', 'Adana, Türkiye'),
  ('legal_tax_info', ''),
  ('legal_email', ''),
  ('legal_kep', ''),
  ('legal_updated_at', '23.09.2026'),
  ('google_verification', ''),
  ('yandex_verification', ''),
  ('bing_verification', '')
on conflict (key) do nothing;

-- sizes
insert into sizes (slug, label, size_group, height, weight, is_active, sort_order) values
  ('0-3-ay', '0-3 Ay', 'bebek', '56 - 62 cm', '3 - 5,5 kg', true, 1),
  ('3-6-ay', '3-6 Ay', 'bebek', '62 - 68 cm', '5,5 - 7,5 kg', true, 2),
  ('6-9-ay', '6-9 Ay', 'bebek', '68 - 74 cm', '7,5 - 9 kg', true, 3),
  ('9-12-ay', '9-12 Ay', 'bebek', '74 - 80 cm', '9 - 10,5 kg', true, 4),
  ('12-18-ay', '12-18 Ay', 'bebek', '80 - 86 cm', '10,5 - 12 kg', true, 5),
  ('2-yas', '2 Yaş', 'cocuk', '86 - 92 cm', '12 - 14 kg', true, 6),
  ('3-yas', '3 Yaş', 'cocuk', '92 - 98 cm', '14 - 16 kg', true, 7),
  ('4-yas', '4 Yaş', 'cocuk', '98 - 104 cm', '16 - 18 kg', true, 8),
  ('5-yas', '5 Yaş', 'cocuk', '104 - 110 cm', '18 - 20 kg', true, 9),
  ('6-yas', '6 Yaş', 'cocuk', '110 - 116 cm', '20 - 22 kg', true, 10),
  ('7-yas', '7 Yaş', 'cocuk', '116 - 122 cm', '22 - 25 kg', true, 11),
  ('8-yas', '8 Yaş', 'cocuk', '122 - 128 cm', '25 - 28 kg', true, 12),
  ('9-yas', '9 Yaş', 'cocuk', '128 - 134 cm', '28 - 31 kg', true, 13),
  ('10-yas', '10 Yaş', 'cocuk', '134 - 140 cm', '31 - 35 kg', true, 14)
on conflict (slug) do nothing;

-- categories
insert into categories (slug, name, short_name, description, seo_title, seo_description, image_url, tint, is_active, sort_order) values
  ('kisa-salopet-takim', 'Kısa Salopet Takım', 'Kısa Salopet', 'Gömlek, kısa salopet ve papyondan oluşan, isim ve tarih nakışıyla kişiye özel hazırlanan takımlar. Doğum günü, bayram ve özel çekimler için ideal.', 'Kısa Salopet Takım | İsim Nakışlı Bebek ve Çocuk Salopet', 'İsim nakışlı kısa salopet takımlar: gömlek, salopet ve papyon bir arada. 0-3 aydan 6 yaşa kadar beden, WhatsApp ile kolay sipariş.', '/images/urunler/kirmizi-sirk-salopet.webp', '#F3DCD4', true, 1),
  ('uzun-salopet-takim', 'Uzun Salopet Takım', 'Uzun Salopet', 'Serin günler ve şık davetler için uzun paça salopet takımlar. Yumuşak dokulu kumaşlar, ayarlanabilir askılar ve kişiye özel nakış seçeneği.', 'Uzun Salopet Takım | Kişiye Özel Bebek ve Çocuk Takımları', 'Uzun salopet takım modelleri: keten, kadife ve gabardin seçenekleri, isim nakışı ile kişiye özel. 0-3 aydan 8 yaşa kadar beden.', 'https://images.unsplash.com/photo-1698939096910-5b9a8fec3425?auto=format&fit=crop&w=1200&q=80', '#E4E9DC', true, 2),
  ('kiz-elbise', 'Kız Elbise', 'Kız Elbise', 'Tül, dantel ve pamuklu kumaşlardan, pastel tonlarda kız çocuk elbiseleri. İstenirse yaka ya da etek ucuna isim nakışı işlenir.', 'Kız Çocuk Elbise | Pastel Tonlarda Özel Gün Elbiseleri', 'Pastel renklerde kız bebek ve kız çocuk elbiseleri. Doğum günü, düğün ve özel günler için 6 aydan 10 yaşa kadar beden seçenekleri.', 'https://images.unsplash.com/photo-1578897367107-2828e351c8a8?auto=format&fit=crop&w=1200&q=80', '#EFE0EA', true, 3),
  ('yenidogan-setleri', 'Yenidoğan Setleri', 'Yenidoğan', 'Hastane çıkışı ve ilk fotoğraflar için %100 pamuklu, isim nakışlı yenidoğan setleri. Hassas ciltlere uygun, yumuşak dokular.', 'Yenidoğan Setleri | İsim Nakışlı Hastane Çıkışı Setleri', 'İsim nakışlı hastane çıkışı ve yenidoğan setleri. %100 pamuk, 0-3 aydan 12-18 aya kadar beden, WhatsApp ile sipariş.', 'https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=1200&q=80', '#DDE7EE', true, 4)
on conflict (slug) do nothing;

-- products
insert into products (slug, code, name, category_slug, price, old_price, images, color, short_description, description, set_contents, fabric, care, sizes, personalization_enabled, personalization_label, personalization_placeholder, personalization_note, badges, is_featured, seo_title, seo_description, is_active, sort_order) values
  ('kirmizi-sirk-temali-kisa-salopet-takim', 'ORM-1001', 'Kırmızı Sirk Temalı Kısa Salopet Takım', 'kisa-salopet-takim', 1850, null, '[{"src":"/images/urunler/kirmizi-sirk-salopet.webp","alt":"Kırmızı sirk çadırı nakışlı, yıldız işlemeli kısa salopet takım ve isim nakışlı beyaz gömlek"},{"src":"/images/urunler/sirk-cadir-detay.webp","alt":"Salopet ön panosundaki sirk çadırı nakışı yakın çekim"},{"src":"/images/urunler/sirk-isim-detay.webp","alt":"Gömlek koluna işlenmiş Yağız Ali isim nakışı"},{"src":"/images/urunler/sirk-yildiz-detay.webp","alt":"Kırmızı salopet üzerindeki altın yıldız işlemeleri ve saten biye"}]'::jsonb, 'Kırmızı / Beyaz', 'Sirk çadırı nakışlı ön pano, altın yıldız işlemeli kırmızı salopet, kolu isim nakışlı beyaz gömlek ve papyon.', '<p>Doğum günü partileri ve sirk temalı kutlamalar için hazırladığımız bu takım, beyaz ön panodaki renkli sirk çadırı nakışı ve kırmızı salopetin üzerine serpiştirilmiş altın sarısı yıldızlarla göz dolduruyor.</p>
<p>Gömleğin iki koluna ve yakasına bebeğinizin adı ve baş harfi işlenir. Altın düğmeler ve saten biyeler takımı tamamlar.</p>', array['Kısa salopet', 'Kısa kollu gömlek', 'Papyon']::text[], 'Salopet: gabardin, gömlek: %100 pamuk poplin', array['30°C''de ters çevrilerek yıkayın.', 'Çamaşır suyu kullanmayın.', 'Nakışlı bölgeleri tersinden, düşük ısıda ütüleyin.', 'Kurutma makinesi yerine serin ve gölgede kurutun.']::text[], array['6-9-ay', '9-12-ay', '12-18-ay', '2-yas', '3-yas', '4-yas']::text[], true, '', '', '', array['Kişiye Özel', 'Çok Satan']::text[], true, 'Kırmızı Sirk Temalı İsim Nakışlı Kısa Salopet Takım', 'Sirk çadırı nakışlı, yıldız işlemeli kırmızı kısa salopet, isim nakışlı gömlek ve papyon. Doğum günü için 6-9 ay – 4 yaş. WhatsApp ile sipariş.', true, 1),
  ('bej-aslan-nakisli-1-yas-kisa-salopet-takim', 'ORM-1002', 'Bej Aslan Nakışlı 1 Yaş Kısa Salopet Takım', 'kisa-salopet-takim', 1750, null, '[{"src":"/images/urunler/bej-aslan-salopet.webp","alt":"Aslan ve 1 yaş nakışlı gömlek, askısında isim, belinde doğum tarihi işlenmiş bej kısa salopet takım"},{"src":"/images/urunler/aslan-nakis-detay.webp","alt":"Gömlekteki taçlı aslan ve 1 yaş nakışı yakın çekim"},{"src":"/images/urunler/aslan-isim-detay.webp","alt":"Salopet askısına işlenmiş Muhammed isim nakışı"},{"src":"/images/urunler/aslan-tarih-detay.webp","alt":"Salopet beline işlenmiş 28.08.2025 doğum tarihi nakışı"}]'::jsonb, 'Bej / Beyaz', 'İlk yaş günü için aslan ve "1" nakışlı gömlek, askılarında isim, belinde doğum tarihi işlenen bej salopet.', '<p>Bebeğinizin ilk yaş gününe özel tasarladığımız bu takımda gömleğin önünde taçlı sevimli aslan ve "1" nakışı yer alır.</p>
<p>Salopet askılarına bebeğinizin adı, bel kısmına ise doğum tarihi işlenir. Balon paçalı kesimi ve bej papyonuyla fotoğraf çekimleri için mükemmel.</p>', array['Kısa salopet (balon paça)', 'Kısa kollu gömlek', 'Papyon']::text[], 'Salopet: gabardin, gömlek: %100 pamuk poplin', array['30°C''de ters çevrilerek yıkayın.', 'Çamaşır suyu kullanmayın.', 'Nakışlı bölgeleri tersinden, düşük ısıda ütüleyin.', 'Kurutma makinesi yerine serin ve gölgede kurutun.']::text[], array['9-12-ay', '12-18-ay', '2-yas']::text[], true, '', '', '', array['Kişiye Özel', 'Yeni']::text[], true, '1 Yaş Doğum Günü Kıyafeti - Aslan Nakışlı Salopet Takım', 'Aslan ve 1 yaş nakışlı gömlek, askısında isim, belinde doğum tarihi işlenen bej salopet takım. İlk yaş günü için kişiye özel, WhatsApp ile sipariş.', true, 2),
  ('pudra-pembe-kisa-salopet-takim', 'ORM-1003', 'Pudra Pembe Kısa Salopet Takım', 'kisa-salopet-takim', 1590, null, '[{"src":"https://images.unsplash.com/photo-1765980641678-f28f49092350?auto=format&fit=crop&w=1200&q=80","alt":"Pudra pembe kısa salopet giyen çocuk"},{"src":"https://images.unsplash.com/photo-1615175254861-f9f581d95996?auto=format&fit=crop&w=1200&q=80","alt":"Pembe tonlarda kıyafetli kız çocuk"},{"src":"https://images.unsplash.com/photo-1622290291720-ac961c43ee30?auto=format&fit=crop&w=1200&q=80","alt":"Pembe ayıcık desenli bebek kıyafeti detayı"}]'::jsonb, 'Pudra Pembe', 'Yumuşak pudra tonunda, fırfır askılı kısa salopet ve beyaz body.', '<p>Pastel pudra pembesi kısa salopet, fırfırlı askıları ve önündeki küçük kalp nakışıyla bahar ve yaz günleri için tatlı bir seçim.</p>
<p>Beyaz pamuklu body ile birlikte gönderilir, askılar düğmeyle ayarlanabilir.</p>', array['Kısa salopet', 'Kısa kollu body']::text[], 'Salopet: %100 pamuk keten görünümlü kumaş, body: %100 pamuk', array['30°C''de ters çevrilerek yıkayın.', 'Çamaşır suyu kullanmayın.', 'Nakışlı bölgeleri tersinden, düşük ısıda ütüleyin.', 'Kurutma makinesi yerine serin ve gölgede kurutun.']::text[], array['3-6-ay', '6-9-ay', '9-12-ay', '12-18-ay', '2-yas', '3-yas']::text[], true, '', '', '', array['Kişiye Özel']::text[], true, 'Pudra Pembe Kız Bebek Kısa Salopet Takım', 'Fırfır askılı pudra pembe kısa salopet ve pamuklu body. İsim nakışı ücretsiz, 3-6 ay – 3 yaş beden. Orimini''den WhatsApp ile kolay sipariş.', true, 3),
  ('mint-yesili-kisa-salopet-takim', 'ORM-1004', 'Mint Yeşili Kısa Salopet Takım', 'kisa-salopet-takim', 1590, null, '[{"src":"https://images.unsplash.com/photo-1774641374314-6aaaf7d45d90?auto=format&fit=crop&w=1200&q=80","alt":"Salopet takım giyen iki küçük çocuk"},{"src":"https://images.unsplash.com/photo-1774641374251-d2d965dbf542?auto=format&fit=crop&w=1200&q=80","alt":"Salopet giyen çocuklar parkta"},{"src":"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80","alt":"Askıda çocuk kıyafetleri"}]'::jsonb, 'Mint Yeşili', 'Ferah mint tonunda kısa salopet, beyaz gömlek ve papyon.', '<p>Yaz düğünleri ve bayramlar için ferah bir alternatif. Mint yeşili salopet, beyaz gömlek ve aynı tonda papyon ile tamamlanır.</p>', array['Kısa salopet', 'Kısa kollu gömlek', 'Papyon']::text[], 'Salopet: gabardin, gömlek: %100 pamuk poplin', array['30°C''de ters çevrilerek yıkayın.', 'Çamaşır suyu kullanmayın.', 'Nakışlı bölgeleri tersinden, düşük ısıda ütüleyin.', 'Kurutma makinesi yerine serin ve gölgede kurutun.']::text[], array['6-9-ay', '9-12-ay', '12-18-ay', '2-yas', '3-yas', '4-yas', '5-yas']::text[], true, '', '', '', '{}'::text[], false, 'Mint Yeşili Kısa Salopet Takım - Gömlek ve Papyonlu', 'Mint yeşili kısa salopet, beyaz gömlek ve papyon. Bayram ve yaz düğünleri için isim nakışlı, 6-9 ay – 5 yaş beden seçenekleri.', true, 4),
  ('krem-keten-uzun-salopet-takim', 'ORM-2001', 'Krem Keten Uzun Salopet Takım', 'uzun-salopet-takim', 1950, null, '[{"src":"https://images.unsplash.com/photo-1698939096910-5b9a8fec3425?auto=format&fit=crop&w=1200&q=80","alt":"Krem uzun salopet giyen çocuk"},{"src":"https://images.unsplash.com/photo-1632337948784-35863f872dc8?auto=format&fit=crop&w=1200&q=80","alt":"Atölyede askı ve makas, dikim hazırlığı"},{"src":"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80","alt":"Ahşap askılarda çocuk kıyafetleri"}]'::jsonb, 'Krem', 'Doğal keten dokulu krem uzun salopet, uzun kollu gömlek ve kahve papyon.', '<p>Doğal keten dokusu ve krem tonuyla zamansız bir takım. Uzun kollu beyaz gömlek ve kahverengi papyon ile şık davetlerin vazgeçilmezi.</p>
<p>Askılara veya ön panoya isim nakışı işlenebilir.</p>', array['Uzun salopet', 'Uzun kollu gömlek', 'Papyon']::text[], 'Salopet: keten-pamuk karışımı, gömlek: %100 pamuk poplin', array['30°C''de ters çevrilerek yıkayın.', 'Çamaşır suyu kullanmayın.', 'Nakışlı bölgeleri tersinden, düşük ısıda ütüleyin.', 'Kurutma makinesi yerine serin ve gölgede kurutun.']::text[], array['6-9-ay', '9-12-ay', '12-18-ay', '2-yas', '3-yas', '4-yas', '5-yas', '6-yas']::text[], true, '', '', '', array['Kişiye Özel', 'Çok Satan']::text[], true, 'Krem Keten Uzun Salopet Takım - İsim Nakışlı', 'Keten dokulu krem uzun salopet, uzun kollu gömlek ve kahve papyon. Kişiye özel isim nakışı ile 6-9 ay – 6 yaş. WhatsApp ile sipariş.', true, 5),
  ('kahve-kadife-uzun-salopet-takim', 'ORM-2002', 'Kahve Kadife Uzun Salopet Takım', 'uzun-salopet-takim', 2150, 2390, '[{"src":"https://images.unsplash.com/photo-1541015492536-31d513c59861?auto=format&fit=crop&w=1200&q=80","alt":"Uzun salopet giyen gülümseyen erkek çocuk"},{"src":"https://images.unsplash.com/photo-1698939096910-5b9a8fec3425?auto=format&fit=crop&w=1200&q=80","alt":"Uzun salopet giyen çocuk bahçede"},{"src":"https://images.unsplash.com/photo-1632337948784-35863f872dc8?auto=format&fit=crop&w=1200&q=80","alt":"Atölyede dikim hazırlığı"}]'::jsonb, 'Kahverengi', 'Sonbahar ve kış için yumuşak kadife uzun salopet, gömlek ve papyon.', '<p>İnce fitilli kadifeden dikilen uzun salopet, soğuk günlerde sıcak tutarken şıklıktan ödün vermez.</p>
<p>Krem gömlek ve kahve papyonla birlikte gönderilir.</p>', array['Uzun salopet', 'Uzun kollu gömlek', 'Papyon']::text[], 'Salopet: pamuklu kadife, gömlek: %100 pamuk poplin', array['30°C''de ters çevrilerek yıkayın.', 'Çamaşır suyu kullanmayın.', 'Nakışlı bölgeleri tersinden, düşük ısıda ütüleyin.', 'Kurutma makinesi yerine serin ve gölgede kurutun.']::text[], array['9-12-ay', '12-18-ay', '2-yas', '3-yas', '4-yas', '5-yas', '6-yas', '7-yas', '8-yas']::text[], true, '', '', '', array['İndirim']::text[], true, 'Kahve Kadife Uzun Salopet Takım - Kışlık Çocuk Takımı', 'Yumuşak kadife kahverengi uzun salopet, gömlek ve papyon. Sonbahar-kış davetleri için 9-12 ay – 8 yaş, isim nakışı ücretsiz.', true, 6),
  ('bebe-mavisi-uzun-salopet-takim', 'ORM-2003', 'Bebe Mavisi Uzun Salopet Takım', 'uzun-salopet-takim', 1890, null, '[{"src":"https://images.unsplash.com/photo-1774641374251-d2d965dbf542?auto=format&fit=crop&w=1200&q=80","alt":"Uzun salopet giyen küçük çocuklar parkta"},{"src":"https://images.unsplash.com/photo-1774641374314-6aaaf7d45d90?auto=format&fit=crop&w=1200&q=80","alt":"Salopet giyen iki çocuk"},{"src":"https://images.unsplash.com/photo-1622290319146-7b63df48a635?auto=format&fit=crop&w=1200&q=80","alt":"Beyaz ve mavi bebek kıyafeti"}]'::jsonb, 'Bebe Mavisi', 'Açık mavi uzun salopet, beyaz gömlek ve lacivert papyon.', '<p>Pastel bebe mavisi tonunda uzun salopet, mevlüt, sünnet ve aile davetleri için hazırlandı. Ön panoya baş harf nakışı işlenebilir.</p>', array['Uzun salopet', 'Uzun kollu gömlek', 'Papyon']::text[], 'Salopet: gabardin, gömlek: %100 pamuk poplin', array['30°C''de ters çevrilerek yıkayın.', 'Çamaşır suyu kullanmayın.', 'Nakışlı bölgeleri tersinden, düşük ısıda ütüleyin.', 'Kurutma makinesi yerine serin ve gölgede kurutun.']::text[], array['0-3-ay', '3-6-ay', '6-9-ay', '9-12-ay', '12-18-ay', '2-yas', '3-yas', '4-yas']::text[], true, '', '', '', '{}'::text[], false, 'Bebe Mavisi Uzun Salopet Takım - Mevlüt ve Sünnet', 'Açık mavi uzun salopet, beyaz gömlek ve lacivert papyon. Mevlüt, sünnet ve aile davetleri için 0-3 ay – 4 yaş, baş harf nakışlı.', true, 7),
  ('pudra-tul-etekli-kiz-elbise', 'ORM-3001', 'Pudra Tül Etekli Kız Elbise', 'kiz-elbise', 1690, null, '[{"src":"https://images.unsplash.com/photo-1578897367107-2828e351c8a8?auto=format&fit=crop&w=1200&q=80","alt":"Elbisesinin eteğini tutan gülümseyen kız çocuk"},{"src":"https://images.unsplash.com/photo-1615175254861-f9f581d95996?auto=format&fit=crop&w=1200&q=80","alt":"Pembe beyaz elbiseli kız çocuk sandalyede oturuyor"},{"src":"https://images.unsplash.com/photo-1620774760711-caa4c94d683a?auto=format&fit=crop&w=1200&q=80","alt":"Beyaz elbiseli kız çocuk"}]'::jsonb, 'Pudra', 'Kat kat tül etekli, saten kuşaklı pudra renkli özel gün elbisesi.', '<p>Kabarık tül eteği ve saten kuşağıyla doğum günleri ve düğünler için prenses gibi bir görünüm.</p>
<p>Astarı %100 pamukludur, sırttan fermuarlıdır. Kuşak ucuna isim nakışı işlenebilir.</p>', array['Elbise', 'Saç bandı']::text[], 'Üst: saten, etek: çok katlı tül, astar: %100 pamuk', array['30°C''de hassas programda yıkayın.', 'Tül bölgeyi ütülemeyin.', 'Askıda kurutun.']::text[], array['6-9-ay', '9-12-ay', '12-18-ay', '2-yas', '3-yas', '4-yas', '5-yas', '6-yas', '7-yas', '8-yas']::text[], true, '', '', '', array['Çok Satan']::text[], true, 'Pudra Tül Etekli Kız Çocuk Elbise - Doğum Günü', 'Kat kat tül etekli, saten kuşaklı pudra kız elbise ve saç bandı. Doğum günü ve düğünler için 6-9 ay – 8 yaş. WhatsApp ile sipariş.', true, 8),
  ('krem-dantel-yakali-kiz-elbise', 'ORM-3002', 'Krem Dantel Yakalı Kız Elbise', 'kiz-elbise', 1490, null, '[{"src":"https://images.unsplash.com/photo-1620774760711-caa4c94d683a?auto=format&fit=crop&w=1200&q=80","alt":"Beyaz elbise ve çiçekli saç bandı takan kız çocuk"},{"src":"https://images.unsplash.com/photo-1684244160171-97f5dac39204?auto=format&fit=crop&w=1200&q=80","alt":"Askıda asılı beyaz kız elbisesi"},{"src":"https://images.unsplash.com/photo-1562438995-20c8bc11d4a9?auto=format&fit=crop&w=1200&q=80","alt":"Elbiseli kız çocuk çimenlikte"}]'::jsonb, 'Krem', 'Dantel yakalı, büzgülü krem elbise ve çiçekli saç bandı.', '<p>Nostaljik dantel yaka detayı ve büzgülü eteğiyle zarif bir günlük ve özel gün elbisesi.</p>', array['Elbise', 'Çiçekli saç bandı']::text[], '%100 pamuk müslin, dantel yaka', array['30°C''de ters çevrilerek yıkayın.', 'Çamaşır suyu kullanmayın.', 'Nakışlı bölgeleri tersinden, düşük ısıda ütüleyin.', 'Kurutma makinesi yerine serin ve gölgede kurutun.']::text[], array['6-9-ay', '9-12-ay', '12-18-ay', '2-yas', '3-yas', '4-yas', '5-yas', '6-yas', '7-yas', '8-yas', '9-yas', '10-yas']::text[], true, '', '', '', array['Yeni']::text[], true, 'Krem Dantel Yakalı Kız Elbise ve Çiçekli Saç Bandı', 'Dantel yakalı, büzgülü krem pamuklu kız elbise ve çiçekli saç bandı. 6-9 ay – 10 yaş beden, isim nakışı seçeneğiyle.', true, 9),
  ('lila-cicek-nakisli-kiz-elbise', 'ORM-3003', 'Lila Çiçek Nakışlı Kız Elbise', 'kiz-elbise', 1550, null, '[{"src":"https://images.unsplash.com/photo-1599624427857-461fd60c23e5?auto=format&fit=crop&w=1200&q=80","alt":"Çimenlikte duran açık renk elbiseli kız çocuk"},{"src":"https://images.unsplash.com/photo-1562438995-20c8bc11d4a9?auto=format&fit=crop&w=1200&q=80","alt":"Elbiseli kız çocuk bahçede"},{"src":"https://images.unsplash.com/photo-1560506840-ec148e82a604?auto=format&fit=crop&w=1200&q=80","alt":"Askıda renkli elbiseler"}]'::jsonb, 'Lila', 'Göğsü küçük çiçek nakışlı, kolsuz lila yazlık elbise.', '<p>Hafif ve nefes alan kumaşıyla yaz günleri için ideal. Göğüs kısmındaki çiçek nakışının yanına isim eklenebilir.</p>', array['Elbise']::text[], '%100 pamuk', array['30°C''de ters çevrilerek yıkayın.', 'Çamaşır suyu kullanmayın.', 'Nakışlı bölgeleri tersinden, düşük ısıda ütüleyin.', 'Kurutma makinesi yerine serin ve gölgede kurutun.']::text[], array['2-yas', '3-yas', '4-yas', '5-yas', '6-yas', '7-yas', '8-yas', '9-yas', '10-yas']::text[], true, '', '', '', '{}'::text[], false, 'Lila Çiçek Nakışlı Yazlık Kız Elbise', 'Göğsü çiçek nakışlı, kolsuz lila pamuklu yazlık kız elbise. 2 – 10 yaş beden, isim eklenebilir. Orimini''den WhatsApp ile sipariş.', true, 10),
  ('kirmizi-kadife-kiz-elbise', 'ORM-3004', 'Kırmızı Kadife Kız Elbise', 'kiz-elbise', 1790, null, '[{"src":"https://images.unsplash.com/photo-1578897366846-358bb1c2412a?auto=format&fit=crop&w=1200&q=80","alt":"Kırmızı uzun kollu elbise giyen kız çocuk"},{"src":"https://images.unsplash.com/photo-1560506840-ec148e82a604?auto=format&fit=crop&w=1200&q=80","alt":"Askıda uzun kollu elbiseler"},{"src":"https://images.unsplash.com/photo-1578897367107-2828e351c8a8?auto=format&fit=crop&w=1200&q=80","alt":"Elbisesinin eteğini tutan kız çocuk"}]'::jsonb, 'Kırmızı', 'Yılbaşı ve kış davetleri için uzun kollu kırmızı kadife elbise.', '<p>Yumuşak kadifesi ve beyaz yaka detayıyla kış kutlamalarının yıldızı. Astarlıdır, sırttan düğmelidir.</p>', array['Elbise']::text[], 'Pamuklu kadife, astar: %100 pamuk', array['30°C''de ters çevrilerek yıkayın.', 'Çamaşır suyu kullanmayın.', 'Nakışlı bölgeleri tersinden, düşük ısıda ütüleyin.', 'Kurutma makinesi yerine serin ve gölgede kurutun.']::text[], array['12-18-ay', '2-yas', '3-yas', '4-yas', '5-yas', '6-yas', '7-yas', '8-yas', '9-yas', '10-yas']::text[], true, '', '', '', '{}'::text[], false, 'Kırmızı Kadife Kız Elbise - Yılbaşı ve Kış Davetleri', 'Uzun kollu, beyaz yakalı kırmızı kadife kız elbise. Yılbaşı ve kış kutlamaları için 12-18 ay – 10 yaş beden seçenekleri.', true, 11),
  ('isim-nakisli-hastane-cikisi-seti', 'ORM-4001', 'İsim Nakışlı Hastane Çıkışı Seti', 'yenidogan-setleri', 1250, null, '[{"src":"https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=1200&q=80","alt":"Beyaz örtü üzerinde oturan bebek"},{"src":"https://images.unsplash.com/photo-1622290291720-ac961c43ee30?auto=format&fit=crop&w=1200&q=80","alt":"Beyaz ve pembe ayıcık desenli bebek zıbınları"},{"src":"https://images.unsplash.com/photo-1546015720-b8b30df5aa27?auto=format&fit=crop&w=1200&q=80","alt":"Örgü şapkalı bebek ve peluş ayı"}]'::jsonb, 'Krem / Beyaz', 'Tulum, şapka, eldiven ve isim nakışlı battaniyeden oluşan 4 parça set.', '<p>Bebeğinizin ilk yolculuğu için hazırladığımız set, hassas ciltlere uygun %100 pamuktan dikilir.</p>
<p>Battaniyenin köşesine bebeğinizin adı ve doğum tarihi işlenir.</p>', array['Tulum', 'Şapka', 'Eldiven', 'İsim nakışlı battaniye']::text[], '%100 organik pamuk', array['30°C''de ters çevrilerek yıkayın.', 'Çamaşır suyu kullanmayın.', 'Nakışlı bölgeleri tersinden, düşük ısıda ütüleyin.', 'Kurutma makinesi yerine serin ve gölgede kurutun.']::text[], array['0-3-ay', '3-6-ay']::text[], true, '', '', '', array['Kişiye Özel']::text[], true, 'İsim Nakışlı Hastane Çıkışı Seti - 4 Parça', 'Tulum, şapka, eldiven ve isim-tarih nakışlı battaniyeden oluşan %100 pamuk hastane çıkışı seti. 0-3 ve 3-6 ay. WhatsApp ile sipariş.', true, 12),
  ('pastel-zibin-ve-body-seti', 'ORM-4002', 'Pastel Zıbın ve Body Seti', 'yenidogan-setleri', 890, null, '[{"src":"https://images.unsplash.com/photo-1569974641446-22542de88536?auto=format&fit=crop&w=1200&q=80","alt":"Üç farklı renkte bebek zıbını"},{"src":"https://images.unsplash.com/photo-1622290319146-7b63df48a635?auto=format&fit=crop&w=1200&q=80","alt":"Beyaz ve mavi bebek tulumu"},{"src":"https://images.unsplash.com/photo-1622290291720-ac961c43ee30?auto=format&fit=crop&w=1200&q=80","alt":"Ayıcık desenli bebek zıbını"}]'::jsonb, 'Karışık Pastel', 'Pastel tonlarda 3 parça pamuklu zıbın ve body seti.', '<p>Günlük kullanım için yumuşak, çıtçıtlı ve kolay giydirilen 3 parçalık set. Göğüs kısmına baş harf nakışı eklenebilir.</p>', array['3 adet body / zıbın']::text[], '%100 pamuk', array['30°C''de ters çevrilerek yıkayın.', 'Çamaşır suyu kullanmayın.', 'Nakışlı bölgeleri tersinden, düşük ısıda ütüleyin.', 'Kurutma makinesi yerine serin ve gölgede kurutun.']::text[], array['0-3-ay', '3-6-ay', '6-9-ay', '9-12-ay', '12-18-ay']::text[], true, '', '', '', '{}'::text[], false, 'Pastel Zıbın ve Body Seti - 3 Parça Pamuklu', 'Pastel tonlarda 3 parça pamuklu zıbın ve body seti, baş harf nakışı eklenebilir. 0-3 ay – 12-18 ay beden. Orimini yenidoğan.', true, 13)
on conflict (slug) do nothing;

-- home_sections
insert into home_sections (section_key, admin_label, eyebrow, title, content, image_url, image_alt, button_text, button_link, button2_text, button2_link, items, is_active, sort_order) values
  ('hero', 'Hero (en üst karşılama alanı)', 'Custom-made for little ones', 'Minikler için sevgiyle işlenen, kişiye özel kıyafetler', 'İsim ve tarih nakışlı salopet takımlar, pastel tonlarda kız elbiseleri ve yenidoğan setleri. Her parça {sehir}''daki atölyemizde, bebeğinize özel hazırlanır.', '/images/urunler/bej-aslan-salopet.webp', 'İsim ve doğum tarihi nakışlı bej aslan temalı 1 yaş salopet takımı', 'Koleksiyonu keşfet', '/urunler', 'WhatsApp''tan sor', 'whatsapp', '0-3 aydan 10 yaşa
Ücretsiz isim nakışı
Türkiye geneli kargo', true, 1),
  ('trust', 'Güven bandı (4 madde)', null, null, null, null, null, null, null, null, null, 'nakis | Ücretsiz isim nakışı | İsim ve tarih nakışı fiyata dahil
kalp | El emeği, özenli dikim | {sehir} atölyemizde hazırlanır
kargo | Türkiye''ye kargo | {kargo_limit} üzeri ücretsiz
whatsapp | WhatsApp ile sipariş | Hızlı yanıt, kolay teyit', true, 2),
  ('banners', 'Bannerlar / kampanyalar (Bannerlar menüsünden yönetilir)', 'Kampanyalar', 'Size özel fırsatlar', null, null, null, null, null, null, null, null, true, 3),
  ('categories', 'Kategoriler', 'Kategoriler', 'Her özel güne bir takım', null, null, null, 'Tüm ürünler', '/urunler', null, null, null, true, 4),
  ('featured', 'Öne çıkan ürünler', 'Öne çıkanlar', 'En sevilen modeller', null, null, null, 'Hepsini gör', '/urunler', null, null, null, true, 5),
  ('custom', 'Kişiye özel tanıtım (görsel + yazı)', 'Kişiye özel', 'Adı üzerinde, anısı bir ömür', 'Bebeğinizin adını, doğum tarihini ya da ilk yaşını seçtiğiniz takıma nakışla işliyoruz. Sirk, aslan, ayıcık gibi temalarla doğum günü ve fotoğraf çekimlerine özel tasarımlar hazırlıyoruz.', '/images/urunler/kirmizi-sirk-salopet.webp', 'Kollarına Yağız Ali ismi nakışlanmış kırmızı sirk temalı salopet takım', 'Özel tasarım iste', 'whatsapp:Merhaba {site_adi}, kişiye özel bir takım yaptırmak istiyorum.', null, null, 'İsim ve tarih nakışı ücretsiz
Nakış yazımı siparişten önce WhatsApp''tan onaylanır
Renk ve tema için özel istekleri dinliyoruz', true, 6),
  ('steps', 'Sipariş adımları', 'Kolay sipariş', 'WhatsApp ile 4 adımda sipariş', null, null, null, 'Sıkça sorulan sorular', '/sikca-sorulan-sorular', null, null, 'Ürünü seçin | Beğendiğiniz modeli açın, yaş / beden seçin.
Nakışı yazın | İşlenecek isim veya tarihi ekleyin.
WhatsApp''a gönderin | Sipariş bilgileriniz mesaja otomatik yazılır.
Onay ve kargo | Ödeme ve teslim bilgilerini netleştirip hazırlamaya başlarız.', true, 7),
  ('cta', 'Alt çağrı kutusu', '{sehir} merkezli atölye', 'Aklınızdaki takımı birlikte tasarlayalım', 'Beden, renk ya da nakış konusunda kararsız kaldıysanız bize yazın; size en uygun modeli birlikte seçelim.', null, null, '{telefon}', 'whatsapp', null, null, null, true, 8)
on conflict (section_key) do nothing;

-- pages
insert into pages (slug, title, seo_title, seo_description, is_system, is_active, sort_order, lead, eyebrow, content, image_url, image_alt, button_text, button_link) values
  ('anasayfa', 'Anasayfa', '{site_adi} | Kişiye Özel Nakışlı Bebek ve Çocuk Kıyafetleri', '', true, true, 1, null, null, null, null, null, null, null),
  ('urunler', 'Tüm Ürünler', 'Tüm Ürünler - Kişiye Özel Bebek ve Çocuk Kıyafetleri', '{site_adi}''nin tüm koleksiyonu: isim nakışlı kısa ve uzun salopet takımlar, kız çocuk elbiseleri ve yenidoğan setleri. Yaşa ve bedene göre filtreleyin.', true, true, 2, '0-3 aydan 10 yaşa kadar, kişiye özel nakışlı takımlar ve elbiseler. Yaş / beden seçerek size uygun modelleri görün.', null, null, null, null, null, null),
  ('hakkimizda', 'Küçükler için, sevgiyle ve özenle', 'Hakkımızda', '{site_adi}, {sehir}''da kişiye özel nakışlı bebek ve çocuk kıyafetleri hazırlayan bir butik atölyedir.', true, true, 3, '{site_adi}, {sehir}''da bebek ve çocuklar için kişiye özel kıyafetler hazırlayan butik bir atölyedir.', 'Custom-made for little ones', '<p>Her takımı tek tek kesiyor, dikiyor ve bebeğinizin adıyla, doğum tarihiyle ya da ilk yaşıyla nakışlıyoruz. Salopet takımlardan kız elbiselerine, hastane çıkışı setlerinden doğum günü kıyafetlerine kadar her parçada yumuşak, cilt dostu kumaşlar ve pastel tonlar kullanıyoruz.</p>
<p>Amacımız, çocuğunuzun özel gününü fotoğraflarda ve anılarda bir ömür yaşatacak kıyafetler hazırlamak. Beden, renk ya da tema konusunda aklınızdakini bize yazmanız yeterli.</p>', '/images/urunler/bej-aslan-salopet.webp', 'Orimini atölyesinde hazırlanan isim nakışlı salopet takım', 'Bize yazın', 'whatsapp'),
  ('iletisim', 'İletişim', 'İletişim', '{site_adi} iletişim bilgileri: WhatsApp ve telefon {telefon}, {sehir}. Sipariş ve özel tasarım talepleriniz için bize yazın.', true, true, 4, 'Siparişleriniz, özel tasarım talepleriniz ve beden sorularınız için bize WhatsApp''tan ulaşabilirsiniz. Atölyemiz {sehir}''dadır, tüm Türkiye''ye kargo gönderiyoruz.', null, '<h2>Konum</h2>
<p>{adres}. {sehir} içinden siparişlerde elden teslim seçeneği için WhatsApp üzerinden bilgi alabilirsiniz.</p>', null, null, null, null),
  ('kargo-ve-iade', 'Kargo ve İade', 'Kargo ve İade Koşulları', '{site_adi} kargo, teslimat, değişim ve iade koşulları. {kargo_limit} üzeri ücretsiz kargo.', true, true, 5, null, null, '<h2>Hazırlık süresi</h2>
<p>Ürünlerimiz sipariş üzerine, kişiye özel olarak hazırlanır. Nakış yazımını WhatsApp''tan onayladıktan sonra siparişiniz genellikle 3-7 iş günü içinde kargoya verilir. Yoğun dönemlerde (bayram, yılbaşı) bu süre uzayabilir; sipariş sırasında size net tarih bildiririz.</p>
<h2>Kargo</h2>
<ul>
<li>{sehir} merkezli atölyemizden Türkiye''nin her yerine gönderim yapıyoruz.</li>
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
<p>Değişim ve iade talepleriniz için WhatsApp hattımızdan ({telefon}) bize ulaşın.</p>', null, null, null, null),
  ('beden-rehberi', 'Beden Rehberi', 'Beden Rehberi - Bebek ve Çocuk Yaş Beden Tablosu', '0-3 aydan 10 yaşa kadar bebek ve çocuk beden tablosu: boy ve kilo aralıklarına göre doğru yaş / beden seçimi.', true, true, 6, 'Doğru bedeni seçmek için çocuğunuzun yaşından çok boy ve kilosuna bakmanızı öneririz. İki beden arasında kaldıysanız büyük olanı seçin.', null, '<h2>Nasıl ölçülür?</h2>
<ul>
<li><strong>Boy:</strong> Çocuğunuzu çıplak ayakla duvara yaslayın, başının üstünden topuğuna kadar ölçün.</li>
<li><strong>Göğüs:</strong> Kolların altından, göğsün en geniş yerinden mezurayı sıkmadan geçirin.</li>
<li><strong>Özel dikim:</strong> Ölçüleriniz tabloya uymuyorsa WhatsApp''tan yazın, ölçüye göre dikelim.</li>
</ul>', null, null, null, null),
  ('sikca-sorulan-sorular', 'Sıkça Sorulan Sorular', 'Sıkça Sorulan Sorular - Nasıl Sipariş Verilir?', '{site_adi}''den WhatsApp ile nasıl sipariş verilir, nakış, beden, kargo ve ödeme hakkında sıkça sorulan sorular.', true, true, 7, 'Aradığınız cevabı bulamazsanız WhatsApp''tan ({telefon}) bize yazın.', null, null, null, null, null, null),
  ('sepet', 'Sepetim', null, null, true, true, 8, 'Seçtiğiniz ürünleri tek bir WhatsApp mesajıyla bize gönderin, siparişinizi hemen onaylayalım.', null, null, null, null, null, null),
  ('favoriler', 'Favorilerim', null, null, true, true, 9, 'Beğendiğiniz ürünler burada saklanır.', null, null, null, null, null, null),
  ('mesafeli-satis-sozlesmesi', 'Mesafeli Satış Sözleşmesi', null, '{site_adi} mesafeli satış sözleşmesi: sipariş, ödeme, teslimat, cayma hakkı ve iade koşulları.', true, true, 10, null, null, '<h2>1. Taraflar</h2>
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
<p><strong>Cayma hakkının kullanılamayacağı durumlar:</strong> Mesafeli Sözleşmeler Yönetmeliği''nin 15. maddesi uyarınca, alıcının istekleri veya kişisel ihtiyaçları doğrultusunda hazırlanan ürünlerde (isim, tarih vb. kişiye özel nakış işlenen ürünler) cayma hakkı kullanılamaz. Üretim hatası olan ürünler için alıcının yasal hakları saklıdır.</p>
<h2>6. Ayıplı ürün</h2>
<p>Ayıplı olduğu anlaşılan ürünlerde alıcı, 6502 sayılı Kanun''un 11. maddesindeki seçimlik haklarını (bedel iadesi, indirim, ücretsiz onarım veya değişim) kullanabilir. Kargo masrafı satıcıya aittir.</p>
<h2>7. Uyuşmazlıkların çözümü</h2>
<p>Bu sözleşmeden doğan uyuşmazlıklarda, Ticaret Bakanlığı''nca her yıl ilan edilen parasal sınırlar dahilinde alıcının veya satıcının yerleşim yerindeki Tüketici Hakem Heyetleri, bu sınırları aşan durumlarda Tüketici Mahkemeleri yetkilidir.</p>
<h2>8. Yürürlük</h2>
<p>Alıcı, siparişi göndermeden önce bu sözleşmeyi ve <a href="/on-bilgilendirme-formu">Ön Bilgilendirme Formu</a>''nu okuduğunu ve kabul ettiğini onaylar. Sözleşme, satıcının siparişi WhatsApp üzerinden yazılı olarak onaylaması ile yürürlüğe girer.</p>', null, null, null, null),
  ('on-bilgilendirme-formu', 'Ön Bilgilendirme Formu', null, '{site_adi} ön bilgilendirme formu: satıcı bilgileri, ödeme, teslimat ve cayma hakkı.', true, true, 11, null, null, '<h2>Satıcı bilgileri</h2>
{satici_bilgileri}
<h2>Ürünün temel nitelikleri ve fiyatı</h2>
<p>Ürünün adı, kodu, rengi, kumaşı, set içeriği ve vergiler dahil fiyatı ürün sayfasında yer alır. Seçilen yaş / beden, adet ve kişiye özel nakış bilgisi sipariş mesajında belirtilir.</p>
<h2>Ödeme ve teslimat</h2>
<p>Ödeme, sipariş onayı sonrası havale/EFT ile yapılır. Ürün, nakış onayından sonra genellikle 3-7 iş günü içinde kargoya verilir. {kargo_limit} ve üzeri siparişlerde kargo ücretsizdir.</p>
<h2>Cayma hakkı</h2>
<p>Nakışsız ürünlerde teslimden itibaren 14 gün içinde cayma hakkı vardır. Kişiye özel nakış işlenen ürünlerde, Mesafeli Sözleşmeler Yönetmeliği md. 15/1-ç uyarınca cayma hakkı bulunmaz. Ayrıntılar <a href="/mesafeli-satis-sozlesmesi">Mesafeli Satış Sözleşmesi</a>''nde yer alır.</p>
<h2>Şikâyet ve başvuru</h2>
<p>Talep ve şikâyetlerinizi {telefon} numaralı WhatsApp hattına iletebilirsiniz. Tüketici Hakem Heyetleri ve Tüketici Mahkemeleri''ne başvuru hakkınız saklıdır.</p>', null, null, null, null),
  ('kvkk-aydinlatma-metni', 'KVKK Aydınlatma Metni', null, '{site_adi} kişisel verilerin korunması aydınlatma metni.', true, true, 12, null, null, '<p>{satici_unvan} ("Veri Sorumlusu") olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında kişisel verilerinizi aşağıda açıklanan şekilde işliyoruz.</p>
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
<p><strong>Veri sorumlusu:</strong> {satici_unvan}, {satici_adres}</p>', null, null, null, null),
  ('cerez-politikasi', 'Çerez Politikası', null, '{site_adi} çerez ve tarayıcı depolama politikası.', true, true, 13, null, null, '<p>{site_url} yalnızca sitenin çalışması için gerekli olan tarayıcı depolamasını kullanır. Reklam veya takip çerezi kullanılmaz.</p>
<h2>Kullanılan depolama alanları</h2>
<ul>
<li><strong>orimini-sepet:</strong> Sepete eklediğiniz ürünleri hatırlar.</li>
<li><strong>orimini-favoriler:</strong> Beğendiğiniz ürünleri hatırlar.</li>
<li><strong>orimini-onay:</strong> Bu bilgilendirmeyi gördüğünüzü hatırlar.</li>
</ul>
<p>Bu bilgiler yalnızca sizin tarayıcınızda tutulur, sunucumuza gönderilmez. Tarayıcı ayarlarınızdan dilediğiniz zaman silebilirsiniz. İleride analiz aracı eklenirse bu metin güncellenecek ve onayınız alınacaktır.</p>', null, null, null, null)
on conflict (slug) do nothing;

-- faqs
insert into faqs (question, answer, is_active, sort_order)
select * from (values
  ('Nasıl sipariş verebilirim?', 'Ürün sayfasında yaş / beden seçip nakış bilgisini yazdıktan sonra "WhatsApp ile sipariş ver" butonuna basın. Sipariş bilgileriniz hazır bir mesaj olarak WhatsApp''ta açılır, göndermeniz yeterli. Birden fazla ürün için ürünleri sepete ekleyip sepetten tek mesajla gönderebilirsiniz.', true, 1),
  ('İsim nakışı ücretli mi?', 'Hayır. İsim ve tarih nakışı ürün fiyatına dahildir. Yazımı siparişten önce WhatsApp üzerinden sizinle teyit ederiz.', true, 2),
  ('Hangi yaş ve bedenler var?', '0-3 ay, 3-6 ay, 6-9 ay, 9-12 ay ve 12-18 ay bebek bedenlerinin yanında 2 yaştan 10 yaşa kadar çocuk bedenleri hazırlıyoruz. Her ürünün mevcut bedenleri ürün sayfasında gösterilir.', true, 3),
  ('Sipariş ne kadar sürede elime ulaşır?', 'Nakış onayından sonra siparişler genellikle 3-7 iş günü içinde kargoya verilir. Kargo süresi bulunduğunuz ile göre 1-3 iş günüdür.', true, 4),
  ('Kargo ücreti ne kadar?', '{kargo_limit} ve üzeri siparişlerde kargo ücretsizdir. Altındaki siparişlerde kargo ücreti sipariş sırasında bildirilir.', true, 5),
  ('Ödemeyi nasıl yapıyorum?', 'Siparişiniz WhatsApp''ta onaylandıktan sonra ödeme bilgileri size iletilir.', true, 6),
  ('Özel renk ya da tema isteyebilir miyim?', 'Evet. Doğum günü teması, renk ya da nakış deseni için isteklerinizi WhatsApp''tan yazın, size özel bir takım hazırlayalım.', true, 7),
  ('İade ve değişim yapabilir miyim?', 'Kişiye özel nakış işlenen ürünlerde üretim hatası dışında iade ve değişim yapılamaz. Nakışsız ürünlerde 14 gün içinde beden değişimi yapılabilir.', true, 8)
) as v(question, answer, is_active, sort_order)
where not exists (select 1 from faqs);

-- menu_items
insert into menu_items (location, href, label, is_active, sort_order)
select * from (values
  ('header', '/kategori/kisa-salopet-takim', 'Kısa Salopet Takım', true, 1),
  ('header', '/kategori/uzun-salopet-takim', 'Uzun Salopet Takım', true, 2),
  ('header', '/kategori/kiz-elbise', 'Kız Elbise', true, 3),
  ('header', '/kategori/yenidogan-setleri', 'Yenidoğan Setleri', true, 4),
  ('header', '/urunler', 'Tüm Ürünler', true, 5),
  ('footer', '/hakkimizda', 'Hakkımızda', true, 6),
  ('footer', '/beden-rehberi', 'Beden Rehberi', true, 7),
  ('footer', '/kargo-ve-iade', 'Kargo ve İade', true, 8),
  ('footer', '/sikca-sorulan-sorular', 'Sıkça Sorulan Sorular', true, 9),
  ('footer', '/iletisim', 'İletişim', true, 10),
  ('footer', '/mesafeli-satis-sozlesmesi', 'Mesafeli Satış Sözleşmesi', true, 11),
  ('footer', '/on-bilgilendirme-formu', 'Ön Bilgilendirme Formu', true, 12),
  ('footer', '/kvkk-aydinlatma-metni', 'KVKK Aydınlatma Metni', true, 13),
  ('footer', '/cerez-politikasi', 'Çerez Politikası', true, 14)
) as v(location, href, label, is_active, sort_order)
where not exists (select 1 from menu_items);
