import type { Metadata } from "next";
import { Roboto } from 'next/font/google'
import "./globals.css";

const fontRoboto = Roboto({ weight : ["100", "300", "400","700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mapaches Lectores",
  description: "La mejor app web para ver las reseñas de tus libros favoritos y compartir las tuyas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${fontRoboto.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
