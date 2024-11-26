<script lang="ts">
	import '../app.css';
	import { AmplifyInit } from '$lib/sveltekit-amplify';
	import outputs from '../../amplify_outputs.json';
</script>

<AmplifyInit {outputs} />
<slot />
