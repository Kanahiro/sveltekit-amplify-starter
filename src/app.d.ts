// See https://kit.svelte.dev/docs/types#app

import type { AuthSession } from 'aws-amplify/auth';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			session: AuthSession | undefined;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
