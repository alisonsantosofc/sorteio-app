'use client';

import { useLang } from '@/src/hooks/useLang';
import { LogIn, LogOut, UserRoundPlus } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { Button } from '../../ui/button';

import i18n from './i18n.json';

const Login = () => {
	const session = useSession();
	const route = useRouter();
	const { lang } = useLang();

	return (
		<Button
			variant="default"
			className="flex gap-2"
			onClick={() => {
				if (!session.data) {
					signIn('credentials');
				}
				if (session.data) {
					route.push('/dashboard');
				}
			}}
		>
			<span>{i18n[lang].content.buttons.login}</span>
			<LogIn className="w-5 h-5" />
		</Button>
	);
};

const Register = () => {
	const session = useSession();
	const route = useRouter();
	const { lang } = useLang();

	return (
		<Button
			variant="default"
			className="flex gap-2"
			onClick={() => {
				if (!session.data?.user) {
					route.push('/register');
				}
				if (session.data?.user) {
					route.push('/dashboard');
				}
			}}
		>
			<span>{i18n[lang].content.buttons.register}</span>
			<UserRoundPlus className="w-5 h-5" />
		</Button>
	);
};

const Logout = () => {
	const { lang } = useLang();
	return (
		<div 
			className="flex p-3 w-full justify-start cursor-pointer rounded-lg transition hover:bg-foreground/[0.04] hover:text-letter text-label text-sm"
			onClick={() => {
				signOut({
					callbackUrl: '/'
				});
			}}
		>
			<LogOut className="h-5 w-5 mr-3 text-letter" />
			{i18n[lang].content.buttons.logout}
		</div>
	);
};

const Profile = () => {
	return <Link href="/profile">Profile</Link>;
};

export const AuthButton = {
	Register: Register,
	Login: Login,
	Logout: Logout,
	Profile: Profile,
};