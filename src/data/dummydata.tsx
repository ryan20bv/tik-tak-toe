import { ISaveGame, IGameTileData } from "./modelTypes";

export const dummyData = [
	{
		playerTurn: "1",
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
		gameHistory: [
			[
				{
					id: "1-1",
					filled: true,
					item: "X",
				},
				{
					id: "1-2",
					filled: true,
					item: "O",
				},
				{
					id: "1-3",
					filled: false,
					item: "",
				},
			],
			[
				{
					id: "2-1",
					filled: false,
					item: "",
				},
				{
					id: "2-2",
					filled: false,
					item: "",
				},
				{
					id: "2-3",
					filled: false,
					item: "",
				},
			],
			[
				{
					id: "3-1",
					filled: false,
					item: "",
				},
				{
					id: "3-2",
					filled: false,
					item: "",
				},
				{
					id: "3-3",
					filled: false,
					item: "",
				},
			],
		],
	},
	{
		playerTurn: "2",
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
		gameHistory: [
			[
				{
					id: "1-1",
					filled: true,
					item: "X",
				},
				{
					id: "1-2",
					filled: true,
					item: "O",
				},
				{
					id: "1-3",
					filled: false,
					item: "",
				},
			],
			[
				{
					id: "2-1",
					filled: false,
					item: "",
				},
				{
					id: "2-2",
					filled: false,
					item: "",
				},
				{
					id: "2-3",
					filled: true,
					item: "X",
				},
			],
			[
				{
					id: "3-1",
					filled: false,
					item: "",
				},
				{
					id: "3-2",
					filled: false,
					item: "",
				},
				{
					id: "3-3",
					filled: false,
					item: "",
				},
			],
		],
	},
	{
		playerTurn: "2",
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
		gameHistory: [
			[
				{
					id: "1-1",
					filled: true,
					item: "X",
				},
				{
					id: "1-2",
					filled: true,
					item: "O",
				},
				{
					id: "1-3",
					filled: false,
					item: "",
				},
			],
			[
				{
					id: "2-1",
					filled: false,
					item: "",
				},
				{
					id: "2-2",
					filled: true,
					item: "X",
				},
				{
					id: "2-3",
					filled: false,
					item: "",
				},
			],
			[
				{
					id: "3-1",
					filled: false,
					item: "",
				},
				{
					id: "3-2",
					filled: false,
					item: "",
				},
				{
					id: "3-3",
					filled: false,
					item: "",
				},
			],
		],
	},
	{
		playerTurn: "1",
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
		gameHistory: [
			[
				{
					id: "1-1",
					filled: true,
					item: "X",
				},
				{
					id: "1-2",
					filled: true,
					item: "O",
				},
				{
					id: "1-3",
					filled: false,
					item: "",
				},
			],
			[
				{
					id: "2-1",
					filled: true,
					item: "X",
				},
				{
					id: "2-2",
					filled: false,
					item: "",
				},
				{
					id: "2-3",
					filled: false,
					item: "",
				},
			],
			[
				{
					id: "3-1",
					filled: true,
					item: "O",
				},
				{
					id: "3-2",
					filled: false,
					item: "",
				},
				{
					id: "3-3",
					filled: false,
					item: "",
				},
			],
		],
	},
];
