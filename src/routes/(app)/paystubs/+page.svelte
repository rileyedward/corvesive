<script lang="ts">
	import CreatePaystubForm from '$lib/components/paystubs/CreatePaystubForm.svelte';
	import { CentsToDollarsPretty } from '$lib/helpers/CurrencyHelper';
	import { DayOfWeek, ShortDate } from '$lib/helpers/DateHelper';
	import type { paystubs, paystub_records } from '@prisma/client';
	import type { ActionData } from './$types';
	import type { ActionData as RecordActionData } from './records/$types';
	import UpdatePaystubForm from '$lib/components/paystubs/UpdatePaystubForm.svelte';
	import PaystubRecordForm from '$lib/components/paystubs/PaystubRecordForm.svelte';

	export let data;
	export let form: ActionData;
	export let updateForm: RecordActionData;

	let showForm: boolean = false;
	let paystubToUpdate: paystubs | null = null;
	let paystubRecordToUpdate: (paystub_records & { paystub: paystubs }) | null = null;
</script>

<div class="flex flex-col md:flex-row justify-between items-start gap-4">
	<div class="w-full md:w-full">
		<div class="flex justify-between items-center mb-6">
			<h1 class="text-2xl font-semibold">Paystubs</h1>
			<button
				on:click|preventDefault={() => (showForm = true)}
				class="w-8 h-8 flex items-center justify-center rounded-full bg-black text-white hover:bg-gray-600 transition-colors"
			>
				<span class="text-xl">+</span>
			</button>
		</div>

		{#if data.paystubs && data.paystubs.length > 0}
			<div class="grid gap-4">
				{#each data.paystubs as paystub}
					<button
						class="bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
						on:click={() => {
							paystubToUpdate = paystub;
							showForm = true;
						}}
					>
						<div class="flex justify-between items-center">
							<h3 class="text-lg font-medium">{paystub.issuer}</h3>
							<span class="text-sm text-gray-500">{paystub.recurrence_rate}</span>
						</div>
						<div class="mt-2 text-sm text-left">
							<p class="font-semibold text-gray-700">
								Amount: {CentsToDollarsPretty(paystub.amount_in_cents)}
							</p>
							{#if paystub.recurrence_rate === 'weekly' || paystub.recurrence_rate === 'bi-weekly'}
								<p class="text-gray-600">
									Day of Week: {DayOfWeek(paystub.recurrence_interval_one)}
								</p>
							{:else}
								<p class="text-gray-600">
									Day(s) of Month: {paystub.recurrence_interval_one}
									{#if paystub.recurrence_interval_two}
										, {paystub.recurrence_interval_two}
									{/if}
								</p>
							{/if}
						</div>
					</button>
				{/each}
			</div>
		{:else}
			<p class="text-gray-500 text-sm">Create a new paystub to get started.</p>
		{/if}
	</div>

	<div class="w-full md:w-1/2 bg-white p-4 rounded-lg shadow-sm">
		<h4 class="text-lg font-semibold mb-4">Upcoming</h4>
		{#if data.upcomingPaystubs && data.upcomingPaystubs.length > 0}
			<div class="space-y-2">
				{#each data.upcomingPaystubs as upcomingPaystub}
					<button
						class="bg-gray-100 p-3 rounded-md shadow-sm hover:bg-gray-200 transition-colors text-left"
						on:click|preventDefault={() => {
							paystubRecordToUpdate = upcomingPaystub;
							showForm = true;
						}}
					>
						<p class="text-sm text-gray-700">
							<strong class="font-medium">{ShortDate(upcomingPaystub.pay_date)}</strong> -
							{upcomingPaystub.paystub.issuer} -
							<span class="font-semibold"
								>{CentsToDollarsPretty(upcomingPaystub.amount_in_cents)}</span
							>
						</p>
					</button>
				{/each}
			</div>
		{:else}
			<p class="text-gray-500 text-sm">No upcoming paystubs.</p>
		{/if}
	</div>
</div>

{#if paystubToUpdate}
	<UpdatePaystubForm {form} bind:showForm bind:paystub={paystubToUpdate} />
{:else if paystubRecordToUpdate}
	<PaystubRecordForm form={updateForm} bind:showForm bind:paystubRecord={paystubRecordToUpdate} />
{:else}
	<CreatePaystubForm {form} bind:showForm />
{/if}
