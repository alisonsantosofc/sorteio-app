import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
	const password = await hash('admin123', 12);
	// create default admin user
	await prisma.users.upsert({
		where: { email: 'admin@admin.com' },
		update: {},
		create: {
			email: 'admin@admin.com',
			name: 'Admin',
			password,
			validated: true,
			isAdmin: true,
		},
	});
}
main()
	.then(() => prisma.$disconnect())
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});