import React from "react";
import Image from "next/image";
const LoadingSpinner = () => {
	return (
		<Image
			src='/static/Loading_icon.gif'
			alt='loading...'
			width={100}
			height={100}
			className='w-20 ml-4 '
		/>
	);
};

export default LoadingSpinner;
