'use client';

import * as z from 'zod';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { Eye, EyeOff } from 'lucide-react';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';

import { 
	Form, 
	FormControl, 
	FormField, 
	FormItem 
} from '@/src/components/ui/form';
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from '@/src/components/ui/input-otp';
import { Input } from '@/src/components/ui/input';
import { Button } from '@/src/components/ui/button';
import { Label } from '@/src/components/ui/label';
import { FormFieldError } from '@/src/components/custom/FormFieldError';
import { LandingNavbar } from '@/src/features/landing/LandingNavbar';

import { useLang } from '@/src/hooks/useLang';
import { useSessions } from '@/src/hooks/useSessions';
import { useToast } from '@/src/components/ui/use-toast';

import i18n from './i18n.json';

const Page = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const session = useSession();
	const { lang } = useLang();
	const { toast } = useToast();
	const { 
		resetPassword, 
		resetPasswordReqStatus, 
		resetPasswordReqCode, 
	} = useSessions();

	if (session.data) {
		router.push('/dashboard');
	}

	const [showPassword, setShowPassword] = useState(false);

	const code = searchParams.get('code');

	const formSchema = z.object({
		code: z.string().min(6, {
			message: i18n[lang].messages.invalidCode,
		}),
		password: z.string().min(8, {
			message: i18n[lang].messages.invalidPassword,
		}),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			code: code || '',
			password: '',
		}
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			resetPassword({
				code: values.code,
				password: values.password,
			});
		} catch (error: any) {
			console.log(error);
		} finally {
			router.refresh();
		}
	};

	// Monitor reset password request
	useEffect(() => {
		if (resetPasswordReqStatus === 'failed') {
			toast({
				description: (i18n as any)[lang].requests[resetPasswordReqCode].message,
				variant: (i18n as any)[lang].requests[resetPasswordReqCode].variant,
			});
		}

		if (resetPasswordReqStatus === 'succeeded') {
			form.reset();

			toast({
				description: i18n[lang].messages.resetPasswordSuccess,
				variant: 'success',
			});

			router.push('/signin');
		}
	}, [resetPasswordReqStatus]);

	return (
		<section className="h-full flex justify-center items-start pt-20 sm:items-center">
			<LandingNavbar />
			<div className="w-full sm:w-[368px] p-4 lg:p-8">
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
							<Link href="/signin">
								{i18n[lang].content.login}
							</Link>
						</Button>
					</p>
				</header>

				<Form {...form}>
					<form 
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col gap-4"
					>
						<FormField
							name="code"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<Label className="text-label">{i18n[lang].content.inputs.code}</Label>
									<FormControl className="m-0 p-0">
										<InputOTP 
											maxLength={6} 
											pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
											disabled={isLoading || resetPasswordReqStatus === 'loading'} 
											{...field}
										>
											<InputOTPGroup>
												<InputOTPSlot index={0} className="uppercase font-bold text-lg" />
												<InputOTPSlot index={1} className="uppercase font-bold text-lg" />
												<InputOTPSlot index={2} className="uppercase font-bold text-lg" />
												<InputOTPSlot index={3} className="uppercase font-bold text-lg" />
												<InputOTPSlot index={4} className="uppercase font-bold text-lg" />
												<InputOTPSlot index={5} className="uppercase font-bold text-lg" />
											</InputOTPGroup>
										</InputOTP>
									</FormControl>

									<FormFieldError error={form.formState.errors.code} />
								</FormItem>
							)}
						/>

						<FormField
							name="password"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<Label className="text-label">{i18n[lang].content.inputs.password}</Label>
									<FormControl className="m-0 p-0">
										<div className="relative">
											<Input
												className={`px-4 pr-10 outline-none focus-visible:ring-0 focus-visible:ring-transparent ${
													form.formState.errors.password ? 'border-red-500' : ''
												}`}
												disabled={isLoading || resetPasswordReqStatus === 'loading'}
												type={showPassword ? 'text' : 'password'}
												{...field}
											/>
											<div
												className="absolute top-0 right-0 mt-2 mr-3 cursor-pointer text-label"
												onClick={() => setShowPassword(!showPassword)}
											>
												{showPassword ? <Eye /> : <EyeOff />}
											</div>
										</div>
									</FormControl>

									<FormFieldError error={form.formState.errors.password} />
								</FormItem>
							)}
						/>

						<Button 
							className="p-0 m-0 font-normal w-fit h-fit"
							variant="link"
							type='button'
						>
							<Link className="text-left" href="/forgout-password">
								{i18n[lang].content.forgoutPassword}
							</Link>
						</Button>

						<Button 
							className="w-full mt-4"
							disabled={isLoading || resetPasswordReqStatus === 'loading'}
						>
							{i18n[lang].content.buttonSave}
						</Button>
					</form>
				</Form>
			</div>
		</section>
	);
};

export default Page;