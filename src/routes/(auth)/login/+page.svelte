<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import FormErrors from '$lib/components/FormErrors.svelte';
	import type { ActionData } from './$types';
	export let form: ActionData;
</script>

<div>
	<h4 class="text-center text-2xl mb-4">Welcome back!</h4>

	<form
		class="space-y-4"
		method="POST"
		use:enhance={() => {
			return async ({ result, update }) => {
				if (result.type === 'success') {
					return goto('/dashboard');
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
