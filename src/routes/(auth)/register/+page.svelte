<script lang="ts">
	import { enhance } from '$app/forms';
	import FormErrors from '$lib/components/FormErrors.svelte';
	import type { ActionData } from './$types';
	export let form: ActionData;
</script>

<div>
	<form
		class="space-y-4"
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
		<div class="w-full flex justify-between items-center gap-2">
			<div class="w-full">
				<label for="first_name">First Name</label>
				<input type="text" name="first_name" class="w-full" />
			</div>

			<div class="w-full">
				<label for="last_name">Last Name</label>
				<input type="text" name="last_name" class="w-full" />
			</div>
		</div>

		<div>
			<label for="email">Email</label>
			<input type="email" name="email" class="w-full" />
		</div>

		<div>
			<label for="password">Password</label>
			<input type="password" name="password" class="w-full" />
		</div>

		<div>
			<label for="password_confirm">Confirm Password</label>
			<input type="password" name="password_confirm" class="w-full" />
		</div>

		<FormErrors {form} />

		<div class="flex justify-end gap-2">
			<a href="/login" class="btn btn-secondary">Login</a>
			<button type="submit" class="btn btn-primary">Register</button>
		</div>
	</form>
</div>
