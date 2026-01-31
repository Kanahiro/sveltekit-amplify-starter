<script lang="ts">
	import { Hub } from 'aws-amplify/utils';
	import { goto } from '$app/navigation';
	import { Authenticator } from '@aws-amplify/ui-svelte';
	import '@aws-amplify/ui-svelte/styles.css';

	// handle callback
	// doc: https://docs.amplify.aws/react/build-a-backend/auth/concepts/external-identity-providers/#required-for-multi-page-applications-complete-external-sign-in-after-redirect
	Hub.listen('auth', ({ payload }) => {
		switch (payload.event) {
			case 'signedIn':
				goto('/dashboard');
				break;
		}
	});
</script>

<Authenticator />
