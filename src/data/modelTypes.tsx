export interface ISaveGame {
	id: string;
	player1: IPlayer;
	player2: IPlayer;
	draw: number;
}

export interface IPlayer {
	name: string;
	win: number;
}
