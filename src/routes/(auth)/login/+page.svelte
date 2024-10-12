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
			return async ({ result, update }) => {
				if (result.type === 'success') {
					alert('SUCCESS');
				}

				update();
			};
		}}
	>
		<div>
			<label for="email">Email</label>
			<input type="email" name="email" />
		</div>

		<div>
			<label for="password">Password</label>
			<input type="password" name="password" />
		</div>

		<button type="submit">Register</button>
	</form>
</div>
