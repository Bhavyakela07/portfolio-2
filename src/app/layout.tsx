import './globals.css';
import type { Metadata } from 'next';
import { Kanit, JetBrains_Mono } from 'next/font/google';

const kanit = Kanit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-kanit',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Bhavya Kela -- AI/ML & Full-Stack Engineer',
  description: 'Portfolio of Bhavya Kela -- AI/ML & Full-Stack Engineer driven by crafting striking and unforgettable intelligent applications.',
  keywords: ['Bhavya Kela', 'AI Engineer', 'Full Stack Developer', 'RAG Architecture', 'FastAPI', 'React', 'YOLOv8', 'Qdrant'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${kanit.variable} ${mono.variable} font-sans bg-[#0C0C0C] text-[#D7E2EA] antialiased selection:bg-purple-600 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
