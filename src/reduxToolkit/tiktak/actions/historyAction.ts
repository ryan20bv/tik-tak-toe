import { ISaveGame } from "@/data/modelTypes";
import { updateSaveGameAction } from "./tiktakAction";
import { setSelectedGameRed } from "../slices/tiktakSlice";

// ! included
export const resetBoardHistoryInDatabaseAction =
	(updatedGame: ISaveGame, nextSession: string) =>
	async (dispatch: any, getState: any) => {
		// console.log(updatedGame);
		// const { token } = getState().tikTakToeReducer;
		try {
			const bodyData = {
				updatedGame,
			};
			const url =
				process.env.NEXT_PUBLIC_BACK_END_URL +
				"/api/tiktaktoe/history/reset/" +
				updatedGame._id;
			const options = {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + nextSession,
				},
				body: JSON.stringify(bodyData),
			};

			const response = await fetch(url, options);

			const data = await response.json();
			// console.log(data);
			const { message, latestUpdateGame } = data;

			if (message === "reset history") {
				await dispatch(updateSaveGameAction(latestUpdateGame));
				dispatch(setSelectedGameRed({ selectedGame: latestUpdateGame }));
			}
			return { message };
		} catch (err) {
			console.log("resetBoardHistoryInDatabaseAction", err);
		}
	};
