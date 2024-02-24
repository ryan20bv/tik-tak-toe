import axios from 'axios'

// ?included
const handler = async (req, res) => {
	if (req.method === 'POST') {
		console.log('POST request')
		return
	}
	try {
		// get all games
		const response = await axios.get(
			process.env.NEXT_PUBLIC_BACK_END_URL + '/api/tiktaktoe/game/allGames'
		)
		if (response.status !== 200) {
			return
		}

		const {totalSavedGames, allSavedGames} = response.data
		res.status(response.status).json({totalSavedGames, allSavedGames})
	} catch (err) {
		console.log(err)
	}
}
export default handler
