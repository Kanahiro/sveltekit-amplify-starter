import type { LayoutServerLoad } from './$types.js';

export const load: LayoutServerLoad = async ({ locals: { session } }) => {
	// you can get session data from event.locals in /private/*
	console.log(session);

	return {};
};
