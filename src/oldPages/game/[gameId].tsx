import React from 'react'

import type {
	InferGetStaticPropsType,
	GetStaticProps,
	GetStaticPaths
} from 'next'
import {ISaveGame} from '@/data/modelTypes'

import SpecificGame from '@/oldComponents/game/SpecificGame'

const SpecificGamePage = () => {
	return <SpecificGame />
}

export default SpecificGamePage
