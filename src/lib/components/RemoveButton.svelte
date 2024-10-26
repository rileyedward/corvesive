<script lang="ts">
	import TrashIcon from '$lib/icons/TrashIcon.svelte';

	let show: boolean = false;
</script>

{#if show}
	<button type="submit" class="btn btn-danger btn-small"> Delete </button>
{:else}
	<button type="button" on:click|preventDefault={() => (show = true)}>
		<TrashIcon />
	</button>
{/if}
