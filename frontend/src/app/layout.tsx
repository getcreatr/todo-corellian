import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Corellian Software - Task Manager",
  description: "Elegant task management for the modern professional",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
