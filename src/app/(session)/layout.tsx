import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import MainModal from '@/src/components/custom/MainModal';

import { authOptions } from '@/src/lib/auth';

const SessionLayout = async ({
	children,
}: {
  children: React.ReactNode;
}) => {
	const session = await getServerSession(authOptions);

	if (session) {
		redirect('/dashboard');
	}

	return (
		<div className="h-[100vh] relative">
			<main className="w-full h-full">
				{children}
			</main>
			<MainModal />
		</div>
	);
};

export default SessionLayout;
