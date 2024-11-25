<script lang="ts">
	import Signin from './AuthenticatorSignin.svelte';
	import Signup from './AuthenticatorSignup.svelte';

	const {
		callbackSignin,
		callbackSignup
	}: {
		callbackSignin?: () => Promise<void>;
		callbackSignup?: () => Promise<void>;
	} = $props();

	let mode = $state<'signin' | 'signup'>('signin');
</script>

<div class="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-md">
	<!-- タブ切り替え -->
	<div class="flex justify-center space-x-4">
		<button
			class={`py-2 px-4 font-medium text-sm ${
				mode === 'signin' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500'
			}`}
			onclick={() => (mode = 'signin')}
		>
			Sign In
		</button>
		<button
			class={`py-2 px-4 font-medium text-sm ${
				mode === 'signup' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500'
			}`}
			onclick={() => (mode = 'signup')}
		>
			Create Account
		</button>
	</div>
	{#if mode === 'signin'}
		<Signin callback={callbackSignin} />
	{:else}
		<Signup callback={callbackSignup} />
	{/if}
</div>
