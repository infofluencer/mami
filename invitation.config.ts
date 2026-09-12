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
  /**
   * 0–1 progress through the intro video when the main invitation
   * mounts underneath and starts fading in (crossfade into the page).
   */
  revealMainAtProgress: number;
  /** Seconds for the video overlay to fade out after it ends */
  videoFadeSeconds: number;
}

export interface FloralAssets {
  left: string;
  bottom: string;
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
    /** Açılış videosu */
    introVideo: string;
    /** Video ilk kare poster */
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
    dateDisplay: "03.10.26",
    dateISO: "2026-10-03T14:00:00+03:00",
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
    name: "Lin Davet Salonu",
    address: "Zafer Mahallesi 185. Sk. No:19C, Esenyurt / İstanbul",
    mapsUrl:
      "https://www.google.com/maps?ftid=0x14caa1bc341e64b7:0x8814f94908fd0c1c",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.5!2d28.6809313!3d41.0082419!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa1bc341e64b7%3A0x8814f94908fd0c1c!2sLin%20Davet%20Salonu!5e0!3m2!1str!2str!4v1",
  },
  schedule: [
    { time: "14:00", event: "Karşılama" },
    { time: "15:00", event: "Tören" },
    { time: "16:00", event: "İkram" },
    { time: "17:00", event: "Yemek" },
    { time: "18:00", event: "Dans" },
  ],
  assets: {
    introVideo: "/davetiye.mp4",
    introPoster: "/davetiye-poster.jpg",
    heroBg: "/hero-bg.jpg",
    venue: "/lin_house.webp",
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
     * Swan-frame corners only (no extra bottom strip — that stacked wrong).
     * Rendered with hero-bg, not during video transition.
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
    ],
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
    /** Mount main page & start crossfade near the end of the video */
    revealMainAtProgress: 0.55,
    /** Slow simultaneous fade: davetiye out + homepage in */
    videoFadeSeconds: 2.2,
  },
  rsvp: {
    endpoint: "",
  },
};
