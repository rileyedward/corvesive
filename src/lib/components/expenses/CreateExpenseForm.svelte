<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import FormErrors from '$lib/components/FormErrors.svelte';
	import Modal from '$lib/components/Modal.svelte';

	export let form;
	export let showForm: boolean;
</script>

<Modal title="Add new expense" show={showForm} close={() => (showForm = false)}>
	<div>
		<p class="max-w-xl text-xs mb-4">
			Track your monthly expenses by adding a new expense. This will help you better plan your
			monthly budget.
		</p>

		<form
			class="space-y-4"
			method="POST"
			action="/expenses?/create"
			use:enhance={() => {
				return async ({ result, update }) => {
					if (result.type === 'success') {
						invalidate('expenses');
						showForm = false;
					}

					update();
				};
			}}
		>
			<div>
				<label for="issuer">Issuer</label>
				<input type="text" name="issuer" class="w-full" />
			</div>

			<div>
				<label for="name">Name</label>
				<input type="text" name="name" class="w-full" />
			</div>

			<div>
				<label for="due_day_of_month">Due Day of Month</label>
				<input type="number" name="due_day_of_month" class="w-full" />
			</div>

			<div>
				<label for="amount_in_cents">Amount</label>
				<input type="number" name="amount_in_cents" class="w-full" />
			</div>

			<div>
				<label for="is_variable">Is Variable</label>
				<input type="checkbox" name="is_variable" />
			</div>

			<FormErrors {form} />

			<div class="flex justify-end">
				<button type="submit" class="btn btn-primary">Save</button>
			</div>
		</form>
	</div>
</Modal>
