import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/lib/store";

export const metadata: Metadata = {
  title: "TMC Luxury Miami",
  description: "TMC Luxury Miami — internal pilot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <div style={{ maxWidth: 480, margin: "0 auto", minHeight: "100vh", position: "relative" }}>
            {children}
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
