export type StepId =
  | "hero"
  | "ice"
  | "milk"
  | "matcha"
  | "toppings"
  | "finished";

export type TextAlign = "center" | "left" | "right";

export type BuildStep = {
  id: StepId;
  eyebrow: string;
  title: string;
  body: string;
  /** Solid background at the start of this step; interpolated between steps. */
  background: string;
  color: string;
  muted: string;
  /** Where this step begins on the build-stage scrollYProgress (0–1). */
  at: number;
  align: TextAlign;
  cta?: string;
  price?: string;
};

export type MenuItem = {
  name: string;
  description: string;
  price: string;
};

export type LayerTiming = {
  /** Input range on build-stage scrollYProgress. */
  range: readonly [number, number];
  note: string;
};

/**
 * Shop copy and scroll-to-layer mapping for the LÁ NHÀ demo.
 * Port this file as-is when moving the demo under /demo/landing-fnb.
 */
export const shop = {
  name: "LÁ NHÀ",
  tagline: "Trà sữa matcha, pha chậm từng lớp.",
  hint: "Cuộn xuống, xem ly được pha.",
  hours: "Thứ Ba – Chủ Nhật, 9:00 – 21:00. Nghỉ Thứ Hai.",
  address: "Số 9, hẻm Trà Xanh, Phường Võ Thị Sáu, Quận 3, TP. Hồ Chí Minh",
  phone: "0901 234 567",
  instagram: "@lanha.matcha",
  footerLine: "Ghé quán, hoặc đặt ly mang về.",
  demoNote: "Đây là trang demo của TanVo Studio — không phải cửa hàng thật.",
  orderCta: "Đặt món",
  menuTitle: "Chọn ly của bạn",
  menuLead: "Bốn công thức, cùng một cách pha chậm.",
} as const;

export const steps: BuildStep[] = [
  {
    id: "hero",
    eyebrow: "Quán trà sữa matcha",
    title: shop.name,
    body: shop.tagline,
    background: "#F4EFE4",
    color: "#1C2B1A",
    muted: "#5A6354",
    at: 0,
    align: "center",
  },
  {
    id: "ice",
    eyebrow: "Bước 01",
    title: "Đá viên, vừa đủ lạnh.",
    body: "Không ngập ly. Chỉ đủ để giữ vị matcha tươi và lớp sữa không bị loãng.",
    background: "#DCE8E4",
    color: "#1C2B1A",
    muted: "#4D5C56",
    at: 1 / 6,
    align: "left",
  },
  {
    id: "milk",
    eyebrow: "Bước 02",
    title: "Sữa tươi, rót chậm.",
    body: "Sữa béo mịn tạo nền ngọt nhẹ, để lát nữa trà có chỗ mà nở hương.",
    background: "#F3E2C4",
    color: "#3A2A18",
    muted: "#6B5840",
    at: 2 / 6,
    align: "right",
  },
  {
    id: "matcha",
    eyebrow: "Bước 03",
    title: "Matcha đánh tay.",
    body: "Bột trà được đánh đến khi nổi bọt mịn, rồi chảy xuống thành một lớp xanh đậm.",
    background: "#3C5428",
    color: "#F4EFE4",
    muted: "#C9D4B4",
    at: 3 / 6,
    align: "left",
  },
  {
    id: "toppings",
    eyebrow: "Bước 04",
    title: "Trân châu mềm. Foam phô mai.",
    body: "Hạt trân châu rơi xuống đáy ly. Lớp foam béo nhẹ nằm trên cùng, tan chậm.",
    background: "#E7D2A0",
    color: "#2A2118",
    muted: "#5C4E38",
    at: 4 / 6,
    align: "right",
  },
  {
    id: "finished",
    eyebrow: "Bước 05",
    title: "Ly của bạn đã sẵn sàng.",
    body: "Uống chậm. Để đá, sữa và trà tự hòa vào nhau.",
    background: "#172116",
    color: "#F4EFE4",
    muted: "#C5CDB8",
    at: 5 / 6,
    align: "left",
    cta: shop.orderCta,
    price: "59.000đ",
  },
];

/**
 * Each step color holds for most of the section, then briefly eases into the next.
 * Pairs: [at, holdUntil] for every step, plus a final 1.
 */
