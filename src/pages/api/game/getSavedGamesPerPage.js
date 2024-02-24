import axios from 'axios'

const handler = async (req, res) => {
	if (req.method !== 'POST') {
		console.log('Need POST request')
		return
	}

	const {page} = req.body
	console.log('req per Page: ', page)
	try {
		// get all games
		const response = await axios.post(
			process.env.NEXT_PUBLIC_BACK_END_URL + '/api/tiktaktoe/game/pagination',
			{page}
		)

		console.log('### response, ', response)
		if (response.status !== 200) {
			return
		}
		const {totalSavedGames, savedGames} = response.data
		res.status(response.status).json({totalSavedGames, savedGames})
	} catch (err) {
		console.log(err)
	}
}
export default handler
