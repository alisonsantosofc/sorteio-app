import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/prisma/client';
import { compare } from 'bcryptjs';

export const authOptions: NextAuthOptions = {
	session: {
		strategy: 'jwt',
	},
	secret: process.env.AUTH_SECRET,
	pages: {
		signIn: '/signin',
	},
	providers: [
		CredentialsProvider({
			name: 'Sign in',
			credentials: {
				email: {
					label: 'email',
					type: 'email',
					placeholder: 'example@email.com',
				},
				password: { label: 'password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials.password) {
					return null;
				}

				const user = await prisma.users.findUnique({
					where: {
						email: credentials.email,
					},
				});

				if (!user || !(await compare(credentials.password, user.password))) {
					return null;
				}

				return {
					id: user.id,
					email: user.email,
					name: user.name,
					isAdmin: user.isAdmin,
					validated: user.validated,
				};
			},
		}),
	],
	callbacks: {
		session: ({ session, token }) => {
			return {
				...session,
				user: {
					...session.user,
					id: token.id,
					isAdmin: token.isAdmin,
					validated: token.validated,
				},
			};
		},
		jwt: ({ token, user }) => {
			if (user) {
				const u = user as unknown as any;
				return {
					...token,
					id: u.id,
					isAdmin: u.isAdmin,
					validated: u.validated,
				};
			}
			return token;
		},
	},
};