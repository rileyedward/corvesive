<script lang="ts">
	import TrashIcon from '$lib/icons/TrashIcon.svelte';

	let show: boolean = false;
</script>

{#if show}
	<button type="submit">
		<TrashIcon textColor="text-red-500" />
	</button>
{:else}
	<button type="button" on:click|preventDefault={() => (show = true)}>
		<TrashIcon />
	</button>
{/if}
