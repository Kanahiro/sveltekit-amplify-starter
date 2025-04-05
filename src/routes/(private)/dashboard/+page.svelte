<script lang="ts">
	import { goto } from '$app/navigation';
	import { signOut } from 'aws-amplify/auth';

	let { data } = $props();

	// Handle sign out
	async function handleSignOut() {
		signOut();
	}
</script>

<div class="min-h-screen bg-gray-50 p-8">
	<div class="max-w-3xl mx-auto">
		<div class="flex justify-between items-center mb-8">
			<h1 class="text-2xl font-bold text-gray-900">Private Page</h1>
			<div class="flex gap-4">
				<button
					onclick={handleSignOut}
					class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
				>
					Sign Out
				</button>
			</div>
		</div>

		<div class="bg-white shadow-sm rounded-lg p-6">
			<h2 class="text-xl font-semibold mb-4">Session Data passed from server</h2>

			{#if data.session}
				<div class="border rounded-md overflow-hidden mb-4">
					<div class="bg-gray-50 px-4 py-2 border-b">
						<h3 class="font-medium">Complete Session Object</h3>
					</div>
					<div class="p-4">
						<pre
							class="bg-gray-100 p-3 rounded-sm text-sm block whitespace-pre-wrap overflow-x-auto">
							{JSON.stringify(data.session, null, 2)}
						</pre>
					</div>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					{#each Object.entries(data.session) as [key, value]}
						<div class="border rounded-md overflow-hidden">
							<div class="bg-gray-50 px-4 py-2 border-b">
								<h3 class="font-medium">{key}</h3>
							</div>
							<div class="p-4">
								<code class="bg-gray-100 p-2 rounded-sm text-sm block whitespace-pre-wrap">
									{typeof value === 'object' ? JSON.stringify(value, null, 2) : value}
								</code>
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<p class="text-gray-500">No session data available.</p>
			{/if}
		</div>
	</div>
</div>
