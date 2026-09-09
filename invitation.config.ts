/**
 * ═══════════════════════════════════════════════════════════════
 *  Mami & Betül — Nişan Davetiyesi
 *  Tüm düzenlenebilir içerik burada. JSX'te sabit metin yok.
 * ═══════════════════════════════════════════════════════════════
 */

export interface ScheduleItem {
  time: string;
  event: string;
}

/** Glow-and-flash fallback when intro video fails */
export interface OpenTransitionConfig {
  duration: number;
  reducedDuration: number;
  idleGlowOpacity: [number, number];
  idleGlowDuration: number;
  breatheScale: [number, number];
  breatheDuration: number;
  envelopeFadeAt: number;
  envelopeFadeDuration: number;
  glowPeakScale: number;
  glowColors: {
    core: string;
    mid: string;
    edge: string;
  };
  flashPeakOpacity: number;
  sealY: number;
  particles: boolean;
  envelopeWidth: number;
}

export interface FloralAssets {
  left: string;
  bottom: string;
  bouquet: string;
  /** Couple photo corner florals */
  photo: string;
}

/** One decorative floral overlay — positions/sizes live in config */
export interface FloralPlacement {
  /** Key into assets.florals */
  which: keyof FloralAssets;
  /** Width as % of parent (e.g. 42) — preferred for responsive */
  widthPercent?: number;
  /** Height as % of parent — useful for bottom border strips */
  heightPercent?: number;
  /** Fixed width in px when percent isn't used */
  widthPx?: number;
  /** CSS inset values — negatives bleed past the edge */
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  /** Extra transform, e.g. "scaleX(-1)" or "rotate(-8deg)" */
  transform?: string;
  opacity?: number;
  zIndex?: number;
  objectFit?: "contain" | "cover" | "fill";
  objectPosition?: string;
}

export interface FloralLayouts {
  hero: FloralPlacement[];
  intro: FloralPlacement[];
  details: FloralPlacement[];
  closing: FloralPlacement[];
}

export interface InvitationConfig {
  couple: {
    first: string;
    second: string;
    display: string;
    monogram: string;
  };
  event: {
    title: string;
    dateDisplay: string;
    /** ISO 8601 — geri sayım için */
    dateISO: string;
  };
  texts: {
    besmele: string;
    introLines: [string, string, string];
    introBody: string;
    countdownHeading: string;
    scheduleHeading: string;
    locationHeading: string;
    dressCodeHeading: string;
    dressCode: string;
    giftHeading: string;
    gift: string;
    rsvpHeading: string;
    rsvpSubtext: string;
    closing: string;
    tapToOpen: string;
    tapToOpenTr: string;
    scrollDown: string;
    openMaps: string;
    rsvpButton: string;
    rsvpOpenHint: string;
    rsvpThankYou: string;
    rsvpNameLabel: string;
    rsvpAttendLabel: string;
    rsvpYes: string;
    rsvpNo: string;
    rsvpGuestLabel: string;
    rsvpCancel: string;
    rsvpSubmit: string;
    rsvpSubmitting: string;
  };
  venue: {
    name: string;
    address: string;
    mapsUrl: string;
    mapEmbedUrl: string;
  };
  schedule: ScheduleItem[];
  assets: {
    /** Açılış videosu — M&B (baslangic.mp4) */
    introVideo: string;
    /** Video ilk kare poster — yalnızca /envelope-poster.jpg */
    introPoster: string;
    heroBg: string;
    venue: string;
    /** Closing couple photo — drop /public/couple.jpg to replace */
    couple: string;
    /** Alias of couple */
    couplePhoto: string;
    music: string;
    florals: FloralAssets;
    /** Schedule timeline scrolling rose (~44–50px) */
    timelineRose: string;
    /** Torn-paper edge strips (cream paper, transparent outside tear) */
    tornTop: string;
    tornBottom: string;
    /** Gold script heading flourishes */
    flourishLeft: string;
    flourishRight: string;
  };
  /** Exact cream matching torn PNG paper — avoid seams */
  tornPaperColor: string;
  /**
   * Soft cream patch over baked-in "TAP TO OPEN" on the intro video/poster.
   * Percentages are relative to the video frame (not the viewport).
   */
  introTextCover: {
    color: string;
    left: string;
    top: string;
    width: string;
    height: string;
  };
  /** Per-section floral overlay positions & sizes */
  floralLayouts: FloralLayouts;
  openTransition: OpenTransitionConfig;
  rsvp: {
    /** Boş bırakılırsa console.log kullanılır */
    endpoint: string;
  };
}

