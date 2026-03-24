import "~/styles/globals.css";

import { type Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import { cn } from "~/lib/utils";
import { Toaster } from "~/components/ui/sonner";

const nunito = Nunito_Sans({
  subsets: ["latin"],
});

export default function UserLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <main className={`${nunito.className}`}>{children}</main>;
}
