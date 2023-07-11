import React from "react";
import { ISaveGame } from "@/data/modelTypes";

interface PropsType {
	eachGame: ISaveGame;
	index: number;
}

const TableBody: React.FC<PropsType> = ({ eachGame, index }) => {
	const { player1, player2, id, draw } = eachGame;
	return (
		<tbody>
			<tr>
				<td rowSpan={2}>{index + 1}</td>
				<td>{player1.name}</td>
				<td>{player1.win}</td>
				<td>{player2.win}</td>
				<td rowSpan={2}>{draw}</td>
				<td rowSpan={2}>
					<button className='bg-blue-400 border border-blue-400 '>continue</button>
				</td>
			</tr>
			<tr>
				<td>{player2.name}</td>
				<td>{player2.win}</td>
				<td>{player1.win}</td>
			</tr>
		</tbody>
	);
};

export default TableBody;
