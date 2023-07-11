import React from "react";

const GameBoard = () => {
	return (
		<main className='border-2 border-black max-w-max bg-white'>
			<section className='flex w-[12rem] flex-wrap'>
				<div className='w-[4rem] h-[4rem] flex items-center justify-center border-r-2 border-b-2 border-black'>
					X
				</div>
				<div className='w-[4rem] h-[4rem] flex items-center justify-center'>X</div>
				<div className='w-[4rem] h-[4rem] flex items-center justify-center border-l-2 border-b-2 border-black'>
					X
				</div>

				<div className='w-[4rem] h-[4rem] flex items-center justify-center'>X</div>
				<div className='w-[4rem] h-[4rem] flex items-center justify-center border-2 border-black'>
					X
				</div>
				<div className='w-[4rem] h-[4rem] flex items-center justify-center'>X</div>

				<div className='w-[4rem] h-[4rem] flex items-center justify-center border-r-2 border-t-2 border-black'>
					X
				</div>
				<div className='w-[4rem] h-[4rem] flex items-center justify-center'>X</div>
				<div className='w-[4rem] h-[4rem] flex items-center justify-center border-l-2 border-t-2 border-black'>
					X
				</div>
			</section>
		</main>
	);
};

export default GameBoard;
