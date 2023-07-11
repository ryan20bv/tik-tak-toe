import React from "react";
import GameBoard from "./GameBoard";
import PlayersInfo from "./PlayersInfo";
import { ISaveGame } from "@/data/modelTypes";
import { useRouter } from "next/router";

interface PropsType {
	gameDetail: ISaveGame;
}

const SpecificGame: React.FC<PropsType> = ({ gameDetail }) => {
	const router = useRouter();

	const stopGameHandler = () => {
		router.push("/");
	};
	return (
		<section>
			<PlayersInfo gameDetail={gameDetail} />
			<div className='text-center my-2'> Player 2 turn</div>
			<GameBoard />
			<div className=' my-4 flex justify-center'>
				<button
					className='bg-red-400 '
					onClick={stopGameHandler}
				>
					Stop
				</button>
			</div>
		</section>
	);
};

export default SpecificGame;