export const invitationConfig: InvitationConfig = {
  couple: {
    first: "Mami",
    second: "Betül",
    display: "Mami & Betül",
    monogram: "M & B",
  },
  event: {
    title: "Nişan Günü",
    dateDisplay: "27.09.26",
    dateISO: "2026-09-27T17:00:00+03:00",
  },
  texts: {
    besmele: "Bismillahirrahmanirrahim",
    introLines: ["İki Ruh", "Tek Kader", "Bir Ömür Birlikte"],
    introBody:
      "Sevgili dostlarımız ve ailemiz, nişan törenimizde sevgi, kahkaha ve unutulmaz anlarla dolu bir akşam için sizleri de aramızda görmekten mutluluk duyarız.",
    countdownHeading: "Kutlamaya Kalan Süre",
    scheduleHeading: "Etkinlik Akışı",
    locationHeading: "Mekan",
    dressCodeHeading: "Kıyafet Kodu",
    dressCode:
      "Kutlamada koyu kırmızı ve bordo tonlarından kaçınmanızı rica ederiz.",
    giftHeading: "Hediye Tercihi",
    gift: "Kutulu hediye getirmemenizi rica ederiz.",
    rsvpHeading: "Katılımınızı Bildirin",
    rsvpSubtext:
      "Keyifli bir kutlama için hazırlanmamıza yardımcı olmak adına lütfen katılımınızı bildirin.",
    closing: "Sizleri görmeyi umuyoruz.",
    tapToOpen: "TAP TO OPEN",
    tapToOpenTr: "DOKUNARAK AÇIN",
    scrollDown: "Aşağı Kaydır",
    openMaps: "Haritada Aç",
    rsvpButton: "LCV",
    rsvpOpenHint: "Açmak için tıkla",
    rsvpThankYou:
      "Teşekkür ederiz! Sizi aramızda görmek için sabırsızlanıyoruz.",
    rsvpNameLabel: "Ad Soyad",
    rsvpAttendLabel: "Katılım",
    rsvpYes: "Katılıyorum",
    rsvpNo: "Katılamıyorum",
    rsvpGuestLabel: "Kişi sayısı",
    rsvpCancel: "İptal",
    rsvpSubmit: "Gönder",
    rsvpSubmitting: "Gönderiliyor…",
  },
  venue: {
    name: "Grand Garden Salon",
    address: "Bağdat Caddesi No: 123, Kadıköy / İstanbul",
    mapsUrl: "https://maps.google.com/?q=Grand+Garden+Salon+Kadikoy",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.650489028761!2d29.027!3d40.99!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDU5JzI0LjAiTiAyOcKwMDEnMzcuMiJF!5e0!3m2!1str!2str!4v1",
  },
  schedule: [
    { time: "17:00", event: "Karşılama" },
    { time: "18:00", event: "Tören" },
    { time: "19:00", event: "İkram" },
    { time: "20:00", event: "Yemek" },
    { time: "21:00", event: "Dans" },
  ],
  assets: {
    introVideo: "/baslangic.mp4?v=mb",
    introPoster: "/envelope-poster.jpg?v=mb",
    heroBg: "/hero-bg.jpg",
    venue: "/assets/venue.svg",
    couple: "/couple.jpg",
    couplePhoto: "/couple.jpg",
    music: "/assets/music.mp3",
    /** Scrolling rose on the schedule timeline (~44–50px) */
    timelineRose: "/rose_-_Copy.png.webp",
    tornTop: "/torn-top.png",
    tornBottom: "/torn-bottom.png",
    flourishLeft: "/left-element_1.png.webp",
    flourishRight: "/right-element_1.png.webp",
    florals: {
      left: "/floral-corner-left.webp",
      bottom: "/floral-bottom.webp",
      bouquet: "/floral-closing.webp",
      photo: "/fotocicek.webp",
    },
  },
  tornPaperColor: "#F3EDDC",
  /** Hide baked-in English "TAP TO OPEN" under a feathered cream patch */
  introTextCover: {
    color: "#EDE6D6",
    left: "35%",
    top: "88%",
    width: "30%",
    height: "7%",
  },
  floralLayouts: {
    /**
     * Swan framing — symmetric corner florals only over the sides.
     * Center water/swans stay clear. Bottom strip sits at the seam only.
     */
    hero: [
      {
        which: "left",
        widthPercent: 43,
        bottom: "-8%",
        left: "-2%",
        opacity: 0.98,
        zIndex: 50,
      },
      {
        which: "left",
        widthPercent: 43,
        bottom: "-8%",
        right: "-2%",
        transform: "scaleX(-1)",
        opacity: 0.98,
        zIndex: 50,
      },
      {
        /** Thin seam bridge between corners — not a center bouquet over the swans */
        which: "bottom",
        widthPercent: 48,
        heightPercent: 11,
        bottom: "-6%",
        left: "50%",
        transform: "translateX(-50%)",
        objectFit: "cover",
        objectPosition: "center bottom",
        opacity: 0.95,
        zIndex: 49,
      },
    ],
    /** Intro — seam florals from hero spill onto the card top */
    intro: [],
    /** Details card removed from flow */
    details: [],
    /**
     * Closing couple photo florals rendered directly in Closing.tsx
     * via assets.florals.photo (/fotocicek.webp) — full-width bottom strip.
     */
    closing: [],
  },
  openTransition: {
    duration: 1.4,
    reducedDuration: 0.4,
    idleGlowOpacity: [0.3, 0.6],
    idleGlowDuration: 2.5,
    breatheScale: [1, 1.015],
    breatheDuration: 4,
    envelopeFadeAt: 0.6,
    envelopeFadeDuration: 0.45,
    glowPeakScale: 28,
    glowColors: {
      core: "#F5D98B",
      mid: "#E8B84B",
      edge: "rgba(255, 255, 255, 0.85)",
    },
    flashPeakOpacity: 0.95,
    sealY: 0.48,
    particles: true,
    envelopeWidth: 380,
  },
  rsvp: {
    endpoint: "",
  },
};
