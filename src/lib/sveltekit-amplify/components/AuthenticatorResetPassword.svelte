<script lang="ts">
	import { resetPassword, confirmResetPassword } from 'aws-amplify/auth';

	let { onresetpassword }: { onresetpassword?: () => Promise<void> } = $props();

	let mode = $state<'default' | 'CONFIRM_RESET_PASSWORD_WITH_CODE'>('default');

	let username = $state('');
	let newPassword = $state('');
	let confirmNewPassword = $state('');
	let confirmationCode = $state('');
	let loading = $state(false);
	let errorMessage = $state('');
	let confirmErrorMessage = $state('');

	// Form validation
	let usernameError = $state('');
	let newPasswordError = $state('');
	let confirmNewPasswordError = $state('');
	let confirmationCodeError = $state('');

	function validateResetForm(): boolean {
		let isValid = true;
		
		// Reset previous errors
		usernameError = '';
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

		return isValid;
	}

	function validateConfirmForm(): boolean {
		let isValid = true;
		
		// Reset previous errors
		confirmationCodeError = '';
		newPasswordError = '';
		confirmNewPasswordError = '';
		confirmErrorMessage = '';

		// Validate confirmation code
		if (!confirmationCode) {
			confirmationCodeError = 'Confirmation code is required';
			isValid = false;
		} else if (!/^\d+$/.test(confirmationCode)) {
			confirmationCodeError = 'Confirmation code must contain only numbers';
			isValid = false;
		}

		// Validate password
		if (!newPassword) {
			newPasswordError = 'New password is required';
			isValid = false;
		}

		// Check if passwords match
		if (newPassword !== confirmNewPassword) {
			confirmNewPasswordError = 'Passwords do not match';
			isValid = false;
		}

		return isValid;
	}

	async function handleForget(e: Event) {
		e.preventDefault();

		// Validate form before submission
		if (!validateResetForm()) {
			return;
		}

		loading = true;
		errorMessage = '';

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
		} catch (error: any) {
			console.error('Reset password error:', error);
			
			// Handle specific error types
			switch(error.name) {
				case 'UserNotFoundException':
					errorMessage = 'No account found with this email address';
					break;
				case 'LimitExceededException':
					errorMessage = 'Too many attempts. Please try again later.';
					break;
				case 'InvalidParameterException':
					errorMessage = 'Invalid email format';
					break;
				case 'NetworkError':
					errorMessage = 'Network error. Please check your internet connection.';
					break;
				default:
					errorMessage = error.message || 'Password reset request failed. Please try again.';
			}
		} finally {
			loading = false;
		}
	}

	async function handleConfirm(e: Event) {
		e.preventDefault();

		// Validate form before submission
		if (!validateConfirmForm()) {
			return;
		}

		loading = true;
		confirmErrorMessage = '';

		try {
			await confirmResetPassword({
				username,
				newPassword,
				confirmationCode
			});
			onresetpassword && (await onresetpassword());
		} catch (error: any) {
			console.error('Confirm reset password error:', error);
			
			// Handle specific error types
			switch(error.name) {
				case 'CodeMismatchException':
					confirmErrorMessage = 'Invalid verification code';
					break;
				case 'ExpiredCodeException':
					confirmErrorMessage = 'Verification code has expired. Please request a new one.';
					break;
				case 'InvalidPasswordException':
					confirmErrorMessage = error.message || 'Password does not meet requirements';
					break;
				case 'NetworkError':
					confirmErrorMessage = 'Network error. Please check your internet connection.';
					break;
				default:
					confirmErrorMessage = error.message || 'Password reset confirmation failed. Please try again.';
			}
		} finally {
			loading = false;
		}
	}
</script>

{#if mode === 'default'}
	<form onsubmit={handleForget} class="space-y-4">
		<h2 class="text-2xl font-bold text-center text-gray-800">Reset Password</h2>
		<p class="text-sm text-center text-gray-600 mb-4">
			Enter your email address and we'll send you a code to reset your password.
		</p>
		<div>
			<label for="username" class="block text-sm font-medium text-gray-700"> Email address </label>
			<input
				id="username"
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

		<!-- General Error Message -->
		{#if errorMessage}
			<div class="p-3 bg-red-50 border border-red-200 rounded-md">
				<p class="text-sm text-red-600">{errorMessage}</p>
			</div>
		{/if}

		<button
			type="submit"
			class="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
			disabled={loading}
		>
			{loading ? 'Sending...' : 'Reset Password'}
		</button>
	</form>
{:else if mode === 'CONFIRM_RESET_PASSWORD_WITH_CODE'}
	<form onsubmit={handleConfirm} class="space-y-4">
		<h2 class="text-2xl font-bold text-center text-gray-800">Set New Password</h2>
		<p class="text-sm text-center text-gray-600 mb-4">
			A verification code has been sent to your email. Enter the code and your new password below.
		</p>
		<div>
			<label for="code" class="block text-sm font-medium text-gray-700"> Verification Code </label>
			<input
				id="code"
				type="text"
				bind:value={confirmationCode}
				class="block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border {confirmationCodeError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-hidden focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
				placeholder="Enter verification code"
				aria-invalid={confirmationCodeError ? 'true' : 'false'}
			/>
			{#if confirmationCodeError}
				<p class="mt-1 text-sm text-red-600" id="code-error">{confirmationCodeError}</p>
			{/if}
		</div>
		<div>
			<label for="newPassword" class="block text-sm font-medium text-gray-700">
				New Password
			</label>
			<input
				id="newPassword"
				type="password"
				bind:value={newPassword}
				class="block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border {newPasswordError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-hidden focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
				placeholder="Enter your new password"
				aria-invalid={newPasswordError ? 'true' : 'false'}
			/>
			{#if newPasswordError}
				<p class="mt-1 text-sm text-red-600" id="new-password-error">{newPasswordError}</p>
			{/if}
		</div>
		<div>
			<label for="confirmNewPassword" class="block text-sm font-medium text-gray-700">
				Confirm New Password
			</label>
			<input
				id="confirmNewPassword"
				type="password"
				bind:value={confirmNewPassword}
				class="block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border {confirmNewPasswordError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-hidden focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
				placeholder="Confirm your new password"
				aria-invalid={confirmNewPasswordError ? 'true' : 'false'}
			/>
			{#if confirmNewPasswordError}
				<p class="mt-1 text-sm text-red-600" id="confirm-new-password-error">{confirmNewPasswordError}</p>
			{/if}
		</div>

		<!-- General Error Message -->
		{#if confirmErrorMessage}
			<div class="p-3 bg-red-50 border border-red-200 rounded-md">
				<p class="text-sm text-red-600">{confirmErrorMessage}</p>
			</div>
		{/if}

		<button
			type="submit"
			class="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
			disabled={loading}
		>
			{loading ? 'Setting Password...' : 'Set New Password'}
		</button>
	</form>
{/if}
