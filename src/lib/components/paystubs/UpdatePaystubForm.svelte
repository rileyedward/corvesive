<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import FormErrors from '$lib/components/FormErrors.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { CentsToDollars } from '$lib/helpers/CurrencyHelper';
	import TrashIcon from '$lib/icons/TrashIcon.svelte';
	import type { paystubs } from '@prisma/client';

	export let paystub: paystubs | null;
	export let form;
	export let showForm: boolean;
	let recurrence_rate: string = paystub?.recurrence_rate ?? 'weekly';
</script>

{#if paystub}
	<Modal
		title="Manage your paystub"
		show={showForm}
		close={() => {
			showForm = false;
			paystub = null;
		}}
	>
		<div>
			<div class="flex justify-between items-start mb-4">
				<p class="max-w-xl text-xs">
					You can manage your paystub here. You can update the issuer, amount, and recurrence rate
					of your paystub.
				</p>

				<form
					method="POST"
					action="/paystubs?/remove"
					use:enhance={() => {
						return async ({ result, update }) => {
							if (result.type === 'success') {
								invalidate('paystubs');
								showForm = false;
								paystub = null;
							}

							update();
						};
					}}
				>
					<input type="hidden" name="paystub_id" value={paystub.id} />
					<button type="submit">
						<TrashIcon />
					</button>
				</form>
			</div>

			<form
				class="space-y-4"
				method="POST"
				action="/paystubs?/update"
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
					<input type="hidden" name="paystub_id" value={paystub.id} />
				</div>

				<div>
					<label for="issuer">Issuer</label>
					<input type="text" name="issuer" class="w-full" value={paystub.issuer} />
				</div>

				<div>
					<label for="amount_in_cents">Amount</label>
					<input
						type="number"
						name="amount_in_cents"
						class="w-full"
						value={CentsToDollars(paystub.amount_in_cents)}
					/>
				</div>

				<div>
					<label for="recurrence_rate">Recurrence</label>
					<select name="recurrence_rate" class="w-full" bind:value={recurrence_rate}>
						<option value="weekly">Weekly</option>
						<option value="bi-weekly">Bi-Weekly</option>
						<option value="monthly">Monthly</option>
						<option value="semi-monthly">Semi-Monthly</option>
					</select>
				</div>

				{#if recurrence_rate === 'weekly' || recurrence_rate === 'bi-weekly'}
					<div>
						<label for="recurrence_interval_one">Day of Week</label>
						<select
							name="recurrence_interval_one"
							class="w-full"
							value={paystub.recurrence_interval_one}
						>
							<option value={1}>Monday</option>
							<option value={2}>Tuesday</option>
							<option value={3}>Wednesday</option>
							<option value={4}>Thursday</option>
							<option value={5}>Friday</option>
							<option value={6}>Saturday</option>
							<option value={7}>Sunday</option>
						</select>
					</div>
				{/if}

				{#if recurrence_rate === 'monthly' || recurrence_rate === 'semi-monthly'}
					<div>
						<label for="recurrence_interval_one">Day of Month (1)</label>
						<select
							name="recurrence_interval_one"
							class="w-full"
							value={paystub.recurrence_interval_one}
						>
							{#each Array.from({ length: 28 }, (_, i) => i + 1) as day}
								<option value={day}>{day}</option>
							{/each}
						</select>
					</div>
				{/if}

				{#if recurrence_rate === 'semi-monthly'}
					<div>
						<label for="recurrence_interval_two">Day of Month (2)</label>
						<select
							name="recurrence_interval_two"
							class="w-full"
							value={paystub.recurrence_interval_two}
						>
							{#each Array.from({ length: 28 }, (_, i) => i + 1) as day}
								<option value={day}>{day}</option>
							{/each}
						</select>
					</div>
				{/if}

				<FormErrors {form} />

				<div class="flex justify-end">
					<button type="submit" class="btn btn-primary">Save</button>
				</div>
			</form>
		</div>
	</Modal>
{/if}
