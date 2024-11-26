<script lang="ts">
	import { confirmSignUp, signUp } from 'aws-amplify/auth';

	let username = $state('');
	let password = $state('');
	let confirmPassword = $state('');
	let confirmationCode = $state('');
	let mode = $state<'default' | 'CONFIRM_SIGN_UP'>('default');

	const {
		callback
	}: {
		callback?: () => Promise<void>;
	} = $props();

	async function handleSignup() {
		try {
			const res = await signUp({
				username,
				password
			});

			if (res.nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
				mode = 'CONFIRM_SIGN_UP';
			} else if (res.nextStep.signUpStep === 'DONE') {
				callback && (await callback());
			}
		} catch (error) {
			console.error(error);
			// handle error
		}
	}

	async function handleConfirmSignup() {
		try {
			const res = await confirmSignUp({ username, confirmationCode });
			console.log(res);
			callback && (await callback());
		} catch (error) {
			console.error(error);
			// handle error
		}
	}

	let inputErrorMessage = $derived.by(() => {
		if (password !== confirmPassword) {
			return 'Passwords do not match.';
		}
		return '';
	});
</script>

{#if mode === 'default'}
	<form onsubmit={handleSignup} class="space-y-4">
		<h2 class="text-2xl font-bold text-center text-gray-800">Create Account</h2>
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
		<div>
			<label for="confirmPassword" class="block text-sm font-medium text-gray-700">
				Confirm Password
			</label>
			<input
				id="confirmPassword"
				type="password"
				bind:value={confirmPassword}
				class="block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				placeholder="Confirm your password"
				required
			/>
		</div>
		{#if inputErrorMessage}
			<p class="text-sm text-red-600">{inputErrorMessage}</p>
		{/if}
		<div>
			<button
				type="submit"
				class="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
			>
				Create Account
			</button>
		</div>
	</form>
{:else}
	<form onsubmit={handleConfirmSignup} class="space-y-4">
		<h2 class="text-2xl font-bold text-center text-gray-800">Confirm Signup</h2>
		<div>
			<label for="confirmationCode" class="block text-sm font-medium text-gray-700">
				Confirmation Code
			</label>
			<input
				id="confirmationCode"
				type="text"
				bind:value={confirmationCode}
				class="block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				placeholder="Enter your confirmation code"
				required
			/>
		</div>
		<div>
			<button
				type="submit"
				class="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
			>
				Confirm Signup
			</button>
		</div>
	</form>
{/if}
