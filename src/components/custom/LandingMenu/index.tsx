'use client';

import { useSession } from 'next-auth/react';
import { HelpCircle, Home, Menu, Search, Sparkles } from 'lucide-react';

import { Popover, PopoverContent, PopoverTrigger } from '@/src/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/src/components/ui/avatar';
import { ToggleDarkMode } from '@/src/components/custom/ToggleDarkMode';
import { ToggleLang } from '@/src/components/custom/ToggleLang';
import { Separator } from '../../ui/separator';

import { useLang } from '@/src/hooks/useLang';

import i18n from './i18n.json';
import Link from 'next/link';

export function LandingMenu() {
	const session = useSession();
	const { lang } = useLang();

	const options = [
		{
			label: i18n[lang].content.options.home,
			icon: Home,
			href: '/',
		},
		{
			label: i18n[lang].content.options.about,
			icon: Search,
			href: '/#about',
		},
		{
			label: i18n[lang].content.options.benefits,
			icon: Sparkles,
			href: '/#benefits',
		},
	];

	const lastOptions = [
		{
			label: i18n[lang].content.options.support,
			icon: HelpCircle,
			href: '/support',
		},
	];

	return (
		<Popover>
			<PopoverTrigger>
				{session.data ? (
					<Avatar className="w-12 h-12 flex items-center justify-center bg-shape-600">
						<span className="text-2xl">{session.data?.user?.name?.charAt(0)}</span>
					</Avatar>
				) : (
					<div className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5">
						<Menu />
					</div>
				)}
			</PopoverTrigger>
			<PopoverContent align="end" className="rounded-xl">
				<div className="flex flex-col gap-4 mb-4 px-3 sm:hidden">
					<div className="flex justify-end">
						<span>{session.data?.user?.name}</span>
					</div>
					<div className="flex justify-between">
						<ToggleDarkMode />
						<ToggleLang />
					</div>
				</div>
				
				<Separator orientation="horizontal" className="my-1 sm:hidden" />

				{options.map(option => (
					<Link 
						key={option.href}
						href={option.href}
						className="flex p-3 w-full justify-start cursor-pointer rounded-lg transition hover:bg-foreground/[0.04] hover:text-letter text-label text-sm"
					>
						<option.icon className="h-5 w-5 mr-3 text-letter" />
						<span>{option.label}</span>
					</Link>
				))}

				<Separator orientation="horizontal" className="my-1" />
				
				{lastOptions.map(option => (
					<Link 
						key={option.href}
						href={option.href}
						className="flex p-3 w-full justify-start cursor-pointer rounded-lg transition hover:bg-foreground/[0.04] hover:text-letter text-label text-sm"
					>
						<option.icon className="h-5 w-5 mr-3 text-letter" />
						<span>{option.label}</span>
					</Link>
				))}
			</PopoverContent>
		</Popover>
	);
}