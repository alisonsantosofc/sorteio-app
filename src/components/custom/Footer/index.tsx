import { cn } from '@/src/lib/utils';

interface FooterProps {
	className?: string;
}

export function Footer({ className }: FooterProps) {
	return (
		<div className={cn('w-full h-12 p-2 flex justify-center items-center border-t-2 bg-background', className ? className : '')}>
			<p className="text-xs text-center">
        Copyright © {new Date().getFullYear()} English Free / Alison Software Developer. Todos os direitos reservados.
			</p>
		</div>
	);
}
