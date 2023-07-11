import { ISaveGame } from "./modelTypes";

const dummyData: ISaveGame[] = [
	{
		id: "g1",
		player1: {
			name: "Ray",
			win: 1,
		},
		player2: {
			name: "Jake",
			win: 2,
		},
		draw: 2,
	},
	{
		id: "g2",
		player1: {
			name: "Amon",
			win: 3,
		},
		player2: {
			name: "Jake",
			win: 2,
		},
		draw: 0,
	},
	{
		id: "g3",
		player1: {
			name: "Lucky",
			win: 2,
		},
		player2: {
			name: "Miya",
			win: 1,
		},
		draw: 1,
	},
	{
		id: "g4",
		player1: {
			name: "Lucky",
			win: 2,
		},
		player2: {
			name: "Miya",
			win: 1,
		},
		draw: 1,
	},
];

export const getAllSavedGames = () => {
	return dummyData;
};
