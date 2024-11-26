<script lang="ts">
	import { confirmSignUp } from 'aws-amplify/auth';

	let {
		email,
		callback
	}: {
		email: string;
		callback?: () => Promise<void>;
	} = $props();

	let confirmationCode = $state('');

	async function handleConfirmSignup() {
		try {
			const res = await confirmSignUp({ username: email, confirmationCode });
			console.log(res);
			callback && (await callback());
		} catch (error) {
			console.error(error);
			// handle error
		}
	}
</script>

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
