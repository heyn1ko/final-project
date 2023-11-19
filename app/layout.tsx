import './globals.css';
import React from 'react';
import Footer from './myAccount/Components/Footer';
import NavBar from './myAccount/Components/NavBar';

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
      <body className="pb-20 h-full bg-zinc-300 ">
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
