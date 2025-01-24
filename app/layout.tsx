import './globals.css';
import GlobalLayout from './components/GlobalLayout';
import Providers from './components/Providers';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import type { Metadata } from 'next';
import ParticleBackground from './components/ParticleBackground';

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
        <ParticleBackground />
        <Providers session={session}>
          <GlobalLayout>
            {children}
          </GlobalLayout>
        </Providers>
      </body>
    </html>
  );
}
