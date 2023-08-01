const useSanitizeHook = () => {
	const handlerInputNameSanitizer = (value: string): string => {
		const regex = /[^a-zA-Z0-9]/g;

		const validatedValue = value.trim().replace(regex, "");
		// capitalize the first letter
		let capitalizeFirstLetterValue =
			validatedValue.charAt(0).toUpperCase() + validatedValue.slice(1);
		return capitalizeFirstLetterValue.substring(0, 8);
	};
	const handlerInputPasswordSanitizer = (value: string): string => {
		const regex = /[^a-zA-Z0-9]/g;

		const validatedValue = value.trim().replace(regex, "");
		return validatedValue;
	};
	return { handlerInputNameSanitizer, handlerInputPasswordSanitizer };
};

export default useSanitizeHook;
