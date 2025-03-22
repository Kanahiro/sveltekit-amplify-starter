<script lang="ts">
	import { confirmSignUp, signUp } from 'aws-amplify/auth';

	let username = $state('');
	let password = $state('');
	let confirmPassword = $state('');
	let confirmationCode = $state('');
	let mode = $state<'default' | 'CONFIRM_SIGN_UP'>('default');
	let loading = $state(false);
	let errorMessage = $state('');
	let confirmErrorMessage = $state('');

	const {
		onsignup
	}: {
		onsignup?: () => Promise<void>;
	} = $props();

	// Form validation
	let usernameError = $state('');
	let passwordError = $state('');
	let confirmPasswordError = $state('');
	let confirmationCodeError = $state('');

	function validateSignupForm(): boolean {
		let isValid = true;
		
		// Reset previous errors
		usernameError = '';
		passwordError = '';
		confirmPasswordError = '';
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

		// Check if passwords match
		if (password !== confirmPassword) {
			confirmPasswordError = 'Passwords do not match';
			isValid = false;
		}

		return isValid;
	}

	function validateConfirmationForm(): boolean {
		let isValid = true;
		
		// Reset previous errors
		confirmationCodeError = '';
		confirmErrorMessage = '';

		// Validate confirmation code
		if (!confirmationCode) {
			confirmationCodeError = 'Confirmation code is required';
			isValid = false;
		} else if (!/^\d+$/.test(confirmationCode)) {
			confirmationCodeError = 'Confirmation code must contain only numbers';
			isValid = false;
		}

		return isValid;
	}

	async function handleSignup(e: Event) {
		e.preventDefault();
		
		// Validate form before submission
		if (!validateSignupForm()) {
			return;
		}

		loading = true;
		errorMessage = '';

		try {
			const res = await signUp({
				username,
				password
			});

			if (res.nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
				mode = 'CONFIRM_SIGN_UP';
			} else if (res.nextStep.signUpStep === 'DONE') {
				onsignup && (await onsignup());
			}
		} catch (error: any) {
			console.error('Sign up error:', error);
			
			// Handle specific error types
			switch(error.name) {
				case 'UsernameExistsException':
					errorMessage = 'An account with this email already exists';
					break;
				case 'InvalidPasswordException':
					errorMessage = error.message || 'Password does not meet requirements';
					break;
				case 'InvalidParameterException':
					errorMessage = 'Invalid parameter provided';
					break;
				case 'NetworkError':
					errorMessage = 'Network error. Please check your internet connection.';
					break;
				default:
					errorMessage = error.message || 'Sign up failed. Please try again.';
			}
		} finally {
			loading = false;
		}
	}

	async function handleConfirmSignup(e: Event) {
		e.preventDefault();

		// Validate confirmation form
		if (!validateConfirmationForm()) {
			return;
		}

		loading = true;
		confirmErrorMessage = '';

		try {
			await confirmSignUp({ username, confirmationCode });
			onsignup && (await onsignup());
		} catch (error: any) {
			console.error('Confirm sign up error:', error);
			
			// Handle specific error types
			switch(error.name) {
				case 'CodeMismatchException':
					confirmErrorMessage = 'Invalid verification code';
					break;
				case 'ExpiredCodeException':
					confirmErrorMessage = 'Verification code has expired. Please request a new one.';
					break;
				case 'NotAuthorizedException':
					confirmErrorMessage = 'Account already confirmed. Please sign in.';
					break;
				case 'NetworkError':
					confirmErrorMessage = 'Network error. Please check your internet connection.';
					break;
				default:
					confirmErrorMessage = error.message || 'Confirmation failed. Please try again.';
			}
		} finally {
			loading = false;
		}
	}
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
				class="block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border {usernameError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-hidden focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
				placeholder="Enter your email"
				aria-invalid={usernameError ? 'true' : 'false'}
			/>
			{#if usernameError}
				<p class="mt-1 text-sm text-red-600" id="email-error">{usernameError}</p>
			{/if}
		</div>
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
		<div>
			<label for="confirmPassword" class="block text-sm font-medium text-gray-700">
				Confirm Password
			</label>
			<input
				id="confirmPassword"
				type="password"
				bind:value={confirmPassword}
				class="block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border {confirmPasswordError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-hidden focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
				placeholder="Confirm your password"
				aria-invalid={confirmPasswordError ? 'true' : 'false'}
			/>
			{#if confirmPasswordError}
				<p class="mt-1 text-sm text-red-600" id="confirm-password-error">{confirmPasswordError}</p>
			{/if}
		</div>
		
		<!-- General Error Message -->
		{#if errorMessage}
			<div class="p-3 bg-red-50 border border-red-200 rounded-md">
				<p class="text-sm text-red-600">{errorMessage}</p>
			</div>
		{/if}
		
		<div>
			<button
				type="submit"
				class="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
				disabled={loading}
			>
				{loading ? 'Creating Account...' : 'Create Account'}
			</button>
		</div>
	</form>
{:else}
	<form onsubmit={handleConfirmSignup} class="space-y-4">
		<h2 class="text-2xl font-bold text-center text-gray-800">Confirm Signup</h2>
		<p class="text-sm text-center text-gray-600 mb-4">
			A verification code has been sent to your email address. Please enter it below to confirm your account.
		</p>
		<div>
			<label for="confirmationCode" class="block text-sm font-medium text-gray-700">
				Confirmation Code
			</label>
			<input
				id="confirmationCode"
				type="text"
				bind:value={confirmationCode}
				class="block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border {confirmationCodeError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-hidden focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
				placeholder="Enter your confirmation code"
				aria-invalid={confirmationCodeError ? 'true' : 'false'}
			/>
			{#if confirmationCodeError}
				<p class="mt-1 text-sm text-red-600" id="confirmation-code-error">{confirmationCodeError}</p>
			{/if}
		</div>
		
		<!-- General Error Message -->
		{#if confirmErrorMessage}
			<div class="p-3 bg-red-50 border border-red-200 rounded-md">
				<p class="text-sm text-red-600">{confirmErrorMessage}</p>
			</div>
		{/if}
		
		<div>
			<button
				type="submit"
				class="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
				disabled={loading}
			>
				{loading ? 'Verifying...' : 'Confirm Signup'}
			</button>
		</div>
	</form>
{/if}