function buildBackgroundKeyframes(): { times: number[]; stops: string[] } {
  const times: number[] = [];
  const stops: string[] = [];
  steps.forEach((step, index) => {
    const start = step.at;
    const next = index < steps.length - 1 ? steps[index + 1].at : 1;
    const holdUntil = start + (next - start) * 0.84;
    times.push(start, holdUntil);
    stops.push(step.background, step.background);
  });
  times.push(1);
  stops.push(steps[steps.length - 1].background);
  return { times, stops };
}

const backgroundKeyframes = buildBackgroundKeyframes();
export const backgroundStops: string[] = backgroundKeyframes.stops;
export const backgroundTimes: number[] = backgroundKeyframes.times;

/**
 * Mapping from build-stage scrollYProgress to each visual layer.
 * Ranges overlap slightly so pours and drops ease into the next beat.
 */
export const layerTimings = {
  glassEnter: {
    range: [0, 0.08],
    note: "Ly trống hiện ra ở hero.",
  },
  ice: {
    range: [0.12, 0.28],
    note: "Đá viên xuất hiện và hạ xuống trong ly, khớp bước 01.",
  },
  milkStream: {
    range: [0.3, 0.38],
    note: "Dòng sữa đổ ngắn từ vành ly, mờ trước khi sữa đầy.",
  },
  milkFill: {
    range: [0.3, 0.48],
    note: "Mực sữa dâng từ đáy lên khoảng 55% chiều cao ly.",
  },
  matchaStream: {
    range: [0.5, 0.57],
    note: "Dòng matcha xanh chảy ngắn từ vành ly xuống mặt sữa.",
  },
  matchaFill: {
    range: [0.5, 0.64],
    note: "Lớp matcha tràn lên trên sữa, khoảng 18% chiều cao ly.",
  },
  foam: {
    range: [0.66, 0.78],
    note: "Foam phô mai nở trên mặt trà.",
  },
  pearls: {
    range: [0.66, 0.82],
    note: "Trân châu rơi xuống đáy, lệch nhịp từng hạt.",
  },
  straw: {
    range: [0.82, 0.9],
    note: "Ống hút trượt vào ly.",
  },
  cta: {
    range: [0.86, 0.95],
    note: "Nút Đặt món và giá hiện ra, giữ đến hết stage.",
  },
} as const satisfies Record<string, LayerTiming>;

export const pearls = [
  { cx: 118, restY: 388, r: 13.5, shift: 0 },
  { cx: 146, restY: 400, r: 16, shift: 0.03 },
  { cx: 170, restY: 386, r: 12.5, shift: 0.05 },
  { cx: 104, restY: 372, r: 11, shift: 0.07 },
  { cx: 158, restY: 368, r: 10.5, shift: 0.09 },
  { cx: 132, restY: 408, r: 14, shift: 0.02 },
  { cx: 180, restY: 404, r: 11.5, shift: 0.06 },
  { cx: 126, restY: 360, r: 9.5, shift: 0.11 },
] as const;

export const iceCubes = [
  { x: 112, y: 382, w: 44, h: 36, rotate: -18, delay: "0s" },
  { x: 154, y: 398, w: 50, h: 38, rotate: 14, delay: "0.4s" },
  { x: 128, y: 352, w: 36, h: 30, rotate: 8, delay: "0.8s" },
  { x: 174, y: 370, w: 34, h: 28, rotate: -10, delay: "1.1s" },
] as const;

export const menuItems: MenuItem[] = [
  {
    name: "Matcha sữa đá",
    description: "Sữa tươi, matcha đánh tay, đá viên vừa đủ.",
    price: "55.000đ",
  },
  {
    name: "Matcha foam phô mai",
    description: "Thêm lớp foam mặn ngọt trên mặt trà.",
    price: "62.000đ",
  },
  {
    name: "Matcha trân châu đường đen",
    description: "Trân châu mềm, đường đen thoảng khói.",
    price: "59.000đ",
  },
  {
    name: "Matcha kem tươi",
    description: "Một scoop kem vanilla tan dần vào trà.",
    price: "65.000đ",
  },
];
