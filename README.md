# Cung Hỷ Phát Tài

Website nhà hàng ẩm thực Trung Hoa theo design: frontend Next.js (component-based), backend API + Supabase, admin quản lý đơn đặt bàn.

## Stack

- **Frontend:** Next.js 16 (App Router), React, Tailwind CSS
- **Backend:** Next.js Route Handlers (`/api/*`) + Supabase (Postgres, Auth, RLS)
- **Admin:** `/admin` — đăng nhập Supabase Auth, quản lý bookings / liên hệ / menu

## Cấu trúc thư mục

```
src/
  app/                 # Pages + API routes (backend)
    page.tsx           # Trang chủ
    menu/              # Thực đơn
    dat-ban/           # Đặt bàn
    lien-he/           # Liên hệ
    admin/             # Admin panel
    api/bookings/      # REST bookings
    api/contact/       # REST contact
  components/
    layout/            # Navbar, Footer, SiteLayout
    home/              # Hero, Signature, Morning, ...
    booking/           # Booking forms
    contact/           # Contact form
    admin/             # Admin tables
    ui/                # Button, SectionLabel
  data/content.ts      # Nội dung & ảnh theo brand
  lib/supabase/        # Supabase client/server
supabase/migrations/   # SQL schema
```

## Chạy local

```bash
npm install
cp .env.local.example .env.local
# Điền NEXT_PUBLIC_SUPABASE_URL và NEXT_PUBLIC_SUPABASE_ANON_KEY
npm run dev
```

- Website: http://localhost:3000
- Admin: http://localhost:3000/admin/login

> Chưa cấu hình Supabase vẫn chạy được ở **chế độ demo** (form & admin dùng dữ liệu mẫu).

## Setup Supabase

1. Tạo project tại [supabase.com](https://supabase.com)
2. Chạy SQL trong `supabase/migrations/001_init.sql` (SQL Editor)
3. Copy Project URL + anon key vào `.env.local`
4. Authentication → Users → tạo user admin (email/password)
5. Đăng nhập `/admin/login` bằng user đó

## Tính năng

| Khu vực | Mô tả |
|--------|--------|
| Trang chủ | Hero, tuyên ngôn, bếp trưởng, signature, menu nav, morning, gallery, form đặt bàn |
| Đặt bàn | Form đầy đủ + sidebar địa chỉ / chính sách |
| Liên hệ | Info card + form góp ý |
| Menu | Signature / món chính / dimsum / sáng |
| Admin | Đổi trạng thái đơn, xóa đơn, xem tin nhắn, bật/tắt món |

## Brand colors

- Red: `#C4202B`
- Cream: `#FEF2E4`
- Gold: `#E8A317`
- Charcoal: `#1A1A1A`
