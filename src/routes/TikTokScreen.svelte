<script lang="ts">
	import { UIScrollView, type UIViewController } from "$lib/index.js";
	import TikTokCell from "./TikTokCell.svelte";
	export let viewController: UIViewController;
	const colors: string[] = ["red", "blue", "green", "yellow", "purple"];
</script>

<div class="root">
	<UIScrollView
		isPagingEnabled={true}
		showsScrollIndicator={false}
		contentInset={{ top: 44, bottom: 49 }}
	>
		<div class="cells">
			{#each colors as color}
				<TikTokCell {color} />
			{/each}
		</div>
	</UIScrollView>
</div>

<style>
	.root {
		height: 100%;
		background-color: white;
	}
	.cells {
		height: 100%;
		display: flex;
		flex-direction: column;
	}
</style>
