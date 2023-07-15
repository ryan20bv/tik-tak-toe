import React from "react";
import Table from "../table/Table";
import { ISaveGame } from "@/data/modelTypes";
import { useRouter } from "next/router";

interface PropsType {
	savedGames: ISaveGame[];
}

const Home: React.FC<PropsType> = ({ savedGames }) => {
	const router = useRouter();
	const stateNewGameHandler = () => {
		router.push("/game");
	};
	return (
		<section className='flex items-center flex-col  '>
			<div className=' mb-4'>
				<button
					className='bg-green-300 border border-green-300'
					onClick={stateNewGameHandler}
				>
					Start New Game
				</button>
			</div>

			{!savedGames ||
				(savedGames.length === 0 && (
					<div className='w-[300px] text-center mt-20 text-2xl'>No saved Games</div>
				))}
			{savedGames && savedGames.length > 0 && <Table savedGames={savedGames} />}
		</section>
	);
};

export default Home;
