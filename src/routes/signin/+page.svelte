<script lang="ts">
	import { signIn, signUp, signOut } from 'aws-amplify/auth';

	let signupInput = {
		email: '',
		password: ''
	};

	let signinInput = {
		email: '',
		password: ''
	};

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
<button on:click={handleSignUp}>Submit</button>
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
<button on:click={handleSignIn}>Submit</button>

<form method="POST" action="?/signOut">
	<button type="submit">Sign Out</button>
</form>
