'use client';

import { Nunito } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

import { ToggleDarkMode } from '@/src/components/custom/ToggleDarkMode';
import { ToggleLang } from '@/src/components/custom/ToggleLang';
import { cn } from '@/src/lib/utils';
import { LandingMenu } from '@/src/components/custom/LandingMenu';

const nunito = Nunito({ 
	weight: '900', 
	subsets: ['latin'], 
});

export function LandingNavbar() {
	return (
		<div className="fixed z-50 top-0 right-0 bg-background w-full h-20 flex items-center justify-center px-4 xl:px-0">
			<div className="w-full md:w-[1244px] flex items-center justify-between gap-8">
				<Link 
					href="/" 
					className="flex items-center"
				>
					<div className="relative w-10 h-10 sm:w-14 sm:h-14 mr-4">
						<Image
							fill
							alt="logo"
							src="/images/icon.svg"
						/>
					</div>
					<h1 className={cn('text-xl sm:text-3xl lg:text-4xl font-bold', nunito.className)}>
            Sorteio
					</h1>
				</Link>
				<div className="flex items-center gap-4">
					<div className="hidden sm:flex gap-4 h-fit">
						<ToggleDarkMode />
						<ToggleLang />
					</div>
					<LandingMenu />
				</div>
			</div>
		</div>
	);
}