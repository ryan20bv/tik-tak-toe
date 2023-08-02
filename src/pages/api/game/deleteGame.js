import axios from "axios";
const handler = async (req, res) => {
	if (req.method !== "DELETE") {
		console.log("not DELETE request");
		return;
	}

	const { game_id, password } = req.body;
	const dataToSubmit = {
		password,
	};
	try {
		const response = await axios.delete(
			process.env.NEXT_PUBLIC_BACK_END_URL + "/api/tiktaktoe/game/" + game_id,
			{ data: dataToSubmit }
		);

		if (response.status !== 201) {
			return;
		}

		res.status(201).json({ status: true, message: response.data?.message });
	} catch (err) {
		res
			.status(err.response.status)
			.json({ status: false, message: err.response.data.message });
	}
};

export default handler;
