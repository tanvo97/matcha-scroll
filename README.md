# LÁ NHÀ — demo landing trà sữa matcha

Trang demo cho **TanVo Studio**: một landing F&B có “signature effect” khi cuộn. Ly trà sữa matcha được pha từng lớp theo `scrollYProgress`, lấy cảm hứng từ kiểu trang như SPUD HOUSE (headline serif lớn, mỗi đoạn một màu nền, phần trăm cuộn ở cạnh phải).

Shop giả: **LÁ NHÀ**. Đây không phải cửa hàng thật.

Có thể port sau vào site chính ở `/demo/landing-fnb`. Copy, các bước pha và thực đơn nằm gọn trong `lib/data.ts`.

## Chạy local

```bash
pnpm install
pnpm dev
```

Mở [http://localhost:3000](http://localhost:3000). Build production: `pnpm build` rồi `pnpm start`.

## Cấu trúc

```
app/
  layout.tsx          # Font, metadata, LenisProvider
  page.tsx            # Render ScrollLanding
  globals.css
components/
  ScrollLanding.tsx   # Ghép toàn trang
  BuildStage.tsx      # Stage dính (sticky) + đổi màu nền theo scroll
  MatchaGlass.tsx     # Ly SVG/CSS, từng lớp gắn với progress
  StepCopy.tsx        # Copy từng bước
  MenuSection.tsx
  SiteFooter.tsx
  ProgressBadge.tsx   # % ở cạnh phải, cập nhật bằng useMotionValueEvent
  DemoMark.tsx
  LenisProvider.tsx
lib/data.ts           # Shop, steps, menu, layerTimings, pearls, ice
```

Stack: Next.js App Router, TypeScript strict, Tailwind, `motion` (`useScroll`, `useTransform`, `useMotionValueEvent`, `useReducedMotion`) và `lenis`. Không dùng ảnh ngoài — ly vẽ bằng SVG.

## Scroll → từng lớp trong ly

`BuildStage` đo `scrollYProgress` của khối 6 viewport (`hero` → `finished`). `MatchaGlass` đọc cùng giá trị đó (hoặc gắn ở `1` khi `prefers-reduced-motion`).

Mốc nằm trong `layerTimings` ở `lib/data.ts`:

| Progress | Lớp | Việc xảy ra |
| --- | --- | --- |
| `0.00–0.08` | `glassEnter` | Ly trống hiện ở hero |
| `0.12–0.28` | `ice` | Đá viên xuất hiện, khớp **Bước 01** |
| `0.30–0.48` | `milkStream` / `milkFill` | Sữa đổ và dâng lên ~55% ly, khớp **Bước 02** |
| `0.50–0.64` | `matchaStream` / `matchaFill` | Lớp matcha chảy lên trên sữa, khớp **Bước 03** |
| `0.66–0.82` | `foam` / `pearls` | Foam phô mai nở, trân châu rơi lệch nhịp, khớp **Bước 04** |
| `0.82–0.95` | `straw` / `cta` | Ống hút, nút **Đặt món** và giá, khớp **Bước 05** |

Màu nền của stage được `useTransform` nội suy theo `backgroundTimes` / `backgroundStops` (mỗi step một màu). Phần trăm ở cạnh phải theo tiến độ **cả trang** (kể cả menu và footer), không chỉ khối pha ly.

Sáu section, mỗi section `100dvh`, kéo lên bằng `-mt-[100dvh]` để copy trượt qua ly đang `sticky`. Thêm một viewport trống ở cuối để ly hoàn chỉnh và nút Đặt món đứng lại trước khi stage nhả sticky, chuyển sang menu.

`scrollYProgress` của ly được cập nhật trong callback của Lenis (`useContainerProgress` / `usePageProgress`) để đồng bộ với smooth scroll.

## Chuyển động giảm

Khi `prefers-reduced-motion: reduce`, Lenis tắt smooth scroll, đá không lơ lửng, ly hiện ngay trạng thái hoàn chỉnh.

## Ghi chú port

- Chỉ cần mang `lib/data.ts` và các component ở trên.
- Nút **Đặt món** là anchor `#menu`. Khi gắn vào site thật, đổi thành form hoặc link đặt hàng.
- `window.__lenis` được gắn trong `LenisProvider` để script chụp/ghi (scroll tức thì). Không dùng cho production logic.
