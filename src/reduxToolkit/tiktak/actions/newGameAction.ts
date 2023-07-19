import {
	ISaveGame,
	IGameTileData,
	IHistory,
	INewGameUser,
} from "@/data/modelTypes";
import { setSelectedGameAction, unSetSelectedGameAction } from "./tiktakAction";
import { updateGameMessageRed } from "../slices/tiktakSlice";

export const startNewGameAction =
	(newUser: INewGameUser) => async (dispatch: any, getState: any) => {
		await dispatch(unSetSelectedGameAction());
		await dispatch(
			updateGameMessageRed({
				gameMessage: "",
				isGameMessageOpen: false,
			})
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
			return { message: data.message };
		} catch (err) {
			console.log("startNewGameAction", err);
		}
	};
