import type { Metadata } from 'next';
import './globals.css';
import { CareProvider } from '@/context/CareContext';

export const metadata: Metadata = {
  title: 'Pulse | India-First Chronic Care Continuity Prototype',
  description: 'Chronic-care continuity product closing the 89-day gap between doctor visits for time-poor professionals in Indore.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-warm-50 text-slate-900 antialiased selection:bg-pulse-100 selection:text-pulse-900">
        <CareProvider>
          {children}
        </CareProvider>
      </body>
    </html>
  );
}
