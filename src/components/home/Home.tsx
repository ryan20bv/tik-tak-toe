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
		<section className='flex items-center border  flex-col  overflow-hidden'>
			<div className=' mb-4'>
				<button
					className='bg-green-300 border border-green-300'
					onClick={stateNewGameHandler}
				>
					Start New Game
				</button>
			</div>
			<Table savedGames={savedGames} />
		</section>
	);
};

export default Home;
