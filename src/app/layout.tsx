import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { NextAuthProvider } from './providers';
import { HooksProviders } from '@/src/hooks/provider';
import { MainContent } from '@/src/components/custom/MainContent';
import { Toaster } from '@/src/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Sorteio',
	description: 'Divirta-se com sorteios entre amigos. Boa sorte!',
};

export default function RootLayout({
	children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	return (
		<html lang="pt-br">
			<body className={`${inter.className} app`}>
				<NextAuthProvider>
					<HooksProviders>
						<MainContent>
							{children}
							<Toaster />
						</MainContent>
					</HooksProviders>
				</NextAuthProvider>
			</body>
		</html>
	);
}
