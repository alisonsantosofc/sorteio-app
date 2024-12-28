'use client';

import Image from 'next/image';
import React from 'react';
import { cn } from '../lib/utils';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ 
	weight: '800', 
	subsets: ['latin'], 
});

export default function loading() {
	const localDarkMode = JSON.parse(
		localStorage.getItem('dark_mode') as string
	);

	return (
		<div className="w-screen h-screen bg-background flex flex-col justify-center items-center ">
			<div className="flex gap-2 items-center">
				<div className="relative w-10 h-10 sm:w-14 sm:h-14 mr-4">
					<Image
						fill
						alt="logo"
						src={localDarkMode ? '/images/icon-white.svg' : '/images/icon.svg'}
					/>
				</div>
				<h1 className={cn('text-xl sm:text-3xl lg:text-4xl font-bold italic uppercase text-black dark:text-white', montserrat.className)}>
					Sorteio
				</h1>
			</div>

			<div className='loader mt-4'></div>
		</div>
	);
}
