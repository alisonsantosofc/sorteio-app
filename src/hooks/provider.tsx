import { LangProvider } from './useLang';
import { DarkModeProvider } from './useDarkMode';
import { MainModalProvider } from './useMainModal';
import { SessionsProvider } from './useSessions';

export function HooksProviders({ children }: { children: React.ReactNode }) {
	return (
		<>
			<LangProvider>
				<DarkModeProvider>
					<MainModalProvider>
						<SessionsProvider>
							{children}
						</SessionsProvider>
					</MainModalProvider>
				</DarkModeProvider>
			</LangProvider>
		</>
	);
}