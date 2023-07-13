export interface ISaveGame {
	_id: string;
	player1: IPlayer;
	player2: IPlayer;
	draw: number;
	gameHistory: {
		gameHistory: IGameTileData[][];
		game_id: string;
		_id: string;
	};

	playerTurn: string;
	password: string;
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
