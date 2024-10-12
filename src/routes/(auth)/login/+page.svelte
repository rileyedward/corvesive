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
		<div>
			<label for="email">Email</label>
			<input type="email" name="email" class="w-full" />
		</div>

		<div>
			<label for="password">Password</label>
			<input type="password" name="password" class="w-full" />
		</div>

		<FormErrors {form} />

		<div class="flex justify-end gap-2">
			<a href="/register" class="btn btn-secondary">Register</a>
			<button type="submit" class="btn btn-primary">Login</button>
		</div>
	</form>
</div>
