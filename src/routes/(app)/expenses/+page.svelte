<script lang="ts">
	import Construction from '$lib/components/Construction.svelte';
	import CreateExpenseForm from '$lib/components/expenses/CreateExpenseForm.svelte';
	import type { ActionData } from './$types.js';

	export let data;
	export let form: ActionData;

	let showForm: boolean = false;
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
			{#each data.expenses as expense}
				<h1>{expense.name}</h1>
			{/each}
		{:else}
			<p class="text-gray-500 text-sm">Create a new expense to get started.</p>
		{/if}
	</div>

	<div class="w-full md:w-1/2 bg-white px-0 md:px-4 rounded-lg shadow-sm">
		<h4 class="text-lg font-semibold mb-4">Upcoming</h4>
	</div>
</div>

<CreateExpenseForm {form} bind:showForm />
