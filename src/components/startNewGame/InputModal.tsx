import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import InfoForm from "./InfoForm";

const InputModal: React.FC = () => {
	const [inputPortal, setInputPortal] = useState<any>();
	useEffect(() => {
		setInputPortal(document?.getElementById("overlays"));
	}, []);
	// const notificationPortal = document.getElementById("notificationPortal");
	return (
		<>
			{inputPortal &&
				ReactDOM.createPortal(
					<main className='absolute top-0   w-full h-full flex justify-center items-center'>
						<section
							className='absolute top-0 z-5 w-full h-full  bg-gray-300 bg-opacity-40 flex items-center justify-center'
							// onClick={onCloseModal}
						></section>
						<section className='z-10 bg-white bg-opacity-800 rounded-2xl'>
							<InfoForm />
						</section>
					</main>,
					inputPortal
				)}
		</>
	);
};

export default InputModal;
