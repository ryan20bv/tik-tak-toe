import axios from "axios";

const handler = async (req, res) => {
	if (req.method === "POST") {
		console.log("POST request");
		return;
	}
	try {
		const response = await axios.get(
			process.env.NEXT_PUBLIC_BACK_END_URL + "/api/tiktaktoe/allGames"
		);

		res.status(200).json({ data: response.data });
	} catch (err) {
		console.log(err);
	}
};
export default handler;
