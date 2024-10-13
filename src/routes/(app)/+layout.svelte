<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import MenuIcon from '$lib/icons/MenuIcon.svelte';
	import { fly } from 'svelte/transition';
	import { goto } from '$app/navigation';

	export let data: LayoutData;

	const navigation = [
		{
			name: 'Income',
			href: '/income'
		},
		{
			name: 'Expenses',
			href: '/expenses'
		}
	];

	let dropdownOpen: boolean = false;
	let mobileMenuOpen: boolean = false;

	$: textColor = mobileMenuOpen ? 'text-white' : 'black';

	function redirectTo(path: string) {
		dropdownOpen = false;
		mobileMenuOpen = false;
		return goto(path);
	}

	onMount(() => {
		document.addEventListener('click', (event) => {
			const target = event.target as HTMLElement;
			if (!target.closest('.relative')) {
				dropdownOpen = false;
			}
		});
	});
</script>

<div class="max-w-4xl mx-auto px-4">
	<nav class="hidden md:flex justify-between items-center py-8 mb-4">
		<div class="flex items-center gap-16">
			<h1 class="text-2xl font-bold transform hover:scale-105 transition duration-200">
				<a href="/dashboard" class="text-gray-900">Corvesive</a>
			</h1>

			<ul class="flex items-center gap-8">
				{#each navigation as { name, href }}
					<li>
						<a
							{href}
							class={`text-sm font-semibold ${$page.url.pathname === href ? 'text-black' : 'text-gray-500'} hover:text-black`}
							aria-label={name}
						>
							{name}
						</a>
					</li>
				{/each}
			</ul>
		</div>

		<div class="relative inline-block text-left">
			<button
				on:click|preventDefault={() => (dropdownOpen = !dropdownOpen)}
				class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-300"
			>
				{data.user.first_name}
				<svg
					class="-mr-1 ml-2 h-5 w-5"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					aria-hidden="true"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 9l6 6 6-6" />
				</svg>
			</button>

			{#if dropdownOpen}
				<div
					class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-gray-300 z-50"
				>
					<div class="rounded-md bg-white shadow-xs">
						<a
							href="/profile"
							class="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-200 text-left rounded-t-md"
						>
							Profile
						</a>
						<a
							href="/logout"
							class="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-200 text-left rounded-b-md"
						>
							Logout
						</a>
					</div>
				</div>
			{/if}
		</div>
	</nav>

	<nav class="flex md:hidden relative justify-between items-center py-8 z-40">
		<div class="z-50">
			<button on:click|preventDefault={() => redirectTo('/dashboard')}>
				<h1 class={`text-2xl font-bold transition-colors ease-in-out ${textColor}`}>Corvesive</h1>
			</button>
		</div>

		<div class="z-50">
			<button on:click|preventDefault={() => (mobileMenuOpen = !mobileMenuOpen)}>
				<MenuIcon {textColor} />
			</button>
		</div>

		{#if mobileMenuOpen}
			<div class="fixed inset-0 bg-black py-24 px-4" transition:fly={{ y: 10, duration: 300 }}>
				<ul class="flex flex-col gap-8">
					<li class="text-white font-normal hover:font-semibold">
						<button on:click|preventDefault={() => redirectTo('/dashboard')}> Dashboard </button>
					</li>
				</ul>

				<hr class="border-1 border-gray-200 my-8" />

				<ul class="flex flex-col gap-8">
					<li class="text-white font-normal hover:font-semibold">
						<button
							on:click|preventDefault={() => redirectTo('/profile')}
							class="flex items-center gap-4"
						>
							Profile
						</button>
					</li>
					<li class="text-white font-normal hover:font-semibold">
						<button
							on:click|preventDefault={() => redirectTo('/logout')}
							class="flex items-center gap-4"
						>
							Logout
						</button>
					</li>
				</ul>
			</div>
		{/if}
	</nav>

	<slot />
</div>
