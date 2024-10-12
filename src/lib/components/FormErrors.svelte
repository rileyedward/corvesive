<script lang="ts">
	export let form: any;

	$: errors = form?.errors || [];
</script>

{#if errors.length > 0}
	<div role="alert" class="bg-red-100 border border-red-400 text-red-700 p-3 rounded-md">
		<ul>
			{#each errors as error}
				<li>{error}</li>
			{/each}
		</ul>
	</div>
{/if}
