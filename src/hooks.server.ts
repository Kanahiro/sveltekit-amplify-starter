import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { fetchAuthSession } from 'aws-amplify/auth/server';

import { createRunWithAmplifyServerContext } from '$lib/adapter-sveltekit';

import outputs from '../amplify_outputs.json';

// init auth-checker with outputs once when the server starts
const runWithAmplifyServerContext = createRunWithAmplifyServerContext(outputs);

const amplifyAuth = (async ({ event, resolve }): Promise<Response> => {
	console.log(event.cookies.getAll());
	if (!event.url.pathname.startsWith('/private')) {
		return resolve(event);
	}

	const authenticated = await runWithAmplifyServerContext({
		event,
		operation: async (contextSpec) => {
			try {
				const session = await fetchAuthSession(contextSpec);
				return session.tokens?.accessToken !== undefined && session.tokens?.idToken !== undefined;
			} catch (error) {
				console.log(error);
				return false;
			}
		}
	});

	if (!authenticated) {
		redirect(303, '/');
	} else {
		return resolve(event);
	}
}) satisfies Handle;

export const handle: Handle = sequence(amplifyAuth);
