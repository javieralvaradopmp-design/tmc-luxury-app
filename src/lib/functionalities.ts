import raw from "@/data/functionalities.json";

export type Track = "MVP" | "Backlog" | "Concierge" | "Integrations" | "Operations" | "Hybrid" | "Platform";

export type FunctionalityItem = {
  id: number;
  mvp: "SI" | null;
  classification: string;
  track: Track;
  trackDesc: string;
  phase: string;
  claude: string;
  javier: string;
  mensaje: string | null;
  color: string | null;
  status: string;
  module: string;
  level: string;
  functionality: string;
  es: string;
  detail: string;
};

const ALL: FunctionalityItem[] = raw as FunctionalityItem[];

// Nothing is ever hidden anymore under the track model — every item has a defined track.
export const VISIBLE: FunctionalityItem[] = ALL;

export function byLevelPrefix(prefix: string): FunctionalityItem[] {
  return VISIBLE.filter((i) => i.level.startsWith(prefix));
}

export function byModulePrefix(prefix: string): FunctionalityItem[] {
  return VISIBLE.filter((i) => i.module.startsWith(prefix));
}

export function isActive(item: FunctionalityItem): boolean {
  return item.track === "MVP" || item.track === "Concierge";
}

// Maps a track's "Color Boton" value (Spanish, from the Excel) to a CSS color + soft background.
const COLOR_MAP: Record<string, { fg: string; bg: string }> = {
  Dorado: { fg: "var(--gold-soft)", bg: "rgba(201,162,75,0.16)" },
  Naranja: { fg: "var(--sunset)", bg: "rgba(217,122,61,0.18)" },
  Gris: { fg: "var(--muted)", bg: "rgba(139,150,172,0.14)" },
};

export function trackColor(item: FunctionalityItem): { fg: string; bg: string } {
  if (item.track === "MVP") return { fg: "var(--gold-soft)", bg: "rgba(201,162,75,0.16)" };
  if (item.color && COLOR_MAP[item.color]) return COLOR_MAP[item.color];
  return { fg: "var(--muted)", bg: "rgba(139,150,172,0.14)" };
}

// The text shown when tapping a non-functional item. null/undefined means "no badge, fully active".
export function trackMessage(item: FunctionalityItem): string | null {
  if (item.mensaje && item.mensaje !== "N/A") return item.mensaje;
  return null;
}
