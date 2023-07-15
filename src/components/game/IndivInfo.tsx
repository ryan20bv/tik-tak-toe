import React from "react";
import { IPlayer } from "@/data/modelTypes";
interface PropsType {
	playerInfo: IPlayer;
	infoTitle: string;
}

const IndivInfo: React.FC<PropsType> = ({ playerInfo }) => {
	return (
		<div className='flex flex-col sm:items-center '>
			<div className='flex items-center justify-center'>
				<p className='mr-6'>infoTitle</p>
				<span>{`" X "`}</span>
			</div>

			<div className='flex items-end justify-between sm:flex-col'>
				<h3 className='text-2xl'> {playerInfo.name}</h3>
				<div className='flex items-end'>
					<p>Win:</p>
					<p className='px-2 text-2xl'>{playerInfo.win}</p>
				</div>
			</div>
		</div>
	);
};

export default IndivInfo;
