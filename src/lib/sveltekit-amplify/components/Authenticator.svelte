<script lang="ts">
	import ResetPassword from './AuthenticatorResetPassword.svelte';
	import Signin from './AuthenticatorSignin.svelte';
	import Signup from './AuthenticatorSignup.svelte';

	let {
		onsignin,
		onsignup,
		onresetpassword,
		mode = $bindable()
	}: {
		onsignin?: () => Promise<void>;
		onsignup?: () => Promise<void>;
		onresetpassword?: () => Promise<void>;
		mode?: 'signin' | 'signup' | 'resetpassword';
	} = $props();
</script>

<div class="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg border border-gray-100">
	<!-- Tab Navigation -->
	{#if mode !== 'resetpassword'}
		<div class="flex justify-center space-x-4 border-b border-gray-200">
			<button
				class={`py-2 px-4 font-medium text-sm transition-all duration-200 ${
					mode === 'signin'
						? 'border-b-2 border-blue-600 text-blue-600 -mb-[2px]'
						: 'text-gray-500 hover:text-gray-700'
				}`}
				onclick={() => {
					mode = 'signin';
				}}
			>
				Sign In
			</button>
			<button
				class={`py-2 px-4 font-medium text-sm transition-all duration-200 ${
					mode === 'signup'
						? 'border-b-2 border-blue-600 text-blue-600 -mb-[2px]'
						: 'text-gray-500 hover:text-gray-700'
				}`}
				onclick={() => {
					mode = 'signup';
				}}
			>
				Create Account
			</button>
		</div>
	{/if}

	<!-- Form Container with Transitions -->
	<div class="relative">
		{#if mode === 'signin'}
			<div>
				<Signin {onsignin} />
				<!-- Forgot password link -->
				<div class="text-sm text-center mt-4">
					<button
						class="text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-200"
						onclick={() => {
							mode = 'resetpassword';
						}}
					>
						Forgot your password?
					</button>
				</div>
			</div>
		{:else if mode === 'resetpassword'}
			<div>
				<ResetPassword {onresetpassword} />
				<!-- Back to sign in link -->
				<div class="text-sm text-center mt-4">
					<button
						class="text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-200"
						onclick={() => {
							mode = 'signin';
						}}
					>
						← Back to sign in
					</button>
				</div>
			</div>
		{:else}
			<div>
				<Signup {onsignup} />
			</div>
		{/if}
	</div>
</div>
