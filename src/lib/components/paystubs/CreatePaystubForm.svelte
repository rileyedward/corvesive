<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import FormErrors from '$lib/components/FormErrors.svelte';
	import Modal from '$lib/components/Modal.svelte';

	export let form;
	export let showForm: boolean;
	let recurrence_rate: 'weekly' | 'bi-weekly' | 'monthly' | 'semi-monthly' = 'weekly';
</script>

<Modal title="Add new paystub" show={showForm} close={() => (showForm = false)}>
	<div>
		<p class="max-w-xl text-xs mb-4">
			Track your monthly income by adding a new paystub. This will help you better plan your monthly
			budget.
		</p>

		<form
			class="space-y-4"
			method="POST"
			action="/paystubs?/create"
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
				<label for="issuer">Issuer</label>
				<input type="text" name="issuer" class="w-full" />
			</div>

			<div>
				<label for="amount_in_cents">Amount</label>
				<input type="number" name="amount_in_cents" class="w-full" />
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
					<select name="recurrence_interval_one" class="w-full">
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
					<select name="recurrence_interval_one" class="w-full">
						{#each Array.from({ length: 28 }, (_, i) => i + 1) as day}
							<option value={day}>{day}</option>
						{/each}
					</select>
				</div>
			{/if}

			{#if recurrence_rate === 'semi-monthly'}
				<div>
					<label for="recurrence_interval_two">Day of Month (2)</label>
					<select name="recurrence_interval_two" class="w-full">
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
