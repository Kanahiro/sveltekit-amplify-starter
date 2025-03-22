<script>
	import { onMount } from 'svelte';

	let isLoaded = false;

	onMount(() => {
		isLoaded = true;
	});
</script>

<div class="min-h-screen bg-linear-to-b from-blue-50 to-white">
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
						A starter template for SvelteKit and AWS Amplify
					</p>
					<div class="flex flex-col sm:flex-row justify-center gap-4">
						<a
							href="/private"
							class="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-colors focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
						>
							Get Started
						</a>
						<a
							href="https://docs.aws.amazon.com/amplify/latest/userguide/get-started-sveltekit.html"
							target="_blank"
							rel="noopener noreferrer"
							class="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg shadow-md hover:bg-gray-50 transition-colors focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
						>
							Learn More
						</a>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- What is this? -->
	<section class="py-6 md:py-16 bg-white">
		<div class="container mx-auto px-4">
			<h2 class="text-3xl font-bold text-center text-gray-800 mb-12">What is this?</h2>
			<p class="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
				This is a starter template for SvelteKit and AWS Amplify, built to demonstrate
				authentication flow on server-side rendering (SSR) of SvelteKit. You can easily start to use
				with few steps as below.
			</p>
		</div>
	</section>

	<!-- Getting Started Section -->
	<section class="py-6 md:py-16">
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
			</div>
		</div>
	</section>
</div>
