import {
	ISaveGame,
	INewGameUser,
	ISendingData,
	IAccessData,
} from "@/data/modelTypes";
import { unSetSelectedGameAction } from "./tiktakAction";
import {
	updateSendingDataRed,
	getAllSavedGamesRed,
} from "../slices/tiktakSlice";

// for next auth
import { signIn } from "next-auth/react";

export const startNewGameAction =
	(newUser: INewGameUser) => async (dispatch: any, getState: any) => {
		await dispatch(unSetSelectedGameAction());
		await dispatch(
			updateIsSendingDataAction({ status: true, message: "Sending Data..." })
		);
		try {
			const result = await signIn("signup-game", {
				player1_Name: newUser.player1_Name,
				player2_Name: newUser.player2_Name,
				password: newUser.password,
				redirect: false,
			});
			if (!result?.ok) {
				throw new Error("Cannot create new game!");
			}
		} catch (err: any) {
			dispatch(resetIsSendingDataAction());
			return { message: err.message };
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
		try {
			const result = await signIn("access-game", {
				game_id: accessData.game_id,
				password: accessData.password,
				redirect: false,
			});

			if (!result?.ok) {
				throw new Error("Invalid Password!");
			}
			return { message: "authenticated" };
		} catch (err: any) {
			return { message: err.message };
		}
	};
