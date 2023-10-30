import './globals.css';
import Link from 'next/link';
import React from 'react';

// const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: 'Home Page | Index',
    template: '%s | Index',
  },
  description: 'Curated Interior Finds',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Link href="/">Home</Link>
        <Link href="/spaces">Spaces</Link>
        <Link href="/map">Map</Link>
        <Link href="/programme">Programme</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/myAccount">My Account</Link>

        {children}
      </body>
    </html>
  );
}
