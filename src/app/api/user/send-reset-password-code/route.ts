import prisma from '@/prisma/client';
import { NextResponse } from 'next/server';
import dayjs from 'dayjs';

import { Resend } from 'resend';

import { generateCode } from '@/src/utils/data';
import { resetPasswordCodeEmailTemplateString } from '../../(emails)/ResetPasswordCodeEmailTemplate';

// Função para enviar o e-mail
async function sendEmail(userEmail: string, userName: string, code: string) {
	const resend = new Resend(process.env.RESEND_API_KEY);

	const emailContent = resetPasswordCodeEmailTemplateString({ code, userName });

	resend.emails.send({
		from: 'englishfree@resend.dev',
		to: userEmail,
		subject: 'Resetar senha',
		html: emailContent,
	});
}

// ROUTE 1
export async function POST(req: Request) {
	try {
		const { email } = await req.json();

		const user = await prisma.users.findUnique({
			where: {
				email,
			},
		});

		if (!user) {
			return new NextResponse(
				JSON.stringify({ 
					code: '1.2.1', 
					message: 'User does not exists.' 
				}),
				{ status: 400 }
			);
		}

		const userId = user.id;

		const code = await prisma.verification_codes.findUnique({
			where: {
				userId,
			}
		});

		if (code) {
			const codeExpiresAt = dayjs(code.expiresAt);

			const codeCreatedBefore14Hours = dayjs().isAfter(codeExpiresAt);

			if (!codeCreatedBefore14Hours) {
				return new NextResponse(
					JSON.stringify({ 
						code: '1.2.2', 
						message: 'Users can request codes every 14 hours.' 
					}),
					{ status: 400 }
				);
			}

			await prisma.verification_codes.delete({
				where: {
					id: code.id,
				}
			});
		}

		const generatedCode = generateCode();

		const expiresAt = dayjs().add(14, 'hours').toDate();

		// Send the email with the generated code
		try {
			await sendEmail(email, user.name, generatedCode);
		} catch (error: any) {
			return new NextResponse(
				JSON.stringify({ 
					code: '1.2.3', 
					message: error.message, 
				}),
				{ status: 500 }
			);
		}

		await prisma.verification_codes.create({
			data: {
				code: generatedCode,
				userId: user.id,
				expiresAt,
			},
		});

		return NextResponse.json({
			expiresAt,
		});
	} catch (error: any) {
		return new NextResponse(
			JSON.stringify({
				code: '1.2.4',
				message: error.message,
			}),
			{ status: 500 }
		);
	}
}