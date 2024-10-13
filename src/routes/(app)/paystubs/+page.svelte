<script lang="ts">
	import { enhance } from '$app/forms';
	import FormErrors from '$lib/components/FormErrors.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import type { ActionData } from './$types';

	export let data;
	export let form: ActionData;

	let recurrence_rate: 'weekly' | 'bi-weekly' | 'monthly' | 'semi-monthly' = 'weekly';
</script>

<div>
	<h1>Paystubs</h1>
</div>

<Modal title="New Paystub" show={true} close={() => alert('closing...')}>
	<div>
		<p class="text-sm mb-6">Add a new paystub</p>

		<form
			class="space-y-4"
			method="POST"
			use:enhance={() => {
				return async ({ result, update }) => {
					if (result.type === 'success') {
						return alert('Paystub created!');
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
				<label for="recurrence_rate">Recurrence Rate</label>
				<select name="recurrence_rate" class="w-full" bind:value={recurrence_rate}>
					<option value="weekly">Weekly</option>
					<option value="bi-weekly">Bi-Weekly</option>
					<option value="monthly">Monthly</option>
					<option value="semi-monthly">Semi-Monthly</option>
				</select>
			</div>

			{#if recurrence_rate === 'weekly' || recurrence_rate === 'bi-weekly'}
				<div>
					<label for="recurrence_interval_one">Interval One</label>
					<select name="recurrence_interval_one" class="w-full">
						<option value={0}>Sunday</option>
						<option value={1}>Monday</option>
						<option value={2}>Tuesday</option>
						<option value={3}>Wednesday</option>
						<option value={4}>Thursday</option>
						<option value={5}>Friday</option>
						<option value={6}>Saturday</option>
					</select>
				</div>
			{/if}

			{#if recurrence_rate === 'monthly' || recurrence_rate === 'semi-monthly'}
				<div>
					<label for="recurrence_interval_one">Interval One</label>
					<select name="recurrence_interval_one" class="w-full">
						{#each Array.from({ length: 28 }, (_, i) => i + 1) as day}
							<option value={day}>{day}</option>
						{/each}
					</select>
				</div>
			{/if}

			{#if recurrence_rate === 'semi-monthly'}
				<div>
					<label for="recurrence_interval_two">Interval Two</label>
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
