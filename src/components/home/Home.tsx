import React from "react";
import Table from "../table/Table";
import { ISaveGame } from "@/data/modelTypes";

interface PropsType {
	savedGames: ISaveGame[];
}

const Home: React.FC<PropsType> = ({ savedGames }) => {
	return (
		<section className='w-screen h-screen flex items-center border border-black flex-col pt-16 overflow-hidden'>
			<div>
				<h1 className='text-7xl '>TIK-TAK-TOE</h1>
			</div>
			<div className='mt-6 mb-4'>
				<button className='bg-green-300 border border-green-300'>
					Start New Game
				</button>
			</div>
			<Table savedGames={savedGames} />
		</section>
	);
};

export default Home;
