import React, { useState } from "react";
import { useRouter } from "next/router";
import { IAccessData, ISaveGame } from "@/data/modelTypes";
import PasswordInput from "../home/PasswordInput";
import {
	TrashIcon,
	EllipsisHorizontalCircleIcon,
	ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
// for redux
import { useAppDispatch } from "@/reduxToolkit/indexStore/indexStore";
import { setSelectedGameAction } from "@/reduxToolkit/tiktak/actions/tiktakAction";
import { accessGameAction } from "@/reduxToolkit/tiktak/actions/newGameAction";

interface PropsType {
	eachGame: ISaveGame;
	index: number;
	actionGameHandler: (id: string) => void;
	actionGameId: string;
	showInput: boolean;
	showInputHandler: () => void;
	closeInputHandler: () => void;
}

const TableBody: React.FC<PropsType> = ({
	eachGame,
	index,
	actionGameHandler,
	actionGameId,
	showInput,
	showInputHandler,
	closeInputHandler,
}) => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");
	// const [showMoreAction, setShowMoreAction] = useState<boolean>(false);
	// const [showInput, setShowInput] = useState<boolean>(false);
	const { player1, player2, _id, draw } = eachGame;
	const goToGamePageHandler = async (
		game: ISaveGame,
		enteredPassword: string
	) => {
		dispatch(setSelectedGameAction(game));
		let accessData: IAccessData = {
			game_id: game._id,
			password: enteredPassword,
		};
		const result = await dispatch(accessGameAction(accessData));

		if (result && result?.message === "authenticated") {
			router.push(`/game/${player1.name}vs${player2.name}`);
		} else if (result && result?.message === "Invalid Password!") {
			updatePasswordErrorMessage(result?.message);
		}
	};
	// create a new function that will show the password input form
	// let isShowPasswordInputOpen = accessGameId === eachGame._id ? true : false;
	let isWithTheSameId = actionGameId === eachGame._id ? true : false;
	let isOpenInputWithSameId = actionGameId === eachGame._id ? showInput : false;

	const addedClass = index % 2 === 0 ? "bg-blue-100" : "bg-white";
	const updatePasswordErrorMessage = (message: string) => {
		setPasswordErrorMessage(message);
	};
	const openInputHandler = () => {
		showInputHandler();
	};

	const onCloseInputHandler = () => {
		closeInputHandler();
		actionGameHandler("");
	};

	const moreActionHandler = (id: string) => {
		closeInputHandler();
		actionGameHandler(id);
	};
	return (
		<>
			{!isOpenInputWithSameId && (
				<>
					<tr>
						<td rowSpan={2}>{index + 1}</td>
						<td>{player1.name}</td>
						<td>{player1.win}</td>
						<td>{player2.win}</td>
						<td rowSpan={2}>{draw}</td>
						<td rowSpan={2}>
							{!isWithTheSameId && (
								<button onClick={() => moreActionHandler(eachGame._id)}>
									<EllipsisHorizontalCircleIcon className='text-green-500 h-8 ' />
								</button>
							)}
							{isWithTheSameId && (
								<div className='flex'>
									{/* <div onClick={() => accessGameHandler(eachGame._id)}> */}
									<div onClick={openInputHandler}>
										<ArrowRightOnRectangleIcon className='text-blue-500 h-8 ' />
									</div>
									<div
									// className='bg-blue-400 border border-blue-400 '
									// onClick={() => goToGamePageHandler(eachGame)}
									>
										<TrashIcon className='text-red-500 h-8 ' />
									</div>
								</div>
							)}
						</td>
					</tr>
					<tr>
						<td>{player2.name}</td>
						<td>{player2.win}</td>
						<td>{player1.win}</td>
					</tr>
				</>
			)}
			{isOpenInputWithSameId && (
				<PasswordInput
					eachGame={eachGame}
					onCloseInput={onCloseInputHandler}
					goToGamePageHandler={goToGamePageHandler}
					passwordErrorMessage={passwordErrorMessage}
					updatePasswordErrorMessage={updatePasswordErrorMessage}
				/>
			)}
		</>
	);
};

export default TableBody;
