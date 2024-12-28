'use client';

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

interface MainModalProviderProps {
  children: ReactNode;
}

interface MainModalContextData {
  mainModal: ReactNode | null;
  setMainModal: Dispatch<SetStateAction<ReactNode | null>>;
}

const MainModalContext = createContext<MainModalContextData>(
  {} as MainModalContextData
);

export function MainModalProvider({ children }: MainModalProviderProps) {
	const [mainModal, setMainModal] = useState<ReactNode | null>(null);

	return (
		<MainModalContext.Provider value={{ mainModal, setMainModal }}>
			{children}
		</MainModalContext.Provider>
	);
}

export function useMainModal() {
	const context = useContext(MainModalContext);

	return context;
}
