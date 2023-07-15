import axios from "axios";
const handler = async (req, res) => {
	if (req.method !== "POST") {
		console.log("not post request");
		return;
	}
	const newUser = req.body;

	try {
		const response = await axios.post(
			process.env.NEXT_PUBLIC_BACK_END_URL + "/api/tiktaktoe/game/new",
			newUser
		);
		if (response.status !== 201) {
			return;
		}
		const { newGame, message } = response.data;
		// console.log(data);
		res.status(201).json({ newGame, message });
	} catch (err) {
		console.log(err);
	}
};

export default handler;
