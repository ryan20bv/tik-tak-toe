import { ISaveGame, IGameTileData } from "./modelTypes";

export const updatedGameData: IGameTileData[][] = [
	[
		{
			tile_id: "1-1",
			filled: true,
			item: "X",
		},
		{
			tile_id: "1-2",
			filled: true,
			item: "O",
		},
		{
			tile_id: "1-3",
			filled: false,
			item: "",
		},
	],
	[
		{
			tile_id: "2-1",
			filled: false,
			item: "",
		},
		{
			tile_id: "2-2",
			filled: false,
			item: "",
		},
		{
			tile_id: "2-3",
			filled: false,
			item: "",
		},
	],
	[
		{
			tile_id: "3-1",
			filled: false,
			item: "",
		},
		{
			tile_id: "3-2",
			filled: false,
			item: "",
		},
		{
			tile_id: "3-3",
			filled: false,
			item: "",
		},
	],
];

export const gameData: IGameTileData[] = [
	{
		tile_id: "1",
		filled: true,
		item: "X",
	},
	{
		tile_id: "2",
		filled: true,
		item: "O",
	},
	{
		tile_id: "3",
		filled: false,
		item: "",
	},
	{
		tile_id: "4",
		filled: false,
		item: "",
	},
	{
		tile_id: "5",
		filled: false,
		item: "",
	},
	{
		tile_id: "6",
		filled: false,
		item: "",
	},
	{
		tile_id: "7",
		filled: false,
		item: "",
	},
	{
		tile_id: "8",
		filled: false,
		item: "",
	},
	{
		tile_id: "9",
		filled: false,
		item: "",
	},
];

export const startGameData: IGameTileData[] = [
	{
		tile_id: "1",
		filled: true,
		item: "TIK",
	},
	{
		tile_id: "2",
		filled: false,
		item: "",
	},
	{
		tile_id: "3",
		filled: false,
		item: "",
	},
	{
		tile_id: "4",
		filled: false,
		item: "",
	},
	{
		tile_id: "5",
		filled: true,
		item: "TAK",
	},
	{
		tile_id: "6",
		filled: false,
		item: "",
	},
	{
		tile_id: "7",
		filled: false,
		item: "",
	},
	{
		tile_id: "8",
		filled: false,
		item: "",
	},
	{
		tile_id: "9",
		filled: true,
		item: "TOE",
	},
];

export const getAllSavedGames = () => {
	return dummyData;
};

export const getSavedGamesById = (id: string) => {
	const filteredGame = dummyData.find((indivGame: ISaveGame) => {
		return indivGame._id === id;
	});
	return filteredGame;
};

export const getGameData = () => {
	return gameData;
};

export const getStartGameData = () => {
	return startGameData;
};

export const getUpdatedGameData = () => {
	return updatedGameData;
};
