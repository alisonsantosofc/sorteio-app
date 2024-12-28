'use client';


import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Ticket } from 'lucide-react';

import { cn } from '@/src/lib/utils';
import { useLang } from '@/src/hooks/useLang';
import { Brand } from '@/src/components/custom/Brand';

import i18n from './i18n.json';

export function Sidebar() {
	const pathname = usePathname();
	const { lang } = useLang();
	

	const routes = [
		{
			label: i18n[lang].content.routesLabels.dashboard,
			icon: LayoutDashboard,
			href: '/dashboard',
		},
		{
			label: i18n[lang].content.routesLabels.draws,
			icon: Ticket,
			href: '/draws',
		},
	];

	return (
		<div className="space-y-4 py-4 flex flex-col h-full bg-slate-200 dark:bg-slate-900 text-white">
			<div className="px-3 py-2 flex-1">
				<Link 
					href="/dashboard" 
					className="flex items-center pl-3 mb-14"
				>
					<Brand />
				</Link>
				<div className="space-y-1">
					{routes.map((route) => (
						<Link
							href={route.href} 
							key={route.href}
							className={cn(
								'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer rounded-lg transition',
								pathname !== route.href && 'hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5',
								pathname === route.href ? 'text-white dark:text-black bg-gray-900 dark:bg-gray-50 hover:bg-gray-800 dark:hover:bg-gray-100' : 'text-zinc-600 dark:text-zinc-400'
							)}
						>
							<div className="flex items-center flex-1">
								<route.icon className={cn('h-5 w-5 md:h-6 md:w-6 mr-3', pathname !== route.href && 'text-black dark:text-white')} />
								{route.label}
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}