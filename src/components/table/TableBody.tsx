import React, { useState } from "react";
import { useRouter } from "next/router";
import { ISaveGame } from "@/data/modelTypes";
import PasswordInput from "../home/PasswordInput";
// for redux
import { useAppDispatch } from "@/reduxToolkit/indexStore/indexStore";
import { setSelectedGameAction } from "@/reduxToolkit/tiktak/actions/tiktakAction";

interface PropsType {
	eachGame: ISaveGame;
	index: number;
	accessGameHandler: (id: string) => void;
	accessGameId: string;
}

const TableBody: React.FC<PropsType> = ({
	eachGame,
	index,
	accessGameHandler,
	accessGameId,
}) => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { player1, player2, _id, draw } = eachGame;
	const goToGamePageHandler = (game: ISaveGame) => {
		dispatch(setSelectedGameAction(game));
		router.push(`/game/${player1.name}vs${player2.name}`);
	};
	// create a new function that will show the password input form
	let isShowPasswordInputOpen = accessGameId === eachGame._id ? true : false;

	const addedClass = index % 2 === 0 ? "bg-blue-100" : "bg-white";
	return (
		<>
			{!isShowPasswordInputOpen && (
				<>
					<tr>
						<td rowSpan={2}>{index + 1}</td>
						<td>{player1.name}</td>
						<td>{player1.win}</td>
						<td>{player2.win}</td>
						<td rowSpan={2}>{draw}</td>
						<td rowSpan={2}>
							<button
								className='bg-blue-400 border border-blue-400 '
								// onClick={() => goToGamePageHandler(eachGame)}
								onClick={() => accessGameHandler(eachGame._id)}
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
				</>
			)}
			{isShowPasswordInputOpen && (
				<PasswordInput accessGameHandler={accessGameHandler} />
			)}
		</>
	);
};

export default TableBody;
