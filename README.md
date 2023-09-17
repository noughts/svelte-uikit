# Svelte UIKit
A framework for prototyping mobile apps in Svelte.
The goal is to reproduce the general navigation of a mobile application.

The system design is equivalent to Apple's UIKit API.

# Basics

The code to implement [standard tab bar navigation](https://developer.apple.com/documentation/uikit/uitabbarcontroller) in iOS is as follows


```svelte
<!-- src/routes/+page.svelte -->

<script lang="ts">
	import { UISceneController, UITabBarController, UIView, UIViewController, View } from "@noughts/svelte-uikit";
	import WorldClockView from "./WorldClockView.svelte";
</script>

<div class="root">
	<View
		viewController={new UISceneController(
			new UITabBarController([
				new UIViewController(new UIView(WorldClockView), { tabBarItem: { title: "World Clock", icon: "language" } }),
				new UIViewController(new UIView(WorldClockView), { tabBarItem: { title: "Alarm", icon: "alarm" } }),
				new UIViewController(new UIView(WorldClockView), { tabBarItem: { title: "Bedtime", icon: "bed" } }),
				new UIViewController(new UIView(WorldClockView), { tabBarItem: { title: "Stopwatch", icon: "timer" } }),
				new UIViewController(new UIView(WorldClockView), { tabBarItem: { title: "Timer", icon: "pace" } }),
			])
		)}
	/>
</div>

<style>
	:global(*) {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
		--ui-tint-color:orange !important;
	}
	.root {
		width: 100dvw;
		max-width: 480px;
		height: 100dvh;
		overflow: hidden;
	}
</style>
```

# Extending NavigationView

For example, if you want to place a floating button on a View represented by UINavigationController, you can inherit it as follows.

```svelte
<script lang="ts">
    import NavigationView from "$lib/NavigationView.svelte";
    import type { UINavigationController } from "$lib/UINavigationController.js";
    import { UIView } from "$lib/UIView.js";
    import { UIViewController } from "$lib/UIViewController.js";
    import DemoScreen from "./DemoScreen.svelte";

    export let viewController: UINavigationController;

    function onFabClick() {
        viewController.present(new UIViewController(new UIView(DemoScreen), {}));
    }
</script>

<NavigationView {viewController}>
    <button class="fab" on:click={onFabClick}>FAB</button>
</NavigationView>

<style>
    .fab {
        position: absolute;
        width: 88px;
        height: 88px;
        left: 22px;
        bottom: 22px;
        z-index: 100;
    }
</style>
```