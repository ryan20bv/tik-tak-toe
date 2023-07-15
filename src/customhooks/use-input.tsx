const useSanitizeHook = () => {
	const handlerInputPassword = (value: string): string => {
		const regex = /[^a-zA-Z0-9]/g;

		const validatedValue = value.trim().replace(regex, "");

		return validatedValue.substring(0, 8);
	};
	return { handlerInputPassword };
};

export default useSanitizeHook;
