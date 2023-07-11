import React, { use } from "react";
import { useRouter } from "next/router";
import { ISaveGame } from "@/data/modelTypes";

interface PropsType {
	eachGame: ISaveGame;
	index: number;
}

const TableBody: React.FC<PropsType> = ({ eachGame, index }) => {
	const router = useRouter();
	const { player1, player2, id, draw } = eachGame;
	const goToGamePageHandler = (selectedId: string) => {
		router.push("/game/" + selectedId);
	};
	const addedClass = index % 2 === 0 ? "bg-blue-100" : "bg-white";
	return (
		<tbody className={addedClass}>
			<tr>
				<td rowSpan={2}>{index + 1}</td>
				<td>{player1.name}</td>
				<td>{player1.win}</td>
				<td>{player2.win}</td>
				<td rowSpan={2}>{draw}</td>
				<td rowSpan={2}>
					<button
						className='bg-blue-400 border border-blue-400 '
						onClick={() => goToGamePageHandler(id)}
					>
						continue
					</button>
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
