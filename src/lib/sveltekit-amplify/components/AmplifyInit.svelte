<!-- for client side -->
<script lang="ts">
	import { Amplify } from 'aws-amplify';
	import type { AmplifyOutputs } from 'aws-amplify/adapter-core';

	let { outputs }: { outputs: AmplifyOutputs } = $props();

	Amplify.configure(outputs, { ssr: true });
</script>
