<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto, invalidate } from '$app/navigation';
	import FormErrors from '$lib/components/FormErrors.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import type { ActionData } from './$types';

	export let data;
	export let form: ActionData;

	let showForm: boolean = false;
	let recurrence_rate: 'weekly' | 'bi-weekly' | 'monthly' | 'semi-monthly' = 'weekly';
</script>

<div>
	<div class="max-w-lg">
		<div class="flex justify-between items-center mb-6">
			<h1 class="text-2xl font-semibold">Paystubs</h1>
			<button
				on:click|preventDefault={() => (showForm = true)}
				class="w-8 h-8 flex items-center justify-center rounded-full bg-black text-white hover:bg-gray-600 transition-colors"
			>
				<span class="text-xl">+</span>
			</button>
		</div>

		<div class="grid gap-4">
			{#each data.paystubs as paystub}
				<div
					class="bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
				>
					<div class="flex justify-between items-center">
						<h3 class="text-lg font-medium">{paystub.issuer}</h3>
						<span class="text-sm text-gray-500">{paystub.recurrence_rate}</span>
					</div>
					<div class="mt-2 text-sm">
						<p class="font-semibold text-gray-700">Amount: ${paystub.amount_in_cents}</p>
						<p class="text-gray-600">Recurrence: {paystub.recurrence_rate}</p>
					</div>
					{#if paystub.recurrence_rate !== 'weekly' && paystub.recurrence_rate !== 'bi-weekly'}
						<p class="mt-2 text-gray-500">Interval One: {paystub.recurrence_interval_one}</p>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</div>

<Modal title="Add new paystub" show={showForm} close={() => (showForm = false)}>
	<div>
		<p class="max-w-xl text-xs mb-4">
			Track your monthly income by adding a new paystub. This will help you better plan your monthly
			budget.
		</p>

		<form
			class="space-y-4"
			method="POST"
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
						<option value={1}>Sunday</option>
						<option value={2}>Monday</option>
						<option value={3}>Tuesday</option>
						<option value={4}>Wednesday</option>
						<option value={5}>Thursday</option>
						<option value={6}>Friday</option>
						<option value={7}>Saturday</option>
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
