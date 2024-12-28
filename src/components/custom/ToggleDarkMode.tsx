import { Switch } from '@/src/components/ui/switch';
import { useDarkMode } from '@/src/hooks/useDarkMode';
import { MoonStar, SunMedium } from 'lucide-react';

export function ToggleDarkMode() {
	const { handleChangeDarkMode, darkMode } = useDarkMode();

	return (
		<div className="flex justify-between items-center">
			<Switch 
				onClick={() => handleChangeDarkMode()}
				checked={darkMode ? darkMode : false}
			/>
			<div className="flex items-center flex-1 text-label">
				{darkMode 
					? <MoonStar className="h-5 w-5 ml-2 text-letter" />
					: <SunMedium className="h-5 w-5 ml-2 text-letter" />
				}
			</div>
		</div>
		
	);
}