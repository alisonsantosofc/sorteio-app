'use client';

import { useSession } from 'next-auth/react';

import { Separator } from '../../ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from '@/src/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/src/components/ui/avatar';
import { ToggleDarkMode } from '@/src/components/custom/ToggleDarkMode';
import { ToggleLang } from '@/src/components/custom/ToggleLang';
import { AuthButton } from '../AuthButton';

import { useLang } from '@/src/hooks/useLang';

import i18n from './i18n.json';

export function UserMenu() {
	const session = useSession();
	const { lang } = useLang();

	return (
		<Popover>
			<PopoverTrigger>
				<Avatar className="w-12 h-12 flex items-center justify-center bg-shape-600">
					<span className="text-2xl">{session.data?.user?.name?.charAt(0)}</span>
				</Avatar>
			</PopoverTrigger>
			<PopoverContent align="end" className="rounded-xl">
				<div className="flex flex-col gap-4 mb-4 px-3">
					<div className="flex justify-end">
						<span>{session.data?.user?.name}</span>
					</div>
					<div className="flex justify-between">
						<ToggleDarkMode />
						<ToggleLang />
					</div>
				</div>

				{/* <Separator orientation="horizontal" className="sm:hidden" /> */}

				{/* <div className="flex p-3 w-full justify-start cursor-pointer rounded-lg transition hover:bg-foreground/[0.04] hover:text-letter text-label text-sm">
					<Award className="h-5 w-5 mr-3 text-letter" />
					{i18n[lang].content.options.subscription}
				</div> */}

				<Separator orientation="horizontal" className="my-1" />
				
				<AuthButton.Logout />
			</PopoverContent>
		</Popover>
	);
}