<script lang="ts">
	import { signInWithRedirect } from 'aws-amplify/auth';
	import { onMount } from 'svelte';
	import { Hub } from 'aws-amplify/utils';
	import { goto } from '$app/navigation';

	onMount(() => {
		// check exists code and state from url
		const url = new URL(window.location.href);
		const code = url.searchParams.get('code');
		const state = url.searchParams.get('state');

		if (!code && !state) {
			signInWithRedirect();
			return;
		}
	});

	// handle callback
	// doc: https://docs.amplify.aws/react/build-a-backend/auth/concepts/external-identity-providers/#required-for-multi-page-applications-complete-external-sign-in-after-redirect
	Hub.listen('auth', ({ payload }) => {
		switch (payload.event) {
			case 'signInWithRedirect':
				goto('/dashboard');
				break;
			case 'signInWithRedirect_failure':
				// handle sign in failure
				break;
		}
	});
</script>
