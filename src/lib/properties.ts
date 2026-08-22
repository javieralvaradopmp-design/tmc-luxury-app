export type Property = {
  slug: string;
  name: string;
  owner: string;
  image: string | null;
  status?: "active" | "offboarded";
};

export const PROPERTIES: Property[] = [
  { slug: "star-island", name: "Star Island Residence", owner: "Edward Pemberton", image: "/properties/star-island.jpg" },
  { slug: "fisher-island", name: "Fisher Island Villa", owner: "Gregory Calloway", image: "/properties/fisher-island.jpg" },
  { slug: "bal-harbour", name: "Bal Harbour Penthouse", owner: "Charlotte Beaumont", image: "/properties/bal-harbour.jpg" },
  { slug: "coconut-grove", name: "Coconut Grove Estate", owner: "Margaret Sinclair", image: "/properties/coconut-grove.jpg" },
];
