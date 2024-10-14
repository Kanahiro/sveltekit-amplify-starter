import type { Cookies } from '@sveltejs/kit';
import type { CookieStorage } from 'aws-amplify/adapter-core';

function createCookieStorage(cookies: Cookies): CookieStorage.Adapter {
	return {
		getAll: () => cookies.getAll(),
		get: (name: string) => ({ name, value: cookies.get(name) }),
		set: (name: string, value: string, options?: CookieStorage.SetCookieOptions) => {
			cookies.set(name, value, {
				...options,
				path: '/'
			});
		},
		delete: (name: string, options?: CookieStorage.SetCookieOptions) => {
			cookies.delete(name, {
				...options,
				path: '/'
			});
		}
	} satisfies CookieStorage.Adapter;
}

export { createCookieStorage };
