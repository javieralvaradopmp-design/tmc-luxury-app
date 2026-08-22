import raw from "@/data/functionalities.json";

export type FunctionalityItem = {
  id: number;
  module: string;
  level: string;
  mvp: "SI" | "NO" | null;
  functionality: string;
  es: string;
  classification: string;
  detail: string;
};

const ALL: FunctionalityItem[] = raw as FunctionalityItem[];

// Items with MVP = "NO" are never shown anywhere.
export const VISIBLE: FunctionalityItem[] = ALL.filter((i) => i.mvp !== "NO");

export function byLevelPrefix(prefix: string): FunctionalityItem[] {
  return VISIBLE.filter((i) => i.level.startsWith(prefix));
}

export function byModulePrefix(prefix: string): FunctionalityItem[] {
  return VISIBLE.filter((i) => i.module.startsWith(prefix));
}

export function isActive(item: FunctionalityItem): boolean {
  return item.mvp === "SI";
}
