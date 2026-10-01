export type WeddingConfig = {
  introMessage?: string;
  coupleNames?: { first: string; second: string };
  date?: string; // ISO
  dateLabel?: string;
  ceremony?: { label: string; venue: string; time: string; mapsUrl?: string };
  reception?: { label: string; venue: string; time: string; mapsUrl?: string };
  story?: { title: string; body: string };
  dressCode?: { title: string; body: string };
  gallery?: { src: string; caption?: string }[];
  rsvp?: { enabled: boolean; deadlineLabel?: string };
  additionalMessage?: string;
  closing?: { lines: string[] };
};

export const wedding: WeddingConfig = {
  introMessage: "Two stories become one.",
  coupleNames: { first: "George", second: "Merna" },
  date: "2026-11-10T17:00:00",
  dateLabel: "November 10, 2026",
  ceremony: {
    label: "Ceremony",
    venue: "St. George and Anba Ebram",
    time: "5:00 PM",
    mapsUrl: "https://maps.app.goo.gl/H1WdsBZTX1UfzVN18",
  },
  reception: {
    label: "Celebration",
    venue: "Crystal Palace Hall",
    time: "7:00 PM",
    mapsUrl: "https://maps.app.goo.gl/x4aTF9q6QFmPABNBA",
  },
  dressCode: {
    title: "Dress code",
    body: "Formal evening wear — deep tones, champagne, and ivory.",
  },
  rsvp: { enabled: true, deadlineLabel: "Kindly respond before October 10, 2026" },
  additionalMessage: "Your presence is the only gift we wish for.",
  closing: {
    lines: ["Here's to love,", "laughter,", "and everything that comes next."],
  },
};

// Graceful fallbacks so the design never breaks on missing data.
export const names = wedding.coupleNames;
export const displayTitle = names
  ? `${names.first} & ${names.second}`
  : "Two Hearts, One Story";
export const venueFallback = "Join us as we celebrate together.";
