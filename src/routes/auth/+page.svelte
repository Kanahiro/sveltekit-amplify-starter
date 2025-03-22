<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Authenticator } from '$lib/sveltekit-amplify';

	// query params synchronized with mode
	let mode = $state<'signin' | 'signup' | 'resetpassword'>('signin');

	// update query params from mode
	$effect(() => {
		goto(`/auth?mode=${mode}`);
	});

	// update mode from query params
	$effect.pre(() => {
		mode =
			($page.url.searchParams.get('mode') as 'signin' | 'signup' | 'resetpassword') ?? 'signin';
	});
</script>

<div class="grid place-items-center h-screen bg-gray-100">
	<Authenticator
		onsignin={async () => {
			await goto('/private');
		}}
		onsignup={async () => {
			await goto('/auth?mode=signin');
		}}
		onresetpassword={async () => {
			await goto('/auth?mode=signin');
		}}
		bind:mode
	/>
</div>
