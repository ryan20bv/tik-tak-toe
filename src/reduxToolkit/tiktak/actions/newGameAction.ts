import {
	ISaveGame,
	INewGameUser,
	ISendingData,
	IAccessData,
} from "@/data/modelTypes";
import { setSelectedGameAction, unSetSelectedGameAction } from "./tiktakAction";
import {
	updateSendingDataRed,
	getAllSavedGamesRed,
} from "../slices/tiktakSlice";

export const startNewGameAction =
	(newUser: INewGameUser) => async (dispatch: any, getState: any) => {
		await dispatch(unSetSelectedGameAction());
		await dispatch(
			updateIsSendingDataAction({ status: true, message: "Sending Data..." })
		);
		try {
			const bodyData = {
				player1_Name: newUser.player1_Name,
				player2_Name: newUser.player2_Name,
				password: newUser.password,
			};
			const url = process.env.NEXT_PUBLIC_FRONT_END_URL + "/api/game/startNewGame";
			const options = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(bodyData),
			};

			const response = await fetch(url, options);
			// console.log(response);
			const data = await response.json();
			// console.log(data);
			const newGame: ISaveGame = {
				...data.newGame,
			};
			await dispatch(setSelectedGameAction(newGame));
			await dispatch(addNewGameToSavedGamesAction(newGame));
			return { message: data.message };
		} catch (err) {
			console.log("startNewGameAction", err);
			dispatch(resetIsSendingDataAction());
		}
	};

export const addNewGameToSavedGamesAction =
	(newGame: ISaveGame) => async (dispatch: any, getState: any) => {
		const { savedGames } = getState().tikTakToeReducer;
		let copyOfSavedGames: ISaveGame[] = [...savedGames];
		copyOfSavedGames.push(newGame);
		dispatch(getAllSavedGamesRed({ savedGames: copyOfSavedGames }));
	};
// update IsSendingData
export const updateIsSendingDataAction =
	(status: ISendingData) => async (dispatch: any, getState: any) => {
		dispatch(updateSendingDataRed({ sendingDataStatus: status }));
	};
// reset the IsSendingData
export const resetIsSendingDataAction =
	() => async (dispatch: any, getState: any) => {
		const sendingDataStatus: ISendingData = {
			status: false,
			message: "",
		};
		dispatch(updateSendingDataRed({ sendingDataStatus: sendingDataStatus }));
	};

export const accessGameAction =
	(accessData: IAccessData) => async (dispatch: any, getState: any) => {
		console.log(accessData);
	};
