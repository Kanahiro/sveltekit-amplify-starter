import { redirect, type Handle } from '@sveltejs/kit';
import { fetchAuthSession } from 'aws-amplify/auth/server';

import { createRunWithAmplifyServerContext } from '$lib/sveltekit-amplify/index.js';

import outputs from '../amplify_outputs.json';
import { sequence } from '@sveltejs/kit/hooks';

// init auth-checker with outputs once when the server starts
const runWithAmplifyServerContext = createRunWithAmplifyServerContext(outputs);

const amplify: Handle = async ({ event, resolve }): Promise<Response> => {
	if (!event.url.pathname.startsWith('/private')) {
		return resolve(event);
	}

	const authenticated = await runWithAmplifyServerContext({
		event,
		operation: async (contextSpec) => {
			try {
				const session = await fetchAuthSession(contextSpec);

				// set session to context
				event.locals.session = session;

				return session.tokens?.accessToken !== undefined && session.tokens?.idToken !== undefined;
			} catch (error) {
				console.error(error);
				return false;
			}
		}
	});

	if (!authenticated) {
		redirect(303, '/');
	} else {
		return resolve(event);
	}
};

const authGuard: Handle = async ({ event, resolve }) => {
	if (!event.locals.session && event.url.pathname.startsWith('/private')) {
		redirect(303, '/auth/signin');
	}

	if (event.locals.session && event.url.pathname === '/auth/signin') {
		redirect(303, '/private');
	}

	return resolve(event);
};

export const handle: Handle = sequence(amplify, authGuard);
