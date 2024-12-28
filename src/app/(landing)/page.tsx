'use client';

import { AuthButton } from '@/src/components/custom/AuthButton';
import { LandingNavbar } from '@/src/features/landing/LandingNavbar';
import { LandingAnimation } from '@/src/components/custom/LandingAnimation';

import { useLang } from '@/src/hooks/useLang';
import { cn } from '@/src/lib/utils';

import i18n from './i18n.json';
import Image from 'next/image';
import { Footer } from '@/src/components/custom/Footer';

const LandingPage = () => {
	const { lang } = useLang();

	return (
		<main className="w-screen xl:w-[1244px] xl:mx-auto xl:p-0 p-4 ">
			<section className="flex flex-col gap-4 pt-20 md:pt-44">
				<div className="flex flex-col items-center justify-between md:flex-row">
					<div>
						<p className="w-full text-2xl md:text-4xl lg:text-5xl md:max-w-3xl font-bold">
							{i18n[lang].content.title}
						</p>
						<p className="w-full mt-2 md:max-w-xl">
							{i18n[lang].content.textHighlight}
						</p>
						<div className="flex gap-4 flex-col sm:flex-row md:flex-row mt-8">
							<AuthButton.Register />
							<AuthButton.Login />
						</div>
					</div>

					<div className="relative w-64 h-64 mb-24 sm:mb-0 sm:w-96 sm:h-96">
						<Image
							fill
							alt="logo"
							src="/images/image-slider.svg"
						/>
					</div>
				</div>
			</section>

			<LandingAnimation />
		</main>
	);
};

export default LandingPage;