'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface LangProviderProps {
  children: ReactNode;
}

interface LangContextData {
  lang: 'pt-br' | 'en-us';
  handleChangeLang: (newSelectedLang: 'pt-br' | 'en-us') => void;
}

const LangContext = createContext<LangContextData>(
  {} as LangContextData
);

export function LangProvider({ children }: LangProviderProps) {
	const [lang, setLang] = useState<'pt-br' | 'en-us'>('pt-br');

	useEffect(() => {
		const localLang = localStorage.getItem('lang') as string;

		if (localLang) {
			setLang(localLang === 'en-us' ? 'en-us' : 'pt-br');
		}
	}, []);

	function handleChangeLang(newSelectedLang: 'pt-br' | 'en-us') {
		// Saving data to local stoge
		localStorage.setItem(
			'lang',
			newSelectedLang
		);

		setLang(newSelectedLang);
	}

	return (
		<LangContext.Provider value={{ lang, handleChangeLang }}>
			{children}
		</LangContext.Provider>
	);
}

export function useLang() {
	const context = useContext(LangContext);

	return context;
}
