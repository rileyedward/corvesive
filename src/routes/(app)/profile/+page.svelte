<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import FormErrors from '$lib/components/FormErrors.svelte';

	export let data;
	export let form;
</script>

<div class="space-y-8">
	<section class="max-w-3xl">
		<h3 class="text-lg font-semibold text-gray-800 mb-1">Update Profile Information</h3>

		<p class="mb-4 text-sm text-gray-600 max-w-lg">
			Please update your profile information to keep your account up to date.
		</p>

		<div class="p-4 bg-gray-200 border rounded-2xl shadow-md">
			<form
				class="space-y-4"
				method="POST"
				use:enhance={() => {
					return async ({ result, update }) => {
						if (result.type === 'success') {
							invalidate('user');
						}

						update();
					};
				}}
			>
				<div>
					<label for="first_name">First Name</label>
					<input
						type="text"
						name="first_name"
						class="w-full max-w-md"
						bind:value={data.user.first_name}
					/>
				</div>

				<div>
					<label for="last_name">Last Name</label>
					<input
						type="text"
						name="last_name"
						class="w-full max-w-md"
						bind:value={data.user.last_name}
					/>
				</div>

				<div>
					<label for="email">Email</label>
					<input type="email" name="email" class="w-full max-w-md" bind:value={data.user.email} />
				</div>

				<FormErrors {form} />

				<div class="flex justify-end max-w-md">
					<button type="submit" class="btn btn-primary">Save</button>
				</div>
			</form>
		</div>
	</section>

	<section class="max-w-3xl">
		<h3 class="text-lg font-semibold text-gray-800 mb-1">Connect to Services</h3>

		<p class="mb-4 text-sm text-gray-600 max-w-lg">
			Connect your account to services to enable additional features.
		</p>

		<div class="p-4 bg-gray-200 border rounded-2xl shadow-md">
			<p>Coming Soon...</p>
		</div>
	</section>
</div>
