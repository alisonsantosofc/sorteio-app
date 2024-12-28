type ParamsObject = { [key: string]: string };

export function replaceStringWithParams(
	inputString: string,
	params: ParamsObject
): string {
	let resultString = inputString;

	Object.keys(params).forEach((paramKey) => {
		const placeholder = `#${paramKey}`;
		const paramValue = params[paramKey];

		resultString = resultString.replace(placeholder, `${paramValue}`);
	});

	return resultString;
}