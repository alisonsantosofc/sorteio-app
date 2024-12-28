'use client';

import Image from 'next/image';
import { ArrowRight, Ticket } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Card } from '@/src/components/ui/card';

import { cn } from '@/src/lib/utils';
import { useLang } from '@/src/hooks/useLang';

import i18n from './i18n.json';

const DashboardPage = () => {
	const router = useRouter();
	const { lang } = useLang();

	const tools = [
		{
			label: i18n[lang].options.draws,
			icon: Ticket,
			href: '/draws',
		},
	];

	return (
		<section className="w-full h-section">
			<nav className="flex flex-col px-4 gap-4 md:px-20 lg:px-32 ">
				{tools.map((tool) => (
					<Card 
						onClick={() => router.push(tool.href)}
						key={tool.href}
						className="h-full flex justify-between items-center p-4 border-var(--border)/5 hover:bg-black/5 dark:hover:bg-white/5 transition cursor-pointer"
					>
						<div className="w-full flex gap-8 items-center">
							<tool.icon size={36} />
							<div className="font-extrabold uppercase italic text-xl">
								{tool.label}
							</div>
						</div>

						<ArrowRight />
					</Card>
				))}
			</nav>
		</section>
	);
};

export default DashboardPage;