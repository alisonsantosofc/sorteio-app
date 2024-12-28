'use client';

import { LandingAnimation } from '@/src/components/custom/LandingAnimation';

import { useLang } from '@/src/hooks/useLang';
import { cn } from '@/src/lib/utils';

import i18n from './i18n.json';
import Image from 'next/image';
import { Footer } from '@/src/components/custom/Footer';
import { Button } from '@/src/components/ui/button';
import { Hand, Headset, HelpCircle } from 'lucide-react';

const SupportPage = () => {
	const { lang } = useLang();

	return (
		<main className="overflow-hidden w-screen xl:w-[1244px] mx-auto h-full p-4 xl:p-0">
			<section className="flex flex-col gap-4 pt-20">
				<div className="flex flex-col items-center justify-between md:flex-row">
					<div>
						<p className="w-full text-2xl md:text-4xl lg:text-5xl md:max-w-3xl font-bold">
							{i18n[lang].content.title}
						</p>
						<p className="w-full mt-2 md:max-w-xl text-sm sm:text-base">
							{i18n[lang].content.textHighlight}
						</p>
						<div className="flex gap-4 flex-col sm:flex-row md:flex-row mt-8">
							<Button
								variant="default"
								className="flex gap-2"
							>
								<span>{i18n[lang].content.buttons.help}</span>
								<Headset className="w-5 h-5" />
							</Button>
						</div>
					</div>

					<div className="relative w-64 h-64 sm:w-96 sm:h-96">
						<Image
							fill
							alt="logo"
							src="/images/image-support.svg"
						/>
					</div>
				</div>
			</section>
		</main>
	);
};

export default SupportPage;