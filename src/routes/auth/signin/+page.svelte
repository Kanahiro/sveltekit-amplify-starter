<script lang="ts">
	import { goto } from '$app/navigation';
	import { Authenticator } from '$lib/sveltekit-amplify';
</script>

<div class="grid place-items-center h-screen bg-gray-100">
	<Authenticator
		callbackSignin={async () => {
			await goto('/private');
		}}
	/>
</div>
