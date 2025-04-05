<script lang="ts">
	import { signOut } from 'aws-amplify/auth';
	import { onMount } from 'svelte';

	onMount(() => {
		signOut();
	});
</script>
