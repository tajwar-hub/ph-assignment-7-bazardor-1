import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["latin" , "bengali" ],
});

export const metadata: Metadata = {
  title: " Bazar Dor ",
  description: " A web application keeping you up to date with current BAZAR DOR! ",
};


export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${notoSerifBengali.className}  h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}