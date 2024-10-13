<script lang="ts">
	import Construction from '$lib/components/Construction.svelte';
	import Modal from '$lib/components/Modal.svelte';

	export let data;
</script>

<div>
	<h1>Paystubs</h1>
</div>

<Modal title="New Paystub" show={true} close={() => alert('closing...')}>
	<div>
		<h1>Modal</h1>
	</div>
</Modal>
