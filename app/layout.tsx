import type { Metadata } from 'next';
import { Inter, Syne } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const syne = Syne({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  title: 'Aaron Pharrell Mugumya | AI/ML Engineer & Full-Stack Developer',
  description:
    'Personal portfolio of Aaron Pharrell Mugumya - AI/ML Engineer, Full-Stack Developer, and Founder of JuniorReactive.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${syne.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
