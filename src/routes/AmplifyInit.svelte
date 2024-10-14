<!-- for client side -->
<script lang="ts">
	import { Amplify } from 'aws-amplify';
	import outputs from '../../amplify_outputs.json';

	Amplify.configure(outputs, { ssr: true });
</script>
