import React from "react";

interface PropsType {
	info: string;
	placeholderInfo: string;
	type: string;
	inputRef: React.RefObject<HTMLInputElement>;
	inputHandler: (e: React.FormEvent<HTMLInputElement>) => void;
	hasError: boolean;
	errorMessage: string;
}

const InputUI: React.FC<PropsType> = ({
	type,
	info,
	placeholderInfo,
	inputRef,
	inputHandler,
	hasError,
	errorMessage,
}) => {
	return (
		<div className='divide-y divide-gray-200'>
			<div className=' text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7'>
				<div className='relative mb-6'>
					<input
						type={type}
						name={info}
						id={info}
						autoComplete='off'
						ref={inputRef}
						className='peer placeholder-transparent h-10 w-full border-b-2 border-black text-gray-900 focus:outline-none focus:borer-rose-600 px-4 bg-transparent focus:border-[#AF7EEB]'
						placeholder={placeholderInfo}
						onInput={inputHandler}
					/>

					<label
						htmlFor={info}
						className='absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'
					>
						{placeholderInfo}
					</label>
					{hasError && <p className='text-red-500 text-xs '>{errorMessage}</p>}
				</div>
			</div>
		</div>
	);
};

export default InputUI;
