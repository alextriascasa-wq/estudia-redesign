import Link from "next/link";
import { Logo } from "@/components/shared/logo";

const cols = [
  {
    title: "Producto",
    links: [
      { href: "/#caracteristicas", label: "Caracter\u00edsticas" },
      { href: "/como-funciona", label: "C\u00f3mo funciona" },
      { href: "/precios", label: "Precios" },
      { href: "/para-padres", label: "Para padres" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { href: "#", label: "Sobre nosotros" },
      { href: "#", label: "Blog" },
      { href: "#", label: "Contacto" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "#", label: "Aviso legal" },
      { href: "#", label: "Privacidad" },
      { href: "#", label: "Cookies" },
      { href: "#", label: "T\u00e9rminos" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 py-16">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div className="space-y-4">
            <Logo />
            <p className="max-w-sm text-sm text-muted-foreground">
              Tu copiloto de estudio con IA. Planes, tarjetas y ex\u00e1menes personalizados para la ESO y Bachillerato.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h3 className="text-sm font-semibold text-foreground mb-3">{c.title}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="hover:text-foreground transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-4 border-t pt-6 text-sm text-muted-foreground">
          <p>\u00a9 {new Date().getFullYear()} EstudIA. Hecho con \u2764 en Espa\u00f1a.</p>
          <p>Espa\u00f1ol (Espa\u00f1a)</p>
        </div>
      </div>
    </footer>
  );
}
