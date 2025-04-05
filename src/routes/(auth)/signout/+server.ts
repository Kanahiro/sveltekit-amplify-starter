import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies }) => {
	// remove all cookies startsWith "CognitoIdentityServiceProvider"
	const cognitoCookies = cookies
		.getAll()
		.filter((cookie) => cookie.name.startsWith('CognitoIdentityServiceProvider'));
	for (const cookie of cognitoCookies) {
		cookies.set(cookie.name, '', { maxAge: 0, path: '/' });
	}
	redirect(302, '/');
};
