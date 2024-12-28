'use client';

import axios from 'axios';
import { createContext, ReactNode, useContext, useState } from 'react';

import { TRequestStatus } from '@/src/@types/IRequest';

interface SessionsProviderProps {
  children: ReactNode;
}

interface RegisterUserProps {
	name: string;
	email: string;
	password: string;
}

interface SendResetPasswordProps {
	email: string;
}

interface ResetPasswordProps {
	code: string;
	password: string;
}

interface SessionsContextData {
	registerUser: (data: RegisterUserProps) => Promise<void>;
	registerUserReqStatus: TRequestStatus;
	registerUserReqCode: string;
	sendResetPasswordCode: (data: SendResetPasswordProps) => Promise<void>;
	sendResetPasswordCodeReqStatus: TRequestStatus;
	sendResetPasswordCodeReqCode: string;
	resetPassword: (data: ResetPasswordProps) => Promise<void>;
	resetPasswordReqStatus: TRequestStatus;
	resetPasswordReqCode: string;
}

const SessionsContext = createContext<SessionsContextData>(
  {} as SessionsContextData
);

export function SessionsProvider({ children }: SessionsProviderProps) {
	const [registerUserReqStatus, setRegisterUserReqStatus] = useState<TRequestStatus>('idle');
	const [registerUserReqCode, setRegisterUserReqCode] = useState<string>('');
	const [sendResetPasswordCodeReqStatus, setSendResetPasswordCodeReqStatus] = useState<TRequestStatus>('idle');
	const [sendResetPasswordCodeReqCode, setSendResetPasswordCodeReqCode] = useState<string>('');
	const [resetPasswordReqStatus, setResetPasswordReqStatus] = useState<TRequestStatus>('idle');
	const [resetPasswordReqCode, setResetPasswordReqCode] = useState<string>('');

	async function registerUser({ name, email, password }: RegisterUserProps) {
		try {
			setRegisterUserReqStatus('loading');

			await axios.post('/api/user/register', {
				name,
				email,
				password,
			});
			
			setRegisterUserReqStatus('succeeded');

			setTimeout(() => {
				setRegisterUserReqStatus('idle');
			}, 500);
		} catch (error: any) {
			setRegisterUserReqCode(error.response.data.code);
			setRegisterUserReqStatus('failed');
		}
	};

	async function sendResetPasswordCode({ email }: SendResetPasswordProps) {
		try {
			setSendResetPasswordCodeReqStatus('loading');

			await axios.post('/api/user/send-reset-password-code', {
				email,
			});
			
			setSendResetPasswordCodeReqStatus('succeeded');

			setTimeout(() => {
				setSendResetPasswordCodeReqStatus('idle');
			}, 500);
		} catch (error: any) {
			setSendResetPasswordCodeReqCode(error.response.data.code);
			setSendResetPasswordCodeReqStatus('failed');
		}
	};

	async function resetPassword({ code, password }: ResetPasswordProps) {
		try {
			setResetPasswordReqStatus('loading');
			console.log('Caiu');
			

			await axios.post('/api/user/reset-password', {
				code,
				password,
			});
			
			setResetPasswordReqStatus('succeeded');

			setTimeout(() => {
				setResetPasswordReqStatus('idle');
			}, 500);
		} catch (error: any) {
			setResetPasswordReqCode(error.response.data.code);
			setResetPasswordReqStatus('failed');
		}
	};

	return (
		<SessionsContext.Provider value={{ 
			registerUser, 
			registerUserReqStatus, 
			registerUserReqCode,
			sendResetPasswordCode,
			sendResetPasswordCodeReqStatus,
			sendResetPasswordCodeReqCode,
			resetPassword,
			resetPasswordReqStatus,
			resetPasswordReqCode, 
		}}>
			{children}
		</SessionsContext.Provider>
	);
}

export function useSessions() {
	const context = useContext(SessionsContext);

	return context;
}
