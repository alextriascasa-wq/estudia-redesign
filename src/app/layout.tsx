import type { Metadata, Viewport } from "next";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const display = Bricolage_Grotesque({
  variable: "--font-cal",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "EstudIA — Tu copiloto de estudio con IA",
    template: "%s · EstudIA",
  },
  description:
    "EstudIA es el copiloto de estudio con IA para estudiantes de la ESO y Bachillerato. Planes personalizados, tarjetas adaptativas, exámenes de práctica y resúmenes de tus apuntes.",
  metadataBase: new URL("https://estudia.app"),
  openGraph: {
    title: "EstudIA — Tu copiloto de estudio con IA",
    description:
      "Estudia menos, aprende más. Planes, tarjetas y exámenes generados por IA a partir de tus apuntes.",
    type: "website",
    locale: "es_ES",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0B18" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es-ES"
      suppressHydrationWarning
      className={`${inter.variable} ${display.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <a
            href="#contenido"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
          >
            Saltar al contenido
          </a>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
