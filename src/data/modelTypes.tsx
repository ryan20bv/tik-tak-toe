export interface ISaveGame {
	id: string;
	player1: IPlayer;
	player2: IPlayer;
	draw: number;
	gameHistory: IGameTileData[][];
	playerTurn: string;
}

export interface IPlayer {
	name: string;
	win: number;
}
export interface IGameTileData {
	id: string;
	filled: boolean;
	item: string;
}
