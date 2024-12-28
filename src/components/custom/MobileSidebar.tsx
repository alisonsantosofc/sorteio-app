'use client';

import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';

import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/src/components/ui/sheet';
import { Sidebar } from '@/src/components/custom/Sidebar';

export function MobileSidebar() {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);
  
	if (!isMounted) {
		return null;
	}

	return (
		<Sheet>
			<SheetTrigger>
				<div className="md:hidden h-10 w-10 rounded-md flex items-center justify-center hover:border">
					<Menu />
				</div>
			</SheetTrigger>
      
			<SheetContent side="left" className="p-0">
				<Sidebar />
			</SheetContent>
		</Sheet>
	);
}