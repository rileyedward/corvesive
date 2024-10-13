<script lang="ts">
	import type { paystub_records, paystubs } from '@prisma/client';
	import Modal from '../Modal.svelte';
	import FormErrors from '../FormErrors.svelte';
	import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import RemoveButton from '../RemoveButton.svelte';
	import { CentsToDollars } from '$lib/helpers/CurrencyHelper';

	export let paystubRecord: (paystub_records & { paystub: paystubs }) | null;
	export let form;
	export let showForm: boolean;
</script>

{#if paystubRecord}
	<Modal
		title="Manage your paystub"
		show={showForm}
		close={() => {
			showForm = false;
			paystubRecord = null;
		}}
	>
		<div>
			<div class="flex justify-between items-start mb-4">
				<p class="max-w-xl text-xs">
					Reschedule or remove your paystub from <strong>{paystubRecord.paystub.issuer}</strong>
				</p>

				<form
					method="POST"
					action="/paystubs?/unschedule"
					use:enhance={() => {
						return async ({ result, update }) => {
							if (result.type === 'success') {
								invalidate('paystubs');
								showForm = false;
								paystubRecord = null;
							}

							update();
						};
					}}
				>
					<input type="hidden" name="paystub_record_id" value={paystubRecord.id} />
					<RemoveButton />
				</form>
			</div>

			<form
				class="space-y-4"
				method="POST"
				action="/paystubs/?/manage"
				use:enhance={() => {
					return async ({ result, update }) => {
						if (result.type === 'success') {
							invalidate('paystubs');
							showForm = false;
						}

						update();
					};
				}}
			>
				<div>
					<input type="hidden" name="paystub_record_id" value={paystubRecord.id} />
				</div>

				<div>
					<label for="pay_date">Pay Date</label>
					<input
						type="date"
						name="pay_date"
						class="w-full"
						value={new Date(paystubRecord.pay_date).toISOString().split('T')[0]}
					/>
				</div>

				<div>
					<label for="amount_in_cents">Amount</label>
					<input
						type="number"
						name="amount_in_cents"
						class="w-full"
						value={CentsToDollars(paystubRecord.amount_in_cents)}
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
