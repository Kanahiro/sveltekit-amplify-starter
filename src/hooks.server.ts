import { redirect, type Handle } from '@sveltejs/kit';
import { fetchAuthSession } from 'aws-amplify/auth/server';

import { createRunWithAmplifyServerContext } from '$lib/sveltekit-amplify/index.js';

import outputs from '../amplify_outputs.json';
import { sequence } from '@sveltejs/kit/hooks';

// init auth-checker with outputs once when the server starts
const runWithAmplifyServerContext = createRunWithAmplifyServerContext(outputs);

const amplify: Handle = async ({ event, resolve }): Promise<Response> => {
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

	if (!authenticated && event.url.pathname.startsWith('/dashboard')) {
		redirect(303, '/signin');
	}
	if (authenticated && event.url.pathname === '/signin') {
		redirect(303, '/dashboard');
	}

	return resolve(event);
};

export const handle: Handle = sequence(amplify);
