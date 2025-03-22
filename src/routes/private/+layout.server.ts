import type { LayoutServerLoad } from './$types.js';

export const load: LayoutServerLoad = async ({ locals: { session } }) => {
	if (!session) {
		// guard: hooks.server.ts handle only authenticated requests to this route.
		return { session: null };
	}

	// you can get session data from event.locals in /private/*
	/**
	session == {
		tokens: {
			accessToken: { toString: [Function: toString], payload: [Object] },
			idToken: { toString: [Function: toString], payload: [Object] },
			signInDetails: {
				loginId: 'suppressed@suppressed',
				authFlowType: 'USER_SRP_AUTH'
			}
		},
		credentials: {
			accessKeyId: 'suppressed',
			secretAccessKey: 'suppressed',
			sessionToken: 'suppressed',
			expiration: 2025-03-22T12:24:53.000Z
		},
		identityId: 'ap-northeast-1:suppressed',
		userSub: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
	}
	*/

	return {
		session: {
			tokens: {
				accessToken: session.tokens?.accessToken.toString() ?? null,
				idToken: session.tokens?.idToken?.toString() ?? null
			},
			credentials: session.credentials,
			identityId: session.identityId,
			userSub: session.userSub
		}
	};
};
