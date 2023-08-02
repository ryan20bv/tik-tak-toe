import React from "react";
import GameTile from "../game/GameTile";
import UiPortal from "../ui/UiPortal";
import { IGameTileData } from "@/data/modelTypes";
import InfoForm from "./InfoForm";
import {
	useAppSelector,
	RootState,
} from "@/reduxToolkit/indexStore/indexStore";

interface PropsType {
	startGameData: IGameTileData[];
}

const StartNewGame: React.FC<PropsType> = ({ startGameData }) => {
	const { isSendingData } = useAppSelector(
		(state: RootState) => state.tikTakToeReducer
	);

	return (
		<main>
			<section className='border-2 border-black max-w-max mt-20'>
				<div className='flex w-[12rem] flex-wrap'>
					{startGameData.map((tileData: IGameTileData) => (
						<GameTile
							tileData={tileData}
							key={tileData.tile_id}
							updateGameHistory={() => {}}
							gameIsDone={true}
						/>
					))}
				</div>
			</section>
			<UiPortal>
				{!isSendingData.status && <InfoForm />}

				{isSendingData.status && (
					<div className='px-10 py-2'>{isSendingData.message}</div>
				)}
			</UiPortal>
		</main>
	);
};

export default StartNewGame;
