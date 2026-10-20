export type ProductLink = { href: string; label: string };

export type Product = {
  slug: string;
  name: string;
  category: string;
  status: "En desarrollo" | "Disponible";
  summary: string;
  logo: { src: string; width: number; height: number };
  url: string;
  links: ProductLink[];
};

// Fawel's own site (fawel.ai) is the source of truth: state and log change there, not here.
export const FAWEL_URL = "https://fawel.ai";

export const products: Product[] = [
  {
    slug: "fawel",
    name: "Fawel",
    category: "Programas de PLC y HMI con IA",
    status: "En desarrollo",
    summary: "Una IA que desarrolla programas de PLC y pantallas HMI a partir de los datos de la planta. El integrador revisa, prueba offline y firma antes de cargarlos al equipo. Arranca con Delta (WPLSoft y DIAScreen). En desarrollo, sin fecha ni precio.",
    logo: { src: "/productos/fawel-logo.png", width: 1802, height: 469 },
    url: FAWEL_URL,
    links: [
      { href: FAWEL_URL, label: "Conocé Fawel" },
      { href: `${FAWEL_URL}/#lista`, label: "Sumate a la lista de espera" },
    ],
  },
];
