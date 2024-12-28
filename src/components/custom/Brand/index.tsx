import Image from 'next/image';
import React from 'react';
import { Montserrat } from 'next/font/google';

import { useDarkMode } from '@/src/hooks/useDarkMode';
import { cn } from '@/src/lib/utils';

const montserrat = Montserrat({ 
	weight: '800', 
	subsets: ['latin'], 
});

export function Brand() {
	const { darkMode } = useDarkMode();
  
	return (
		<>
			<div className="relative w-10 h-10 mr-4">
				<Image
					fill
					alt="logo"
					src={darkMode ? '/images/icon-white.svg' : '/images/icon.svg'}
				/>
			</div>
			<h1 className={cn('text-2xl font-bold italic uppercase text-black dark:text-white', montserrat.className)}>
				Sorteio
			</h1>
		</>
	);
}
