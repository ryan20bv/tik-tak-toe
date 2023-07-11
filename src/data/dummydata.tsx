import { ISaveGame, IGameTileData } from "./modelTypes";

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

export const gameData: IGameTileData[] = [
	{
		id: "1",
		filled: true,
		item: "X",
	},
	{
		id: "2",
		filled: true,
		item: "O",
	},
	{
		id: "3",
		filled: false,
		item: "",
	},
	{
		id: "4",
		filled: false,
		item: "",
	},
	{
		id: "5",
		filled: false,
		item: "",
	},
	{
		id: "6",
		filled: false,
		item: "",
	},
	{
		id: "7",
		filled: false,
		item: "",
	},
	{
		id: "8",
		filled: false,
		item: "",
	},
	{
		id: "9",
		filled: false,
		item: "",
	},
];

export const startGameData: IGameTileData[] = [
	{
		id: "1",
		filled: true,
		item: "TIK",
	},
	{
		id: "2",
		filled: false,
		item: "",
	},
	{
		id: "3",
		filled: false,
		item: "",
	},
	{
		id: "4",
		filled: false,
		item: "",
	},
	{
		id: "5",
		filled: true,
		item: "TAK",
	},
	{
		id: "6",
		filled: false,
		item: "",
	},
	{
		id: "7",
		filled: false,
		item: "",
	},
	{
		id: "8",
		filled: false,
		item: "",
	},
	{
		id: "9",
		filled: true,
		item: "TOE",
	},
];

export const getAllSavedGames = () => {
	return dummyData;
};

export const getSavedGamesById = (id: string) => {
	const filteredGame = dummyData.find((indivGame: ISaveGame) => {
		return indivGame.id === id;
	});
	return filteredGame;
};

export const getGameData = () => {
	return gameData;
};

export const getStartGameData = () => {
	return startGameData;
};
