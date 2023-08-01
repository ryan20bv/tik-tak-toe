import React, { useState } from "react";
import { ISaveGame } from "@/data/modelTypes";
import TableBody from "./TableBody";

interface PropsType {
	savedGames: ISaveGame[];
}

const Table: React.FC<PropsType> = ({ savedGames }) => {
	const [actionGameId, setActionGameId] = useState<string>("");
	const [showInput, setShowInput] = useState<boolean>(false);

	const actionGameHandler = (gameId: string) => {
		setActionGameId(gameId);
	};

	const showInputHandler = () => {
		setShowInput(true);
	};
	const closeInputHandler = () => {
		setShowInput(false);
	};

	return (
		<section className=''>
			<h3>List of saved game</h3>

			<div className=' mt-1 h-[400px]  overflow-y-auto border border-black'>
				<table className=''>
					<thead>
						<tr>
							<th rowSpan={2}></th>
							<th rowSpan={2}>Players name:</th>
							<th colSpan={3}>score</th>
							<th rowSpan={2}>action</th>
						</tr>
						<tr>
							<td>W</td>
							<td>L</td>
							<td>D</td>
						</tr>
					</thead>
					<tbody className=''>
						{savedGames.map((eachGame: ISaveGame, index: number) => (
							<TableBody
								key={eachGame._id}
								eachGame={eachGame}
								index={index}
								actionGameHandler={actionGameHandler}
								actionGameId={actionGameId}
								showInput={showInput}
								showInputHandler={showInputHandler}
								closeInputHandler={closeInputHandler}
							/>
						))}
					</tbody>
				</table>
			</div>
		</section>
	);
};

export default Table;
