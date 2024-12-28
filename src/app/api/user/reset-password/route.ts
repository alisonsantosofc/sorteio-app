import prisma from '@/prisma/client';
import { NextResponse } from 'next/server';
import dayjs from 'dayjs';
import { hash } from 'bcryptjs';

// ROUTE 1
export async function POST(req: Request) {
	try {
		const { code, password } = await req.json();

		const userCode = await prisma.verification_codes.findFirst({
			where: {
				code: String(code).toUpperCase(),
			}
		});

		if (!userCode) {
			return new NextResponse(
				JSON.stringify({ 
					code: '1.3.1', 
					message: 'Code does not exists.',
				}),
				{ status: 400 }
			);
		}

		const codeExpired = dayjs(userCode.expiresAt).isBefore(dayjs());

		if (codeExpired) {
			return new NextResponse(
				JSON.stringify({ 
					code: '1.3.2', 
					message: 'Code expired.',
				}),
				{ status: 400 }
			);
		}

		const hashedPassword = await hash(password, 12);

		await prisma.users.update({
			data: {
				password: hashedPassword,
			},
			where: {
				id: userCode.userId,
			},
		});

		return NextResponse.json({});
	} catch (error: any) {
		return new NextResponse(
			JSON.stringify({
				code: '1.3.3',
				message: error.message,
			}),
			{ status: 500 }
		);
	}
}