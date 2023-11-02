import './globals.css';
import React from 'react';
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
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
