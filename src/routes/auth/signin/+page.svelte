<script lang="ts">
	import { signIn, signUp } from 'aws-amplify/auth';
	import Authenticator from '$lib/sveltekit-amplify/Authenticator.svelte';

	let signupInput = $state({
		email: '',
		password: ''
	});

	let signinInput = $state({
		email: '',
		password: ''
	});

	const handleSignUp = async () => {
		try {
			const res = await signUp({
				username: signupInput.email,
				password: signupInput.password
			});
			console.log(res);
		} catch (error) {
			console.error(error);
			// handle error
		}
	};

	const handleSignIn = async () => {
		try {
			const res = await signIn({
				username: signinInput.email,
				password: signinInput.password
			});
			console.log(res);
		} catch (error) {
			console.error(error);
			// handle error
		}
	};
</script>

signup
<input
	type="text"
	name="email"
	id="email"
	placeholder="Email"
	required
	bind:value={signupInput.email}
/>
<input
	type="password"
	name="password"
	id="password"
	placeholder="Password"
	required
	bind:value={signupInput.password}
/>
<button onclick={handleSignUp}>Submit</button>
signin
<input
	type="text"
	name="email"
	id="email"
	placeholder="Email"
	required
	bind:value={signinInput.email}
/>
<input
	type="password"
	name="password"
	id="password"
	placeholder="Password"
	required
	bind:value={signinInput.password}
/>
<button onclick={handleSignIn}>Submit</button>

<Authenticator />
