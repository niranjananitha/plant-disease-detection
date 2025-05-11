import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import './style/global.css';

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-primary",
});

export const metadata: Metadata = {
  title: {
    template: '%s | Plant Disease Detector',
    default: 'Plant Disease Detector - AI Plant Health Analysis',
  },
  description: 'Detect plant diseases in real-time using AI-powered image analysis. Get instant diagnosis and treatment recommendations.',
  keywords: [
    'plant disease detection',
    'AI plant health',
    'leaf disease identification',
    'agriculture tech',
    'plant care',
  ],
  openGraph: {
    title: 'Plant Disease Detector',
    description: 'AI-powered plant health analysis and disease detection system',
    images: [{ url: '/og-image.jpg' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          href="/favicon.ico"
          type="image/x-icon"
          sizes="48x48"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon.png"
          type="image/png"
          sizes="180x180"
        />
      </head>
      <body className={`${geist.variable} font-sans bg-gradient-to-b from-green-50 to-white min-h-screen`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}