<script lang="ts">
	import { enhance } from '$app/forms';
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
			<input type="email" name="email" class="w-full" />
		</div>

		<div class="flex justify-end">
			<button type="submit" class="btn btn-primary">Login</button>
		</div>
	</form>
</div>
