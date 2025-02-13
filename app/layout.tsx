import './globals.css';
import GlobalLayout from './components/GlobalLayout';
import Providers from './components/Providers';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth.config';
import type { Metadata } from 'next';
import VHSEffectsToggle from './components/VHSEffectsToggle'

export const metadata: Metadata = {
  title: 'IT Bootcamp',
  description: 'IT Bootcamp of IIIT Bhubaneswar',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <div className="intro-wrap">
          <div className="noise"></div>
          <div className="noise noise-moving"></div>
          <div className="scanlines"></div>
          <Providers session={session}>
            <GlobalLayout>
              {children}
            </GlobalLayout>
            <VHSEffectsToggle />
          </Providers>
        </div>
      </body>
    </html>
  );
}
