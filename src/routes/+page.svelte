<script>
	import { onMount } from 'svelte';

	let isLoaded = false;

	onMount(() => {
		isLoaded = true;
	});
</script>

<div class="min-h-screen bg-gradient-to-b from-blue-50 to-white">
	<!-- Hero Section -->
	<section class="py-12 md:py-20">
		<div class="container mx-auto px-4">
			<div class="flex flex-col items-center text-center">
				<div
					class={`transform transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
				>
					<h1 class="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
						SvelteKit + Amplify Gen2
					</h1>
					<p class="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto mb-8">
						A powerful starter template for building modern web applications with AWS Amplify
					</p>
					<div class="flex flex-col sm:flex-row justify-center gap-4">
						<a
							href="/auth"
							class="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
						>
							Get Started
						</a>
						<a
							href="https://docs.aws.amazon.com/amplify/latest/userguide/get-started-sveltekit.html"
							target="_blank"
							rel="noopener noreferrer"
							class="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg shadow-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
						>
							Learn More
						</a>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Features Section -->
	<section class="py-12 md:py-16 bg-white">
		<div class="container mx-auto px-4">
			<h2 class="text-3xl font-bold text-center text-gray-800 mb-12">Key Features</h2>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
				<div class="p-6 bg-blue-50 rounded-xl">
					<div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6 text-blue-600"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 12h14M12 5l7 7-7 7"
							/>
						</svg>
					</div>
					<h3 class="text-xl font-semibold text-gray-800 mb-2">SvelteKit Integration</h3>
					<p class="text-gray-600">
						Built with SvelteKit for lightning-fast performance and optimized developer experience.
					</p>
				</div>

				<div class="p-6 bg-blue-50 rounded-xl">
					<div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6 text-blue-600"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
							/>
						</svg>
					</div>
					<h3 class="text-xl font-semibold text-gray-800 mb-2">AWS Amplify Auth</h3>
					<p class="text-gray-600">
						Pre-configured authentication with AWS Cognito for secure user management.
					</p>
				</div>

				<div class="p-6 bg-blue-50 rounded-xl">
					<div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6 text-blue-600"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
							/>
						</svg>
					</div>
					<h3 class="text-xl font-semibold text-gray-800 mb-2">Amplify Hosting</h3>
					<p class="text-gray-600">
						Seamless deployment and hosting with AWS Amplify's powerful infrastructure.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Getting Started Section -->
	<section class="py-12 md:py-16">
		<div class="container mx-auto px-4">
			<div class="max-w-3xl mx-auto">
				<h2 class="text-3xl font-bold text-center text-gray-800 mb-8">Getting Started</h2>
				<div class="bg-gray-50 rounded-xl p-6 mb-8">
					<h3 class="text-xl font-semibold text-gray-800 mb-4">Quick Setup</h3>
					<ol class="list-decimal list-inside space-y-3 text-gray-700">
						<li>Copy or fork this repository</li>
						<li>Connect your repository in the Amplify Console</li>
						<li>Deploy your application</li>
					</ol>
				</div>

				<div class="bg-gray-50 rounded-xl p-6">
					<h3 class="text-xl font-semibold text-gray-800 mb-4">Development</h3>
					<div class="bg-gray-800 text-gray-200 p-4 rounded-lg overflow-x-auto">
						<pre><code
								>npm install
npm run sandbox
npm run dev</code
							></pre>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>
