import { Separator } from '@/src/components/ui/separator';

import { useLang } from '@/src/hooks/useLang';
import { cn } from '@/src/lib/utils';

interface ToggleDarkModeProps {
  width?: 'small' | 'large';
}

export function ToggleLang({ width = 'small' }: ToggleDarkModeProps) {
	const { lang, handleChangeLang } = useLang();

	return (
		<div className="flex justify-between items-center text-xs gap-2">
			<i 
				onClick={() => handleChangeLang('pt-br')}
				className={cn('py-1 px-2 rounded-sm cursor-pointer', lang === 'pt-br' ? 'bg-black/5 dark:bg-white/5' : '')}
			>
				{'PT-BR'}
			</i>

			<Separator orientation="vertical" />

			<i 
				onClick={() => handleChangeLang('en-us')}
				className={cn('py-1 px-2 rounded-sm cursor-pointer', lang === 'en-us' ? 'bg-black/5 dark:bg-white/5' : '')}
			>
				{'EN-US'}
			</i>
		</div>
	);
}
