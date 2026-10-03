-- =============================================
-- ORIMINI - VERİTABANI ŞEMASI (tek dosya)
-- Supabase SQL Editor'de bir kez çalıştırın, ardından seed.sql'i çalıştırın.
-- Okuma herkese açık, yazma yalnızca admin_users tablosundaki kullanıcılara açık.
-- =============================================

create extension if not exists pgcrypto;

create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql set search_path = public;

-- =============================================
-- ADMIN KULLANICILARI
-- Supabase Auth'ta oluşturulan kullanıcı buraya eklenince panele yazabilir.
-- =============================================
create table if not exists admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text,
  created_at timestamptz default now()
);
alter table admin_users enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid());
$$;

drop policy if exists "admin_users_self_read" on admin_users;
create policy "admin_users_self_read" on admin_users for select using (user_id = auth.uid());

-- Ortak kurulum: updated_at tetikleyicisi + herkese okuma + admine yazma.
create or replace function public.orimini_setup_table(t text, public_read boolean default true)
returns void language plpgsql set search_path = public as $$
begin
  execute format('alter table %I enable row level security', t);
  execute format('drop trigger if exists %I on %I', 'set_' || t || '_updated_at', t);
  execute format('create trigger %I before update on %I for each row execute function update_updated_at_column()', 'set_' || t || '_updated_at', t);
  execute format('drop policy if exists %I on %I', t || '_read', t);
  if public_read then
    execute format('create policy %I on %I for select using (true)', t || '_read', t);
  end if;
  execute format('drop policy if exists %I on %I', t || '_admin_all', t);
  execute format('create policy %I on %I for all using (public.is_admin()) with check (public.is_admin())', t || '_admin_all', t);
end;
$$;
revoke execute on function public.orimini_setup_table(text, boolean) from public, anon, authenticated;

-- =============================================
-- SİTE AYARLARI (logo, iletişim, duyuru bar, footer, satıcı bilgileri, SEO doğrulama...)
-- =============================================
create table if not exists site_settings (
  key text primary key,
  value text,
  updated_at timestamptz default now()
);
select orimini_setup_table('site_settings');

-- =============================================
-- KATEGORİLER
-- =============================================
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  short_name text,
  description text,
  seo_title text,
  seo_description text,
  image_url text,
  tint text default '#F3DCD4',
  is_active boolean default true,
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
select orimini_setup_table('categories');

-- =============================================
-- BEDENLER (beden rehberi tablosu da buradan gelir)
-- =============================================
create table if not exists sizes (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  label text not null,
  size_group text default 'bebek',
  height text,
  weight text,
  is_active boolean default true,
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
select orimini_setup_table('sizes');

-- =============================================
-- ÜRÜNLER
-- images: [{"src": "...", "alt": "..."}]
-- =============================================
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  code text,
  name text not null,
  category_slug text references categories(slug) on update cascade on delete set null,
  price numeric(10,2) default 0,
  old_price numeric(10,2),
  images jsonb default '[]'::jsonb,
  color text,
  short_description text,
  description text,
  set_contents text[] default '{}',
  fabric text,
  care text[] default '{}',
  sizes text[] default '{}',
  personalization_enabled boolean default true,
  personalization_label text,
  personalization_placeholder text,
  personalization_note text,
  badges text[] default '{}',
  is_featured boolean default false,
  seo_title text,
  seo_description text,
  is_active boolean default true,
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
select orimini_setup_table('products');

-- =============================================
-- ÜRÜN YORUMLARI
-- Ziyaretçi yorum gönderebilir (onaysız düşer), admin onaylayınca yayınlanır.
-- =============================================
create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  product_slug text references products(slug) on update cascade on delete cascade,
  author text not null,
  city text,
  rating integer default 5 check (rating between 1 and 5),
  comment text not null,
  review_date date default current_date,
  is_approved boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
select orimini_setup_table('reviews', false);
drop policy if exists "reviews_public_read_approved" on reviews;
create policy "reviews_public_read_approved" on reviews for select using (is_approved = true or public.is_admin());
drop policy if exists "reviews_public_insert" on reviews;
create policy "reviews_public_insert" on reviews for insert
  with check (
    is_approved = false
    and char_length(author) between 2 and 40
    and char_length(comment) between 5 and 600
    and (city is null or char_length(city) <= 40)
  );

-- =============================================
-- ANASAYFA BÖLÜMLERİ (hero, güven bandı, kategoriler, öne çıkanlar, kişiye özel, adımlar, CTA)
-- items: her satır bir madde ("başlık | açıklama" veya "ikon | başlık | açıklama")
-- =============================================
create table if not exists home_sections (
  id uuid primary key default gen_random_uuid(),
  section_key text not null unique,
  admin_label text,
  eyebrow text,
  title text,
  content text,
  image_url text,
  image_alt text,
  button_text text,
  button_link text,
  button2_text text,
  button2_link text,
  items text,
  is_active boolean default true,
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
select orimini_setup_table('home_sections');

-- =============================================
-- BANNERLAR / KAMPANYALAR (anasayfada kart olarak görünür)
-- =============================================
create table if not exists banners (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text,
  image_url text,
  button_text text,
  button_link text,
  bg_color text default '#F3DCD4',
  is_active boolean default true,
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
select orimini_setup_table('banners');

-- =============================================
-- SAYFALAR (hakkımızda, iletişim, kargo, sözleşmeler... + yeni sayfalar)
-- content HTML'dir; {site_adi}, {telefon}, {kargo_limit} gibi kısa kodlar ayarlardan doldurulur.
-- =============================================
create table if not exists pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  short_title text,
  eyebrow text,
  lead text,
  content text,
  image_url text,
  image_alt text,
  button_text text,
  button_link text,
  seo_title text,
  seo_description text,
  is_system boolean default false,
  is_active boolean default true,
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table pages add column if not exists short_title text;
select orimini_setup_table('pages');

-- =============================================
-- SIKÇA SORULAN SORULAR
-- =============================================
create table if not exists faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  is_active boolean default true,
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
select orimini_setup_table('faqs');

-- =============================================
-- MENÜLER (header: üst menü, footer: kurumsal linkler)
-- =============================================
create table if not exists menu_items (
  id uuid primary key default gen_random_uuid(),
  location text not null default 'header',
  label text not null,
  href text not null,
  is_active boolean default true,
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
select orimini_setup_table('menu_items');

-- =============================================
-- INDEXLER
-- =============================================
create index if not exists idx_products_category on products(category_slug);
create index if not exists idx_products_active on products(is_active, sort_order);
create index if not exists idx_reviews_product on reviews(product_slug, is_approved);
create index if not exists idx_menu_location on menu_items(location, sort_order);

-- =============================================
-- GÖRSEL DEPOSU (img bucket, herkese açık okuma)
-- =============================================
insert into storage.buckets (id, name, public)
values ('img', 'img', true)
on conflict (id) do update set public = true;

drop policy if exists "img_public_read" on storage.objects;
create policy "img_public_read" on storage.objects for select using (bucket_id = 'img');
drop policy if exists "img_admin_insert" on storage.objects;
create policy "img_admin_insert" on storage.objects for insert with check (bucket_id = 'img' and public.is_admin());
drop policy if exists "img_admin_update" on storage.objects;
create policy "img_admin_update" on storage.objects for update using (bucket_id = 'img' and public.is_admin());
drop policy if exists "img_admin_delete" on storage.objects;
create policy "img_admin_delete" on storage.objects for delete using (bucket_id = 'img' and public.is_admin());
