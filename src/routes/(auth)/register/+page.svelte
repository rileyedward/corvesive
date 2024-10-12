<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	export let form: ActionData;
</script>

<div>
	{JSON.stringify(form)}
	<form
		method="POST"
		use:enhance={() => {
			return async ({ result }) => {
				if (result.type === 'success') {
					alert('SUCCESS');
				}
			};
		}}
	>
		<div>
			<label for="first_name">First Name</label>
			<input type="text" name="first_name" />
		</div>

		<div>
			<label for="last_name">Last Name</label>
			<input type="text" name="last_name" />
		</div>

		<div>
			<label for="email">Email</label>
			<input type="email" name="email" />
		</div>

		<div>
			<label for="password">Password</label>
			<input type="password" name="password" />
		</div>

		<div>
			<label for="password_confirm">Confirm Password</label>
			<input type="password" name="password_confirm" />
		</div>

		<button type="submit">Register</button>
	</form>
</div>
