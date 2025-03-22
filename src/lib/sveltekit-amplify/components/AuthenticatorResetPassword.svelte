<script lang="ts">
	import { resetPassword, confirmResetPassword } from 'aws-amplify/auth';

	let { onresetpassword }: { onresetpassword?: () => Promise<void> } = $props();

	let mode = $state<'default' | 'CONFIRM_RESET_PASSWORD_WITH_CODE'>('default');

	let username = $state('');
	let newPassword = $state('');
	let confirmNewPassword = $state('');
	let confirmationCode = $state('');

	async function handleForget(e: Event) {
		e.preventDefault();
		try {
			const res = await resetPassword({
				username
			});
			if (res.nextStep.resetPasswordStep === 'CONFIRM_RESET_PASSWORD_WITH_CODE') {
				mode = 'CONFIRM_RESET_PASSWORD_WITH_CODE';
				return;
			} else if (res.nextStep.resetPasswordStep === 'DONE') {
				onresetpassword && (await onresetpassword());
			}
		} catch (error) {
			console.error(error);
			// handle error
		}
	}

	async function handleConfirm(e: Event) {
		e.preventDefault();
		try {
			await confirmResetPassword({
				username,
				newPassword,
				confirmationCode
			});
			onresetpassword && (await onresetpassword());
		} catch (error) {
			console.error(error);
			// handle error
		}
	}

	let inputErrorMessage = $derived.by(() => {
		if (newPassword !== confirmNewPassword) {
			return 'Passwords do not match.';
		}
		return '';
	});
</script>

{#if mode === 'default'}
	<form onsubmit={handleForget} class="space-y-4">
		<h2 class="text-2xl font-bold text-center text-gray-800">Reset Password</h2>
		<div>
			<div>
				<label for="username" class="block text-sm font-medium text-gray-700"> Username </label>
				<input
					id="username"
					type="text"
					bind:value={username}
					class="block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-hidden focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					placeholder="Enter your username"
					required
				/>
			</div>
		</div>
		<button
			type="submit"
			class="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
		>
			Reset Password
		</button>
	</form>
{:else if mode === 'CONFIRM_RESET_PASSWORD_WITH_CODE'}
	<form onsubmit={handleConfirm} class="space-y-4">
		<h2 class="text-2xl font-bold text-center text-gray-800">Confirm Signup</h2>
		<div>
			<div>
				<label for="code" class="block text-sm font-medium text-gray-700"> Code </label>
				<input
					id="code"
					type="text"
					bind:value={confirmationCode}
					class="block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-hidden focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					placeholder="Enter your code"
					required
				/>
			</div>
			<div>
				<label for="newPassword" class="block text-sm font-medium text-gray-700">
					New Password
				</label>
				<input
					id="newPassword"
					type="password"
					bind:value={newPassword}
					class="block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-hidden focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					placeholder="Enter your new password"
					required
				/>
			</div>
			<div>
				<label for="confirmNewPassword" class="block text-sm font-medium text-gray-700">
					Confirm New Password
				</label>
				<input
					id="confirmNewPassword"
					type="password"
					bind:value={confirmNewPassword}
					class="block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-hidden focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					placeholder="Confirm your new password"
					required
				/>
			</div>
			{#if inputErrorMessage}
				<p class="text-sm text-red-600">{inputErrorMessage}</p>
			{/if}
			<button
				type="submit"
				class="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
			>
				Confirm Signup
			</button>
		</div>
	</form>
{/if}
