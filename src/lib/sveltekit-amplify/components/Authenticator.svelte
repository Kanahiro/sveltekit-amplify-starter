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
	<!-- Authentication Header with Logo -->
	<div class="text-center mb-6">
		<div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-8 w-8 text-blue-600"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					fill-rule="evenodd"
					d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
					clip-rule="evenodd"
				/>
			</svg>
		</div>
		<h1 class="text-2xl font-bold text-gray-800">
			{#if mode === 'signin'}
				Welcome Back
			{:else if mode === 'signup'}
				Create Your Account
			{:else}
				Reset Your Password
			{/if}
		</h1>
		<p class="text-gray-600 text-sm mt-1">
			{#if mode === 'signin'}
				Sign in to continue to your account
			{:else if mode === 'signup'}
				Join our community today
			{:else}
				We'll help you recover your password
			{/if}
		</p>
	</div>

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

	<!-- Footer with AWS Amplify branding -->
	<div class="mt-6 text-center text-xs text-gray-400">Powered by AWS Amplify Authentication</div>
</div>
