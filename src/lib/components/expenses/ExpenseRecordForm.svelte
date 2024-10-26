<script lang="ts">
	import type { expense_records, expenses } from '@prisma/client';
	import Modal from '../Modal.svelte';
	import FormErrors from '../FormErrors.svelte';
	import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import RemoveButton from '../RemoveButton.svelte';
	import { CentsToDollars } from '$lib/helpers/CurrencyHelper';

	export let expenseRecord: (expense_records & { expense: expenses }) | null;
	export let form;
	export let showForm: boolean;
</script>

{#if expenseRecord}
	<Modal
		title="Manage your expense"
		show={showForm}
		close={() => {
			showForm = false;
			expenseRecord = null;
		}}
	>
		<div>
			<div class="flex justify-between items-start mb-4">
				<p class="max-w-xl text-xs">
					Reschedule or remove your expense from <strong>{expenseRecord.expense.issuer}</strong>
				</p>

				<form
					method="POST"
					action="/expenses?/unschedule"
					use:enhance={() => {
						return async ({ result, update }) => {
							if (result.type === 'success') {
								invalidate('expenses');
								showForm = false;
								expenseRecord = null;
							}

							update();
						};
					}}
				>
					<input type="hidden" name="expense_record_id" value={expenseRecord.id} />
					<RemoveButton />
				</form>
			</div>

			<form
				class="space-y-4"
				method="POST"
				action="/expenses/?/manage"
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
					<input type="hidden" name="expense_record_id" value={expenseRecord.id} />
				</div>

				<div>
					<label for="due_date">Pay Date</label>
					<input
						type="date"
						name="due_date"
						class="w-full"
						value={new Date(expenseRecord.due_date).toISOString().split('T')[0]}
					/>
				</div>

				<div>
					<label for="amount_in_cents">Amount</label>
					<input
						name="amount_in_cents"
						class="w-full"
						value={CentsToDollars(expenseRecord.amount_in_cents)}
					/>
				</div>

				<FormErrors {form} />

				<div class="flex justify-end">
					<button type="submit" class="btn btn-primary">Save</button>
				</div>
			</form>
		</div>
	</Modal>
{/if}
