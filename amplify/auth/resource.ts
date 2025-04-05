import { defineAuth } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
	loginWith: {
		email: true,
		externalProviders: {
			// should add callbackUrls and logoutUrls for each environment
			callbackUrls: [
				'http://localhost:5173/signin',
				'https://main.d3443wg8sm9rim.amplifyapp.com/signin'
			],
			logoutUrls: ['http://localhost:5173', 'https://main.d3443wg8sm9rim.amplifyapp.com']
		}
	}
});
