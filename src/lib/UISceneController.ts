import { derived, get, writable } from "svelte/store";
import { UIViewController } from "./UIViewController.js";
import SceneView from "./SceneView.svelte";
import type { Property } from "csstype";

export class UISceneController extends UIViewController {

	readonly viewControllers = writable<UIViewController[]>([]);
	readonly topViewController = derived(this.viewControllers, $a => {
		return $a[$a.length - 1];
	})

	constructor(rootViewController: UIViewController, options?: {
		theme?: "light" | "dark" | "system";
		tintColor?: Property.Color;
	}) {
		super(SceneView, {})
		rootViewController.presentingViewController = this;
		this.viewControllers.set([rootViewController]);
	}

	push(viewController: UIViewController) {
		viewController.presentingViewController = this;
		const current = get(this.viewControllers);
		this.viewControllers.set(current.concat(viewController));
	}
	pop() {
		if (get(this.viewControllers).length <= 1) {
			return;
		}
		const newAry = [...get(this.viewControllers)];
		newAry.pop();
		this.viewControllers.set(newAry);
	}
}