import { MobileSidebar } from '@/src/components/custom/MobileSidebar';
import { UserMenu } from '@/src/components/custom/UserMenu';

export function Navbar() {
	return (
		<div className="bg-background w-full h-20 flex items-center p-4">
			<MobileSidebar />
			<div className="flex w-full justify-end">
				<UserMenu />
			</div>
		</div>
	);
}