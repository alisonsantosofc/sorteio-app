import { cn } from '@/src/lib/utils';
import { LucideIcon } from 'lucide-react';

interface HeadingProps {
  title: string;
  description: string;
  icon: LucideIcon;
  bgColor?: string;
}

export function Heading({ 
	title, 
	description, 
	icon: Icon,
	bgColor 
}: HeadingProps) {
	return (
		<header className="h-32 px-4 sm:px-8 lg:px-8 flex items-center gap-x-4">
			<div className={cn('p-4 rounded-3xl', bgColor)}>
				<Icon className={cn('w-12 h-12 sm:w-16 sm:h-16 text-xl text-white')} />
			</div>
			<div>
				<h2 className="text-lg sm:text-3xl font-bold">
					{title}
				</h2>
				<p className="text-sm text-muted-foreground">
					{description}
				</p>
			</div>
		</header>
	);
}