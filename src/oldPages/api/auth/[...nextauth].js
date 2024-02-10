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
				let result = await res.json();
				if (res.ok) {
					return {
						name: result,
					};
				}
				// Return null if user data could not be retrieved
				return null;
			},
		}),
		CredentialsProvider({
			id: "signup-game",
			name: "Signup",
			async authorize(credentials) {
				const { player1_Name, player2_Name, password } = credentials;

				const res = await fetch(
					process.env.NEXT_PUBLIC_BACK_END_URL + "/api/tiktaktoe/game/new",
					{
						method: "POST",
						body: JSON.stringify({
							player1_Name,
							player2_Name,
							password,
						}),
						headers: { "Content-Type": "application/json" },
					}
				);

				let result = await res.json();

				if (res.ok) {
					return {
						name: result,
					};
				}
				// Return null if user data could not be retrieved
				return null;
			},
		}),
	],
	secret: process.env.NEXT_PUBLIC_SECRET,
};

export default NextAuth(authOptions);
