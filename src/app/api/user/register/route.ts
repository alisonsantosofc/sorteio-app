import prisma from '@/prisma/client';
import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';

// ROUTE 1
export async function POST(req: Request) {
	try {
		const { name, email, password } = await req.json();

		const user = await prisma.users.findUnique({
			where: {
				email,
			},
		});

		if (user) {
			return new NextResponse(
				JSON.stringify({ code: '1.1.1', message: 'User email already exists.' }),
				{ status: 400 }
			);
		}

		const hashedPassword = await hash(password, 12);

		const newUser = await prisma.users.create({
			data: {
				name,
				email: email.toLowerCase(),
				password: hashedPassword,
			},
		});

		return NextResponse.json({
			user: {
				id: newUser.id,
				name: newUser.name,
				email: newUser.email,
				isAdmin: newUser.isAdmin,
				validated: newUser.validated,
			},
		});
	} catch (error: any) {
		return new NextResponse(
			JSON.stringify({
				code: '1.1.2',
				message: error.message,
			}),
			{ status: 500 }
		);
	}
}