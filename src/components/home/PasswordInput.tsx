import React from "react";

import { PaperAirplaneIcon, XCircleIcon } from "@heroicons/react/24/solid";

interface PropsType {
	accessGameHandler: (id: string) => void;
}

const PasswordInput: React.FC<PropsType> = ({ accessGameHandler }) => {
	return (
		<tr>
			<td colSpan={6}>
				<div className='flex'>
					<form
						action=''
						className='flex'
					>
						<input
							type='text'
							placeholder='enter password'
							className='px-2 border-2 border-black bg-gray-200'
						/>
						<button>
							<PaperAirplaneIcon className='text-green-500 h-8 mr-4' />
						</button>
					</form>
					<button onClick={() => accessGameHandler("")}>
						<XCircleIcon className='text-red-500 h-8 mr-4' />
					</button>
				</div>
			</td>
		</tr>
	);
};

export default PasswordInput;
