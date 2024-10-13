<script lang="ts">
	import { goto } from '$app/navigation';
	import MenuIcon from '$lib/icons/MenuIcon.svelte';
	import { fly } from 'svelte/transition';

	export let navigation: { name: string; href: string }[];

	let mobileMenuOpen: boolean = false;

	$: textColor = mobileMenuOpen ? 'text-white' : 'black';

	function redirectTo(path: string) {
		mobileMenuOpen = false;
		return goto(path);
	}
</script>

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
				{#each navigation as { name, href }}
					<li>
						<button
							on:click|preventDefault={() => redirectTo(href)}
							class="text-white font-normal hover:font-semibold"
						>
							{name}
						</button>
					</li>
				{/each}
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
