import React from "react";
import { useRouter } from "next/router";
import { ISaveGame } from "@/data/modelTypes";
// for redux
import { useAppDispatch } from "@/reduxToolkit/indexStore/indexStore";
import { setSelectedGameAction } from "@/reduxToolkit/tiktak/tiktakAction";

interface PropsType {
	eachGame: ISaveGame;
	index: number;
}

const TableBody: React.FC<PropsType> = ({ eachGame, index }) => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { player1, player2, _id, draw, gameHistory } = eachGame;
	const goToGamePageHandler = (game: ISaveGame) => {
		dispatch(setSelectedGameAction(game));
		router.push("/game/" + game._id);
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
						onClick={() => goToGamePageHandler(eachGame)}
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
