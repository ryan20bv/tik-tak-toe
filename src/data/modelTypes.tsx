export interface ISaveGame {
	_id: string;
	player1: IPlayer;
	player2: IPlayer;
	draw: number;
	history: IHistory;
	playerTurn: string;
	password: string;
	gameIsDone: boolean;
	gameMessage: string;
}

export interface IHistory {
	gameHistory: IGameTileData[][];
	game_id: string;
	_id: string;
}
export interface IPlayer {
	name: string;
	win: number;
}
export interface IGameTileData {
	tile_id: string;
	filled: boolean;
	item: string;
}

export interface INewGameUser {
	player1_Name: string;
	player2_Name: string;
	password: string;
}
