'use client';

import * as z from 'zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

import { 
	Form, 
	FormControl, 
	FormField, 
	FormItem 
} from '@/src/components/ui/form';
import { Input } from '@/src/components/ui/input';
import { Button } from '@/src/components/ui/button';
import { Label } from '@/src/components/ui/label';
import { FormFieldError } from '@/src/components/custom/FormFieldError';
import { LandingNavbar } from '@/src/features/landing/LandingNavbar';
import { useLang } from '@/src/hooks/useLang';

import i18n from './i18n.json';

const Page = () => {
	const router = useRouter();
	const session = useSession();
	const { lang } = useLang();

	if (session.data) {
		router.push('/dashboard');
	}

	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const formSchema = z.object({
		email: z.string().email({
			message: i18n[lang].messages.invalidEmail,
		}),
		password: z.string().min(8, {
			message: i18n[lang].messages.invalidPassword,
		}),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		}
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setIsLoading(true);
			signIn('credentials', {
				email: values.email.toLowerCase(),
				password: values.password,
				callbackUrl: '/dashboard'
			});

			form.reset();
		} catch (error: any) {
			setIsLoading(false);
			console.log(error);
		} finally {
			router.refresh();
		}
	};

	return (
		<section className="h-full flex justify-center items-start pt-20 sm:items-center">
			<LandingNavbar />
			<div className="w-full sm:w-96 p-4 lg:p-8">
				<header className="mb-8">
					<h2 className="text-2xl sm:text-3xl font-bold">
						{i18n[lang].content.title}
					</h2>
					<p className="flex items-center gap-1">
						<span>{i18n[lang].content.or}</span>
						<Button 
							className="p-0 m-0 h-fit font-normal"
							variant="underlink"
						>
							<Link href="/register">
								{i18n[lang].content.createAccount}
							</Link>
						</Button>
					</p>
				</header>

				<Form {...form}>
					<form 
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col gap-4 pb-8"
					>
						<FormField
							name="email"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<Label className="text-label">email</Label>
									<FormControl className="m-0 p-0">
										<Input
											className={`px-4 outline-none focus-visible:ring-0 focus-visible:ring-transparent lowercase ${
												form.formState.errors.email ? 'border-red-500' : ''
											}`}
											disabled={isLoading}
											placeholder="example@email.com"
											{...field}
										/>
									</FormControl>
									<FormFieldError error={form.formState.errors.email} />
								</FormItem>
							)}
						/>
						<FormField
							name="password"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<Label className="text-label">{i18n[lang].content.password}</Label>
									<FormControl className="m-0 p-0">
										<div className="relative">
											<Input
												className={`px-4 pr-10 outline-none focus-visible:ring-0 focus-visible:ring-transparent ${
													form.formState.errors.password ? 'border-red-500' : ''
												}`}
												disabled={isLoading}
												type={showPassword ? 'text' : 'password'}
												{...field}
											/>
											<div
												className="absolute top-0 right-0 mt-2 mr-3 cursor-pointer text-label"
												onClick={() => setShowPassword(!showPassword)}
											>
												{showPassword ? <Eye className="w-6 h-6" /> : <EyeOff className="w-6 h-6" />}
											</div>
										</div>
									</FormControl>
									<FormFieldError error={form.formState.errors.password} />
									
									<Button 
										className="p-0 m-0 font-normal w-fit h-fit"
										variant="link"
										type='button'
									>
										<Link className="text-left" href="/forgout-password">
											{i18n[lang].content.recoveryPassword}
										</Link>
									</Button>
								</FormItem>
							)}
						/>

						<Button 
							className="w-full mt-4"
							disabled={isLoading}
						>
							{i18n[lang].content.loginButton}
						</Button>
					</form>
				</Form>
			</div>
		</section>
	);
};

export default Page;