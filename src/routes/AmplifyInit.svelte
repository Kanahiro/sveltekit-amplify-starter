<script lang="ts">
	import { Amplify } from 'aws-amplify';
	import outputs from '../../amplify_outputs.json';
	import { onMount } from 'svelte';

	onMount(() => {
		Amplify.configure(outputs);
	});
</script>
