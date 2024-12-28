import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import { Navbar } from '@/src/components/custom/Navbar';
import { Sidebar } from '@/src/components/custom/Sidebar';
import MainModal from '@/src/components/custom/MainModal';

import { authOptions } from '@/src/lib/auth';
import { Footer } from '@/src/components/custom/Footer';

const DashboardLayout = async ({
	children,
}: {
  children: React.ReactNode;
}) => {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect('/');
	}

	return (
		<div className="h-[100vh] relative">
			<div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
				<Sidebar />
			</div>
			<main className="w-full h-full md:pl-72">
				<Navbar />
				{session && children}
				{/* <Footer /> */}
			</main>
			<MainModal />
		</div>
	);
};

export default DashboardLayout;
