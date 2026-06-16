import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "正義之聲 | 登入",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    >
      <body>{children}</body>
    </html>
  );
}
