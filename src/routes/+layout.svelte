<script lang="ts">
	import '../app.css';
	import { AmplifyInit } from '$lib/sveltekit-amplify';
	import outputs from '../../amplify_outputs.json';
</script>

<svelte:head>
	<title>SvelteKit + Amplify Gen2</title>
</svelte:head>

<AmplifyInit {outputs} />
<slot />
