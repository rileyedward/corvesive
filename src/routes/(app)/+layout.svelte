<script lang="ts">
	import DesktopNavbar from '$lib/components/navigation/DesktopNavbar.svelte';
	import MobileNavbar from '$lib/components/navigation/MobileNavbar.svelte';

	export let data;

	const navigation = [
		{
			name: 'Paystubs',
			href: '/paystubs'
		},
		{
			name: 'Expenses',
			href: '/expenses'
		}
	];
</script>

<div class="max-w-4xl mx-auto px-4">
	<DesktopNavbar {navigation} user={data.user} />
	<MobileNavbar {navigation} />

	<slot />
</div>
