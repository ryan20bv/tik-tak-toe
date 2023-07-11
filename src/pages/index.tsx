import React from "react";
import Table from "@/components/table/Table";

const HomePage = () => {
	return (
		<section className='w-screen h-screen flex items-center border border-black flex-col pt-20'>
			<div>
				<h1 className='text-7xl '>TIK-TAK-TOE</h1>
			</div>
			<div className='mt-6 mb-4'>
				<button className='bg-green-300 border border-green-300'>
					Start New Game
				</button>
			</div>
			<div>
				<h3>List of previous game</h3>
			</div>
			<Table />
		</section>
	);
};

export default HomePage;
