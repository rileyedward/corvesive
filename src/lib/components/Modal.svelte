<script lang="ts">
	export let title: string | null = null;
	export let show = false;
	export let close = () => {};

	const handleClose = () => {
		if (typeof close === 'function') close();
	};
</script>

{#if show}
	<div class="fixed inset-0 z-50 overflow-y-auto">
		<div
			class="fixed inset-0 bg-gray-900 bg-opacity-60 transition-opacity"
			on:click={handleClose}
			aria-hidden="true"
		></div>
		<div class="flex items-start justify-center min-h-screen p-4 pt-20">
			<div class="bg-white rounded-lg shadow-lg transform transition-all w-full sm:max-w-3xl p-6">
				<div class="flex justify-between items-center">
					<h1 class={`text-black text-xl ${title ? 'inline-flex' : 'opacity-0'}`}>
						{title}
					</h1>
					<button
						type="button"
						class="text-black hover:text-gray-500"
						on:click|preventDefault={handleClose}
						aria-label="Close Modal"
					>
						<svg
							class="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							></path>
						</svg>
					</button>
				</div>
				<div class="py-6">
					<slot />
				</div>
			</div>
		</div>
	</div>
{/if}
