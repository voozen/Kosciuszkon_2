import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SmartSort',
  description: 'Smart trash sorting system for a better environment',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-[#eeeede] text-[#121212] ${inter.className} grid h-screen place-content-center`}>{children}</body>
    </html>
  );
}
