import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
	session: {
		jwt: true,
	},
	providers: [
		CredentialsProvider({
			id: "access-game",
			name: "Access",
			async authorize(credentials) {
				const { game_id, password } = credentials;

				const res = await fetch(
					process.env.NEXT_PUBLIC_BACK_END_URL + "/api/tiktaktoe/game/access",
					{
						method: "POST",
						body: JSON.stringify({
							game_id,
							password,
						}),
						headers: { "Content-Type": "application/json" },
					}
				);
				// console.log(res);
				let result = await res.json();
				// console.log("result", result);
				if (res.ok) {
					return {
						credentials: result.token,
						// name: result,
					};
				}
				// Return null if user data could not be retrieved
				return null;

				// console.log(data.userData.fName);
			},
		}),
	],
	secret: process.env.NEXT_PUBLIC_SECRET,
};

export default NextAuth(authOptions);
