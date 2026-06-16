import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SafeLink | Link intelligence',
  description: 'inspect links, redirects, and social-engineering signals before anyone clicks',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
