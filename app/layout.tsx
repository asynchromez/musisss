import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Musisss',
  description: 'Music WEB4 provider',
  icons: {
    icon: [
      {
        url: '/favicon.png',
        sizes: 'any',
      },
      {
        url: '/icon.png',
        type: 'image/png',
      },
    ],
    apple: {
      url: '/apple-icon.png',
      type: 'image/png',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black`}>{children}</body>
    </html>
  );
}