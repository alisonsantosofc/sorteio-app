import { Footer } from '@/src/components/custom/Footer';
import { LandingNavbar } from '@/src/features/landing/LandingNavbar';
import { authOptions } from '@/src/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const LandingLayout = async ({
	children,
}: {
  children: React.ReactNode;
}) => {
	const session = await getServerSession(authOptions);

	if (session) {
		redirect('/dashboard');
	}

	return (
		<div className="relative w-full min-h-full bg-background text-letter">
			<LandingNavbar />
			{children}
			<Footer className="absolute left-0 bottom-0 border-none" />
		</div>
	);
};

export default LandingLayout;
