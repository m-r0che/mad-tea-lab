export type Swatch = { hex: string; name: string };

/**
 * Curated 30-swatch tea palette, ordered roughly by lightness so a
 * 6-column grid forms five visual rows: almost-water, pale oolongs,
 * caramelised, classic builders, dark & smoky.
 */
export const TEA_PALETTE_FLAT: Swatch[] = [
  { hex: "#faf3e0", name: "Cheshire Mist" },
  { hex: "#f3e6c0", name: "Looking-Glass" },
  { hex: "#ecd9a0", name: "Dormouse Dew" },
  { hex: "#e5cc80", name: "Mock Lemon" },
  { hex: "#ddbf60", name: "Honey Drop" },
  { hex: "#d3b048", name: "Tweedle Gold" },

  { hex: "#f1e3bd", name: "White Rabbit" },
  { hex: "#e6cf94", name: "Chamomile" },
  { hex: "#d9b079", name: "Pale Oolong" },
  { hex: "#c89866", name: "Jasmine Hour" },
  { hex: "#b8743a", name: "Honey Oolong" },
  { hex: "#a05a28", name: "Rooibos Red" },

  { hex: "#cba074", name: "Toasted Top Hat" },
  { hex: "#b8884f", name: "Caramel Cog" },
  { hex: "#a37438", name: "Cinnamon Garden" },
  { hex: "#8e5e25", name: "Russet Hare" },
  { hex: "#7a4d1e", name: "Chestnut Croquet" },
  { hex: "#6b3f18", name: "Pocket-Watch Bronze" },

  { hex: "#d4b483", name: "Milky Mock-Turtle" },
  { hex: "#c68642", name: "Pale Hatter" },
  { hex: "#a0522d", name: "Builder's Brew" },
  { hex: "#8b4513", name: "Breakfast at Six" },
  { hex: "#7b4a2b", name: "Earl Grey" },
  { hex: "#5c3317", name: "Assam at Tea" },

  { hex: "#6b4226", name: "Caterpillar Smoke" },
  { hex: "#523019", name: "Dark Roast" },
  { hex: "#3b1d12", name: "Lapsang Riddle" },
  { hex: "#2a140b", name: "Six O'Clock Stew" },
  { hex: "#1a0e07", name: "Treacle Well" },
  { hex: "#3d2914", name: "Bandersnatch" },
];

const BY_HEX = new Map(
  TEA_PALETTE_FLAT.map((s) => [s.hex.toLowerCase(), s.name]),
);

export function findSwatchName(hex: string): string | null {
  return BY_HEX.get(hex.toLowerCase()) ?? null;
}
