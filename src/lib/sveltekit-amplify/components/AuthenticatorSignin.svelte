<script lang="ts">
	import { signIn } from 'aws-amplify/auth';

	let username = $state('');
	let password = $state('');
	let errorMessage = $state('');
	let loading = $state(false);

	const {
		onsignin
	}: {
		onsignin?: () => Promise<void>;
	} = $props();

	// Form validation
	let usernameError = $state('');
	let passwordError = $state('');

	function validateForm(): boolean {
		let isValid = true;
		
		// Reset previous errors
		usernameError = '';
		passwordError = '';
		errorMessage = '';

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!username) {
			usernameError = 'Email is required';
			isValid = false;
		} else if (!emailRegex.test(username)) {
			usernameError = 'Please enter a valid email address';
			isValid = false;
		}

		// Validate password
		if (!password) {
			passwordError = 'Password is required';
			isValid = false;
		}

		return isValid;
	}

	// Sign in handler
	async function handleSignin(e: Event) {
		e.preventDefault();
		
		// Validate form before submission
		if (!validateForm()) {
			return;
		}

		loading = true;
		errorMessage = '';
		
		try {
			const res = await signIn({ username, password });

			if (res.nextStep.signInStep === 'DONE') {
				onsignin && (await onsignin());
			} else if (res.nextStep.signInStep === 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED') {
				errorMessage = 'You need to change your password. Please contact an administrator.';
			} else if (res.nextStep.signInStep === 'CONFIRM_SIGN_IN_WITH_SMS_CODE') {
				errorMessage = 'SMS verification is required but not supported in this app.';
			} else {
				errorMessage = `Unsupported sign-in step: ${res.nextStep.signInStep}`;
			}
		} catch (error: any) {
			console.error('Sign in error:', error);
			
			// Handle specific error types
			switch(error.name) {
				case 'UserNotFoundException':
					errorMessage = 'No account found with this email address';
					break;
				case 'NotAuthorizedException':
					errorMessage = 'Incorrect email or password';
					break;
				case 'UserNotConfirmedException':
					errorMessage = 'Account not verified. Please check your email for verification code.';
					break;
				case 'NetworkError':
					errorMessage = 'Network error. Please check your internet connection.';
					break;
				default:
					errorMessage = error.message || 'Sign in failed. Please try again.';
			}
		} finally {
			loading = false;
		}
	}
</script>

<form class="space-y-4" onsubmit={handleSignin}>
	<h2 class="text-2xl font-bold text-center text-gray-800">Sign In</h2>
	<!-- Email Input -->
	<div>
		<label for="email" class="block text-sm font-medium text-gray-700"> Email address </label>
		<input
			id="email"
			type="email"
			bind:value={username}
			class="block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border {usernameError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-hidden focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
			placeholder="Enter your email"
			aria-invalid={usernameError ? 'true' : 'false'}
		/>
		{#if usernameError}
			<p class="mt-1 text-sm text-red-600" id="email-error">{usernameError}</p>
		{/if}
	</div>

	<!-- Password Input -->
	<div>
		<label for="password" class="block text-sm font-medium text-gray-700"> Password </label>
		<input
			id="password"
			type="password"
			bind:value={password}
			class="block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border {passwordError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-hidden focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
			placeholder="Enter your password"
			aria-invalid={passwordError ? 'true' : 'false'}
		/>
		{#if passwordError}
			<p class="mt-1 text-sm text-red-600" id="password-error">{passwordError}</p>
		{/if}
	</div>

	<!-- General Error Message -->
	{#if errorMessage}
		<div class="p-3 bg-red-50 border border-red-200 rounded-md">
			<p class="text-sm text-red-600">{errorMessage}</p>
		</div>
	{/if}

	<!-- Sign In Button -->
	<div>
		<button
			type="submit"
			class="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
