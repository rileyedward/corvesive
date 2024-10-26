<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import FormErrors from '$lib/components/FormErrors.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import type { expenses } from '@prisma/client';
	import RemoveButton from '../RemoveButton.svelte';
	import { CentsToDollars } from '$lib/helpers/CurrencyHelper';

	export let expense: expenses | null;
	export let form;
	export let showForm: boolean;
</script>

{#if expense}
	<Modal
		title="Manage your expense"
		show={showForm}
		close={() => {
			showForm = false;
			expense = null;
		}}
	>
		<div>
			<div class="flex justify-between items-start mb-4">
				<p class="max-w-xl text-xs mb-4">
					You can manage your expense here. You can update the issuer, name, amount, and due day of
					month of your expense.
				</p>

				<form
					method="POST"
					action="/expenses?/remove"
					use:enhance={() => {
						return async ({ result, update }) => {
							if (result.type === 'success') {
								invalidate('expenses');
								showForm = false;
								expense = null;
							}

							update();
						};
					}}
				>
					<input type="hidden" name="expense_id" value={expense.id} />
					<RemoveButton />
				</form>
			</div>

			<form
				class="space-y-4"
				method="POST"
				action="/expenses?/update"
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
					<input type="hidden" name="expense_id" value={expense.id} />
				</div>

				<div>
					<label for="issuer">Issuer</label>
					<input type="text" name="issuer" class="w-full" value={expense.issuer} />
				</div>

				<div>
					<label for="name">Name</label>
					<input type="text" name="name" class="w-full" value={expense.name} />
				</div>

				<div>
					<label for="due_day_of_month">Due Day of Month</label>
					<input name="due_day_of_month" class="w-full" value={expense.due_day_of_month} />
				</div>

				<div>
					<label for="amount_in_cents">Amount</label>
					<input
						name="amount_in_cents"
						class="w-full"
						value={CentsToDollars(expense.amount_in_cents)}
					/>
				</div>

				<div>
					<label for="is_variable">Is Variable</label>
					<input type="checkbox" name="is_variable" value={expense.is_variable ? 'on' : null} />
				</div>

				<FormErrors {form} />

				<div class="flex justify-end">
					<button type="submit" class="btn btn-primary">Save</button>
				</div>
			</form>
		</div>
	</Modal>
{/if}
