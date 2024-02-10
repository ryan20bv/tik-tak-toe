import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

interface PropsType {
	children: React.ReactNode;
}

const InputModal: React.FC<PropsType> = ({ children }) => {
	const [inputPortal, setInputPortal] = useState<any>();
	useEffect(() => {
		setInputPortal(document?.getElementById("overlays"));
	}, []);
	return (
		<>
			{inputPortal &&
				ReactDOM.createPortal(
					<main className='absolute top-0   w-full h-full flex justify-center items-center'>
						<section className='absolute top-0 z-5 w-full h-full  bg-gray-300 bg-opacity-40 flex items-center justify-center'></section>
						<section className='z-10 bg-white bg-opacity-80 rounded-2xl'>
							{children}
						</section>
					</main>,
					inputPortal
				)}
		</>
	);
};

export default InputModal;
