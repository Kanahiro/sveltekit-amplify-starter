import type { Cookies } from '@sveltejs/kit';
import type { CookieStorage } from 'aws-amplify/adapter-core';
declare function createCookieStorage(cookies: Cookies): CookieStorage.Adapter;
export { createCookieStorage };
