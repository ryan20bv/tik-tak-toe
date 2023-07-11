import React from "react";

const Table = () => {
	return (
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
			<tbody>
				<tr>
					<td rowSpan={2}>1</td>
					<td>ray</td>
					<td>2</td>
					<td>1</td>
					<td>0</td>
					<td rowSpan={2}>
						<button className='bg-blue-400 border border-blue-400 '>continue</button>
					</td>
				</tr>
				<tr>
					<td>jake</td>
					<td>2</td>
					<td>1</td>
					<td>0</td>
				</tr>
			</tbody>
		</table>
	);
};

export default Table;
