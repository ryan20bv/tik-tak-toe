import React from "react";

import type {
	InferGetStaticPropsType,
	GetStaticProps,
	GetStaticPaths,
} from "next";
import { ISaveGame } from "@/data/modelTypes";

import SpecificGame from "@/components/game/SpecificGame";

const SpecificGamePage = () => {
	return <SpecificGame />;
};

export default SpecificGamePage;
