export function generateCode(): string {
	const generateRandomLetters = (count: number): string => {
		const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		let result = '';

		for (let i = 0; i < count; i++) {
			const index = Math.floor(Math.random() * letters.length);
			result += letters.charAt(index);
		}

		return result;
	};

	const generateRandomNumbers = (count: number): string => {
		let result = '';
		for (let i = 0; i < count; i++) {
			result += Math.floor(Math.random() * 10).toString();
		}

		return result;
	};

	return `${generateRandomLetters(3)}${generateRandomNumbers(3)}`;
}