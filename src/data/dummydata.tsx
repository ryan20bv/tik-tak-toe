import { IGameTileData } from "./modelTypes";

// ! included
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

// ! included
export const getStartGameData = () => {
	return startGameData;
};
