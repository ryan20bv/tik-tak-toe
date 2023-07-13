import React from "react";
import { ISaveGame } from "@/data/modelTypes";
import TableBody from "./TableBody";

interface PropsType {
	savedGames: ISaveGame[];
}

const Table: React.FC<PropsType> = ({ savedGames }) => {
	return (
		<section>
			<h3>List of saved game</h3>
			<div className=' overflow-y-scroll '>
				<div className=' mt-1'>
					<table>
						<thead>
							<tr>
								<th rowSpan={2}></th>
								<th rowSpan={2}>Players name:</th>
								<th colSpan={3}>score</th>
								<th rowSpan={2}>action</th>
							</tr>
							<tr>
								<td>W</td>
								<td>L</td>
								<td>D</td>
							</tr>
						</thead>

						{savedGames.map((eachGame: ISaveGame, index: number) => (
							<TableBody
								key={eachGame._id}
								eachGame={eachGame}
								index={index}
							/>
						))}
					</table>
				</div>
			</div>
		</section>
	);
};

export default Table;
