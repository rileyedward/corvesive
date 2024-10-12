<script lang="ts">
	import { page } from '$app/stores';

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
</script>

<div class="max-w-4xl mx-auto px-4">
	<nav class="flex justify-between items-center py-4 mb-4">
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

		<div>
			<p>logout</p>
		</div>
	</nav>

	<slot />
</div>
