import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Test de Bienestar Digital | Esc. N° 4-012 Ing. Ricardo Videla",
  description:
    "Test anónimo de bienestar digital para estudiantes de secundaria. Descubrí tu relación con el celular y la tecnología.",
  keywords: ["bienestar digital", "test", "escuela", "celular", "tecnología"],
  authors: [{ name: "Escuela N° 4-012 Ing. Ricardo Videla" }],
  openGraph: {
    title: "Test de Bienestar Digital",
    description: "¿Quién maneja a quién? Descubrí tu relación con el celular.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
