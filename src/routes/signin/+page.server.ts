export const actions = {
	signOut: async ({ cookies }) => {
		// remove all cookies startsWith "CognitoIdentityServiceProvider"
		const cognitoCookies = cookies
			.getAll()
			.filter((cookie) => cookie.name.startsWith('CognitoIdentityServiceProvider'));
		for (const cookie of cognitoCookies) {
			cookies.set(cookie.name, '', { maxAge: 0, path: '/' });
		}
	}
};
