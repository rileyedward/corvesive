<script lang="ts">
	import Construction from '$lib/components/Construction.svelte';

	export let data;
</script>

<div>
	<h1>Paystubs</h1>

	<div>
		{JSON.stringify(data)}
	</div>
</div>
