<script lang="ts">
	import { signIn } from 'aws-amplify/auth';

	let username = $state('');
	let password = $state('');
	let errorMessage = $state('');

	let loading = $state(false);

	const {
		callback
	}: {
		callback?: () => Promise<void>;
	} = $props();

	// ログイン処理
	async function handleSignin() {
		loading = true;
		errorMessage = '';
		try {
			const res = await signIn({ username, password });

			if (res.nextStep.signInStep === 'DONE') {
				callback && (await callback());
			} else {
				// TODO
				return;
			}
		} catch (error: any) {
			errorMessage = error.message || 'Login failed. Please try again.';
		}
		loading = false;
	}
</script>

<form class="space-y-4" onsubmit={handleSignin}>
	<h2 class="text-2xl font-bold text-center text-gray-800">Signin</h2>
	<!-- Email Input -->
	<div>
		<label for="email" class="block text-sm font-medium text-gray-700"> Email address </label>
		<input
			id="email"
			type="email"
			bind:value={username}
			class="block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
			placeholder="Enter your email"
			required
		/>
	</div>

	<!-- Password Input -->
	<div>
		<label for="password" class="block text-sm font-medium text-gray-700"> Password </label>
		<input
			id="password"
			type="password"
			bind:value={password}
			class="block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
			placeholder="Enter your password"
			required
		/>
	</div>

	<!-- Error Message -->
	{#if errorMessage}
		<p class="text-sm text-red-600">{errorMessage}</p>
	{/if}

	<!-- Sign In Button -->
	<div>
		<button
			type="submit"
			class="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
			disabled={loading}
		>
			{#if loading}
				Signing in...
			{:else}
				Sign In
			{/if}
		</button>
	</div>
</form>
