<script lang="ts">
	import CreateExpenseForm from '$lib/components/expenses/CreateExpenseForm.svelte';
	import { CentsToDollarsPretty } from '$lib/helpers/CurrencyHelper.js';
	import { ShortDate } from '$lib/helpers/DateHelper.js';
	import type { expense_records, expenses } from '@prisma/client';
	import type { ActionData } from './$types.js';
	import UpdateExpenseForm from '$lib/components/expenses/UpdateExpenseForm.svelte';
	import ExpenseRecordForm from '$lib/components/expenses/ExpenseRecordForm.svelte';

	export let data;
	export let form: ActionData;

	let showForm: boolean = false;
	let expenseToUpdate: expenses | null = null;
	let expenseRecordToUpdate: (expense_records & { expense: expenses }) | null = null;
</script>

<div class="flex flex-col md:flex-row justify-between items-start gap-4">
	<div class="w-full">
		<div class="flex justify-between items-center mb-6">
			<h1 class="text-xl font-semibold">Expenses</h1>
			<button
				on:click|preventDefault={() => (showForm = true)}
				class="w-6 h-6 flex items-center justify-center rounded-full bg-black text-white hover:bg-gray-600 transition-colors"
			>
				<span class="text-xl">+</span>
			</button>
		</div>

		{#if data.expenses && data.expenses.length > 0}
			<div class="grid gap-4">
				{#each data.expenses as expense}
					<button
						class="bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
						on:click|preventDefault={() => {
							expenseToUpdate = expense;
							showForm = true;
						}}
					>
						<div class="flex justify-between items-center">
							<h3 class="text-lg font-medium">{expense.issuer}</h3>
							<span class="text-sm text-gray-500">{expense.name}</span>
						</div>
						<div class="mt-2 text-sm text-left">
							<p class="font-semibold text-gray-700">
								Amount: {CentsToDollarsPretty(expense.amount_in_cents)}
							</p>
							<p class="text-gray-600">
								Due Day of Month: {expense.due_day_of_month}
							</p>
						</div>
					</button>
				{/each}
			</div>
		{:else}
			<p class="text-gray-500 text-sm">Create a new expense to get started.</p>
		{/if}
	</div>

	<div class="w-full md:w-1/2 bg-white px-0 md:px-4 rounded-lg shadow-sm">
		<h4 class="text-lg font-semibold mb-4">Upcoming</h4>
		{#if data.upcomingExpenses && data.upcomingExpenses.length > 0}
			<div class="space-y-2">
				{#each data.upcomingExpenses as upcomingExpense}
					<button
						class="w-full bg-gray-100 p-3 rounded-md shadow-sm hover:bg-gray-200 transition-colors text-left"
						on:click|preventDefault={() => {
							expenseRecordToUpdate = upcomingExpense;
							showForm = true;
						}}
					>
						<p class="text-sm text-gray-700 mb-1">
							<strong class="font-medium">{ShortDate(upcomingExpense.due_date)}</strong>
						</p>
						<p class="text-sm text-gray-700">
							{upcomingExpense.expense.issuer} ({upcomingExpense.expense.name}) - {CentsToDollarsPretty(
								upcomingExpense.amount_in_cents
							)}
						</p>
					</button>
				{/each}
			</div>
		{/if}
	</div>
</div>

{#if expenseToUpdate}
	<UpdateExpenseForm {form} bind:showForm bind:expense={expenseToUpdate} />
{:else if expenseRecordToUpdate}
	<ExpenseRecordForm {form} bind:showForm bind:expenseRecord={expenseRecordToUpdate} />
{:else}
	<CreateExpenseForm {form} bind:showForm />
{/if}
