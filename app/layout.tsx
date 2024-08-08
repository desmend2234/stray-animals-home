import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { extractRouterConfig } from 'uploadthing/server';
import Navbar from './components/Navbar';
import { ourFileRouter } from './api/uploadthing/core';
import { Toaster } from 'sonner';
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '浪浪認養資訊平台',
  description: '浪浪認養資訊平台’是一個幫助流浪動物找到家的平台。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='zh-Hant'>
      <body className={inter.className}>
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <Navbar />
        {children}
        <Footer />
        <Toaster richColors closeButton theme='light' />
      </body>
    </html>
  );
}
