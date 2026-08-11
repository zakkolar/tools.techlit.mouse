export interface GameMeta {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  accent: string;
  accentTextColor: 'black' | 'white';
  customizeUrl: string;
}

export const games: GameMeta[] = [
  {
    slug: "click",
    title: "Coin Chase",
    subtitle: "Click practice",
    description: "Click as many coins as you can before the time runs out.",
    accent: "#FFC800",
    accentTextColor: "black",
    customizeUrl: "https://customize.techlit.tools/#url=https://mouse.techlit.tools/customize/click.json"
  },
  {
    slug: "drag",
    title: "Apple Picker",
    subtitle: "Drag practice",
    description: "Drag as many apples to the basket as you can before the time runs out.",
    accent: "#5d922f",
    accentTextColor: "white",
    customizeUrl: "https://customize.techlit.tools/#url=https://mouse.techlit.tools/customize/drag.json"
  },
  {
    slug: "scroll",
    title: "Scavenger Hunt",
    subtitle: "Scroll practice",
    description: "Scroll up and down to find the required items before time runs out.",
    accent: "#28c2d1",
    accentTextColor: "black",
    customizeUrl: "https://customize.techlit.tools/#url=https://mouse.techlit.tools/customize/scroll.json"
  },
  {
    slug: "select",
    title: "Word Collector",
    subtitle: "Select practice",
    description: "Select as many words as you can before the time runs out.",
    accent: "#8b5cf6",
    accentTextColor: "white",
    customizeUrl: "https://customize.techlit.tools/#url=https://mouse.techlit.tools/customize/select.json"
  }
];
